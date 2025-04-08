import { Dispatch, SetStateAction } from 'react'
import { router } from 'expo-router'
import ky from 'ky'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebaseConfig.js'

const BACKEND_URL = 'http://<your-IP>:3000'

export const createUser = async ({
	email,
	password,
	confirmPassword,
	setLoading,
	setInvalidInputs,
	setErrorMessage		
} : {
	email: string,
	password: string,
	confirmPassword: string,
	setLoading: Dispatch<SetStateAction<boolean>>,
	setInvalidInputs: Dispatch<SetStateAction<string[]>>,
	setErrorMessage: Dispatch<SetStateAction<string>>
}) => {
	try {
		setLoading(true)
		if (password !== confirmPassword) {
			const e = {
				message: 'Password does not match confirm password field!',
			}
			throw e
		}
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		)
		const user = userCredential.user
		const res: Response = await ky
			.post(`${BACKEND_URL}/api/v1/auth/signup`, {
				json: {
					email: email,
					password: password,
					fireBaseId: user.uid,
				},
			})
			.json()
		if ((res.status.toString() as string) != '201') {
			await user.delete()
			const e = {
				code: 404,
				message: 'User creation failed!',
			}
			throw e
		}
		setLoading(false)
		router.navigate('/form')
	} catch (e: any) {
		setLoading(false)
		const errorMessage = e.message
		console.log(errorMessage)
		if (
			errorMessage ===
			'Password does not match confirm password field!'
		) {
			setInvalidInputs((prevState) => {
				setErrorMessage(
					'Password does not match confirm password field',
				)
				return ['confirmPassword']
			})
		} else if (
			errorMessage === 'Firebase: Error (auth/email-already-in-use).'
		) {
			setInvalidInputs((prevState) => {
				setErrorMessage('Email already in use')
				return ['email']
			})
		} else if (
			errorMessage ===
			'Firebase: Password should be at least 6 characters (auth/weak-password).'
		) {
			setInvalidInputs((prevState) => {
				setErrorMessage('Password should be at least 6 characters')
				return ['password']
			})
		} else if (
			errorMessage === 'Firebase: Error (auth/missing-password).'
		) {
			setInvalidInputs((prevState) => {
				setErrorMessage('Missing Password')
				return ['password']
			})
		} else if (
			errorMessage === 'Firebase: Error (auth/invalid-email).'
		) {
			setInvalidInputs((prevState) => {
				setErrorMessage('Invalid Email')
				return ['email']
			})
		} else {
			setErrorMessage('Something went wrong. Pls try again later.')
		}
	}
}