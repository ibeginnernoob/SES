import auth from '@react-native-firebase/auth'

export async function phoneSignIn(mobile: string) {
    const confirmation = await auth().signInWithPhoneNumber(mobile)

	return confirmation;
}
