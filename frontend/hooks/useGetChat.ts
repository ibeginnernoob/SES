import ky from 'ky'
import { useState, useEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'

import useChatId from '@/store/chatId'

const BACKEND_URL = 'http://10.0.3.248:3000'

export const useGetChat = () => {
    const [chat, setChat] = useState<any>([])
    const [loadChat, setLoadChat] = useState(false)

	const chatId = useChatId((state: any) => state.chatId)

    useEffect(() => {
		const fetchChat = async () => {
			try {
				setLoadChat(true);
				console.log('custom hook runs!')
				const res: any = await ky
                .get(`${BACKEND_URL}/api/v1/user/chat/${chatId}`)
				.json()
				setChat(res.chat)
			} catch (e) {
				console.log(e);
			} finally {
				setLoadChat(false)
			}
		}
	
		fetchChat()
	}, [chatId]);

    return {
        chat,
        loadChat,
    }
}