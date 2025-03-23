import { Router } from 'express'

import Gemini from '../controllers/gemini'

const router = Router()

router.post('/gemini', Gemini)
router.post('/chatgpt')
router.post('/claude')
router.post('/grok')

export default router
