import { View, Text } from 'react-native'
import { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'

import { useAuth } from '@/hooks/useAuth'
import { useChats } from '@/hooks/useChats'
import getChatId from '@/store/chatId'

import TopBar from '@/components/ui/navbar'
import SpinnerComponent from '@/components/ui/spinnerComponent'
import SideBarComponent from '@/components/ui/sidebar'
import ChatsWindow from '@/components/ui/chatsWindow'

function Chats() {
    const updateChatId = getChatId((state: any) => state.updateChatId)

    const [showSideBar, setShowSideBar] = useState(false)

    const { loading, userId, email } = useAuth()
    const { loadChats, chats } = useChats(userId)

    useFocusEffect(
        useCallback(() => {
            return () => {
                setShowSideBar(false)
            }
        }, []),
    )

    if (loading || loadChats) {
        return <SpinnerComponent />
    }

    return (
        <View className="flex flex-col w-full flex-1">
            <SideBarComponent
                showSideBar={showSideBar}
                setShowSideBar={setShowSideBar}
                activePage="chats"
            />
            <TopBar setSideBarVisibility={setShowSideBar} email={email} />
            <View className="mt-5">
                <Text className="inline-block text-center py-4 border-b-[0.2px] text-5xl">
                    Chats
                </Text>
            </View>
            {chats && chats.length > 0 && (
                <View className="flex-1 mb-20">
                    <ChatsWindow chats={chats} updateChatId={updateChatId} />
                </View>
            )}
        </View>
    )
}

export default Chats
