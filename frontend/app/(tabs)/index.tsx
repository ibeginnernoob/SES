import '../../gesture-handler';

import { Dimensions, StyleSheet } from 'react-native'
import { useState, useEffect, useCallback } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { router, useFocusEffect } from 'expo-router'

import { useIsAuth } from '@/hooks/useIsAuth'

import DropDownComponent from '@/components/DropDownComponent'
import TextAreaComponent from '@/components/TextAreaComponent'
import TopBar from '@/components/TopBar'
import SpinnerComponent from '@/components/SpinnerComponent'
import SelectOptionComponent from '@/components/SelectOptionComponent'
import SideBarComponent from '@/components/SideBarComponent';
import ButtonComponent from '@/components/ButtonComponent';

export default function Home() {
  const [age, setAge]=useState< string | null >(null)
  const [gender, setGender]=useState< string | null >(null)
  const [weight, setWeight]=useState< string | null >(null)
  const [height, setHeight]=useState< string | null >(null)
  const [symptoms, setSymptoms]=useState< string | null >(null)

  const [showSideBar, setShowSideBar]=useState(false)

  const {loading, userId, userEmail}=useIsAuth()

  useFocusEffect(
    useCallback(() => {
      return () => {
        setShowSideBar(false);
        setAge(null)
        setGender(null)
        setWeight(null)
        setHeight(null)
        setSymptoms(null)
      }
    }, [])
  );

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
        <SideBarComponent
          showSideBar={showSideBar}
          setShowSideBar={setShowSideBar}
          activePage='Home'
        />
        <TopBar
          setSideBarVisibility={setShowSideBar}
          userEmail={userEmail}
        />
        <View className="flex flex-col items-center">
          <Text className='mt-8 mb-1 text-3xl font-bold'>New Chat</Text>
          <Text className='mb-6 text-sm text-gray-500'>Fill this form out to start chatting with our model!</Text>
          <View className='flex flex-row w-full justify-between px-10 mb-8'>
            <View>
              <Text className='mb-2 text-base font-semibold'>Gender</Text>
              <SelectOptionComponent inputValue={gender} setInputValue={setGender} />
            </View>
            <View>
              <Text className='mb-2 text-base font-semibold'>{`Age (Years)`}</Text>
              <DropDownComponent type="age" inputValue={age} setInputValue={setAge} />
            </View>
          </View>
          <View className='flex flex-row w-full justify-between px-10 mb-10'>
            <View>
              <Text className='mb-2 text-base font-semibold'>{`Weight (Kg)`}</Text>
              <DropDownComponent type="weight" inputValue={weight} setInputValue={setWeight} />
            </View>
            <View>
              <Text className='mb-2 text-base font-semibold'>{'Height (cm)'}</Text>
              <DropDownComponent type="height" inputValue={height} setInputValue={setHeight} />
            </View>
          </View>
          <View className='px-10 w-screen'>
            <Text className='mb-2 text-base font-semibold'>Symptoms</Text>
            <TextAreaComponent inputValue={symptoms} setInputValue={setSymptoms} />
          </View>
          <ButtonComponent
            msg='Start chatting!'
            onclick={() => {
              router.navigate('/chat')
            }}
            buttonStyles='mt-16 px-16 h-12 rounded-base'
            textStyles='text-base'
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}