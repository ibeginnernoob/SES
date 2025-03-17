import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Modal from 'react-native-modal'; 
import LogoutButton from './LogoutButton';
import { Icon, EditIcon, MessageCircleIcon } from "./icon";
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('screen');

interface SideBarProps {
  showSideBar: boolean;
  setShowSideBar: (visible: boolean) => void;
  activePage: string;
}

const SideBarComponent: React.FC<SideBarProps> = ({ showSideBar, setShowSideBar, activePage }) => {
  const navigation = useNavigation();

  return (
    <Modal
      isVisible={showSideBar} 
      onBackdropPress={() => setShowSideBar(false)}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      style={{ margin: 0 }}
	  className='w-screen'
    >
      <View style={{ backgroundColor: 'white', height, padding: 20, width: '70%' }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Chat' as never);
            setShowSideBar(false);
          }}
          style={{
            padding: 10,
            backgroundColor: activePage === 'Home' ? '#E3F2FD' : 'transparent',
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <Icon as={EditIcon} size={24} />
          <Text style={{ marginLeft: 10 }}>Start New Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Chat' as never);
            setShowSideBar(false);
          }}
          style={{
            padding: 10,
            backgroundColor: activePage === 'Chats' ? '#E3F2FD' : 'transparent',
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Icon as={MessageCircleIcon} size={24} />
          <Text style={{ marginLeft: 10 }}>Your Chats</Text>
        </TouchableOpacity>

        <View style={{ position: 'absolute', bottom: 50, width: '100%' }}>
          <LogoutButton
            buttonStyles={{ paddingVertical: 12, paddingHorizontal: 40, borderRadius: 10, backgroundColor: 'white', borderWidth: 1 }}
            textStyles={{ fontSize: 16, color: 'black' }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default SideBarComponent;
