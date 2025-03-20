import { router } from 'expo-router';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert, View } from 'react-native';
import ButtonComponent from './ButtonComponent';
import { auth } from '@/firebaseConfig'
import { signOut } from 'firebase/auth'

interface LogoutButtonProps {
  buttonStyles?: string
  textStyles?: string
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ buttonStyles, textStyles }) => {
	const logout = async () => {
        try {
            await signOut(auth)
        } catch (e: any) {
            const errorCode = e.code
            const errorMessage = e.message
        }
    }

	const handleLogout = () => {
		Alert.alert('Logout', 'Are you sure you want to log out?', [
			{ text: 'Cancel', style: 'cancel' },
			{ text: 'Logout', onPress: async () => {
				await logout()
				router.navigate("/signin");
			} },
		]);
	};

	return (
		<View>
            <ButtonComponent
                buttonStyles={`rounded-2xl py-3 h-auto ${buttonStyles}`}
                textStyles={`${textStyles}`}
                msg="Sign Out"
                onclick={handleLogout}
            />
        </View>
	);
};

export default LogoutButton;