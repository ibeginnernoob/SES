import { Drawer } from 'expo-router/drawer'

export default function DrawerLayout() {
    return (
        <Drawer>
            <Drawer.Screen
                name="chat"
                options={{
                    title: 'chat',
                    headerShown: true,
                }}
            />
            <Drawer.Screen
                name="chats"
                options={{
                    title: 'chats',
                }}
            />
        </Drawer>
    )
}
