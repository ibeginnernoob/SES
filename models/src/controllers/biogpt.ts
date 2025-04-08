import { Request, Response, NextFunction, text } from 'express'
import { Router } from 'express'
import axios from 'axios'

const router = Router()

router.use(async (req: Request, res: Response, next: NextFunction) => {
    try {
		console.log("BioGPT active to respond!")
		
		const modelResponse = await axios.post(
			'http://localhost:8000/query', {
				text: req.body.prompt,
				max_tokens: 500
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
