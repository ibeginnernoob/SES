import Modal from 'react-native-modal'
import { View, Text, TouchableOpacity } from 'react-native'
import { Dispatch, SetStateAction } from 'react'

const models = [
    {
        name: 'ChatGPT',
        image: require('../../assets/model-icons/chatgpt-logo.svg.png'),
    },
    {
        name: 'Claude',
        image: require('../../assets/model-icons/claude-logo.png'),
    },
    {
        name: 'Gemini',
        image: require('../../assets/model-icons/gemini-logo.png'),
    },
    {
        name: 'Grok',
        image: require('../../assets/model-icons/grok-logo.png'),
    },
    {
        name: 'Llama',
        image: require('../../assets/model-icons/llama-logo.png'),
    },
    {
        name: 'BioGPT',
        image: require('../../assets/model-icons/biogpt-logo.png'),
    },
]

export default function LLMChooserModal({
    showModelSwitchModal,
    setShowModalSwitchModal,
}: {
    showModelSwitchModal: boolean
    setShowModalSwitchModal: Dispatch<SetStateAction<boolean>>
}) {
    return (
        <Modal
            isVisible={showModelSwitchModal}
            className="h-screen"
            backdropColor="transparent"
            onBackdropPress={() => setShowModalSwitchModal(false)}
            animationIn="fadeIn"
            animationOut="fadeOut"
            animationInTiming={300}
            animationOutTiming={300}
        >
            <View className="h-screen flex items-center">
                <View className="opacity-1 bg-zinc-100 w-48 fixed top-28 border-[0.2px] rounded-xl">
                    {models.map((model, index) => {
                        return (
                            <TouchableOpacity
                                key={model.name}
                                className="active:bg-gray-300"
                                onPress={() => {
                                    setShowModalSwitchModal(false)
                                    // updateModelName(model.name)
                                }}
                            >
                                <View
                                    className={`mx-4 py-3 ${index === models.length - 1 ? '' : 'border-b-[0.2px] border-gray-400'}`}
                                >
                                    <View className="flex flex-row items-center ml-3">
                                        <Text
                                            className={`ml-4 ${model.name === 'ChatGPT' ? 'ml-5' : ''}`}
                                        >
                                            {model.name}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
        </Modal>
    )
}
