import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { StackNavigationProp } from "@react-navigation/stack";
import { router} from 'expo-router';
import { useNavigation } from "@react-navigation/native";

import  SideBarComponent  from "@/components/SideBarComponent";
import TopBar from "@/components/TopBar";


const Stack = createStackNavigator();

type RootStackParamList = {
  Home: undefined;
  Chat: undefined;
};

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [showSideBar, setShowSideBar] = useState(false);

  return (
	<View style={styles.container}>
		<TopBar
			setSideBarVisibility={setShowSideBar}
			userEmail="user@example.com"
		/>
	  <SideBarComponent showSideBar={showSideBar} setShowSideBar={setShowSideBar} activePage="Home" />
	  
	  <TouchableOpacity style={styles.menuButton} onPress={() => setShowSideBar(true)}>
		<Text style={styles.menuText}>☰</Text>
	  </TouchableOpacity>

	  <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/883/883407.png" }} style={styles.logo} />
	  <Text style={styles.title}>Welcome to Health AI</Text>
	  <Text style={styles.subtitle}>Your trusted AI-powered medical assistant.</Text>

	  <View style={styles.promptContainer}>
		<Text style={styles.prompt}> "What are the symptoms of Viral?"</Text>
		<Text style={styles.prompt}> "Can I take Paracetamol for a headache?"</Text>
		<Text style={styles.prompt}> "Is this rash on my neck normal?"</Text>
	  </View>

	  <TouchableOpacity style={styles.button} onPress={() => router.navigate("/form")}>
		<Text style={styles.buttonText}>Ask Your Question</Text>
	  </TouchableOpacity>
	</View>
  );
};

const ChatScreen = () => (
  <View style={styles.container}>
	<Text style={styles.title}>Chat with AI</Text>
	<Text style={styles.subtitle}>Describe your symptoms or ask a health-related question.</Text>
  </View>
);

export default function App() {
  return (
	<Stack.Navigator screenOptions={{ headerShown: false }}>
	  <Stack.Screen name="Home" component={HomeScreen} />
	  <Stack.Screen name="Chat" component={ChatScreen} />
	</Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
	flex: 1,
	backgroundColor: "#E3F2FD",
	alignItems: "center",
	justifyContent: "center",
  },
  menuButton: {
	position: "absolute",
	top: 40,
	left: 20,
	backgroundColor: "#1976D2",
	padding: 10,
	borderRadius: 5,
  },
  menuText: {
	color: "white",
	fontSize: 20,
	fontWeight: "bold",
  },
  logo: {
	width: 100,
	height: 100,
	marginBottom: 20,
  },
  title: {
	fontSize: 28,
	fontWeight: "bold",
	color: "#1565C0",
	textAlign: "center",
  },
  subtitle: {
	fontSize: 16,
	color: "#444",
	textAlign: "center",
	marginBottom: 20,
  },
  promptContainer: {
	backgroundColor: "#FFFFFF",
	padding: 15,
	borderRadius: 10,
	marginBottom: 20,
	width: "100%",
	shadowColor: "#000",
	shadowOffset: { width: 0, height: 2 },
	shadowOpacity: 0.2,
	shadowRadius: 4,
  },
  prompt: {
	color: "#1565C0",
	fontSize: 16,
	marginVertical: 5,
  },
  button: {
	backgroundColor: "#1976D2",
	paddingVertical: 15,
	paddingHorizontal: 40,
	borderRadius: 25,
	marginTop: 10,
  },
  buttonText: {
	color: "white",
	fontSize: 18,
	fontWeight: "bold",
  },
});