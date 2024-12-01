import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoriesScreen from './CategoriesScreen';
import SubCategoryProductsScreen from './SubCategoryProductsScreen';
import SearchHeader from '../Search/SearchHeader';

export type CategoriesStackParamList = {
  CategoriesList: undefined;
  SubCategoryProducts: {
    category: string;
    subCategory: string;
  };
};

const Stack = createNativeStackNavigator<CategoriesStackParamList>();

export default function CategoriesNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f5f5f5',
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="CategoriesList"
        component={CategoriesScreen}
        options={{
          header: () => <SearchHeader />,
        }}
      />
      <Stack.Screen
        name="SubCategoryProducts"
        component={SubCategoryProductsScreen}
        options={({ route }) => ({
          title: route.params.subCategory,
        })}
      />
    </Stack.Navigator>
  );
}