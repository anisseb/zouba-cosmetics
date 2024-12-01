import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MenuItemProps {
  icon: string;
  title: string;
  onPress: () => void;
  showCheck?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, title, onPress, showCheck }) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Ionicons name={icon as any} size={24} color="#333" />
      <Text style={styles.menuText}>{title}</Text>
      {showCheck && <Ionicons name="checkmark" size={24} color="#007AFF" />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
  },
});

export default MenuItem;