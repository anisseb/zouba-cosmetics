import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';

export type RootTabParamList = {
  Home: undefined;
  Categories: undefined;
  Cart: undefined;
  Account: undefined;
};

export type SearchStackParamList = {
  Search: undefined;
  SearchResults: { query: string };
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  SearchResults: { query: string };
};

export type CategoriesStackParamList = {
  CategoriesList: undefined;
  SubCategoryProducts: {
    category: string;
    subCategory: string;
  };
  SearchResults: { query: string };
};

export type RootStackParamList = {
  Root: undefined;
  Search: { query: string };
};

export type RootTabScreenProps<T extends keyof RootTabParamList> = 
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type SearchScreenProps = NativeStackScreenProps<SearchStackParamList, 'SearchResults'>;
export type HomeScreenProps = NativeStackScreenProps<HomeStackParamList, 'HomeScreen'>;
export type CategoriesScreenProps = NativeStackScreenProps<CategoriesStackParamList, 'CategoriesList'>;
export type SubCategoryProductsScreenProps = NativeStackScreenProps<CategoriesStackParamList, 'SubCategoryProducts'>;