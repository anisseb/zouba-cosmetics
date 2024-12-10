import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import FilterBar from './FilterBar';
import ProductList from './ProductList';
import { FilterOptions } from '../types';
import { CategoriesStackParamList } from '../navigation/CategoriesNavigator';

type Props = NativeStackScreenProps<CategoriesStackParamList, 'SubCategoryProducts'>;

export default function SubCategoryProductsScreen({ route }: Props) {
  const { category, subCategory } = route.params;
  const [filters, setFilters] = useState<FilterOptions>({
    brand: null,
    priceRange: { min: null, max: null },
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={styles.container}>
        <FilterBar filters={filters} onFiltersChange={setFilters} />
        <ProductList
          category={category}
          subCategory={subCategory}
          filters={filters}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
  },
});