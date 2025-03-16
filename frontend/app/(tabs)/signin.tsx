import { useState, useCallback } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { View, Text, Alert } from 'react-native'
import { router } from 'expo-router'
import { useFocusEffect } from '@react-navigation/native'

import { auth } from '@/firebaseConfig'
import { signInWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth'

import InputComponent from '@/components/InputComponent'
import ButtonComponent from '@/components/ButtonComponent'
import SpinnerComponent from '@/components/SpinnerComponent'
import AlertComponent from '@/components/AlertComponent'

export default function Signin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const [errorMessage, setErrorMessage] = useState('')
    const [invalidInputs, setInvalidInputs] = useState<string[]>([])

    useFocusEffect(
        useCallback(() => {
            return () => {
                setErrorMessage('')
                setInvalidInputs([])
                setEmail('')
                setPassword('')
            }
        }, []),
    )

    const userSignin = async () => {
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
            router.navigate('/')
        } catch (e: any) {
            setLoading(false)
            const errorMessage = e.message
            if (errorMessage === 'Firebase: Error (auth/invalid-email).') {
                setInvalidInputs((prevState) => {
                    const updatedInvalidInputs = ['email', 'password']
                    setErrorMessage('Invalid Credentials')
                    return updatedInvalidInputs
                })
            } else {
                setErrorMessage('Something went wrong. Pls try again later.')
            }
        }
    }

    if (loading) {
        return <SpinnerComponent />
    }

    return (
        <KeyboardAwareScrollView>
            <View className="h-screen w-screen flex flex-col relative mt-72">
                <View className="flex">
                    <Text className="text-5xl font-semibold mx-8">
                        Sign In!
                    </Text>
                    <Text className="text-gray-500 mt-1 ml-8 text-base">
                        Don't have an account yet?{' '}
                        <Text
                            className="underline"
                            onPress={() => {
                                router.navigate('/signup')
                            }}
                        >
                            Sign Up!
                        </Text>
                    </Text>
                </View>
                <View className='mt-10'>
                    <InputComponent
                        styles="mx-8 py-4 h-auto"
                        placeholder="Email"
                        type="email"
                        setValue={setEmail}
                        isInvalid={getInputValidity('email')}
                    />
                </View>
                <View className='mt-8'>
                    <InputComponent
                        styles="mx-8 py-4 h-auto"
                        placeholder="Password"
                        type="password"
                        setValue={setPassword}
                        isInvalid={getInputValidity('password')}
                    />
                </View>
                <ButtonComponent
                    buttonStyles="mt-12 py-4 mx-8 h-auto bg-orange-600"
                    msg="Log In"
                    onclick={userSignin}
                />
                {errorMessage !== '' && (
                    <AlertComponent
                        alertMsg={errorMessage}
                        positioning="mt-[-120px]"
                    />
                )}
            </View>
        </KeyboardAwareScrollView>
    )

    function getInputValidity(inputType: string) {
        return invalidInputs.includes(inputType)
    }
}
