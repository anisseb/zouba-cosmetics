import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SubCategory } from '../types';

interface SubCategoryListProps {
  subCategories: SubCategory[];
  selectedSubCategory: string | null;
  onSelectSubCategory: (subCategoryName: string) => void;
}

export default function SubCategoryList({
  subCategories,
  selectedSubCategory,
  onSelectSubCategory,
}: SubCategoryListProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {subCategories.map((subCategory) => (
        <TouchableOpacity
          key={subCategory.id}
          style={[
            styles.chip,
            selectedSubCategory === subCategory.name && styles.selectedChip,
          ]}
          onPress={() => onSelectSubCategory(subCategory.name)}
        >
          <Text
            style={[
              styles.chipText,
              selectedSubCategory === subCategory.name && styles.selectedChipText,
            ]}
          >
            {subCategory.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 60,
    backgroundColor: 'white',
  },
  content: {
    padding: 10,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  selectedChip: {
    backgroundColor: '#007AFF',
  },
  chipText: {
    fontSize: 14,
    color: '#333',
  },
  selectedChipText: {
    color: 'white',
  },
});