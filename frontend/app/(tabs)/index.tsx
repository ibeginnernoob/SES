import { Dimensions, StyleSheet } from 'react-native'
import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { router } from 'expo-router'

import { useIsAuth } from '@/hooks/useIsAuth'

import DropDownComponent from '@/components/DropDownComponent'
import TextAreaComponent from '@/components/TextAreaComponent'
import LogoutButton from '@/components/LogoutButton'

export default function Home() {
  const [userDetails, setUserDetails] = useState({
    weight: '',
    age: '',
    sex: '',
    comments: '',
  })

  const {loading, userId}=useIsAuth()

  if(loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  if(userId === null && !loading) {
    router.navigate('/signin')
  }

  return (
    <KeyboardAwareScrollView>
      <View className="h-screen px-4 flex flex-col items-center justify-end">
        <TouchableOpacity
          onPress={() => {
            router.navigate('/signin')
          }}
        >
          <Text>Signin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.navigate('/signup')
          }}
        >
          <Text>Signup</Text>
        </TouchableOpacity>
        <LogoutButton />
        <DropDownComponent type="gender" />
        <DropDownComponent type="age" />
        <TextAreaComponent />
      </View>
    </KeyboardAwareScrollView>
  )
}
