import { Textarea, TextareaInput } from '@/components/ui/textarea'

export default function TextAreaComponent({
    inputValue,
    setInputValue,
}: {
    inputValue: string | null
    setInputValue: (para: string) => void
}) {
    return (
        <Textarea
            isReadOnly={false}
            isInvalid={false}
            isDisabled={false}
            className="w-full px-1 rounded-lg h-52"
        >
            <TextareaInput
                placeholder="Enter symptoms ..."
                style={{ textAlignVertical: 'top' }}
                className="text-[13px]"
                onChangeText={(text) => {
                    setInputValue(text)
                }}
            />
        </Textarea>
    )
}
