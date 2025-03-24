import { TouchableOpacity, View, Text, ColorValue } from "react-native"
import { Icon, EditIcon, MessageCircleIcon } from "../ui/icon"
import { router } from "expo-router"

const pages = [
	{
		name: 'form',
		icon: EditIcon,
		text: "Start new Chat"		
	},
	{
		name: 'chats',
		icon: MessageCircleIcon,
		text: "Your chats"
	}
]

export default function PageChangeTabs({ activePage } : {
	activePage: string
}) {
	return (
		<>
			{pages.map(page => (
				<TouchableOpacity
				key={page.name}
					onPress={() => {
						//@ts-ignore
						router.navigate(`/${page.name}`)
					}}
				>
					<View
						className={`mb-2 pl-4 py-2 rounded-md ${activePage === page.name ? 'bg-blue-100' : null}`}
					>
						<View
							className={`font-semibold flex flex-row items-center`}
						>
							<Icon
								className={`mr-3 ${activePage === page.name ? 'text-sky-600' : null}`}
								as={page.icon}
								size="md"
							/>
							<Text
								className={`${activePage === page.name ? 'text-sky-600' : null}`}
							>
								{page.text}
							</Text>
						</View>
					</View>
				</TouchableOpacity>
			))}
		</>
	)
}