import { View, TouchableOpacity, Text } from 'react-native'
import { Image } from './ui/image'
import { StyleSheet } from 'react-native'
import { Avatar, AvatarFallbackText, AvatarImage } from './ui/avatar'
import { Dispatch, SetStateAction, useState } from 'react'
import { ChevronDownIcon, Icon, MenuIcon } from './ui/icon'
import AIModelChooseModal from './AIModelChooseModal'
import useModel from '@/store/model'

export default function TopBar({
    setSideBarVisibility,
    userEmail,
    page,
}: {
    setSideBarVisibility: Dispatch<SetStateAction<boolean>>
    userEmail: string
    page?: string
}) {
    const [showModelSwitch, setModelSwitch] = useState(false)

    const modelName = useModel((state: any) => state.modelName)

    return (
        <View className="w-full bg-white shadow-md py-4 px-6 absolute top-0 z-10">
            <AIModelChooseModal
                showModelSwitchModal={showModelSwitch}
                setShowModalSwitchModal={setModelSwitch}
            />
            <View className="flex flex-row items-center justify-between">
                <TouchableOpacity
                    className="px-3 py-2 rounded-full active:bg-sky-200"
                    onPress={() => {
                        setSideBarVisibility((prevState) => !prevState)
                    }}
                >
                    <Icon
                        as={MenuIcon}
                        className="active:opacity-80"
                        size="xl"
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setModelSwitch(prevState => !prevState)
                }}>
                    <View className='flex flex-row items-center py-2 px-4 absolut top-14 bg-gray-100 rounded-lg'>
                        <Text className='mr-2 font-semibold text-lg'>{modelName}</Text>
                        <Icon
                            as={ChevronDownIcon}
                            size='sm'
                        />
                    </View>
                </TouchableOpacity>
                <Avatar className="h-10 w-10 border-2 border-gray-300">
                    <AvatarFallbackText>{userEmail}</AvatarFallbackText>
                </Avatar>
            </View>
            <View
                style={{
                    borderBottomColor: 'darkgray',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    marginTop: 14,
                }}
            />
        </View>
    )
}
