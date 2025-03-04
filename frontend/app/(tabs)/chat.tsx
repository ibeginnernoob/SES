import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AutoExpandingInputComponent from "@/components/AutoExpandingInputComponent";
import TopBar from "@/components/TopBar";
import SideBarComponent from "@/components/SideBarComponent";
import SpinnerComponent from "@/components/SpinnerComponent";
import { router } from "expo-router";

import { useState } from "react";
import { useIsAuth } from "@/hooks/useIsAuth";
import PromptResponseWindow from "@/components/PromptResponseWindow";

export default function Chat() {
    const [text, setText]=useState('')
    const [isFocused, setIsFocused]=useState(false)

    const [showSideBar, setShowSideBar]=useState(false)

    const {loading, userId, userEmail}=useIsAuth()

    if(loading) {
        return (
          <SpinnerComponent />
        )
      }
    
      if(userId === null && !loading) {
        router.navigate('/signin')
      }

    return (
        // <TouchableWithoutFeedback onPress={() => {
        //     setIsFocused(false)
        //     Keyboard.dismiss()
        // }} accessible={false}>
        //     <View className="relative h-screen">
        //         <SideBarComponent
        //             showSideBar={showSideBar}
        //             setShowSideBar={setShowSideBar}
        //             activePage='Home'
        //         />
        //         <TopBar
        //             setSideBarVisibility={setShowSideBar}
        //             userEmail={userEmail}
        //             page='chat'
        //         />
        //         <Text>This is the chat page!</Text>
        //         <AutoExpandingInputComponent
        //             text={text}
        //             setText={setText}
        //             isFocused={isFocused}
        //             setIsFocused={setIsFocused}
        //             positioning={`absolute ${isFocused ? 'bottom-[350px]' : 'bottom-20'} w-full`}
        //             styles={""}
        //         />
        //     </View>
        // </TouchableWithoutFeedback>
        <PromptResponseWindow />
    )
}