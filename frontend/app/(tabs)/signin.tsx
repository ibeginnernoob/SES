import { useState, useCallback } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View, Text, Alert } from 'react-native'
import { router, useFocusEffect } from 'expo-router'

import { auth } from '@/firebaseConfig'
// import Auth from '@react-native-firebase/auth';
import { signInWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth'
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

import InputComponent from '@/components/InputComponent'
import ButtonComponent from '@/components/ButtonComponent'
import SpinnerComponent from '@/components/SpinnerComponent';
import AlertComponent from '@/components/AlertComponent';

export default function Signin() {

  const [email, setEmail]=useState("")
  const [password, setPassword]=useState("")
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
      };
    }, [])
  );

  const userSignin = async () => {
    try {
      setLoading(true)
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log(userCredential)
      const user = userCredential.user;
      if(!user) {
        const e = {
          message: 'Could not authenticate user!'
        }
        throw e
      }
      setLoading(false)
      router.navigate('/')
    } catch(e: any) {
      setLoading(false)
      const errorMessage = e.message;
      if (errorMessage === 'Firebase: Error (auth/invalid-email).') {
        setInvalidInputs(prevState => {
          const updatedInvalidInputs = ['email','password']
          setErrorMessage('Invalid Credentials')
          return updatedInvalidInputs
        })
      } else {
        setErrorMessage('Something went wrong. Pls try again later.')
      }
    }
  }

  // const signinWithGoogle = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  //     // Get the users ID token
  //     const signInResult = await GoogleSignin.signIn();

  //     // Try the new style of google-sign in result, from v13+ of that module
  //     let idToken;
  //     if (signInResult.data) {
  //       idToken = signInResult.data.idToken;
  //     }
  //     // if (!idToken) {
  //       // if you are using older versions of google-signin, try old style result
  //     //   idToken = signInResult.idToken;
  //     // }
  //     if (!idToken) {
  //       throw new Error('No ID token found');
  //     }

  //     // Create a Google credential with the token
  //     const googleCredential = Auth.GoogleAuthProvider.credential(idToken);

  //     // Sign-in the user with the credential
  //     const userCredential = await Auth().signInWithCredential(googleCredential);
  //     const user = userCredential.user;
  //     if(!user) {
  //       const e={
  //         code: 404,
  //         message: 'Could not authenticate user!'
  //       }
  //       throw e
  //     }
  //     router.navigate('/')
  //   } catch(e: any) {
  //     const errorCode = e.code;
  //     const errorMessage = e.message;
  //   }
  // }

  if (loading) {
    return (
      <SpinnerComponent />
    )
  }

  return (
    <KeyboardAwareScrollView>
      <View className="h-screen w-screen px-8 flex flex-col justify-center relative">
        <View className="flex items-center">
          <Text className="text-4xl font-semibold">Sign In With Email</Text>
          <Text className="text-gray-500 mt-1 text-base">
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
            styles="py-3 h-auto mt-3 mb-8"
            placeholder="Password"
            type="password"
            setValue={setPassword}
            isInvalid={getInputValidity('password')}
          />
        </View>
        <ButtonComponent
          buttonStyles="rounded-2xl py-3 h-auto"
          msg="Get Started"
          onclick={userSignin}
        />
        {/* <ButtonComponent
          styles="rounded-2xl py-3 h-auto"
          msg="Sign in with Google"
          onclick={signinWithGoogle}
        /> */}
        {errorMessage !== '' && (
          <AlertComponent
            alertMsg={errorMessage}
            positioning='mt-44'
          />
        )}
      </View>
    </KeyboardAwareScrollView>
  )

  function getInputValidity(inputType: string) {
    return invalidInputs.includes(inputType)
  }
}