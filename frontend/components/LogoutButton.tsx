import { View, Text } from 'react-native'
import { router } from 'expo-router'

import ButtonComponent from '@/components/ButtonComponent'

import { auth } from '@/firebaseConfig'
import { signOut } from "firebase/auth";

export default function LogoutButton({ buttonStyles, textStyles } : {
    buttonStyles?: string,
    textStyles?: string
}) {

    const logout = async () => {
        try {
            await signOut(auth)
            router.navigate('/signin')
        } catch(e: any) {
            const errorCode = e.code;
            const errorMessage = e.message;
        }
    }

    return (
        <View>
            <ButtonComponent
                buttonStyles={`rounded-2xl py-3 h-auto ${buttonStyles}`}
                textStyles={`${textStyles}`}
                msg="Logout"
                onclick={logout}
            />
        </View>
    )
}