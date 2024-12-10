import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAddresses } from '../../hooks/useAddresses';
import { ShippingAddress } from '../../types';
import { ShippingAddressesScreenProps } from '../../types/types';

export default function ShippingAddressesScreen({ navigation }: ShippingAddressesScreenProps) {
  const { addresses, setDefaultAddress, deleteAddress } = useAddresses();

  // Sort addresses to show default first
  const sortedAddresses = useMemo(() => {
    return [...addresses].sort((a, b) => {
      if (a.isDefault) return -1;
      if (b.isDefault) return 1;
      return 0;
    });
  }, [addresses]);

  const renderAddress = ({ item }: { item: ShippingAddress }) => (
    <TouchableOpacity
      style={[styles.addressCard, item.isDefault && styles.defaultCard]}
      onPress={() => navigation.navigate('AddEditAddress', { addressId: item.id })}
    >
      <View style={styles.addressHeader}>
        <Text style={styles.name}>{item.fullName}</Text>
        {item.isDefault && (
          <View style={styles.defaultBadge}>
            <Text style={styles.defaultText}>Default</Text>
          </View>
        )}
      </View>
      
      <Text style={styles.address}>
        {item.streetAddress}
        {item.apartment ? `, ${item.apartment}` : ''}
      </Text>
      <Text style={styles.address}>
        {item.city}, {item.state} {item.zipCode}
      </Text>
      <Text style={styles.address}>{item.country}</Text>
      <Text style={styles.phone}>{item.phone}</Text>

      <View style={styles.actions}>
        {!item.isDefault && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setDefaultAddress(item.id)}
          >
            <Text style={styles.actionButtonText}>Set as Default</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => deleteAddress(item.id)}
        >
          <Text style={[styles.actionButtonText, styles.deleteButtonText]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={sortedAddresses}
        renderItem={renderAddress}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No shipping addresses yet</Text>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddEditAddress', { addressId: undefined })}
      >
        <Ionicons name="add" size={24} color="white" />
        <Text style={styles.addButtonText}>Add New Address</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 16,
  },
  addressCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  defaultCard: {
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  defaultBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  defaultText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  phone: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginLeft: 8,
    backgroundColor: '#007AFF',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
  deleteButtonText: {
    color: 'white',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    margin: 16,
    padding: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});