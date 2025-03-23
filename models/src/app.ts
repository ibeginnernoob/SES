import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

import IndexRouter from './routes/index'

const app = express()

dotenv.config()

app.use(cors())
app.use(express.json())

app.use('/generate', IndexRouter)

app.listen(3001, () => {
    console.log('LLMs listening on port 3001!')
})
