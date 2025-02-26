import { Dimensions, StyleSheet } from 'react-native'
import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { router } from 'expo-router'

import { useIsAuth } from '@/hooks/useIsAuth'

import DropDownComponent from '@/components/DropDownComponent'
import TextAreaComponent from '@/components/TextAreaComponent'
import TopBar from '@/components/TopBar'
import SpinnerComponent from '@/components/SpinnerComponent'

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
      <SpinnerComponent />
    )
  }

  if(userId === null && !loading) {
    router.navigate('/signin')
  }

  return (
    <KeyboardAwareScrollView>
      <View>
        <TopBar />
        {/* <View className="h-screen px-4 flex flex-col items-center justify-end">
          <DropDownComponent type="gender" />
          <DropDownComponent type="age" />
          <TextAreaComponent />
        </View> */}
      </View>
    </KeyboardAwareScrollView>
  )
}
