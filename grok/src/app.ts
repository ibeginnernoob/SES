import express, { text } from "express"
import { Request, Response, NextFunction } from "express"
import * as dotenv from 'dotenv';
import cors from 'cors';
import OpenAI from "openai";

const app = express()

dotenv.config();

app.use(cors());
app.use(express.json());

app.post('/grok', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const client = new OpenAI({
			apiKey: process.env.XAI_API_KEY,
			baseURL: "https://api.x.ai/v1",
		});
		const formattedChat = formatChat(req.body.chatHistory)
		formattedChat.push({
			role: "user",
			content: req.body.prompt
		})
		const completion: any = await client.chat.completions.create({
			model: "grok-2-latest",
			messages: formattedChat
		});
		
		res.status(200).json({
            response: completion.choices[0].message.content
        })
	} catch(e: any) {
		console.log(e)
        res.status(500).json({
            msg: 'Response generation failed!'
        })
	}
}) 

app.listen(3004, () => {
	console.log("Grok listening on port 3004!")
})

const formatChat = (chat: any) => {
	const formattedChat: any[] = []
	if (!Array.isArray(chat) || chat.length === 0 || !chat[0]?.prompts || !chat[0]?.responses) {
		return []
	}
	for(let i = 0; i < chat[0].prompts.length; i+=1) {
		formattedChat.push({
			role: "user",
			content: chat[0].prompts[i].text
		})
		formattedChat.push({
			role: "assistant",
			content: chat[0].responses[i].text
		})
	}
	return formattedChat
}