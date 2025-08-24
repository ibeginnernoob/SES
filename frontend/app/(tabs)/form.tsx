import { useState, useCallback, useMemo } from 'react'
import { View, Text } from 'react-native'
import { router } from 'expo-router'
import { useFocusEffect } from '@react-navigation/native'

import { useAuth } from '@/hooks/useAuth'
import useChatId from '@/store/old/chatId'
import useModel from '@/store/old/model'

import DropDownComponent from '@/components/ui/dropdownComponent'
import TextAreaComponent from '@/components/ui/textAreaComponent'
import TopBar from '@/components/ui/navbar'
import SpinnerComponent from '@/components/ui/spinnerComponent'
import SelectOptionComponent from '@/components/ui/selectOptionComponent'
import SideBarComponent from '@/components/ui/sidebar'
import ButtonComponent from '@/components/ui/buttonComponent'
import { createChat } from '@/utils/chat/createChat'

function FormPage() {
    const updateChatId = useChatId((state: any) => state.updateChatId)
    const modelName = useModel((state: any) => state.modelName)

    const [age, setAge] = useState<string | null>(null)
    const [gender, setGender] = useState<string | null>(null)
    const [weight, setWeight] = useState<string | null>(null)
    const [height, setHeight] = useState<string | null>(null)
    const [symptoms, setSymptoms] = useState<string | null>(null)

    const [showSideBar, setShowSideBar] = useState(false)
    const [createChatLoad, setCreateChatLoad] = useState(false)

    const { loading, userId, email } = useAuth()

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

    const callCreateChat = async () => {
        await createChat({
            firebaseId: userId,
            age: age,
            gender: gender,
            height: height,
            weight: weight,
            symptoms: symptoms,
            modelName: modelName,
            updateChatId: updateChatId,
            setCreateChatLoad: setCreateChatLoad,
        })
    }

    const isCreateChatDisabled = useMemo(() => {
        if (
            age === null ||
            gender === null ||
            weight === null ||
            height === null ||
            symptoms === '' ||
            symptoms === null
        ) {
            return true
        }
        return false
    }, [age, gender, weight, height, symptoms])

    if (loading || createChatLoad) {
        return <SpinnerComponent />
    }
    if (userId === 'NA' && !loading) {
        router.navigate('/signin')
    }

    return (
        <View>
            <SideBarComponent
                showSideBar={showSideBar}
                setShowSideBar={setShowSideBar}
                activePage="form"
            />
            <TopBar setSideBarVisibility={setShowSideBar} email={email} />
            <View className="flex flex-col">
                <View className="mx-8 pt-6 pb-3 border-b-[0.5px] border-gray-300">
                    <Text className="text-3xl mb-1 font-bold">Welcome</Text>
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
                            styles={''}
                            inputValue={gender}
                            setInputValue={setGender}
                        />
                    </View>
                    <View className="mt-5">
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
                    <View className="mt-5">
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
                        placeholder=""
                        inputValue={symptoms}
                        setInputValue={setSymptoms}
                    />
                </View>
                <View className="w-screen flex flex-row justify-end mt-10 pr-8 mb-20">
                    <ButtonComponent
                        msg="Create Chat!"
                        onclick={callCreateChat}
                        buttonStyles="w-[120px] h-[45px] rounded-base bg-green-500"
                        textStyles="text-sm"
                        isDisabled={isCreateChatDisabled}
                    />
                </View>
            </View>
        </View>
    )
}

export default FormPage
