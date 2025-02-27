import { View, TouchableOpacity } from "react-native";
import { Image } from "./ui/image";
import { StyleSheet } from "react-native";
import { Avatar, AvatarFallbackText, AvatarImage } from "./ui/avatar";
import { Dispatch, SetStateAction, useState } from "react";
import { Icon, MenuIcon } from "./ui/icon";

export default function TopBar({ setSideBarVisibility } : {
    setSideBarVisibility: Dispatch<SetStateAction<boolean>>
}) {
    return (
        <View>
            <View className="flex flex-row items-center justify-between px-7 mt-16">
                <View className="flex flex-row items-center">
                    <TouchableOpacity
                        className="px-2 py-2 rounded-full flex flex-col justify-center items-center active:bg-sky-200"
                        onPress={() => {
                            setSideBarVisibility(prevState => !prevState)
                        }}
                    >
                        <Icon
                            as={MenuIcon}
                            className="active:opacity-80"
                            size="xl"
                        />
                    </TouchableOpacity>
                    <Image
                        className="ml-4"
                        source={require('../assets/logo.png')}
                        alt='Logo'
                        size='sm'
                    />
                </View>
                <Avatar className="">
                    <AvatarFallbackText>Adheil Gupta</AvatarFallbackText>
                    {/* <AvatarImage
                        source={{
                            uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
                        }}
                    /> */}
                </Avatar>
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