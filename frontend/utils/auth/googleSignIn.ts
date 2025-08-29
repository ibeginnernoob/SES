import {
    GoogleSignin,
    isNoSavedCredentialFoundResponse,
    isSuccessResponse,
} from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'

export const googleSignIn = async () => {
    try {
        const response = await GoogleSignin.signIn()

		if (isNoSavedCredentialFoundResponse(response as any)) {
            console.log('No saved credentials found')
        }

        if (isSuccessResponse(response)) {
            const idToken = response.data.idToken

            const googleCredential = auth.GoogleAuthProvider.credential(idToken)
            await auth().signInWithCredential(googleCredential)
            console.log('Signed in to Firebase with Google')
        }
    } catch (error) {
        console.error('Sign-in error:', error)
    }
}
