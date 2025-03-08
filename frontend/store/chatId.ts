import { create } from 'zustand'

const useStore = create((set) => ({
  chatId: "",
  updateChatId: (id: string) => set({ chatId: id })
}))

export default useStore
