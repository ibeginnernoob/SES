import { Textarea, TextareaInput } from '@/components/ui/textarea'

export default function TextAreaComponent() {
  return (
    <Textarea
      isReadOnly={false}
      isInvalid={false}
      isDisabled={false}
      className="w-full px-3 py-1 rounded-xl h-48"
    >
      <TextareaInput
        placeholder="Enter symptoms ..."
        style={{ textAlignVertical: 'top' }}
        className="text-base"
      />
    </Textarea>
  )
}
