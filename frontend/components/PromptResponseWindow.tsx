import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { View, Text } from "react-native";
import { Fragment } from "react";

const chat = {
    prompts: [
        {
            id: "some id",
            text: 'What is this?'
        },
        {
            id: "some id",
            text: 'What is this?'
        },
        {
            id: "some id",
            text: 'What is this?'
        },
        {
            id: "some id",
            text: 'What is this?'
        },
        {
            id: "some id",
            text: 'What is this?'
        },
        {
            id: "some id",
            text: 'What is this?'
        },
        {
            id: "some id",
            text: 'What is this?'
        },
        {
            id: "some id",
            text: 'What is this?'
        },
        {
            id: "some id",
            text: 'What is this?'
        },
        {
            id: "some id",
            text: 'What is this?'
        },
        {
            id: "some id",
            text: 'What is this?'
        },
    ],
    responses: [
        {
            id: "some id",
            text: 'This is an apple!'
        },
        {
            id: "some id",
            text: 'This is an apple!'
        },
        {
            id: "some id",
            text: 'This is an apple!'
        },
        {
            id: "some id",
            text: 'This is an apple!'
        },
        {
            id: "some id",
            text: 'This is an apple!'
        },
        {
            id: "some id",
            text: 'This is an apple!'
        },
        {
            id: "some id",
            text: 'This is an apple!'
        },
        {
            id: "some id",
            text: 'This is an apple!'
        },
        {
            id: "some id",
            text: 'This is an apple!'
        },
        {
            id: "some id",
            text: 'This is an apple!'
        },
        {
            id: "some id",
            text: 'This is an apple!'
        },
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
        <View className="py-4 w-screen h-full">
            <KeyboardAwareScrollView>
                <View className="flex flex-col items-start">
                    {getTextArray().map(message => {
                        return (
                            <Fragment key={message.id}>
                                <View className="bg-blue-200 px-4 py-2 rounded-md max-w-[75%] self-end">
                                    <Text>{message.prompt}</Text>
                                </View>
                                <View className="bg-green-200 px-4 py-2 rounded-md max-w-[75%] self-start">
                                    <Text>{message.response}</Text>
                                </View>
                            </Fragment>
                        )
                    })}
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}