import { View } from 'react-native'
import { Button, ButtonText } from '@/components/ui/button'

export default function ButtonComponent({
  msg,
  styles,
  onclick,
}: {
  msg: string
  styles: string
  onclick: () => void
}) {
  return (
    <View>
      <Button
        size="md"
        variant="solid"
        action="primary"
        className={`${styles}`}
        onPress={() => {}}
      >
        <ButtonText>{msg}</ButtonText>
      </Button>
    </View>
  )
}
