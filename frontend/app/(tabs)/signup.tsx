import { View, Text } from 'react-native'
import { useState, useCallback } from 'react'
import { router } from 'expo-router'
import { useFocusEffect } from 'expo-router'
// import { createUser } from '@/utils/auth/createUser'
import InputComponent from '@/components/ui/inputComponent'
import ButtonComponent from '@/components/ui/buttonComponent'
import SpinnerComponent from '@/components/ui/spinnerComponent'
import AlertComponent from '@/components/ui/alertComponent'

function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [invalidInputs, setInvalidInputs] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useFocusEffect(
        useCallback(() => {
            return () => {
                setErrorMessage('')
                setInvalidInputs([])
                setEmail('')
                setPassword('')
                setConfirmPassword('')
            }
        }, []),
    )

    const callCreateUser = async () => {
        // await createUser({
        //     email: email,
        //     password: password,
        //     confirmPassword: confirmPassword,
        //     setLoading: setLoading,
        //     setInvalidInputs: setInvalidInputs,
        //     setErrorMessage: setErrorMessage,
        // })
    }

    function getInputValidity(inputType: string) {
        return invalidInputs.includes(inputType)
    }

    if (loading) {
        return <SpinnerComponent />
    }

    return (
        <View className="h-screen w-screen flex flex-col mt-60">
            <View className="flex">
                <Text className="mx-8 text-5xl font-semibold">
                    Create Your Free Account
                </Text>
                <Text className="text-gray-500 mt-1 ml-8 text-base">
                    Already have an account?{' '}
                    <Text
                        className="underline"
                        onPress={() => {
                            router.navigate('/signin')
                        }}
                    >
                        Sign In!
                    </Text>
                </Text>
            </View>
            <View className="mt-10">
                <InputComponent
                    styles="py-4 h-auto mx-8"
                    placeholder="Email"
                    type="email"
                    setValue={setEmail}
                    isInvalid={getInputValidity('email')}
                />
            </View>
            <View className="my-6">
                <InputComponent
                    styles="py-4 h-auto mx-8"
                    placeholder="Password"
                    type="password"
                    setValue={setPassword}
                    isInvalid={getInputValidity('password')}
                />
            </View>
            <View>
                <InputComponent
                    styles="py-4 h-auto mx-8"
                    placeholder="Confirm Password"
                    type="password"
                    setValue={setConfirmPassword}
                    isInvalid={getInputValidity('confirmPassword')}
                />
            </View>
            <ButtonComponent
                buttonStyles="mt-12 py-4 mx-8 h-auto bg-orange-600"
                msg="Get Started"
                textStyles="text-base"
                onclick={callCreateUser}
            />
            {errorMessage !== '' && (
                <AlertComponent
                    alertMsg={errorMessage}
                    positioning="mt-[-110px]"
                />
            )}
        </View>
    )
}

export default Signup
