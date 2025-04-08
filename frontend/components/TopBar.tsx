import { View, StyleSheet} from 'react-native'
import { Avatar, AvatarFallbackText, AvatarImage } from './ui/avatar'
import { Dispatch, SetStateAction, useState } from 'react'

import LLMChooserModal from './TopBarComponents/LLMChooserModal'
import ShowSideBarButton from './TopBarComponents/ShowSideBarButton'
import LLMChooserButton from './TopBarComponents/LLMChooserButton'

export default function TopBar({
    setSideBarVisibility,
    email
}: {
    setSideBarVisibility: Dispatch<SetStateAction<boolean>>
    email: string
}) {
    const [showModelSwitch, setModelSwitch] = useState(false)

    return (
        <View>
            <LLMChooserModal
                showModelSwitchModal={showModelSwitch}
                setShowModalSwitchModal={setModelSwitch}
            />
            <View className="flex flex-row items-center justify-between px-7 mt-16">
                <ShowSideBarButton setSideBarVisibility={setSideBarVisibility} />
                <LLMChooserButton setModelSwitch={setModelSwitch} />
                <Avatar className="h-10 w-10">
                    <AvatarFallbackText>{email}</AvatarFallbackText>
                </Avatar>
            </View>
            <View style={styles.bottomBorder} />
        </View>
    )
}

const styles = StyleSheet.create({
	bottomBorder: {
		borderBottomColor: 'black',
		borderBottomWidth: StyleSheet.hairlineWidth,
		marginTop: 10,
		borderColor: 'darkgray',
	}
})