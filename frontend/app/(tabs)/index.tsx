import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Animated } from "react-native";
import { router } from 'expo-router';
import { LinearGradient } from "expo-linear-gradient";

export default function Home() {
  const scaleAnim = useRef(new Animated.Value(1)).current; // Logo scale animation
  const textOpacity = useRef(new Animated.Value(0)).current; // Text opacity
  const textTranslateY = useRef(new Animated.Value(20)).current; // Text position
  const buttonOpacity = useRef(new Animated.Value(0)).current; // Button opacity
  const buttonTranslateY = useRef(new Animated.Value(20)).current; // Button position

  useEffect(() => {
   
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.delay(500), 
    ]).start();

    // Text Animation 
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(textTranslateY, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start();
    }, 2500);

    // Button Animation 
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(buttonTranslateY, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start();
    }, 3300);
  }, []);

  return (
    <LinearGradient		
      colors={['#A3BFFA', '#1E3A8A']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <View className="flex flex-col items-center justify-center">
        
        <Animated.Image
          source={require('../../assets/app-images/output_transparent.png')}
          alt="App Logo"
          style={[styles.logo, { transform: [{ scale: scaleAnim }] }]}
        />
        
    
        <Animated.Text 
          style={[
            styles.title, 
            { opacity: textOpacity, transform: [{ translateY: textTranslateY }] }
          ]}
        >
          Health AI
        </Animated.Text>

        <Animated.Text 
          style={[
            styles.subtitle, 
            { opacity: textOpacity, transform: [{ translateY: textTranslateY }] }
          ]}
        >
          Your trusted AI-powered medical assistant.
        </Animated.Text>

     
        <Animated.View 
          style={{
            opacity: buttonOpacity,
            transform: [{ translateY: buttonTranslateY }],
          }}
        >
          <TouchableOpacity 
            onPress={() => router.navigate("/form")}
            className="mt-10 rounded-xl bg-cyan-500"
          >
            <Text className="text-lg px-8 py-4 text-white">Ask Your Question</Text>
          </TouchableOpacity>
        </Animated.View>
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
  }
});
