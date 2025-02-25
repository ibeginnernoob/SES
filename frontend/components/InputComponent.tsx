import { View } from 'react-native'
import { Input, InputField, InputSlot, InputIcon } from '@/components/ui/input'
import { MailIcon, LockIcon } from '@/components/ui/icon'

export default function InputComponent({
  type,
  styles,
  placeholder,
  setValue
}: {
  type: string
  styles: string
  placeholder: string,
  setValue: (parameter: string) => void
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
        <InputField placeholder={placeholder} onChangeText={(text)=>{
          setValue(text)
        }} />
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
