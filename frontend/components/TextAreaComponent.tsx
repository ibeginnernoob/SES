import { Textarea, TextareaInput } from "@/components/ui/textarea";
	
export default function TextAreaComponent() {
  return (
    <Textarea isReadOnly={false} isInvalid={false} isDisabled={false} className="w-96">
      <TextareaInput
        placeholder="Your text goes here..."
        style={{ textAlignVertical: "top" }}
        className="text-base"
      />
    </Textarea>
  );
}