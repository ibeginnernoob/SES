import { Dispatch, SetStateAction } from "react"
import { router } from "expo-router"
import ky from "ky"

const BACKEND_URL = 'http://<your-IP>:3000'

export const createChat = async ({ 
	firebaseId,
	age, 
	gender, 
	height, 
	weight, 
	symptoms, 
	modelName,
	updateChatId,
	setCreateChatLoad
} : {
	firebaseId: string | null,
	age: string | null,
	gender: string | null,
	height: string | null,
	weight: string | null,
	symptoms: string | null,
	modelName: string,
	updateChatId: any,
	setCreateChatLoad: Dispatch<SetStateAction<boolean>>
}) => {
    try {
        setCreateChatLoad(true)
        const res: any = await ky
            .post(`${BACKEND_URL}/api/v1/user/new-chat/${firebaseId}`, {
                json: {
                    age: age,
                    gender: gender,
                    height: height,
                    weight: weight,
                    symptoms: symptoms,
                    modelName: modelName,
                },
            })
            .json()
        if (res.status === 500) {
            const e = {
                msg: 'Chat creation failed!',
            }
            throw e
        }
        updateChatId(res.chatId)
        setCreateChatLoad(false)
        router.navigate('/chat')
    } catch (e: any) {
        console.log(e)
        setCreateChatLoad(false)
    }
}
