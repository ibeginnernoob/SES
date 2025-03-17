import { useState, useEffect, useCallback } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { router, useFocusEffect } from 'expo-router'
import ky from 'ky'

import { useIsAuth } from '@/hooks/useIsAuth'
import useChatId from '@/store/chatId'

const BACKEND_URL = 'http://10.0.10.73:3000'
import useStore from '@/store/chatId';

import DropDownComponent from '@/components/DropDownComponent'
import TextAreaComponent from '@/components/TextAreaComponent'
import TopBar from '@/components/TopBar'
import SpinnerComponent from '@/components/SpinnerComponent'
import SelectOptionComponent from '@/components/SelectOptionComponent'
import SideBarComponent from '@/components/SideBarComponent'
import ButtonComponent from '@/components/ButtonComponent'

export default function Home() {
	const updateChatId = useChatId((state: any) => state.updateChatId)

    const [age, setAge] = useState<string | null>(null)
    const [gender, setGender] = useState<string | null>(null)
    const [weight, setWeight] = useState<string | null>(null)
    const [height, setHeight] = useState<string | null>(null)
    const [symptoms, setSymptoms] = useState<string | null>(null)

    const [showSideBar, setShowSideBar] = useState(false)
    const [createChatLoad, setCreateChatLoad] = useState(false)

    const { loading, userId, userEmail } = useIsAuth()

    useFocusEffect(
        useCallback(() => {
            return () => {
                setShowSideBar(false)
                setAge(null)
                setGender(null)
                setWeight(null)
                setHeight(null)
                setSymptoms(null)
            }
        }, []),
    )

    const createChat = async () => {
        try {
            setCreateChatLoad(true)
            const res: any = await ky
                .post(`${BACKEND_URL}/api/v1/user/new-chat/${userId}`, {
                    json: {
                        age: age,
                        gender: gender,
                        height: height,
                        weight: weight,
                        symptoms: symptoms,
                    },
                })
                .json()
            if (res.status === 500) {
                const e = {
                    msg: 'Chat creation failed!',
                }
                throw e
            }
            updateChatId(res.chatId)
            setCreateChatLoad(false)
            router.navigate('/chat')
        } catch (e: any) {
            console.log(e)
			setCreateChatLoad(false)
        }
    }

    if (loading || createChatLoad) {
        return <SpinnerComponent />
    }
    if (userId === 'NA' && !loading) {
        router.navigate('/signin')
    }

    return (
        <KeyboardAwareScrollView>
            <View>
                <SideBarComponent
                    showSideBar={showSideBar}
                    setShowSideBar={setShowSideBar}
                    activePage="Home"
                />
                <TopBar
                    setSideBarVisibility={setShowSideBar}
                    userEmail={userEmail}
                />
                <View className="flex flex-col">
                    <View className='mx-8 pt-6 pb-3 border-b-[0.5px] border-gray-300'>
						<Text className="text-3xl mb-1 font-bold">
							Welcome
						</Text>
						<Text className="text-sm text-gray-500 pl-1">
							Get answers to all your medical queries!
						</Text>
					</View>
                    <View className="mt-5 mx-8">
                        <View>
                            <Text className="mb-0 text-base font-semibold">
                                Gender:
                            </Text>
                            <SelectOptionComponent
								styles={""}
                                inputValue={gender}
                                setInputValue={setGender}
                            />
                        </View>
                        <View className='mt-5'>
                            <Text className="mb-0 text-base font-semibold">{`Age:`}</Text>
                            <DropDownComponent
                                type="age"
                                inputValue={age}
                                setInputValue={setAge}
                            />
                        </View>
                    </View>
                    <View className="mt-5 mx-8">
                        <View>
                            <Text className="mb-0 text-base font-semibold">{`Weight (kg):`}</Text>
                            <DropDownComponent
                                type="weight"
                                inputValue={weight}
                                setInputValue={setWeight}
                            />
                        </View>
                        <View className='mt-5'>
                            <Text className="mb-0 text-base font-semibold">
                                {'Height (cm):'}
                            </Text>
                            <DropDownComponent
                                type="height"
                                inputValue={height}
                                setInputValue={setHeight}
                            />
                        </View>
                    </View>
                    <View className="mx-8 mt-6">
                        <Text className="mb-1 text-base font-semibold">
                            Symptoms:
                        </Text>
                        <TextAreaComponent
							placeholder=''
                            inputValue={symptoms}
                            setInputValue={setSymptoms}
                        />
                    </View>
                    <View className='w-screen flex flex-row justify-end mt-10 pr-8 mb-20'>
						<ButtonComponent
							msg="Create Chat!"
							onclick={() => {
								updateChatId("67cf09901083643c6d71e0d5")
								router.navigate('/chat')
							}}
							buttonStyles="w-[120px] h-[45px] rounded-base bg-green-500"
							textStyles="text-sm"
						/>
					</View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}
