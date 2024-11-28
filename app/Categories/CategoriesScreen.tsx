import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import CategoryCard from '../components/CategoryCard';
import { CATEGORIES } from '../data/categories';

export default function CategoriesScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={CATEGORIES}
        renderItem={({ item }) => <CategoryCard category={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.categoryList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  categoryList: {
    padding: 10,
  },
});