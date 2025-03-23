import { ScrollView, View, TouchableOpacity, Text } from "react-native";
import { router } from "expo-router";

export default function ChatsWindow({ chats, updateChatId } : {
	chats: any,
	updateChatId: any
}) {
	return (
		<ScrollView>
			<View className="px-8">
				{chats.map(
					(chat: { _id: string; title: string }) => {
						return (
							<TouchableOpacity
								key={chat._id}
								onPress={() => {
									updateChatId(chat._id)
									router.navigate('/chat')
								}}
							>
								<View className="my-4 py-2 px-4 rounded-2xl border-[1px] border-solid">
									<Text className="text-lg">
										{chat.title}
									</Text>
								</View>
							</TouchableOpacity>
						)
					},
				)}
			</View>
		</ScrollView>
	)
}