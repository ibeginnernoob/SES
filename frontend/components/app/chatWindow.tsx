import { memo, useEffect, useRef } from 'react'
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native'
import Feather from '@expo/vector-icons/Feather'
import Ionicons from '@expo/vector-icons/Ionicons'
import { type Message as MessageInterface } from '@/types'
import Markdown from 'react-native-markdown-display'
import { getStyles } from '@/markdown'

const windowWidth = Dimensions.get('window').width

function ChatWindow({
    messages,
    msgId,
}: {
    msgId?: string
    messages: MessageInterface[]
}) {
    const flatListRef = useRef<FlatList>(null)
    const msgIdRef = useRef<string | null>(msgId)

    useEffect(() => {
        const scrollToEnd = () => {
            const index = messages.findIndex(
                (msg) => msg.id === msgIdRef.current,
            )
			console.log(index)
            flatListRef.current?.scrollToIndex({
                animated: true,
                index: index,
                viewPosition: -0.02,
            })
        }

        if (messages.length > 0) {
            scrollToEnd()
        }
    }, [messages])

    return (
        <View style={{ flex: 1, width: windowWidth, position: 'relative' }}>
            {messages.length === 0 && (
                <Image
                    source={require('@/assets/new-images/logo.png')}
                    className="w-52 h-52 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 opacity-30"
                />
            )}
            <FlatList
                ref={flatListRef}
                onScrollBeginDrag={() => {
                    msgIdRef.current = null
                }}
                onScrollToIndexFailed={(info) => {
                    const wait = new Promise((resolve) =>
                        setTimeout(resolve, 500),
                    )
                    wait.then(() => {
                        flatListRef.current?.scrollToIndex({
                            index: info.index,
                            animated: true,
                        })
                    })
                }}
                data={messages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <>
                        <View className="my-1.5">
                            <Message
                                message={item.prompt}
                                isUser={true}
                                isStreaming={item.isStreaming}
                            />
                        </View>
                        <View className="my-1.5">
                            <Message
                                message={item.response}
                                isUser={false}
                                isStreaming={item.isStreaming}
                            />
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

const Message = memo(
    ({
        message,
        isUser,
        isStreaming,
    }: {
        message: string
        isUser: boolean
        isStreaming: boolean
    }) => {
        const markdownStyles = getStyles(isUser ? 'white' : 'black', 15.5)

        if (isUser) {
            return (
                <View
                    className="ml-auto bg-gray-600"
                    style={[
                        messageStyles.messageContainer,
                        { paddingHorizontal: 12, paddingVertical: 4 },
                    ]}
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
            <View
                className="mr-auto"
                style={[
                    messageStyles.messageContainer,
                    {
                        paddingHorizontal: 8,
                    },
                ]}
            >
                <Markdown
                    style={{
                        ...markdownStyles,
                    }}
                >
                    {message}
                </Markdown>
                <View className="ml-2 flex flex-row items-center gap-3">
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
    },
)

export default ChatWindow

const messageStyles = StyleSheet.create({
    messageContainer: {
        borderRadius: 10,
        maxWidth: '80%',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
    messageText: {
        fontSize: 15.5,
        fontFamily: 'Inter-Regular',
    },
})
