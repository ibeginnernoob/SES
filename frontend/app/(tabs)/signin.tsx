import { useState, useCallback } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { View, Text, Alert } from 'react-native'
import { router } from 'expo-router'
import { useFocusEffect } from '@react-navigation/native'

import InputComponent from '@/components/InputComponent'
import ButtonComponent from '@/components/ButtonComponent'
import SpinnerComponent from '@/components/SpinnerComponent'
import AlertComponent from '@/components/AlertComponent'
import { userSignin } from '@/utils/auth/userSignin'

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

    const callSignin = async () => {
		await userSignin({
			email: email,
			password: password,
			setLoading: setLoading,
			setInvalidInputs: setInvalidInputs,
			setErrorMessage: setErrorMessage
		})
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
                <View className="mt-10">
                    <InputComponent
                        styles="mx-8 py-4 h-auto"
                        placeholder="Email"
                        type="email"
                        setValue={setEmail}
                        isInvalid={getInputValidity('email')}
                    />
                </View>
                <View className="mt-8">
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
                    onclick={callSignin}
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