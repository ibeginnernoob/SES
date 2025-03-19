import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { router } from 'expo-router';

import { LinearGradient } from "expo-linear-gradient";

export default function Home() {

  return (
	<LinearGradient		
		colors={['#A3BFFA', '#1E3A8A']}
		start={{ x: 0, y: 0 }}
		end={{ x: 0, y: 1 }}
		style={styles.container}
	>
		<View className="flex flex-col items-center justify-center">
			<Image
				source={require('../../assets/app-images/output_transparent.png')}
				alt="App Logo"
				className="h-[300px] w-[300px] mb-[-70px] mt-[-100px]"
			/>
			<Text className="text-white text-4xl font-bold">Health AI</Text>
			<Text className="my-1 text-white font-semibold">Your trusted AI-powered medical assistant.</Text>
			<View className="my-10 flex flex-col justify-center items-center bg-white px-4 py-4 rounded-xl border-1 border-blue-950">
				<Text className="">"What are the symptoms of Viral?"</Text>
				<Text className="my-1">"Can I take Paracetamol for a headache?"</Text>
				<Text>"Is this rash on my neck normal?"</Text>
			</View>
			<TouchableOpacity 
				onPress={() => {
					router.navigate("/form")
				}}
				className="mt-10 rounded-xl bg-cyan-500"
			>
				<Text className="text-lg px-8 py-4 text-white">Ask Your Question</Text>
			</TouchableOpacity>
		</View>
	</LinearGradient>
  );
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});