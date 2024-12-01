import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from './SearchScreen';

export type SearchStackParamList = {
  SearchResults: {
    query: string;
  };
};

const Stack = createNativeStackNavigator<SearchStackParamList>();

export default function SearchNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchResults"
        component={SearchScreen}
        options={{
          title: 'Search Results',
        }}
      />
    </Stack.Navigator>
  );
}