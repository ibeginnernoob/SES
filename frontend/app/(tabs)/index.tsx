import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { router } from 'expo-router'
import LinearGradientComponent from '@/components/ui/linearGradientComponent'

function Home() {
    return (
        <LinearGradientComponent>
            <View className="flex flex-col items-center justify-center">
                <TouchableOpacity
                    onPress={() => router.navigate('/signin')}
                    className="mt-10 rounded-xl bg-cyan-500"
                >
                    <Text className="text-lg px-8 py-4 text-white">
                        Ask Your Question
                    </Text>
                </TouchableOpacity>
            </View>
        </LinearGradientComponent>
    )
}

export default Home

const styles = StyleSheet.create({
    logo: {
        height: 350,
        width: 350,
        marginBottom: -80,
        marginTop: -100,
    },
    title: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 10,
    },
    subtitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginTop: 5,
    },
})
