import { Tabs } from 'expo-router'
import React from 'react'
import { HapticTab } from '@/components/ui/hapticTab'
import TabBarBackground from '@/components/ui/tabBarBackground'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'

export default function TabLayout() {
    const colorScheme = useColorScheme()

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: {
                    display: 'none',
                },
                animation: 'shift',
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'home',
                }}
            />
            <Tabs.Screen
                name="signin"
                options={{
                    title: 'signin',
                }}
            />
            <Tabs.Screen
                name="otp"
                options={{
                    title: 'otp',
                }}
            />
        </Tabs>
    )
}
