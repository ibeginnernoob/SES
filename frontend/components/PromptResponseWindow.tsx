import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { View, Text } from 'react-native'
import { Image } from './ui/image'
import { Fragment } from 'react'

export default function PromptResponseWindow({
    chatId,
    firebaseId,
	chat
}: {
    chatId?: string
    firebaseId?: string
	chat: any
}) {
    const getTextArray = () => {
		if (!chat || chat.length === 0 || !chat[0].prompts || !chat[0].responses) {
            return [];
        }

        let i = chat[0].prompts.length
        const messages = []
        for (let j = 1; j <= chat[0].prompts.length; j += 1) {
            const message = {
                id: j,
                prompt: chat[0].prompts[j - 1].text,
                response: chat[0].responses[j - 1].text,
            }
            messages.push(message)
        }
        return messages
    }

    // return (
    //     <View className="bg-white w-full h-full">
    //         <KeyboardAwareScrollView scrollEnabled={true}>
    //             <View className="flex flex-col items-start bg-white">
    //                 {getTextArray().map((message) => {
    //                     return (
    //                         <Fragment key={message.id}>
    //                             <View className="bg-blue-200 px-4 py-2 rounded-xl max-w-[75%] self-end mr-5 my-4">
    //                                 <Text>{message.prompt}</Text>
    //                             </View>
    //                             <View className="flex flex-row items-start my-4 w-screen mx-4">
	// 								<View className='flex justify-center items-center h-10 w-10 border-[0.25px] rounded-full mr-4'>
	// 									<Image
	// 										className="h-6 w-6 p-2"
	// 										source={require('../assets/chatgpt-logo.svg.png')}
	// 										alt="Logo"
	// 										size="sm"
	// 									/>
	// 								</View>
    //                                 <View className='max-w-[75%]'>
	// 									<Text>{message.response}</Text>
	// 								</View>
    //                             </View>
    //                         </Fragment>
    //                     )
    //                 })}
    //             </View>
    //         </KeyboardAwareScrollView>
    //     </View>
    // )
	return (
		<View className="bg-white w-screen h-full">
			<KeyboardAwareScrollView
				contentContainerStyle={{ flexGrow: 1 }}
				scrollEnabled={true}
			>
				<View className="flex flex-col items-start bg-white">
					{getTextArray().map((message) => (
						<Fragment key={message.id}>
							<View className="bg-blue-200 px-4 py-2 rounded-xl max-w-[75%] self-end mr-5 my-4">
								<Text>{message.prompt}</Text>
							</View>
							<View className="flex flex-row items-start my-4 w-full mx-4">
								<View className="flex justify-center items-center h-10 w-10 border-[0.25px] rounded-full mr-4">
									<Image
										className="h-6 w-6 p-2"
										source={require('../assets/chatgpt-logo.svg.png')}
										alt="Logo"
										size="sm"
									/>
								</View>
								<View className="max-w-[75%]" pointerEvents="box-none">
									<Text>{message.response}</Text>
								</View>
							</View>
						</Fragment>
					))}
				</View>
			</KeyboardAwareScrollView>
		</View>
	);
}

