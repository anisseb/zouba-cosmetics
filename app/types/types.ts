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

export type SettingsStackParamList = {
  SettingsList: undefined;
  Language: undefined;
};

export type RootStackParamList = {
  Root: undefined;
  Settings: undefined;
};

export type RootTabScreenProps<T extends keyof RootTabParamList> = 
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type AccountStackParamList = {
  Root: undefined;
  Settings: undefined;
  AccountScreen: undefined;
  ShippingAddresses: undefined;
  AddEditAddress: {
    addressId?: string;
  };
};

export type SearchScreenProps = NativeStackScreenProps<SearchStackParamList | HomeStackParamList | CategoriesStackParamList, 'SearchResults'>;
export type HomeScreenProps = NativeStackScreenProps<HomeStackParamList, 'HomeScreen'>;
export type CategoriesScreenProps = NativeStackScreenProps<CategoriesStackParamList, 'CategoriesList'>;
export type SubCategoryProductsScreenProps = NativeStackScreenProps<CategoriesStackParamList, 'SubCategoryProducts'>;
export type AccountScreenProps = NativeStackScreenProps<RootStackParamList>;
export type SettingsScreenProps = NativeStackScreenProps<SettingsStackParamList, 'SettingsList'>;

export type ShippingAddressesScreenProps = NativeStackScreenProps<
  AccountStackParamList,
  'ShippingAddresses'
>;

export type AddEditAddressScreenProps = NativeStackScreenProps<
  AccountStackParamList,
  'AddEditAddress'
>;