import { View, TouchableOpacity } from 'react-native'
import { Dispatch, SetStateAction } from 'react'

export default function ShowSideBarButton({
    setSideBarVisibility,
}: {
    setSideBarVisibility: Dispatch<SetStateAction<boolean>>
}) {
    return (
        <View className="flex flex-row items-center">
            <TouchableOpacity
                className="px-2 py-2 rounded-full flex flex-col justify-center items-center active:bg-sky-200"
                onPress={() => {
                    setSideBarVisibility((prevState) => !prevState)
                }}
            ></TouchableOpacity>
        </View>
    )
}
