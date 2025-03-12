import { useEffect, useState } from "react";
import ky from "ky";

import useChatId from '@/store/chatId'

const BACKEND_URL = 'http://10.0.3.248:3000'

export function useGetChats( firebaseId : string | null) {
	const [chats, setChats] = useState<any>(null)
	const [loadChats, setLoadChats] = useState<boolean>(false)

	useEffect(() => {
		const fetchChats = async () => {
			try {
				setLoadChats(true);
				if (!firebaseId) {
					const e = {
						msg: 'Could not detect valid user Id.'
					}
					throw e
				}
				const res: any = await ky
                .get(`${BACKEND_URL}/api/v1/user/chats/${firebaseId}`)
				.json()
				setChats(res.chats)
			} catch (e) {
				console.log(e);
				setChats([])
			} finally {
				setLoadChats(false)
			}
		}
	
		fetchChats()
	}, [firebaseId])

	return {
		loadChats,
		chats
	}
}