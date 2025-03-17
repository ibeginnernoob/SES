import React from 'react';
import { MaterialIcons, Feather } from '@expo/vector-icons';

interface IconProps {
  as: React.ComponentType<any>;
  size?: number;
  color?: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ as: Component, size = 24, color = 'black', className }) => {
  return <Component size={size} color={color} className={className} />;
};

export const EditIcon = (props: any) => <Feather name="edit" {...props} />;
export const MessageCircleIcon = (props: any) => <Feather name="message-circle" {...props} />;
