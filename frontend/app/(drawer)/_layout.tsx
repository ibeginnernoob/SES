import { Drawer } from 'expo-router/drawer'

export default function DrawerLayout() {
    return (
        <Drawer>
            <Drawer.Screen
                name="home"
                options={{
                    drawerLabel: 'Home',
                    title: 'Home',
                }}
            />
        </Drawer>
    )
}
