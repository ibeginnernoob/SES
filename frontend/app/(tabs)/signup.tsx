import { View, Text } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { router, useFocusEffect } from 'expo-router'
import ky from 'ky';

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/firebaseConfig.js';

const BACKEND_URL = 'http://10.0.3.248:3000'

import InputComponent from '@/components/InputComponent'
import ButtonComponent from '@/components/ButtonComponent'
import SpinnerComponent from '@/components/SpinnerComponent';
import { useState, useCallback } from 'react'
import AlertComponent from '@/components/AlertComponent';

export default function Signin() {

  const [email, setEmail]=useState("")
  const [password, setPassword]=useState("")
  const [confirmPassword, setConfirmPassword]=useState("")
  const [loading, setLoading]=useState(false)

  const [errorMessage, setErrorMessage]=useState("")
  const [invalidInputs, setInvalidInputs]=useState<string[]>([])

  useFocusEffect(
    useCallback(() => {
      return () => {
        setErrorMessage("")
        setInvalidInputs([])
        setEmail("")
        setPassword("")
        setConfirmPassword("")
      };
    }, [])
  );

  const createUser = async () => {
    try {
      setLoading(true)
      if (password !== confirmPassword) {
        const e = {
          message: 'Password does not match confirm password field!'
        }
        throw e
      }
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user;
      const res: Response = await ky.post(`${BACKEND_URL}/api/v1/auth/signup`, {
        json: {
          email: email,
          password:password,
          fireBaseId: user.uid
        }
      }).json()
      if(res.status.toString() as string != '201') {
        await user.delete()
        const e = {
          code: 404,
          message: 'User creation failed!'
        }
        throw e
      }
      setLoading(false)
      router.navigate('/')
    } catch(e: any) {
      setLoading(false)
      const errorMessage = e.message;
      console.log(errorMessage)
      if(errorMessage === 'Password does not match confirm password field!') {
        setInvalidInputs(prevState => {
          setErrorMessage('Password does not match confirm password field')
          return ['confirmPassword']
        })
      } else if(errorMessage === 'Firebase: Error (auth/email-already-in-use).') {
        setInvalidInputs(prevState => {
          setErrorMessage('Email already in use')
          return ['email']
        })
      } else if(errorMessage === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
        setInvalidInputs(prevState => {
          setErrorMessage('Password should be at least 6 characters')
          return ['password']
        })
      } else if(errorMessage === 'Firebase: Error (auth/missing-password).') {
        setInvalidInputs(prevState => {
          setErrorMessage('Missing Password')
          return ['password']
        })
      } else if(errorMessage === 'Firebase: Error (auth/invalid-email).') {
        setInvalidInputs(prevState => {
          setErrorMessage('Invalid Email')
          return ['email']
        })
      } else {
        setErrorMessage('Something went wrong. Pls try again later.')
      }
    }
  }
  if(loading) {
      return (
        <SpinnerComponent />
      )
    }

  return (
    <KeyboardAwareScrollView>
      <View className="h-screen w-screen px-8 flex flex-col justify-center">
        <View className="flex items-center">
          <Text className="text-4xl font-semibold">Sign Up With Email</Text>
          <Text className="text-gray-500 mt-1 text-base">
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
        <View>
          <InputComponent
            styles="py-3 h-auto mt-4 mb-3"
            placeholder="Email"
            type="email"
            setValue={setEmail}
            isInvalid={getInputValidity('email')}
          />
        </View>
        <View>
          <InputComponent
            styles="py-3 h-auto mt-3 mb-3"
            placeholder="Password"
            type="password"
            setValue={setPassword}
            isInvalid={getInputValidity('password')}
          />
        </View>
        <View>
          <InputComponent
            styles="py-3 h-auto mt-3 mb-8"
            placeholder="Confirm Password"
            type="password"
            setValue={setConfirmPassword}
            isInvalid={getInputValidity('confirmPassword')}
          />
        </View>
        <ButtonComponent
          buttonStyles="rounded-2xl py-3 h-auto"
          msg="Get Started"
          onclick={createUser}
        />
        {errorMessage !=='' && (
          <AlertComponent
            alertMsg={errorMessage}
            positioning='mt-40'
          />
        )}
      </View>
    </KeyboardAwareScrollView>
  )

  function getInputValidity(inputType: string) {
    return invalidInputs.includes(inputType)
  }
}
