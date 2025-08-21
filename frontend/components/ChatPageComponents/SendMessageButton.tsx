import { TouchableOpacity, View } from 'react-native'

export default function SendMessageButton({
    isChatDisabled,
    callUpdateChat,
}: {
    isChatDisabled: boolean
    callUpdateChat: () => Promise<void>
}) {
    return (
        <TouchableOpacity disabled={isChatDisabled} onPress={callUpdateChat}>
            <View
                className={`bg-black rounded-full p-2 flex justify-center ml-4 items-center ${isChatDisabled ? 'opacity-50' : ''}`}
            ></View>
        </TouchableOpacity>
    )
}
