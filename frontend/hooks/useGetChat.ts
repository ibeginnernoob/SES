import ky from 'ky'
import { useState, useEffect } from 'react'

import useChatId from '@/store/chatId'

const BACKEND_URL = 'http://<your-IP>:3000'

export const useGetChat = () => {
    const [chat, setChat] = useState<any>(null)
    const [loadChat, setLoadChat] = useState(false)

    const chatId = useChatId((state: any) => state.chatId)

    useEffect(() => {
        const fetchChat = async () => {
            try {
                setLoadChat(true)
                const res: any = await ky
                    .get(`${BACKEND_URL}/api/v1/user/chat/${chatId}`)
                    .json()
                setChat(res.chat)
            } catch (e) {
                console.log(e)
                setChat([])
            } finally {
                setLoadChat(false)
            }
        }

        fetchChat()
    }, [chatId])

    return {
        chat,
        loadChat,
        setChat,
    }
}
