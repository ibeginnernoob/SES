import { Alert, AlertText, AlertIcon } from "@/components/ui/alert";
import { InfoIcon } from "@/components/ui/icon";
import { View } from "react-native";
	
export default function AlertComponent({ alertMsg, positioning } : {
    alertMsg: string,
    positioning?: string
}) {
  return (
    <View className={`absolute top-0 w-screen flex flex-row justify-center ${positioning}`}>
        <Alert action="muted" variant="solid" className="w-[60%] px-12 flex flex-row justify-center items-center bg-red-600">
            <AlertIcon as={InfoIcon} size="sm" className="text-white mr-2" />
            <AlertText className="text-white">
            {alertMsg}
            </AlertText>
        </Alert>
    </View>
  );
}