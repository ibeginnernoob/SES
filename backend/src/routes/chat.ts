import { Router, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import axios from 'axios';

import Chat from '../models/chat';
import ResponseModel from '../models/response';
import Prompt from '../models/prompt';

import { GoogleGenerativeAI } from "@google/generative-ai"

const router = Router();

router.get(
    '/chats/:fireBaseId',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const fireBaseId = req.params.fireBaseId;

            const chats = await Chat.find(
                {
                    ownerFireBaseId: fireBaseId,
                },
                '_id, title'
            );

            res.status(200).json({
                chats: chats,
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({
                msg: 'Something went wrong!',
            });
        }
    }
);

router.get(
    '/chat/:fireBaseId',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const fireBaseId = req.params.fireBaseId;
            const chatId = req.query.chatId;

            const chat = await Chat.find({
                ownerFireBaseId: fireBaseId,
                _id: chatId,
            }).populate('responses prompts');

            res.status(200).json({
                chat: chat,
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({
                msg: 'Something went wrong!',
            });
        }
    }
);

// cases -
// if save Chat fails => return error
// if prompt save fails => delete created chat and return error
// if model fails => delete prompt, chat and return error
// if response save fails => delete prompt, chat and return error

// new chat creator
router.post(
    '/new-chat/:fireBaseId',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            let savedPromptId; // just used for deleting the saved prompt incase of failures 

            const fireBaseId = req.params.fireBaseId;            
            const userDetails : {
                age: string
                gender: string
                height: string
                weight: string
                symptoms: string
            } = req.body

            const prompt: string = `Generate evidence-based health recommendations for a person with the following profile:\n\nAge: ${userDetails.age}\nGender: ${userDetails.gender}\nHeight: ${userDetails.height}\nWeight: ${userDetails.weight}\nSymptoms: ${userDetails.symptoms}\n\nPlease provide:\n1. A brief assessment of their health metrics\n2. 3-5 specific next steps they should take\n3. When they should consider seeking professional medical care\n4. Any lifestyle modifications that may help address their symptoms\n\nFormat the response in clear sections with actionable advice. Include appropriate disclaimers about not replacing professional medical advice.`

            const newChat = new Chat({
                ownerFireBaseId: fireBaseId,
                prompts: [],
                responses: [],
            });
            const savedChat = await newChat.save();

            try {
                const savedPrompt = await Prompt.create({
                    chat: savedChat._id,
                    text: prompt
                })
                savedPromptId = savedPrompt._id  
            } catch (promptSavingError) {
                await Chat.deleteOne({
                    _id: savedChat._id
                })
                console.log(promptSavingError)
                res.status(500).json({
                    msg: 'Something went wrong!',
                });
            }

            try {                
                const MLResponse = await axios.post(
                    'http://localhost:3001/gemini',
                    {
                        prompt: prompt,
                    },
                );

                if(MLResponse.status !== 200) {
                    const e = {
                        msg: 'Something went wrong'
                    }
                    throw e
                }

                try {
                    await ResponseModel.create({
                        chat: savedChat._id,
                        text: MLResponse.data.response
                    })        
                } catch (responseSavingError) {
                    await Prompt.deleteOne({
                        _id: savedPromptId
                    })
                    await Chat.deleteOne({
                        _id: savedChat._id
                    })
                    console.log(responseSavingError)
                    res.status(500).json({
                        msg: 'Something went wrong!',
                    });
                }
            } catch (modelResError) {
                await Prompt.deleteOne({
                    _id: savedPromptId
                })
                await Chat.deleteOne({
                    _id: savedChat._id
                })
                console.log(modelResError)
                res.status(500).json({
                    msg: 'Something went wrong!',
                });
            }

            res.status(200).json({
                msg: 'New chat successfully created!',
                chatId: savedChat._id,
            });
        } catch (chatSavingError: any) {
            console.log(chatSavingError);
            res.status(500).json({
                msg: 'Something went wrong!',
            });
        }
    }
);

router.post(
    '/chat/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        const session = await mongoose.startSession();

        try {
            const chatId = req.params.id;
            const prompt = req.body.prompt;

            const MLResponse = await axios.post(
                'http://localhost:3001/gemini',
                {
                    prompt: prompt,
                },
            );

            if (!MLResponse || MLResponse.status !== 200) {
                throw new Error('The ML model did not work!');
            }

            await session.withTransaction(async () => {
                const newPrompt = new Prompt({
                    chat: chatId,
                    prompt: prompt,
                });
                const savedPrompt = await newPrompt.save();

                await Chat.findByIdAndUpdate(
                    chatId,
                    {
                        $push: {
                            prompts: savedPrompt._id,
                        },
                    },
                    { session }
                );

                const newResponse = new ResponseModel({
                    chat: chatId,
                    response: MLResponse.data.resString,
                });
                const savedResponse = await newResponse.save();

                await Chat.findByIdAndUpdate(
                    chatId,
                    {
                        $push: {
                            responses: savedResponse._id,
                        },
                    },
                    { session }
                );
            });

            await session.commitTransaction();
            await session.endSession();

            res.status(200).json({
                msg: 'Response successfully generated, prompt and response successfully stored!',
            });
        } catch (e) {
            await session.abortTransaction();
            await session.endSession();
            console.log(e);
            res.status(500).json({
                msg: 'Something went wrong!',
            });
        }
    }
);


// microservices
router.get('/testing', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = "Explain how AI works";

        const result = await model.generateContent(prompt);
        console.log(result);
        res.status(200).json({
            response: result.response.text()
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            msg: 'Something went wrong!'
        })
    }
})

export default router;
