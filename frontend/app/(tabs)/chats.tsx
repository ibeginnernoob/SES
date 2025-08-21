import { View, Text } from 'react-native'
import { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'

import { useIsAuth } from '@/hooks/useAuth'
import { useGetChats } from '@/hooks/useChats'
import useChatId from '@/store/chatId'

import TopBar from '@/components/ui/navbar'
import SpinnerComponent from '@/components/ui/spinnerComponent'
import SideBarComponent from '@/components/ui/sidebar'
import ChatsWindow from '@/components/ui/chatsWindow'

export default function Chats() {
    const updateChatId = useChatId((state: any) => state.updateChatId)

    const [showSideBar, setShowSideBar] = useState(false)

    const { loading, userId, email } = useIsAuth()
    const { loadChats, chats } = useGetChats(userId)

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
            <TopBar
                setSideBarVisibility={setShowSideBar}
                email={email}
            />
            <View className="mt-5">
                <Text className="inline-block text-center py-4 border-b-[0.2px] text-5xl">
                    Chats
                </Text>
            </View>
            {chats && chats.length > 0 && (
                <View className="flex-1 mb-20">
                    <ChatsWindow 
						chats={chats}
						updateChatId={updateChatId}
					/>
                </View>
            )}
        </View>
    )
}
