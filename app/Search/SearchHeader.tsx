import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SearchBar from './SearchBar';
import SearchHistory from './SearchHistory';
import SearchSuggestions from './SearchSuggestions';
import { useSearch } from '../hooks/useSearch';
import { useProducts } from '../hooks/useProducts';
import { HomeStackParamList, CategoriesStackParamList } from '../navigation/types';
import { Product } from '../types/index';

type NavigationProp = NativeStackNavigationProp<HomeStackParamList | CategoriesStackParamList>;

const SearchHeader: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const { history, addToHistory, clearHistory } = useSearch();
  const { products } = useProducts();
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 10);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, products]);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      addToHistory(query.trim());
      setSearchQuery('');
      setIsSearchFocused(false);
      navigation.navigate('SearchResults', { query: query.trim() });
    }
  };

  const handleBack = () => {
    setIsSearchFocused(false);
    setSearchQuery('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitSearch={handleSearch}
          onFocus={() => setIsSearchFocused(true)}
          onBack={handleBack}
          showBackButton={isSearchFocused}
        />
      </View>
      {isSearchFocused && (
        <View style={styles.overlay}>
          {searchQuery.trim() === '' ? (
            <SearchHistory
              history={history}
              onSelectHistory={handleSearch}
              onClearHistory={clearHistory}
            />
          ) : (
            <SearchSuggestions
              suggestions={suggestions}
              onSelectSuggestion={handleSearch}
            />
          )}
        </View>
      )}
    </View>
  );
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
  },
  searchBarContainer: {
    backgroundColor: '#f5f5f5',
    zIndex: 1001,
  },
  overlay: {
    position: 'absolute',
    top: 56,
    left: 0,
    right: 0,
    height: height - 56,
    backgroundColor: 'white',
    zIndex: 1000,
  },
});

export default SearchHeader;