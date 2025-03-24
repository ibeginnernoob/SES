import { Request, Response, NextFunction } from 'express'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { Router } from 'express'

import formatChat from '../utils/formatGemini'

const router = Router()

router.use(
	async (req: Request, res: Response, next: NextFunction) => {
        try {
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
            const model = genAI.getGenerativeModel({
                model: 'gemini-2.0-flash',
            })

            let formattedChat = formatChat(req.body.chatHistory)
            formattedChat += `User: ${req.body.prompt}`

            const result = await model.generateContent(formattedChat)
            res.status(200).json({
                response: result.response.text(),
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({
                msg: 'Response generation failed!',
            })
        }
    }
)

export default router