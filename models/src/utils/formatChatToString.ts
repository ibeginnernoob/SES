const formatChat = (chat: any) => {
    if (
        !Array.isArray(chat) ||
        chat.length === 0 ||
        !chat[0]?.prompts ||
        !chat[0]?.responses
    ) {
        return ''
    }
    let formattedChat: string = ''
    for (let i = 0; i < chat[0].prompts.length; i += 1) {
        formattedChat += `User: ${chat[0].prompts[i].text}\n`
        formattedChat += `Assistant: ${chat[0].responses[i].text}\n`
    }
    return formattedChat
}

export default formatChat