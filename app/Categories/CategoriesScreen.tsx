import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CategorySidebar from './CategorySidebar';
import SubCategoryGrid from './SubCategoryGrid';
import { Category } from '../types';
import { CATEGORIES } from '../data/categories';
import { CategoriesStackParamList } from '../navigation/CategoriesNavigator';

type CategoriesScreenNavigationProp = NativeStackNavigationProp<
  CategoriesStackParamList,
  'CategoriesList'
>;

interface CategoriesScreenProps {
  navigation: CategoriesScreenNavigationProp;
}

export default function CategoriesScreen({ navigation }: CategoriesScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleSubCategoryPress = (subCategoryName: string) => {
    if (selectedCategory) {
      navigation.navigate('SubCategoryProducts', {
        category: selectedCategory.name,
        subCategory: subCategoryName,
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={styles.container}>
        <View style={styles.sidebar}>
          <CategorySidebar
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </View>
        <View style={styles.content}>
          {selectedCategory && (
            <SubCategoryGrid
              subCategories={selectedCategory.subCategories}
              onSelectSubCategory={handleSubCategoryPress}
            />
          )}
        </View>
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
    flexDirection: 'row',
  },
  sidebar: {
    width: 120,
    backgroundColor: 'white',
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
  content: {
    flex: 1,
  },
});