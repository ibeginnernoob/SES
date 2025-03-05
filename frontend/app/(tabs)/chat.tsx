import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AutoExpandingInputComponent from "@/components/AutoExpandingInputComponent";
import TopBar from "@/components/TopBar";
import SideBarComponent from "@/components/SideBarComponent";
import SpinnerComponent from "@/components/SpinnerComponent";
import { router } from "expo-router";

import { Fragment, useState } from "react";
import { useIsAuth } from "@/hooks/useIsAuth";
import PromptResponseWindow from "@/components/PromptResponseWindow";

export default function Chat() {
    const [text, setText]=useState('')
    const [isFocused, setIsFocused]=useState(false)
    const [height, setHeight]=useState(35)

    const [showSideBar, setShowSideBar]=useState(false)

    const {loading, userId, userEmail}=useIsAuth()

    if(loading) {
        return (
          <SpinnerComponent />
        )
      }
    
      if(userId === 'NA' && !loading) {
        router.navigate('/signin')
      }

    return (
        <TouchableWithoutFeedback onPress={() => {
          setIsFocused(false)
          Keyboard.dismiss()
          }} accessible={false}>
          <View className="relative h-screen">
            <SideBarComponent
                showSideBar={showSideBar}
                setShowSideBar={setShowSideBar}
                activePage='Home'
            />
            <TopBar
                setSideBarVisibility={setShowSideBar}
                userEmail={userEmail}
                page='chat'
            />              
            <View className="z-0 h-[75%]">
                <PromptResponseWindow />
            </View>
            <View
              className="z-10 bg-white absolute bottom-0 w-full flex-col justify-start pt-4"
              style={{
                height: isFocused ? Math.min(365 + height, 575) : Math.min(80 + height, 290),
              }}
            >
              <AutoExpandingInputComponent
                  height={height}
                  setHeight={setHeight}
                  text={text}
                  setText={setText}
                  isFocused={isFocused}
                  setIsFocused={setIsFocused}
                  positioning={""}
                  styles={"rounded-xl"}
              />
            </View>
        </View>
      </TouchableWithoutFeedback>
    )
}