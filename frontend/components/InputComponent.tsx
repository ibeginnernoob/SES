import { View } from 'react-native'
import { useState } from 'react'
import { Input, InputField, InputSlot, InputIcon } from '@/components/ui/input'
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon } from '@/components/ui/icon'

export default function InputComponent({
    type,
    styles,
    placeholder,
    setValue,
    isInvalid,
}: {
    type: string
    styles: string
    placeholder: string
    setValue: (parameter: string) => void
    isInvalid: boolean
}) {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <View>
            <Input
                variant="outline"
                size="md"
                isDisabled={false}
                isInvalid={isInvalid}
                isReadOnly={false}
                className={`rounded-3xl py-2 ${styles}`}
            >
                {getInputIcon()}
                <InputField
                    type={`${type === 'password' && !showPassword ? 'password' : 'text'}`}
                    keyboardType={`${type === 'email' ? 'email-address' : 'default'}`}
                    placeholder={placeholder}
                    onChangeText={(text) => {
                        setValue(text)
                    }}
                />
                {getShowPasswordIcon()}
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

    function handleShowPasswordState() {
        setShowPassword((prevState) => !prevState)
    }

    function getShowPasswordIcon() {
        if (type === 'password' && !showPassword) {
            return (
                <InputSlot className="pr-6" onPress={handleShowPasswordState}>
                    <InputIcon as={EyeOffIcon} />
                </InputSlot>
            )
        } else if (type === 'password' && showPassword) {
            return (
                <InputSlot className="pr-6" onPress={handleShowPasswordState}>
                    <InputIcon as={EyeIcon} />
                </InputSlot>
            )
        }
    }
}
