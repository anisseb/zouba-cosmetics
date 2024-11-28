import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AccountScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person-circle" size={80} color="#007AFF" />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
      </View>

      <View style={styles.menuContainer}>
        <MenuItem icon="person-outline" title="Edit Profile" />
        <MenuItem icon="settings-outline" title="Settings" />
        <MenuItem icon="location-outline" title="Shipping Address" />
        <MenuItem icon="card-outline" title="Payment Methods" />
        <MenuItem icon="time-outline" title="Order History" />
        <MenuItem icon="help-circle-outline" title="Help & Support" />
      </View>
    </View>
  );
}

function MenuItem({ icon, title }: { icon: string; title: string }) {
  return (
    <TouchableOpacity style={styles.menuItem}>
      <Ionicons name={icon as any} size={24} color="#333" />
      <Text style={styles.menuText}>{title}</Text>
      <Ionicons name="chevron-forward" size={24} color="#ccc" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  menuContainer: {
    marginTop: 20,
    backgroundColor: 'white',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
  },
});