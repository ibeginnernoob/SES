import { useRef, useState } from 'react'
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
import EventSource from 'react-native-sse'
import { Chunk, Message } from '@/types'

const generateId = () => {
    return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
    )
}

function Chat() {
    const headerHeight = useHeaderHeight()

    const [loading, setLoading] = useState(false)
    const es = useRef<EventSource | null>(null)
    const msgId = useRef<string | null>(null)

    const [prompt, setPrompt] = useState('')
    const [messages, setMessages] = useState<Message[]>([])

    const handleSSE = async () => {
        es.current?.addEventListener('open', () => {
            console.log('event has been opened')
        })

        es.current?.addEventListener('message', (event) => {
            const data = JSON.parse(event.data || '{}') as Chunk

            if (data.finished) {
				setPrompt('')
                es.current?.close()
                return
            }

            setMessages((prevState) => {
                const lastMsg = prevState[prevState.length - 1]
                if (lastMsg && lastMsg.id === msgId.current) {
                    lastMsg.response += data.chunk
                    return [...prevState.slice(0, -1), lastMsg]
                } else {
                    return [...prevState]
                }
            })
        })

        es.current?.addEventListener('error', (event) => {
            console.log(event)
            es.current?.close()
        })

        es.current?.addEventListener('close', (event) => {			
            console.log('event has been closed')
            es.current = null
        })
    }

    const handleSend = async () => {
        const payload = {
            message: prompt,
        }

        msgId.current = generateId()

        const newMsg: Message = {
            id: msgId.current,
            response: '',
            prompt: prompt,
        }
        setMessages((prevState) => [...prevState, newMsg])

        const newES = new EventSource(
            `${process.env.EXPO_PUBLIC_BACKEND_URL}/chat`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            },
        )

        es.current = newES
        await handleSSE()
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
            keyboardVerticalOffset={headerHeight}
        >
            <SafeAreaView className="flex-1">
                <View className="flex-1">
                    <ChatWindow messages={messages} />
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
                        <TouchableOpacity
                            style={styles.sendContainer}
                            onPress={handleSend}
                        >
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
