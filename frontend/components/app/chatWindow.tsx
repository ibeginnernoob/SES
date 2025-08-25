import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from 'react-native'
import Feather from '@expo/vector-icons/Feather'
import Ionicons from '@expo/vector-icons/Ionicons';

interface Message {
    id: number
    message: string
}

const messages = [
    { id: 1, message: 'Hello, how are you?', isUser: true },
    { id: 2, message: 'I am fine, thank you!', isUser: false },
    {
        id: 3,
        message:
            'What is your name? and what is your age and address. Would love to know more about you.',
        isUser: true,
    },
    { id: 4, message: 'My name is John Doe.', isUser: false },
]

function ChatWindow() {
    return (
        <View style={{ flex: 1, width: '100%' }}>
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Message message={item.message} isUser={item.isUser} />
                )}
                style={{
                    paddingHorizontal: 10,
                    flex: 1,
                }}
                contentContainerStyle={{
                    paddingVertical: 20,
                }}
                ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
                showsVerticalScrollIndicator={true}
            />
        </View>
    )
}

function Message({ message, isUser }: { message: string; isUser: boolean }) {
    if (isUser) {
        return (
            <View
                className="ml-auto bg-gray-600"
                style={messageStyles.messageContainer}
            >
                <Text style={[messageStyles.messageText, { color: 'white' }]}>
                    {message}
                </Text>
            </View>
        )
    }

    return (
        <View className="mr-auto" style={messageStyles.messageContainer}>
            <Text style={messageStyles.messageText}>{message}</Text>
            <View className="flex flex-row items-center gap-3">
                <TouchableOpacity>
                    <Feather name="copy" size={15} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
					<Ionicons name="volume-medium-outline" size={20} color="black" />
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
        gap: 8,
    },
    messageText: {
        fontSize: 15,
        fontFamily: 'Inter-Regular',
    },
})
