import { View } from "react-native";
import { Button, ButtonText } from "@/components/ui/button"

export default function ButtonComponent({msg,styles}:{
    msg:string,
    styles:string
}){
    return(
        <View>
            <Button size="md" variant="solid" action="primary" className={`${styles}`}>
                <ButtonText>{msg}</ButtonText>
            </Button>
        </View>
    )
}