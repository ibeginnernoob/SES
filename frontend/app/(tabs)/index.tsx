import { Dimensions, StyleSheet } from 'react-native'
import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { router } from 'expo-router'

import DropDownComponent from '@/components/DropDownComponent'
import TextAreaComponent from '@/components/TextAreaComponent'

export default function Home() {
  const [userDetails, setUserDetails] = useState({
    weight: '',
    age: '',
    sex: '',
    comments: '',
  })

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
        <DropDownComponent type="gender" />
        <DropDownComponent type="age" />
        <TextAreaComponent />
      </View>
    </KeyboardAwareScrollView>
  )
}
