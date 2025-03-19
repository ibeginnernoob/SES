import { create } from 'zustand'

const useModel = create((set) => ({
	modelName: 'ChatGPT',
	updateModel: (name: string) => set({ modelName: name }),
}))

export default useModel