import { useState } from 'react'
import {
    SafeAreaView,
    View,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
} from 'react-native'
import Feather from '@expo/vector-icons/Feather'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useHeaderHeight } from '@react-navigation/elements'
import ChatWindow from '@/components/app/chatWindow'

function Chat() {
    const headerHeight = useHeaderHeight()

    const [prompt, setPrompt] = useState('')

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
            keyboardVerticalOffset={headerHeight}
        >
            <SafeAreaView className="flex-1">
                <View className="flex-1">
                    <ChatWindow />
                </View>
                <View className="py-2 relative">
                    <TextInput
                        placeholder="Ask anything"
                        value={prompt}
                        onChangeText={(value) => setPrompt(value)}
                        multiline={true}
                        maxLength={200}
                        numberOfLines={8}
                        style={styles.input}
                        placeholderTextColor={'gray'}
                    />
                    <View style={styles.inputButtonsContainer}>
                        {prompt.length === 0 && (
                            <TouchableOpacity>
                                <Feather name="mic" size={22} color="gray" />
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity style={styles.sendContainer}>
                            <AntDesign name="arrowup" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default Chat

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 20,
        paddingLeft: 18,
        paddingRight: 60,
        paddingVertical: 12,
        flexShrink: 0,
        marginHorizontal: 12,
        fontSize: 16,
        fontWeight: '400',
        color: 'black',
    },
    inputButtonsContainer: {
        position: 'absolute',
        bottom: 12,
        right: 22,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    sendContainer: {
        height: 36,
        width: 36,
        borderRadius: 18,
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
})
