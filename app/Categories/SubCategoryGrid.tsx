import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SubCategory } from '../types';

interface SubCategoryGridProps {
  subCategories: SubCategory[];
  onSelectSubCategory: (subCategoryName: string) => void;
}

export default function SubCategoryGrid({
  subCategories,
  onSelectSubCategory,
}: SubCategoryGridProps) {
  const renderItem = ({ item }: { item: SubCategory }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onSelectSubCategory(item.name)}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="folder-outline" size={32} color="#007AFF" />
      </View>
      <Text style={styles.name}>{item.name}</Text>
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={subCategories}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
});