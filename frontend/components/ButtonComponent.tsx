import { View } from 'react-native'
import { Button, ButtonText } from '@/components/ui/button'

export default function ButtonComponent({
    msg,
    buttonStyles,
    textStyles,
    onclick,
}: {
    msg: string
    buttonStyles?: string
    textStyles?: string
    onclick: () => void
}) {
    return (
        <View>
            <Button
                size="md"
                variant="solid"
                action="primary"
                className={`${buttonStyles}`}
                onPress={onclick}
            >
                <ButtonText className={`${textStyles}`}>{msg}</ButtonText>
            </Button>
        </View>
    )
}
