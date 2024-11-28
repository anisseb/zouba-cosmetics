import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FilterOptions } from '../types';

interface FilterBarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

export default function FilterBar({ filters, onFiltersChange }: FilterBarProps) {
  const handlePriceRangeFilter = () => {
    // Implement price range filter modal
  };

  const handleBrandFilter = () => {
    // Implement brand filter modal
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.filterButton} onPress={handleBrandFilter}>
        <Ionicons name="bookmark-outline" size={20} color="#333" />
        <Text style={styles.filterText}>Brand</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.filterButton} onPress={handlePriceRangeFilter}>
        <Ionicons name="cash-outline" size={20} color="#333" />
        <Text style={styles.filterText}>Price</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  filterText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#333',
  },
});