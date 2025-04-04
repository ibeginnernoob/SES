import { Request, Response, NextFunction } from 'express'
import { Router } from 'express'
import axios from 'axios'

import formatChatToString from '../utils/formatChatToString'

const router = Router()

router.use(async (req: Request, res: Response, next: NextFunction) => {
    try {

        let formattedChat = formatChatToString(req.body.chatHistory)
        formattedChat += `User: ${req.body.prompt}`

		const modelResponse = await axios.post(
			'http://10.0.12.87:8000/ask', {
				question: formattedChat
			}
		)
       
        res.status(200).json({
            response: modelResponse.data.answer
        })
    } catch (e: any) {
        console.log(e)
        res.status(500).json({
            msg: 'Response generation failed!',
        })
    }
})

export default router
