import { View, Text } from "react-native"
import { router } from "expo-router";

import InputComponent from "@/components/InputComponent"
import ButtonComponent from "@/components/ButtonComponent"

export default function Signin(){
    return(
        <View className="h-screen w-screen px-8 flex flex-col justify-center">
            <View className="flex items-center">
                <Text className="text-4xl font-semibold">Sign Up With Email</Text>
                <Text className="text-gray-500 mt-1 text-base">Already have an account? <Text className="underline" onPress={()=>{
                    router.navigate('/signin')
                }}>Sign In!</Text></Text>
            </View>
            <View>
                <InputComponent styles="py-3 h-auto mt-4 mb-3" placeholder="Email" type="email" />
            </View>
            <View>
                <InputComponent styles="py-3 h-auto mt-3 mb-3" placeholder="Password" type="password" />
            </View>
            <View>
                <InputComponent styles="py-3 h-auto mt-3 mb-8" placeholder="Confirm Password" type="password" />
            </View>
            <ButtonComponent styles="rounded-2xl py-3 h-auto" msg="Get Started" />
        </View>
    )
}