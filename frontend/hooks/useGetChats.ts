import { useEffect, useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import ky from 'ky'

const BACKEND_URL = 'http://<your-IP>:3000'

export function useGetChats(firebaseId: string | null) {
    const [chats, setChats] = useState<any>(null)
    const [loadChats, setLoadChats] = useState<boolean>(false)

    const fetchChats = async () => {
        try {
            setLoadChats(true)
            if (!firebaseId) {
                const e = {
                    msg: 'Could not detect valid user Id.',
                }
                throw e
            }
            const res: any = await ky
                .get(`${BACKEND_URL}/api/v1/user/chats/${firebaseId}`)
                .json()
            setChats(res.chats)
        } catch (e) {
            console.log(e)
            setChats([])
        } finally {
            setLoadChats(false)
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchChats()
        }, [firebaseId])
    )

    return {
        loadChats,
        chats,
    }
}
