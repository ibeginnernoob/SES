import {
    View,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native'
import { useMemo, useState, useCallback } from 'react'
import { router } from 'expo-router'
import { useFocusEffect } from '@react-navigation/native'

import { useGetChat } from '@/hooks/useGetChat'
import { useIsAuth } from '@/hooks/useIsAuth'
import useChatId from '@/store/chatId'
import useModel from '@/store/modelName'

import PromptResponseWindow from '@/components/PromptResponseWindow'
import TopBar from '@/components/TopBar'
import SideBarComponent from '@/components/SideBarComponent'
import SpinnerComponent from '@/components/SpinnerComponent'
import AutoExpandingInputComponent from '@/components/AutoExpandingInputComponent'
import { updateChat } from '@/utils/chat/updateChat'
import SendMessageButton from '@/components/ChatPageComponents/SendMessageButton'

export default function Chat() {
    const [prompt, setPrompt] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const [height, setHeight] = useState(35)

    const [showSideBar, setShowSideBar] = useState(false)

    const { loading, userId, email } = useIsAuth()
    const { loadChat, chat, setChat } = useGetChat()

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
			setChat: setChat
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
                <TopBar
                    setSideBarVisibility={setShowSideBar}
                    email={email}
                />
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
                        <SendMessageButton
							isChatDisabled={isChatDisabled}
							callUpdateChat={callUpdateChat}
						/>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
