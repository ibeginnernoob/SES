import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// Home Screen with Patient Form
const HomeScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [symptoms, setSymptoms] = useState("");

  const handleSubmit = () => {
    if (name && age && symptoms) {
      navigation.navigate("Chat", { name, age, symptoms });
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Healthcare Logo */}
      <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/883/883407.png" }} style={styles.logo} />

      {/* Greeting */}
      <Text style={styles.title}>Welcome to Health AI</Text>
      <Text style={styles.subtitle}>Your trusted AI-powered medical assistant.</Text>

      {/* Patient Form */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput style={styles.input} placeholder="Enter your name" value={name} onChangeText={setName} />

        <Text style={styles.label}>Age</Text>
        <TextInput style={styles.input} placeholder="Enter your age" value={age} onChangeText={setAge} keyboardType="numeric" />

        <Text style={styles.label}>Symptoms</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Describe your symptoms..."
          value={symptoms}
          onChangeText={setSymptoms}
          multiline
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Ask Your Question</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Chat Screen
const ChatScreen = ({ route }) => {
  const { name, age, symptoms } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat with AI</Text>
      <Text style={styles.subtitle}>Hello {name}, analyzing your symptoms...</Text>
      <Text style={styles.chatMessage}>🩺 Age: {age}</Text>
      <Text style={styles.chatMessage}>🤕 Symptoms: {symptoms}</Text>
      <Text style={styles.chatMessage}>AI: "Based on your symptoms, I recommend..."</Text>
    </View>
  );
};

// Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
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
  formContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#F0F0F0",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#1976D2",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  chatMessage: {
    fontSize: 16,
    color: "#333",
    marginVertical: 5,
  },
});
