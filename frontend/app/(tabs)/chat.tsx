import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native'
import { Fragment, useEffect, useMemo, useState, useCallback } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { router} from 'expo-router'
import { useFocusEffect } from '@react-navigation/native'
import { Icon, ArrowUpIcon } from '@/components/ui/icon'


import { useGetChat } from '@/hooks/useGetChat'
import { useIsAuth } from '@/hooks/useIsAuth'
import useChatId from '@/store/chatId'

import PromptResponseWindow from '@/components/PromptResponseWindow'
import TopBar from '@/components/TopBar'
import SideBarComponent from '@/components/SideBarComponent'
import SpinnerComponent from '@/components/SpinnerComponent'
import AutoExpandingInputComponent from '@/components/AutoExpandingInputComponent'
import ky from 'ky'

const BACKEND_URL = 'http://10.0.10.73:3000'

export default function Chat() {
    const [text, setText] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const [height, setHeight] = useState(35)

    const [showSideBar, setShowSideBar] = useState(false)

    const { loading, userId, userEmail } = useIsAuth()
    const { loadChat, chat, setChat } = useGetChat()

	const chatId = useChatId((state: any) => state.chatId)

	useFocusEffect(
		useCallback(() => {
			return () => {
				setShowSideBar(false)
				setIsFocused(false)
			}
		}, []),
	)

	const isChatDisabled = useMemo(() => {
		if (text === '') {
			return true
		}
		return false
	}, [text])

    if (loading || loadChat) {
        return <SpinnerComponent />
    }

    if (userId === 'NA' && !loading) {
        router.navigate('/signin')
    }

	if ( chat && chat.length === 0 && !loadChat) {
		router.navigate('/')
	}

	const updateChat = async () => {
		const prompt = text;
		console.log(chat)
		try {
			setChat((prevState: any) => {
				return [
					{
						...prevState[0],
						prompts: [...prevState[0].prompts, {					
							text: prompt
						}],
						responses: [...prevState[0].responses, {					
							text: ''
						}]
					}
				]
			})
			setText('')
			const res: any = await ky.post(`${BACKEND_URL}/api/v1/user/chat/${chatId}`,{
				json: {
					prompt: prompt
				}
			}	
			).json()
			setChat((prevState: any) => {
				return [
					{
						...prevState[0],
						responses: prevState[0].responses.map((responseBody: any, index: number) => {
							if (index === prevState[0].responses.length - 1) {
								return {
									text: res.response
								}
							}
							return responseBody
						})						
					}
				]
			})
		} catch (e: any) {
			console.log(e)
			setChat((prevState: any) => {
				return [
					{
						...prevState[0],
						prompts: prevState[0].prompts.slice(0, -1),
						responses: prevState[0].responses.slice(0, -1)						
					}
				]
			})
			setText(prompt)
		}
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
                    userEmail={userEmail}
                    page="chat"
                />
                <View className="z-0 h-[80%]">
                    <PromptResponseWindow chat={chat} />
                </View>
                <View
                    className="z-10 bg-white absolute bottom-0 w-full flex-col justify-start pt-3 border-t-[0.2px] border-gray-300"
                    style={{
                        height: isFocused
						? Math.min(360 + height, 575)
						: Math.min(50 + height, 290)
                    }}
                >
                    <View className='flex flex-row justify-between items-end mx-6'>
						<AutoExpandingInputComponent
							height={height}
							setHeight={setHeight}
							text={text}
							setText={setText}
							isFocused={isFocused}
							setIsFocused={setIsFocused}
							positioning={'flex-1'}
							styles={'rounded-xl'}
						/>
						<TouchableOpacity
							disabled={isChatDisabled}
							onPress={updateChat}
						>
							<View className={`bg-black rounded-full p-2 flex justify-center ml-4 items-center ${isChatDisabled ? 'opacity-50' : ''}`}>
								<Icon
									className='text-white'
									as={ArrowUpIcon}
									size='md'
								/>
							</View>
						</TouchableOpacity>
					</View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
