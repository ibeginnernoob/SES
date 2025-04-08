import { create } from 'zustand'

const useModel = create((set) => ({
    modelName: 'ChatGPT',
    updateModel: (modelName: string) => set({ modelName: modelName }),
}))

export default useModel
