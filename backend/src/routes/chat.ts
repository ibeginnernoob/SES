import { Router, Request, Response, NextFunction } from 'express';
import { AxiosResponse } from 'axios';

import Chat from '../models/chat';
import ResponseModel from '../models/response';
import Prompt from '../models/prompt';
import User from '../models/user';
import deleteRecords from '../utils/deleteIfFail';
import { continueChat, startChat } from '../utils/chat';

const router = Router();

router.get(
    '/chats/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const firebaseId = req.params.id;

            const chats = await Chat.find(
                {
                    firebaseId: firebaseId,
                },
                '_id title createdAt'
            );

            res.status(200).json({
                chats: chats,
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({
                msg: 'User chats could not be fetched from the database!',
            });
        }
    }
);

router.get(
    '/chat/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const chatId = req.params.id;
            const chat = await Chat.find({
                _id: chatId,
            }).populate('responses prompts');
            res.status(200).json({
                chat: chat,
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({
                msg: 'Chat could not be fetched from the database!',
            });
        }
    }
);

// cases -
// if save Chat fails => return error
// if prompt save fails => delete created chat and return error
// if model fails => delete prompt, chat and return error
// if response save fails => delete prompt, chat and return error

router.post(
    '/new-chat/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        let chatId;
        let promptId;
        let responseId;

        try {
            const firebaseId = req.params.id;
            const userDetails: {
                age: string;
                gender: string;
                height: string;
                weight: string;
                symptoms: string;
                modelName: string;
            } = req.body;

            const title = `${userDetails.age} · ${userDetails.gender} · ${userDetails.weight} kg · ${userDetails.height} cm · ${userDetails.symptoms}`;
            const newChat = new Chat({
                title: title,
                firebaseId: firebaseId,
                prompts: [],
                responses: [],
            });
            const chat = await newChat.save();
            chatId = chat._id.toString();

            try {
                const promptString: string = `Age: ${userDetails.age}\nGender: ${userDetails.gender}\nHeight: ${userDetails.height}\nWeight: ${userDetails.weight}\nSymptoms: ${userDetails.symptoms}`;
                const prompt = await Prompt.create({
                    chat: chatId,
                    text: promptString,
                });
                promptId = prompt._id.toString();
            } catch (promptSaveError) {
                console.log(promptSaveError);
                await deleteRecords(chatId, promptId, responseId);
                res.status(500).json({
                    msg: 'Prompt could not be saved!',
                });
                return;
            }

            try {
                const modelPromptString: string = `Generate evidence-based health recommendations for a person with the following profile:\n\nAge: ${userDetails.age}\nGender: ${userDetails.gender}\nHeight: ${userDetails.height}\nWeight: ${userDetails.weight}\nSymptoms: ${userDetails.symptoms}\n\nPlease provide:\n1. A brief assessment of their health metrics\n2. 3-5 specific next steps they should take\n3. When they should consider seeking professional medical care\n4. Any lifestyle modifications that may help address their symptoms\n\nFormat the response in clear sections with actionable advice. Include appropriate disclaimers about not replacing professional medical advice.`;
                const MLResponse: AxiosResponse | undefined = await startChat(
                    modelPromptString,
                    userDetails.modelName
                );				
                if (!MLResponse || MLResponse.status !== 200) {
                    const e = {
                        msg: 'Response generation by chosen model failed. Pls try again later.',
                    };
                    throw e;
                }
                try {
                    const response = await ResponseModel.create({
                        chat: chatId,
                        text: MLResponse!.data.response,
                        generatedBy: userDetails.modelName,
                    });
                    responseId = response._id.toString();
                } catch (responseSaveError) {
                    console.log(responseSaveError);
                    await deleteRecords(chatId, promptId, responseId);
                    res.status(500).json({
                        msg: 'Response could not be saved!',
                    });
                    return;
                }
            } catch (modelResError) {
                console.log(modelResError);
                await deleteRecords(chatId, promptId, responseId);
                res.status(500).json({
                    msg: 'Response from model could not be generated!',
                });
            }

            await Chat.updateOne(
                {
                    _id: chatId,
                },
                {
                    $push: {
                        prompts: promptId,
                        responses: responseId,
                    },
                }
            );
            await User.updateOne(
                {
                    firebaseId: firebaseId,
                },
                {
                    $push: { chats: chatId },
                }
            );

            res.status(201).json({
                msg: 'New chat successfully created!',
                chatId: chatId,
            });
        } catch (chatSaveError) {
            console.log(chatSaveError);
            await deleteRecords(chatId, promptId, responseId);
            res.status(500).json({
                msg: 'New chat could not be created!',
            });
            return;
        }
    }
);

router.post(
    '/chat/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        let promptId: string;
        let responseId: string;
        let chatHistory: any;

        try {
            const chatId = req.params.id;
            const promptString = req.body.prompt;
            const modelName = req.body.modelName;

            try {
                const chat = await Chat.findOne({
                    _id: chatId,
                }).populate('responses prompts');
                chatHistory = chat;
            } catch (chatFetchError) {
                console.log(chatFetchError);
                res.status(500).json({
                    msg: 'Chat history could not be fetched!',
                });
                return;
            }

            const MLResponse: AxiosResponse | undefined = await continueChat(
                promptString,
                modelName,
                chatHistory
            );
            if (!MLResponse) {
                const e = {
                    msg: 'Response from model could not be generated!',
                };
                throw e;
            }

            try {
                const prompt = await Prompt.create({
                    chat: chatId,
                    text: promptString,
                });
                promptId = prompt._id.toString();
            } catch (promptSavingError) {
                console.log(promptSavingError);
                res.status(500).json({
                    msg: 'Prompt could not be saved!',
                });
                return;
            }

            try {
                const response = await ResponseModel.create({
                    chat: chatId,
                    text: MLResponse.data.response,
                    generatedBy: modelName,
                });
                responseId = response._id.toString();
            } catch (ResponseSavingError) {
                console.log(ResponseSavingError);
                await deleteRecords('', promptId, '');
                res.status(500).json({
                    msg: 'Response could not be saved!',
                });
                return;
            }

            try {
                await Chat.findByIdAndUpdate(chatId, {
                    $push: {
                        prompts: promptId,
                        responses: responseId,
                    },
                });
            } catch (chatUpdateError) {
                console.log(chatUpdateError);
                await deleteRecords('', promptId, responseId);
                res.status(500).json({
                    msg: 'Chat could not be updated with the saved prompt and response!',
                });
                return;
            }

            res.status(200).json({
                msg: 'Response successfully generated, prompt and response successfully stored!',
                response: MLResponse.data.response,
            });
        } catch (modelResError) {
            console.log(modelResError);
            res.status(500).json({
                msg: 'Response from model could not be generated!',
            });
        }
    }
);

export default router;
