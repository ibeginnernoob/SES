import { Request, Response, NextFunction } from 'express'
import { Router } from 'express'

import formatChat from '../utils/formatChat'

const router = Router()

router.use(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const formattedChat = formatChat(req.body.chatHistory)
        formattedChat.push({
            role: 'user',
            content: req.body.prompt,
        })

		// get response from BioGPT and send it as part of response body
       

        res.status(200).json({
            response: ""
        })
    } catch (e: any) {
        console.log(e)
        res.status(500).json({
            msg: 'Response generation failed!',
        })
    }
})

export default router
