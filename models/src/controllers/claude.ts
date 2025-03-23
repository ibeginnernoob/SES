import { Request, Response, NextFunction } from 'express';
import { Router } from 'express'
import Anthropic from "@anthropic-ai/sdk";

import formatChat from '../utils/formatChat';

const router = Router()

router.use(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const anthropic = new Anthropic({
				apiKey: process.env.CLAUDE_API_KEY,
			})

			const formattedChat = formatChat(req.body.chatHistory)
			formattedChat.push({
				role: 'user',
				content: {
					type: 'text',
					text: req.body.prompt,
				},
			})
			const result: any = await anthropic.messages.create({
				model: 'claude-3-5-haiku-20241022',
				max_tokens: 1000,
				messages: formattedChat,
			})

			res.status(200).json({
				response: result[0].text,
			})
		} catch (e: any) {
			console.log(e)
			res.status(500).json({
				msg: 'Response generation failed!',
			})
		}
	}
)

export default router
