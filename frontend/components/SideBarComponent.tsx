import { Drawer } from 'react-native-paper'
import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import { useState } from 'react'
import Modal from 'react-native-modal'
import LogoutButton from './LogoutButton'
import { Icon, EditIcon, MessageCircleIcon } from './ui/icon'
import { router } from 'expo-router'


export default function SideBarComponent({
    showSideBar,
    setShowSideBar,
    activePage,
}: {
    showSideBar: boolean
    setShowSideBar: (para: boolean) => void
    activePage: string
}) {
    return (
		<Modal
			style={{margin: 0, width: '70%'}}
			isVisible={showSideBar}
			onBackdropPress={() => setShowSideBar(false)}
			swipeDirection="left"
			animationIn={'slideInLeft'}
			animationOut={'slideOutLeft'}
        >
            <View className="bg-white flex flex-col left-0 h-screen fixed top-0 bottom-0">
                <View className="z-10 mt-32 mx-3">
					<TouchableOpacity onPress={() => {
						router.navigate('/')
					}}>
						<View
							className={`mb-2 pl-4 py-2 rounded-md ${activePage === 'Home' ? 'bg-blue-100' : null}`}
						>
							<View
								className={`font-semibold flex flex-row items-center`}
							>
								<Icon
									className={`mr-3 ${activePage === 'Home' ? 'text-sky-600' : null}`}
									as={EditIcon}
									size="md"
								/>
								<Text
									className={`${activePage === 'Home' ? 'text-sky-600' : null}`}
								>
									Start New Chat
								</Text>
							</View>
						</View>
					</TouchableOpacity>
                    <TouchableOpacity onPress={() => {
						router.navigate('/chats')
					}}>
						<View
							className={`mb-2 pl-4 py-2 rounded-md ${activePage === 'Chats' ? 'bg-blue-100' : null}`}
						>
							<View
								className={`font-semibold flex flex-row items-center`}
							>
								<Icon
									className={`mr-3 ${activePage === 'Chats' ? 'text-sky-600' : null}`}
									as={MessageCircleIcon}
									size="md"
								/>
								<Text
									className={`${activePage === 'Chats' ? 'text-sky-600' : null}`}
								>
									Your Chats
								</Text>
							</View>
						</View>
					</TouchableOpacity>
                </View>
                <View className="absolute bottom-20 w-full flex flex-row justify-center">
                    <LogoutButton
						buttonStyles={{ paddingVertical: 12, paddingHorizontal: 40, borderRadius: 8, width: '100%', backgroundColor: 'white', borderWidth: 1 }}
						textStyles={{ fontSize: 16, color: 'black' }}
                    />
                </View>
            </View>
        </Modal>
    )
}