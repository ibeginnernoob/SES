import { Drawer } from 'react-native-paper';
import { View, Text } from 'react-native';
import { useState } from 'react';
import Modal from "react-native-modal";
import LogoutButton from './LogoutButton';
import { Icon, EditIcon } from './ui/icon';

export default function SideBarComponent({ showSideBar, setShowSideBar, activePage } : {
    showSideBar: boolean
    setShowSideBar: (para: boolean) => void,
    activePage: string
}) {
    return (
        <Modal
        className='mt-0 w-[50%] mx-0'
        isVisible={showSideBar}
        onBackdropPress={() => setShowSideBar(false)}
        swipeDirection="left"
        animationIn={'slideInLeft'}
        animationOut={"slideInLeft"}
        >
            <View className='bg-white h-screen relative'>
                <View className='z-10 mt-32 mx-3'>
                    <View className={`mb-2 pl-3 py-2 rounded-md ${activePage === 'Home' ? "bg-blue-100" : null}`}>
                        <View className={`font-semibold flex flex-row items-center ${activePage === 'Home' ? "text-sky-600" : null}`}>
                            <Icon className='text-sky-600 mr-3' as={EditIcon} size="md" />
                            <Text className={`${activePage === 'Home' ? "text-sky-600" : null}`}>Start New Chat</Text>
                        </View>
                    </View>
                </View>
                <View className='absolute bottom-0 mb-20 w-full flex flex-row justify-center'>
                    <LogoutButton 
                        buttonStyles="py-3 px-10 text-md"
                        textStyles="text-base"
                    />
                </View>
            </View>
        </Modal>
    )
}

{/* <Drawer.Section title="Some title">
    <Drawer.Item
        label="First Item"
        // active={active === 'first'}
        // onPress={() => setActive('first')}
    />
    <Drawer.Item
        label="Second Item"
        // active={active === 'second'}
        // onPress={() => setActive('second')}
    />
</Drawer.Section> */}