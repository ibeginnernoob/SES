import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface TopBarProps {
  setShowSideBar: (visible: boolean) => void;
}

const TopBar: React.FC<TopBarProps> = ({ setShowSideBar }) => {
  return (
    <View style={styles.container}>
      {/* Sidebar Toggle Button */}
      <TouchableOpacity onPress={() => setShowSideBar(true)} style={styles.menuButton}>
        <Ionicons name="menu" size={28} color="white" />
      </TouchableOpacity>

      <Text style={styles.title}>Health AI</Text>

      /*we can replace it with user icon*/
      <TouchableOpacity onPress={() => console.log("Profile Clicked")} style={styles.profileButton}>
        <Image 
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }} 
          style={styles.profileIcon} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1976D2",
    paddingVertical: 15,
	width: '100%',
  },
  menuButton: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  profileButton: {
    borderRadius: 50,
    overflow: "hidden",
  },
  profileIcon: {
    width: 30,
    height: 30,
  },
});

export default TopBar;
