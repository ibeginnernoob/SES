import '../../gesture-handler'

import { Tabs } from 'expo-router'
import React from 'react'
import { Platform } from 'react-native'

import { HapticTab } from '@/components/ui/hapticTab'
import { IconSymbol } from '@/components/ui/iconSymbol'
import TabBarBackground from '@/components/ui/TabBarBackground'
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
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                }}
            />
            <Tabs.Screen
                name="signin"
                options={{
                    title: 'Signin',
                }}
            />
            <Tabs.Screen
                name="signup"
                options={{
                    title: 'Signup',
                }}
            />
            <Tabs.Screen
                name="chat"
                options={{
                    title: 'Chat',
                }}
            />
            <Tabs.Screen
                name="chats"
                options={{
                    title: 'Chats',
                }}
            />
            <Tabs.Screen
                name="form"
                options={{
                    title: 'FormPage',
                }}
            />
        </Tabs>
    )
}
