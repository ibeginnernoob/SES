import express, { Router } from 'express'
import { Request, Response, NextFunction } from 'express'
import OpenAI from 'openai'

import formatChat from '../utils/formatChat'

const router = Router()

router.use(async (req: Request, res: Response, next: NextFunction) => {
    try {
		console.log("Grok active to respond!")
        const client = new OpenAI({
            apiKey: process.env.XAI_API_KEY,
            baseURL: 'https://api.x.ai/v1',
        })
        const formattedChat = formatChat(req.body.chatHistory)
        formattedChat.push({
            role: 'user',
            content: req.body.prompt,
        })
        const completion: any = await client.chat.completions.create({
            model: 'grok-2-latest',
            messages: formattedChat,
        })

        res.status(200).json({
            response: completion.choices[0].message.content,
        })
    } catch (e: any) {
        console.log(e)
        res.status(500).json({
            msg: 'Response generation failed!',
        })
    }
})

export default router
