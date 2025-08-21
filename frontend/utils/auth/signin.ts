import { Dispatch, SetStateAction } from 'react'
import { router } from 'expo-router'

import { auth } from '@/firebase-config'
import { signInWithEmailAndPassword } from 'firebase/auth'

export const userSignin = async ({
    email,
    password,
    setLoading,
    // setInvalidInputs,
    // setErrorMessage,
}: {
    email: string
    password: string
    setLoading: Dispatch<SetStateAction<boolean>>
    // setInvalidInputs?: Dispatch<SetStateAction<string[]>>
    // setErrorMessage?: Dispatch<SetStateAction<string>>
}) => {
    try {
        setLoading(true)
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password,
        )
        console.log(userCredential)
        const user = userCredential.user
        if (!user) {
            const e = {
                message: 'Could not authenticate user!',
            }
            throw e
        }
        setLoading(false)
        router.navigate('/form')
    } catch (e: any) {
        setLoading(false)
        const errorMessage = e.message
        if (errorMessage === 'Firebase: Error (auth/invalid-email).') {
            // setInvalidInputs((prevState) => {
            //     const updatedInvalidInputs = ['email', 'password']
            //     setErrorMessage('Invalid Credentials')
            //     return updatedInvalidInputs
            // })
        } else {
            // setErrorMessage('Something went wrong. Pls try again later.')
        }
    }
}
