import { TouchableOpacity, View, Text } from "react-native"
import { Dispatch, SetStateAction } from "react"

import useModel from "@/store/old/model"

export default function LLMChooserButton({ setModelSwitch } : {
	setModelSwitch: Dispatch<SetStateAction<boolean>>
}) {
	const modelName = useModel((state: any) => state.modelName)

	return (
		<TouchableOpacity
			onPress={() => {
				setModelSwitch((prevState) => !prevState)
			}}
		>
			<View className="flex flex-row items-center py-2 px-2">
				<Text className="mr-2">{modelName}</Text>
			</View>
		</TouchableOpacity>
	)
}