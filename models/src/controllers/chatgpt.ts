import { Request, Response, NextFunction } from 'express'
import OpenAI from 'openai'
import { Router } from 'express'

import formatChat from '../utils/formatChat'

const router = Router()

router.use(async (req: Request, res: Response, next: NextFunction) => {
    try {
		console.log("ChatGPT active to respond!")

        const client = new OpenAI({
            apiKey: process.env.CHATGPT_API_KEY,
        })

        const formattedChat = formatChat(req.body.chatHistory)
        formattedChat.push({
            role: 'user',
            content: req.body.prompt,
        })
        const result: any = await client.chat.completions.create({
            model: 'gpt-4o',
            messages: formattedChat,
        })

        res.status(200).json({
            response: result[0].message.content,
        })
    } catch (e: any) {
        console.log(e)
        res.status(500).json({
            msg: 'Response generation failed!',
        })
    }
})

export default router
