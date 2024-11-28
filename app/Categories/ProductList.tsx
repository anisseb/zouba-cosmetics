import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ProductCard from '../components/ProductCard';
import { FilterOptions } from '../types';
import { SAMPLE_PRODUCTS } from '../data/products';

interface ProductListProps {
  category: string;
  subCategory: string;
  filters: FilterOptions;
}

export default function ProductList({
  category,
  subCategory,
  filters,
}: ProductListProps) {
  const filteredProducts = SAMPLE_PRODUCTS.filter((product) => {
    const matchesCategory = product.category === category;
    const matchesSubCategory = product.subCategory === subCategory;
    const matchesBrand = !filters.brand || product.brand === filters.brand;
    const matchesPriceRange =
      (!filters.priceRange.min || product.price >= filters.priceRange.min) &&
      (!filters.priceRange.max || product.price <= filters.priceRange.max);

    return matchesCategory && matchesSubCategory && matchesBrand && matchesPriceRange;
  });

  return (
    <FlatList
      data={filteredProducts}
      renderItem={({ item }) => <ProductCard product={item} />}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});