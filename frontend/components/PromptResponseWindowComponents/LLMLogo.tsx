import { View } from "react-native"
import { Image } from "../ui/image"

const models = [
    {
        name: 'ChatGPT',
        image: require('../../assets/model-icons/chatgpt-logo.svg.png'),
		styles: "h-8 w-8 p-2"
    },
    {
        name: 'Claude',
        image: require('../../assets/model-icons/claude-logo.png'),
		styles: "h-8 w-8 p-1"
    },
    {
        name: 'Gemini',
        image: require('../../assets/model-icons/gemini-logo.png'),
		styles: "h-9 w-9 p-1"
    },
    {
        name: 'Grok',
        image: require('../../assets/model-icons/grok-logo.png'),
		styles: "h-9 w-9 p-2"
    },
	{
		name: 'Llama',
		image: require('../../assets/model-icons/llama-logo.png'),
		styles: "h-3 w-6"
	},
	{
		name: 'BioGPT',
		image: require('../../assets/model-icons/biogpt-logo.png'),
		styles: "h-4 w-4"
	}
]

export default function LLMLogo({ modelName } : {
	modelName: string
}) {
	return (
		<View className="flex justify-center items-center h-10 w-10 border-[0.25px] rounded-full mr-4">                                    
			{models.map(model => {
				if (modelName === model.name) {
					return (
						<Image
							key={model.name}
							className={`${model.styles}`}
							source={model.image}
							alt="Logo"
							size="sm"
						/>
					)
				}
			})}
		</View>
	)
}