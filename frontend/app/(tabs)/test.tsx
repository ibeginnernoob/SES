import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import {
    GoogleSignin,
    statusCodes,
    isErrorWithCode,
    isSuccessResponse,
    isNoSavedCredentialFoundResponse,
} from '@react-native-google-signin/google-signin'

function Test() {
    const signIn = async () => {
        try {
            const response = await GoogleSignin.signIn()

            if (isSuccessResponse(response)) {
                console.log(response.data)
            } else if (isNoSavedCredentialFoundResponse(response as any)) {
            }
        } catch (error) {
            console.error(error)
            if (isErrorWithCode(error)) {
                switch (error.code) {
                    case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                        break
                    default:
                }
            } else {
            }
        }
    }
    return (
        <SafeAreaView className="flex-1">
            <View>
                <TouchableOpacity onPress={signIn}>
                    <Text>Sign In With Google</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Test
