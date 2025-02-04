import { StyleSheet } from "react-native";
import { useState } from "react";
import { View, Text, TextInput } from "react-native";

import ActionSheetComponent from "@/components/ActionSheet";
import DropDownComponent from "@/components/DropDownComponent";
import TextAreaComponent from "@/components/TextAreaComponent";

export default function Main(){

  const [userDetails,setUserDetails]=useState({
    weight:'',
    age:'',
    sex:'',
    comments:''
  })

  return(
    <View className="h-screen flex flex-col items-center justify-end">
      <DropDownComponent type='gender' />
      <DropDownComponent type='age' />
      <TextAreaComponent />
    </View>
  )
}