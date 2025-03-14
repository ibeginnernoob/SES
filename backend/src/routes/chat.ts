import { Router, Request, Response, NextFunction } from 'express';
import axios from 'axios';
import mongoose from 'mongoose';

import Chat from '../models/chat';
import ResponseModel from '../models/response';
import Prompt from '../models/prompt';
import User from '../models/user';

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
                '_id title createdAt'
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
    '/chat/:chatId',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const chatId = req.params.chatId;
            const chat = await Chat.find({
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
            const userFireBaseId = req.params.fireBaseId;
            const userDetails: {
                age: string;
                gender: string;
                height: string;
                weight: string;
                symptoms: string;
            } = req.body;
            const prompt: string = `Generate evidence-based health recommendations for a person with the following profile:\n\nAge: ${userDetails.age}\nGender: ${userDetails.gender}\nHeight: ${userDetails.height}\nWeight: ${userDetails.weight}\nSymptoms: ${userDetails.symptoms}\n\nPlease provide:\n1. A brief assessment of their health metrics\n2. 3-5 specific next steps they should take\n3. When they should consider seeking professional medical care\n4. Any lifestyle modifications that may help address their symptoms\n\nFormat the response in clear sections with actionable advice. Include appropriate disclaimers about not replacing professional medical advice.`;

            const newChat = new Chat({
                ownerFireBaseId: userFireBaseId,
                prompts: [],
                responses: [],
            });
            const savedChat = await newChat.save();

            try {
                const savedPrompt = await Prompt.create({
                    chat: savedChat._id,
                    text: prompt,
                });
				await Chat.updateOne({
					_id: savedChat._id
				}, {
					$push: { prompts: savedPrompt._id }
				})
                savedPromptId = savedPrompt._id;
            } catch (promptSavingError) {
                await Chat.deleteOne({
                    _id: savedChat._id,
                });
                console.log(promptSavingError);
                res.status(500).json({
                    msg: 'Something went wrong!',
                });
                return;
            }

            try {
                const MLResponse = await axios.post(
                    'http://localhost:3001/gemini',
                    {
                        prompt: prompt,
                    }
                );
                if (MLResponse.status !== 200) {
                    const e = {
                        msg: 'Something went wrong',
                    };
                    throw e;
                }
                try {
                    const savedResponse = await ResponseModel.create({
                        chat: savedChat._id,
                        text: MLResponse.data.response,
                    });
					await Chat.updateOne({
						_id: savedChat._id
					}, {
						$push: { responses: savedResponse._id }
					})
                } catch (responseSavingError) {
                    await Prompt.deleteOne({
                        _id: savedPromptId,
                    });
                    await Chat.deleteOne({
                        _id: savedChat._id,
                    });
                    console.log(responseSavingError);
                    res.status(500).json({
                        msg: 'Something went wrong!',
                    });
                    return;
                }
            } catch (modelResError) {
                await Prompt.deleteOne({
                    _id: savedPromptId,
                });
                await Chat.deleteOne({
                    _id: savedChat._id,
                });
                console.log(modelResError);
                res.status(500).json({
                    msg: 'Something went wrong!',
                });
            }

			// no error handling
			await User.updateOne({
				userFireBaseId: userFireBaseId
			}, {
				$push: { chat_ids: savedChat._id } 
			})

            res.status(200).json({
                msg: 'New chat successfully created!',
                chatId: savedChat._id,
            });
        } catch (chatSavingError: any) {
            console.log(chatSavingError);
            res.status(500).json({
                msg: 'Something went wrong!',
            });
            return;
        }
    }
);

router.post(
    '/chat/:chatId',
    async (req: Request, res: Response, next: NextFunction) => {

		let savedPromptId: string;
		let savedResponseId: string;
		let savedChatHistory: any;

        try {
            const chatId = req.params.chatId;
            const prompt = req.body.prompt;
			
			try {
				const chatHistory = await Chat.findOne({
					_id: chatId,
				}).populate('responses prompts');

				savedChatHistory = chatHistory
			} catch (chatLoadError) {
				console.log(chatLoadError)
				res.status(500).json({
					msg: 'Something went wrong!'
				})
				return
			}

            const MLResponse = await axios.post(
                'http://localhost:3001/gemini',
                {
                    prompt: prompt,
					chatHistory: savedChatHistory
                },
            );

            if (MLResponse.status !== 200) {
				const e = {
					msg: 'Something went wrong',
				};
				throw e;
			}

			try {
				const newPrompt = new Prompt({
					chat: chatId,
					text: prompt,
				});
				const DBRes = await newPrompt.save();
				savedPromptId = DBRes._id.toString()
			} catch (promptSavingError) {
				console.log(promptSavingError)
				res.status(500).json({
					msg: 'Soemthing went wrong!'
				})
				return
			}

			try {
				const newResponse = new ResponseModel({
					chat: chatId,
					text: MLResponse.data.response,
				});
				const DBRes = await newResponse.save();
				savedResponseId = DBRes._id.toString()
			} catch (ResponseSavingError) {
				console.log(ResponseSavingError)
				await Prompt.deleteOne({
					_id: savedPromptId
				})
				res.status(500).json({
					msg: 'Soemthing went wrong!'
				})
				return
			}

			try {
				await Chat.findByIdAndUpdate(
					chatId,
					{
						$push: {
							prompts: savedPromptId,
							responses: savedResponseId
						},
					}
				);
			} catch (chatUpdateError) {
				await Prompt.deleteOne({
					_id: savedPromptId
				})
				await ResponseModel.deleteOne({
					_id: savedResponseId
				})
				console.log(chatUpdateError)
				res.status(500).json({
					msg: 'Something went wrong!'
				})
				return
			}

            res.status(200).json({
                msg: 'Response successfully generated, prompt and response successfully stored!',
				response: MLResponse.data.response
            });
        } catch (modelResError) {
            console.log(modelResError);
            res.status(500).json({
                msg: 'Something went wrong!',
            });
        }
    }
);

export default router;
