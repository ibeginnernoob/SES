import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';

import { StyleProp, ViewStyle, TextStyle } from 'react-native';

interface LogoutButtonProps {
  buttonStyles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ buttonStyles, textStyles }) => {
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => console.log('User Logged Out') },
    ]);
  };

  return (
    <TouchableOpacity style={[styles.button, buttonStyles]} onPress={handleLogout}>
      <Text style={[styles.text, textStyles]}>Logout</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LogoutButton;
