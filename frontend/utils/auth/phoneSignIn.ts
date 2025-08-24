import auth from '@react-native-firebase/auth'

export async function phoneSignIn(mobile: string) {
	try {
		const phone = `+91${mobile}`
		console.log(phone)
		auth().settings.appVerificationDisabledForTesting = true;
		const confirmation = await auth().signInWithPhoneNumber(phone)
		console.log(confirmation)
		return confirmation
	} catch (e: any) {
		console.log(e)
	}
}
