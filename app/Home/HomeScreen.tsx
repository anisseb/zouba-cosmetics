import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ProductCard from '../components/ProductCard';
import { SAMPLE_PRODUCTS } from '../data/products';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={SAMPLE_PRODUCTS}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  productList: {
    padding: 10,
  },
});