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
        <View>
			<AIModelChooseModal
				showModelSwitchModal={showModelSwitch}
				setShowModalSwitchModal={setModelSwitch}
			/>
            <View className="flex flex-row items-center justify-between px-7 mt-16">
                <View className="flex flex-row items-center">
                    <TouchableOpacity
                        className="px-2 py-2 rounded-full flex flex-col justify-center items-center active:bg-sky-200"
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
                    {/* {page !== 'chat' && (
                        <Image
                            className="ml-4 w-12 h-12"
                            source={require('../assets/logo.png')}
                            alt="Logo"
                        />
                    )} */}					
                </View>
				<TouchableOpacity onPress={() => {
					setModelSwitch(prevState => !prevState)
				}}>
					<View className='flex flex-row items-center py-2 px-2'>
						<Text className='mr-2'>{modelName}</Text>
						<Icon
							as={ChevronDownIcon}
							size='sm'
						/>
					</View>
				</TouchableOpacity>
                <Avatar className="h-10 w-10">
                    <AvatarFallbackText>{userEmail}</AvatarFallbackText>
                </Avatar>
            </View>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    marginTop: 10,
                    borderColor: 'darkgray',
                }}
            />
        </View>
    )
}
