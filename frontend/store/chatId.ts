import { create } from 'zustand'

const useChatId = create((set) => ({
    chatId: '',
    updateChatId: (id: string) => set({ chatId: id }),
}))

export default useChatId
