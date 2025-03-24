const formatChat = (chat: any) => {
    const formattedChat: any[] = []
    if (
        !Array.isArray(chat) ||
        chat.length === 0 ||
        !chat[0]?.prompts ||
        !chat[0]?.responses
    ) {
        return []
    }
    for (let i = 0; i < chat[0].prompts.length; i += 1) {
        formattedChat.push({
            role: 'user',
            content: chat[0].prompts[i].text,
        })
        formattedChat.push({
            role: 'assistant',
            content: chat[0].responses[i].text,
        })
    }
    return formattedChat
}

export default formatChat