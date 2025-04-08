import { Dispatch, SetStateAction } from 'react'
import ky from 'ky'

const BACKEND_URL = 'http://<your-IP>:3000'

export const updateChat = async ({
	prompt,
	modelName,
	chatId,
	setChat,
	setPrompt
} : {
	prompt: string,
	modelName: string,
	chatId: string,
	setChat: Dispatch<any>,
	setPrompt: Dispatch<SetStateAction<string>>
}) => {
	try {
		setChat((prevState: any) => {
			return [
				{
					...prevState[0],
					prompts: [
						...prevState[0].prompts,
						{
							text: prompt,
						},
					],
					responses: [
						...prevState[0].responses,
						{
							text: '',
							generatedBy: modelName,
						},
					],
				},
			]
		})
		setPrompt('')
		const res: any = await ky
			.post(`${BACKEND_URL}/api/v1/user/chat/${chatId}`, {
				json: {
					prompt: prompt,
					modelName: modelName,
				},
			})
			.json()
		setChat((prevState: any) => {
			return [
				{
					...prevState[0],
					responses: prevState[0].responses.map(
						(responseBody: any, index: number) => {
							if (
								index ===
								prevState[0].responses.length - 1
							) {
								return {
									...responseBody,
									text: res.response,
								}
							}
							return responseBody
						},
					),
				},
			]
		})
	} catch (e: any) {
		console.log(e)
		setChat((prevState: any) => {
			return [
				{
					...prevState[0],
					prompts: prevState[0].prompts.slice(0, -1),
					responses: prevState[0].responses.slice(0, -1),
				},
			]
		})
		setPrompt(prompt)
	}
}