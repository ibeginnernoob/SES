import { Textarea, TextareaInput } from '@/components/ui/textarea'
import { View } from 'react-native'

export default function TextAreaComponent() {
  return (
    <Textarea
      isReadOnly={false}
      isInvalid={false}
      isDisabled={false}
      className="w-full px-3 rounded-3xl h-10 max-h-40"
    >
      <TextareaInput
        placeholder="Your text goes here..."
        style={{ textAlignVertical: 'top' }}
        className="text-base"
      />
    </Textarea>
  )
}
