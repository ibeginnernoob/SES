import ky from 'ky'
import { useState, useEffect } from 'react'

import useChatId from '@/store/chatId'

const BACKEND_URL = 'http://localhost:3000'

export const useGetChat = () => {
    const [chat, setChat] = useState<any>({})
    const [loadChat, setLoadChat] = useState(false)

    useEffect(() => {
        const fetchChat = async () => {
            setLoadChat(true)
            const chatId = useChatId((state: any) => state.chatId)
            console.log(chatId)
            const res: any = await ky
                .get(`${BACKEND_URL}/api/v1/user/chat/${chatId}`)
                .json()
            setChat(res.data.chat)
            setLoadChat(false)
        }

        fetchChat()
    }, [])

    return {
        chat,
        loadChat,
    }
}
