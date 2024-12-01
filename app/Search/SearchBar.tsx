import React, { useRef } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Platform, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    onSubmitSearch: (query: string) => void;
    onFocus?: () => void;
    onBack?: () => void;
    showBackButton?: boolean;
    placeholder?: string;
  }
  
  const SearchBar: React.FC<SearchBarProps> = ({
    value,
    onChangeText,
    onSubmitSearch,
    onFocus,
    onBack,
    showBackButton = false,
    placeholder = 'Search products...',
  }) => {
    const insets = useSafeAreaInsets();
    const inputRef = useRef<TextInput>(null);
  
    const handleBack = () => {
      Keyboard.dismiss();
      onBack?.();
    };
  
    return (
      <View style={[
        styles.container,
        { marginTop: Platform.OS === 'ios' ? insets.top : 0 }
      ]}>
        {showBackButton && (
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
        )}
        <View style={[styles.searchContainer, showBackButton && styles.searchContainerWithBack]}>
          <Ionicons name="search-outline" size={20} color="#666" style={styles.icon} />
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            onFocus={onFocus}
            placeholder={placeholder}
            placeholderTextColor="#999"
            returnKeyType="search"
            onSubmitEditing={() => onSubmitSearch(value)}
          />
          {value.length > 0 && (
            <TouchableOpacity onPress={() => onChangeText('')}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: '#f5f5f5',
    },
    backButton: {
      marginRight: 8,
    },
    searchContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 8,
      paddingHorizontal: 12,
      height: 40,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    searchContainerWithBack: {
      marginLeft: 0,
    },
    icon: {
      marginRight: 8,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: '#333',
    },
  });
  
  export default SearchBar;