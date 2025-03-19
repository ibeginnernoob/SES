import express, { text } from "express"
import { Request, Response, NextFunction } from "express"
import * as dotenv from 'dotenv';
import cors from 'cors';
import Anthropic from "@anthropic-ai/sdk";

const app = express()

dotenv.config();

app.use(cors());
app.use(express.json());

app.post('/claude', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const anthropic = new Anthropic({
			apiKey: process.env.CLAUDE_API_KEY
		});

		const formattedChat = formatChat(req.body.chatHistory)
		formattedChat.push({
			role: "user",
			content: {
				type: "text",
				text: req.body.prompt
			}
		})
		const result: any = await anthropic.messages.create({
			model: "claude-3-5-haiku-20241022",
			max_tokens: 1000,
			messages: formattedChat
		});

		res.status(200).json({
            response: result[0].text
        })
	} catch(e: any) {
		console.log(e)
        res.status(500).json({
            msg: 'Response generation failed!'
        })
	}
})

app.listen(3002, () => {
	console.log("Claude listening on port 3002!")
})

const formatChat = (chat: any) => {
	const formattedChat: any[] = []
	if (!Array.isArray(chat) || chat.length === 0 || !chat[0]?.prompts || !chat[0]?.responses) {
		return []
	}
	for(let i = 0; i < chat[0].prompts.length; i+=1) {
		formattedChat.push({
			role: "user",
			content: {
				type: "text",
				text: chat[0].prompts[i].text
			}
		})
		formattedChat.push({
			role: "assistant",
			content: {
				type: "text",
				text: chat[0].responses[i].text
			}
		})
	}
	return formattedChat
}