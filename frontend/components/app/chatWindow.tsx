import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import Feather from '@expo/vector-icons/Feather'
import Ionicons from '@expo/vector-icons/Ionicons'
import { type Message as MessageInterface } from '@/types'
import Markdown from 'react-native-markdown-display'
import { getStyles } from '@/markdown'

function ChatWindow({ messages }: { messages: MessageInterface[] }) {
    return (
        <View style={{ flex: 1, width: '100%' }}>
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <>
                        <View className="my-1">
                            <Message message={item.prompt} isUser={true} />
                        </View>
                        <View className="my-1">
                            <Message message={item.response} isUser={false} />
                        </View>
                    </>
                )}
                style={{
                    paddingHorizontal: 10,
                    flex: 1,
                }}
                contentContainerStyle={{
                    paddingVertical: 20,
                }}
                showsVerticalScrollIndicator={true}
            />
        </View>
    )
}

function Message({ message, isUser }: { message: string; isUser: boolean }) {
    const markdownStyles = getStyles(isUser ? 'white' : 'black', 15.5)

    if (isUser) {
        return (
            <View
                className="ml-auto bg-gray-600"
                style={messageStyles.messageContainer}
            >
                <Markdown
                    style={{
                        ...markdownStyles,
                    }}
                >
                    {message}
                </Markdown>
            </View>
        )
    }

    return (
        <View className="mr-auto" style={messageStyles.messageContainer}>
            <Markdown
                style={{
                    ...markdownStyles,
                }}
            >
                {message}
            </Markdown>
            <View className="flex flex-row items-center gap-3">
                <TouchableOpacity>
                    <Feather name="copy" size={15} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons
                        name="volume-medium-outline"
                        size={20}
                        color="black"
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ChatWindow

const messageStyles = StyleSheet.create({
    messageContainer: {
        padding: 12,
        borderRadius: 10,
        maxWidth: '80%',
        display: 'flex',
        flexDirection: 'column',
    },
    messageText: {
        fontSize: 15.5,
        fontFamily: 'Inter-Regular',
    },
})
