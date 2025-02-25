import { View } from 'react-native'
import { Input, InputField, InputSlot, InputIcon } from '@/components/ui/input'
import { MailIcon, LockIcon } from '@/components/ui/icon'

export default function InputComponent({
  type,
  styles,
  placeholder,
}: {
  type: string
  styles: string
  placeholder: string
}) {
  return (
    <View>
      <Input
        variant="outline"
        size="md"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
        className={`rounded-3xl py-2 ${styles}`}
      >
        {getInputIcon()}
        <InputField placeholder={placeholder} />
      </Input>
    </View>
  )

  function getInputIcon() {
    if (type === 'password') {
      return (
        <InputSlot className="pl-4">
          <InputIcon as={LockIcon} />
        </InputSlot>
      )
    } else if (type === 'email') {
      return (
        <InputSlot className="pl-4">
          <InputIcon as={MailIcon} />
        </InputSlot>
      )
    }
  }
}
