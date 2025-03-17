import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { useState, useCallback } from "react";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

import { useIsAuth } from "@/hooks/useIsAuth";
import { useGetChats } from "@/hooks/useGetChats";
import useChatId from "@/store/chatId";

import TopBar from "@/components/TopBar";
import SpinnerComponent from "@/components/SpinnerComponent";
import SideBarComponent from "@/components/SideBarComponent";

export default function Chats() {
	const updateChatId = useChatId((state: any) => state.updateChatId)

	const [showSideBar, setShowSideBar] = useState(false)

	const { loading, userId, userEmail } = useIsAuth()
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
				activePage="Chats"
			/>
			<TopBar
				setSideBarVisibility={setShowSideBar}
				userEmail={userEmail}			
			/>
			<View className="mt-5">
				<Text className="inline-block text-center py-4 border-b-[0.2px] text-5xl">Chats</Text>
			</View>
			{(chats && chats.length > 0) && <View className="flex-1 mb-20">
				<ScrollView>
					<View className="px-8">
						{chats.map((chat: {
							_id: string
							title: string
						}) => {
							return (						
								<TouchableOpacity key={chat._id} onPress={() => {
									updateChatId(chat._id)
									router.navigate('/chat')
								}}>
									<View className="my-4 py-2 px-4 rounded-2xl border-[1px] border-solid">
										<Text className="text-lg">{chat.title}</Text>
									</View>
								</TouchableOpacity>
							)
						})}
					</View>
				</ScrollView>
			</View>}
		</View>
	)
}