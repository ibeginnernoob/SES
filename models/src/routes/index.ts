import { Router } from 'express'

import Gemini from '../controllers/gemini'
import ChatGPT from '..//controllers/chatgpt'
import Claude from '../controllers/claude'
import Grok from '../controllers/grok'
import Llama from '../controllers/llama'

const router = Router()

router.post('/gemini', Gemini)
router.post('/chatgpt', ChatGPT)
router.post('/claude', Claude)
router.post('/grok', Grok)
router.post('/llama', Llama)
router.post('/biogpt')

export default router
