import { TouchableOpacity, View } from "react-native"
import { Icon, ArrowUpIcon } from "../ui/icon"

export default function SendMessageButton({
	isChatDisabled,
	callUpdateChat
} : {
	isChatDisabled: boolean,
	callUpdateChat: () => Promise<void>
}) {
	return (
		<TouchableOpacity
			disabled={isChatDisabled}
			onPress={callUpdateChat}
		>
			<View
				className={`bg-black rounded-full p-2 flex justify-center ml-4 items-center ${isChatDisabled ? 'opacity-50' : ''}`}
			>
				<Icon
					className="text-white"
					as={ArrowUpIcon}
					size="md"
				/>
			</View>
		</TouchableOpacity>
	)
}