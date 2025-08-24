import { View, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { useMemo, useState, useCallback } from 'react'
import { router } from 'expo-router'
import { useFocusEffect } from '@react-navigation/native'

import { useChat } from '@/hooks/useChat'
import { useAuth } from '@/hooks/useAuth'
import useChatId from '@/store/old/chatId'
import useModel from '@/store/old/model'

import PromptResponseWindow from '@/components/ui/promptResponseWindow'
import TopBar from '@/components/ui/navbar'
import SideBarComponent from '@/components/ui/sidebar'
import SpinnerComponent from '@/components/ui/spinnerComponent'
import AutoExpandingInputComponent from '@/components/ui/autoExpandingInputComponent'
import { updateChat } from '@/utils/chat/updateChat'

function Chat() {
    const [prompt, setPrompt] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const [height, setHeight] = useState(35)

    const [showSideBar, setShowSideBar] = useState(false)

    const { loading, userId, email } = useAuth()
    const { loadChat, chat, setChat } = useChat()

    const chatId = useChatId((state: any) => state.chatId)
    const modelName = useModel((state: any) => state.modelName)

    useFocusEffect(
        useCallback(() => {
            return () => {
                setShowSideBar(false)
                setIsFocused(false)
            }
        }, []),
    )

    const isChatDisabled = useMemo(() => {
        if (prompt === '') {
            return true
        }
        return false
    }, [prompt])

    if (loading || loadChat) {
        return <SpinnerComponent />
    }

    if (userId === 'NA' && !loading) {
        router.navigate('/signin')
    }

    if (chat && chat.length === 0 && !loadChat) {
        router.navigate('/')
    }

    const callUpdateChat = async () => {
        await updateChat({
            prompt: prompt,
            chatId: chatId,
            modelName: modelName,
            setPrompt: setPrompt,
            setChat: setChat,
        })
    }

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                setIsFocused(false)
                Keyboard.dismiss()
            }}
            accessible={false}
        >
            <View className="relative h-screen bg-white">
                <SideBarComponent
                    showSideBar={showSideBar}
                    setShowSideBar={setShowSideBar}
                    activePage=""
                />
                <TopBar setSideBarVisibility={setShowSideBar} email={email} />
                <View className="z-0 h-[80%]">
                    <PromptResponseWindow chat={chat} />
                </View>
                <View
                    className="z-10 bg-white absolute bottom-0 w-full flex-col justify-start pt-3 border-t-[0.2px] border-gray-300"
                    style={{
                        height: isFocused
                            ? Math.min(360 + height, 575)
                            : Math.min(50 + height, 290),
                    }}
                >
                    <View className="flex flex-row justify-between items-end mx-6">
                        <AutoExpandingInputComponent
                            height={height}
                            setHeight={setHeight}
                            text={prompt}
                            setText={setPrompt}
                            isFocused={isFocused}
                            setIsFocused={setIsFocused}
                            positioning={'flex-1'}
                            styles={'rounded-xl'}
                        />
                        {/* <SendMessageButton
							isChatDisabled={isChatDisabled}
							callUpdateChat={callUpdateChat}
						/> */}
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Chat
