import { View, Keyboard, Platform } from "react-native";
import { useState, useRef } from "react";

//@ts-ignore
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';

export default function AutoExpandingInputComponent({ text, setText, isFocused, setIsFocused, positioning, styles } : {
    text: string,
    setText: React.Dispatch<React.SetStateAction<string>>,
    isFocused: boolean,
    setIsFocused: React.Dispatch<React.SetStateAction<boolean>>
    positioning: string,
    styles: string
}) {
    const [height, setHeight]=useState(35)

    return (
        <View className={`px-4 ${positioning}`}>
            <AutoGrowingTextInput
                onChangeText={(text: string) => {
                    setText(text)
                }}
                onContentSizeChange={(event: any) => {
                    setHeight(event.nativeEvent.contentSize.height);
                }}
                multiline={true}
                value={text}
                style={{                    
                    minHeight: 35,
                    maxHeight: 210,
                    height: Math.min(height, 210),
                    padding: 8,
                    borderWidth: 1,
                    borderColor: isFocused ? 'black' : '#ccc',
                    textAlignVertical: "bottom"
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Chat away..."
                className={`rounded-lg ${styles}`}
            />
        </View>
    )
}