import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { View, Text, ScrollView, Animated } from 'react-native'
import { useRef, useEffect } from 'react'
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
	const scrollViewRef = useRef<ScrollView>(null);

	const opacity = useRef(new Animated.Value(0)).current;
	useEffect(() => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }),
				Animated.timing(opacity, { toValue: 0, duration: 800, useNativeDriver: true }),
			])
		).start();
	}, []);


	useEffect(() => {
		scrollViewRef.current?.scrollToEnd({ animated: true });
	}, [chat]);

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
				responseGeneratedBy: chat[0].responses[j - 1].generatedBy
            }
            messages.push(message)
        }
        return messages
    }

	return (
		<ScrollView ref={scrollViewRef}>
			<View className="bg-white w-screen h-full">
				<View className="flex flex-col items-start bg-white">
					{getTextArray().map((message) => (
						<Fragment key={message.id}>
							<View className="bg-blue-200 px-4 py-2 rounded-xl max-w-[75%] self-end mr-5 my-4">
								<Text>{message.prompt}</Text>
							</View>
							<View className="flex flex-row items-start my-4 w-full mx-4">
								<View className="flex justify-center items-center h-10 w-10 border-[0.25px] rounded-full mr-4">
									{/* seperate for ios and android */}
									{
										message.responseGeneratedBy === 'ChatGPT' && (
											<Image									
												className="h-8 w-8 p-2"
												source={require('../assets/model-icons/chatgpt-logo.svg.png')}
												alt="Logo"
												size="sm"
											/>
										)
									}
									{
										message.responseGeneratedBy === 'Claude' && (
											<Image																					
												className="h-8 w-8 p-1"
												source={require('../assets/model-icons/claude-logo.png')}
												alt="Logo"
												size="sm"
											/>
										)
									}
									{
										message.responseGeneratedBy === 'Gemini' && (
											<Image																					
												className="h-9 w-9 p-1"
												source={require('../assets/model-icons/gemini-logo.png')}
												alt="Logo"
												size="sm"
											/>
										)
									}
									{/* <Image									
										className="h-8 w-8 p-2"
										source={require('../assets/model-icons/chatgpt-logo.svg.png')}
										// className="h-8 w-8 p-1"
										// source={require('../assets/model-icons/claude-logo.png')}
										// className="h-9 w-9 p-1"
										// source={require('../assets/model-icons/gemini-logo.png')}
										alt="Logo"
										size="sm"
									/> */}
								</View>
								<View className="max-w-[75%] pt-2" pointerEvents="box-none">
									{message.response === '' ? (
										<Animated.Text style={{ fontSize: 14, opacity }}>Analyzing...</Animated.Text>
									) : (
										<Text>{message.response}</Text>										
									)}
								</View>
							</View>
						</Fragment>
					))}
				</View>
			</View>
		</ScrollView>
	);
}


// import { View, Text, Animated, Easing } from "react-native";
// import { useEffect, useRef } from "react";

// export default function AnalyzingText() {
// 	const dots = useRef(new Animated.Value(0)).current;

// 	useEffect(() => {
// 		const loopAnimation = () => {
// 			Animated.sequence([
// 				Animated.timing(dots, { toValue: 1, duration: 500, useNativeDriver: true, easing: Easing.linear }),
// 				Animated.timing(dots, { toValue: 2, duration: 500, useNativeDriver: true, easing: Easing.linear }),
// 				Animated.timing(dots, { toValue: 3, duration: 500, useNativeDriver: true, easing: Easing.linear }),
// 			]).start(() => {
// 				dots.setValue(0);
// 				loopAnimation();
// 			});
// 		};
// 		loopAnimation();
// 	}, [dots]);

// 	const getText = () => {
// 		const dotCount = Math.round(dots.__getValue());
// 		return `Analyzing${".".repeat(dotCount)}`;
// 	};

// 	return (
// 		<View style={{ alignItems: "center", justifyContent: "center", marginTop: 20 }}>
// 			<Text style={{ fontSize: 18, fontWeight: "bold" }}>{getText()}</Text>
// 		</View>
// 	);
// }



// <View className="bg-white w-screen h-full">
// 			<KeyboardAwareScrollView
// 				contentContainerStyle={{ flexGrow: 1 }}
// 				scrollEnabled={true}
// 			>
// 				<View className="flex flex-col items-start bg-white">
// 					{getTextArray().map((message) => (
// 						<Fragment key={message.id}>
// 							<View className="bg-blue-200 px-4 py-2 rounded-xl max-w-[75%] self-end mr-5 my-4">
// 								<Text>{message.prompt}</Text>
// 							</View>
// 							<View className="flex flex-row items-start my-4 w-full mx-4">
// 								<View className="flex justify-center items-center h-10 w-10 border-[0.25px] rounded-full mr-4">
// 									<Image
// 										className="h-6 w-6 p-2"
// 										source={require('../assets/chatgpt-logo.svg.png')}
// 										alt="Logo"
// 										size="sm"
// 									/>
// 								</View>
// 								<View className="max-w-[75%]" pointerEvents="box-none">
// 									<Text>{message.response}</Text>
// 								</View>
// 							</View>
// 						</Fragment>
// 					))}
// 				</View>
// 			</KeyboardAwareScrollView>
// 		</View>

