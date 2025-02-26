import { View } from "react-native";
import { Image } from "./ui/image";
import { StyleSheet } from "react-native";
import { Avatar, AvatarFallbackText, AvatarImage } from "./ui/avatar";

import LogoutButton from "./LogoutButton";

export default function TopBar() {
    return (
        <View>
            <View className="flex flex-row items-center justify-between px-5 mt-16">
                <Image
                    source={require('../assets/logo.png')}
                    alt='Logo'
                    size='sm'
                />
                <View className="flex flex-row items-center">
                    <Avatar className="mr-5">
                        <AvatarFallbackText>Adheil Gupta</AvatarFallbackText>
                        {/* <AvatarImage
                            source={{
                                uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
                            }}
                        /> */}
                    </Avatar>
                    <LogoutButton 
                        buttonStyles="py-2 px-4 text-md"
                        textStyles="text-sm"
                    />
                </View>
                
            </View>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    marginTop: 10,
                    borderColor: 'darkgray'
                }}
            />
        </View>
    )
}