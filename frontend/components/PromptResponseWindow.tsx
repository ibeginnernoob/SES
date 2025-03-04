import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { View, Text } from "react-native";

const chat = {
    prompts: [
        {
            id: "some id",
            text: 'What is this?'
        },
        {
            id: "some id",
            text: 'What is this?'
        }
    ],
    responses: [
        {
            id: "some id",
            text: 'This is an apple!'
        },
        {
            id: "some id",
            text: 'This is an apple!'
        }
    ]
}

export default function PromptResponseWindow({ chatId, firebaseId } : {
    chatId?: string,
    firebaseId?: string
}) {

    const getTextArray = () => {
        let i=chat.prompts.length
        const messages = []
        for(let j = 1 ; j <= chat.prompts.length ; j+=1) {
            const message = {
                id: j,
                prompt: chat.prompts[j-1].text,
                response: chat.responses[j-1].text
            }
            messages.push(message)
        }
        return messages
    }

    return (
        <View>
            <KeyboardAwareScrollView>
                <View className="">
                    {getTextArray().map(message => {
                        return (
                            <View key={message.id}>
                                <Text>{message.prompt}</Text>
                                <Text>{message.response}</Text>
                            </View>
                        )
                    })}
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}