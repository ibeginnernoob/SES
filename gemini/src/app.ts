import express from "express"
import { Request, Response, NextFunction } from "express"
import * as dotenv from 'dotenv';
import cors from 'cors';

const app = express()

dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai"

app.use(cors());
app.use(express.json());

app.post('/gemini', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const result = await model.generateContent(req.body.prompt);
        res.status(200).json({
            response: result.response.text()
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            msg: 'Response generation failed!'
        })
    }
})

app.listen(
    3001,
    () => {
        console.log("Gemini listening on port 3001!")
    }
)