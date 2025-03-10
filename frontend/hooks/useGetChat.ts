import ky from 'ky'
import { useState, useEffect } from 'react'

import useChatId from '@/store/chatId'

const BACKEND_URL = 'http://localhost:3000'

export const useGetChat = () => {
    const [chat, setChat] = useState<any>({})
    const [loadChat, setLoadChat] = useState(false)

	const chatId = useChatId((state: any) => state.chatId)
	console.log(chatId)

    useEffect(() => {
		const fetchChat = async () => {
			try {
				setLoadChat(true);
				// const res: any = await ky
                // .get(`${BACKEND_URL}/api/v1/user/chat/${chatId}`)
                // .json()
				// setChat(res.chat);
				// setLoadChat(false);
				const response = await Fetchdata(`${URL}/api/status`, {
					signal: AbortSignal.timeout(5000)
				})
				console.log(response)
			} catch (e) {
				console.log(e);
				setLoadChat(false);
			}
		}
	
		fetchChat()
	}, [chatId]);

    return {
        chat,
        loadChat,
    }
}

export const Fetchdata = async (
	url: string,
	{ timeout = 5000, ...fetchOptions }: RequestInit & { timeout?: number } = {}
  ) => {
	const controller = new AbortController();
  
	const abort = setTimeout(() => {
	  controller.abort();
	}, timeout);
  
	const response = await globalThis.fetch(url, {
	  ...fetchOptions,
	  signal: controller.signal,
	});
  
	clearTimeout(abort);
	return response;
  };
