import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Category } from '../types';

interface CategorySidebarProps {
  categories: Category[];
  selectedCategory: Category | null;
  onSelectCategory: (category: Category) => void;
}

export default function CategorySidebar({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategorySidebarProps) {
  return (
    <ScrollView style={styles.container}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryItem,
            selectedCategory?.id === category.id && styles.selectedItem,
          ]}
          onPress={() => onSelectCategory(category)}
        >
          <Text
            style={[
              styles.categoryText,
              selectedCategory?.id === category.id && styles.selectedText,
            ]}
          >
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedItem: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  selectedText: {
    color: 'white',
  },
});