import React from 'react';
import { StyleSheet, View, Platform, SafeAreaView } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_PLACES_API_KEY } from '../../config/constants';

interface AddressAutocompleteProps {
  onSelect: (data: any, details: any) => void;
  placeholder?: string;
}

export default function AddressAutocomplete({ 
  onSelect,
  placeholder = 'Search for an address'
}: AddressAutocompleteProps) {
  return (
    <SafeAreaView style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder={placeholder}
        onPress={onSelect}
        fetchDetails={true}
        query={{
          language: 'en',
          types: 'address',
          key: GOOGLE_PLACES_API_KEY,
        }}
        requestUrl={{
          url: Platform.select({
            web: 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
            default: 'https://maps.googleapis.com/maps/api/place'
          }),
          useOnPlatform: 'web'
        }}
        styles={{
          container: styles.autocompleteContainer,
          textInput: styles.input,
          listView: styles.listView,
          row: styles.row,
          description: styles.description,
        }}
        enablePoweredByContainer={false}
        listViewDisplayed="auto"
        minLength={3}
        debounce={300}
        textInputProps={{
          autoCorrect: false,
          autoCapitalize: 'none',
          placeholderTextColor: '#999',
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
  },
  autocompleteContainer: {
    flex: 0,
  },
  input: {
    height: 45,
    fontSize: 16,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    color: '#333',
  },
  listView: {
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    zIndex: 9999,
    elevation: 5
  },
  row: {
    padding: 13,
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
  },
  description: {
    fontSize: 15,
  },
});