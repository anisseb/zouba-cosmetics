import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../Home/HomeScreen';
import SearchScreen from '../Search/SearchScreen';
import CategoriesNavigator from '../Categories/CategoriesNavigator';
import CartScreen from '../Cart/CartScreen';
import AccountScreen from '../Account/AccountScreen';
import SearchHeader from '../Search/SearchHeader';
import { RootTabParamList, HomeStackParamList, SearchStackParamList } from '../Search/types';

const Tab = createBottomTabNavigator<RootTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const SearchStack = createNativeStackNavigator<SearchStackParamList>();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          header: () => <SearchHeader />,
        }}
      />
      <HomeStack.Screen
        name="SearchResults"
        component={SearchScreen}
        options={{
          title: 'Search Results',
        }}
      />
    </HomeStack.Navigator>
  );
}

function SearchStackNavigator() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="SearchResults"
        component={SearchScreen}
        options={{
          title: 'Search Results',
        }}
      />
    </SearchStack.Navigator>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          backgroundColor: '#bdbdcc',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarStyle: {
          elevation: 0,
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
          backgroundColor: '#bdbdcc',
          height: 70,
          paddingBottom: 8,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'help-outline';

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Categories':
              iconName = focused ? 'grid' : 'grid-outline';
              break;
            case 'Cart':
              iconName = focused ? 'cart' : 'cart-outline';
              break;
            case 'Account':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStackNavigator}
        options={{
          headerShown: true,
        }}
      />
      <Tab.Screen 
        name="Categories" 
        component={CategoriesNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen 
        name="Cart" 
        component={CartScreen}
      />
      <Tab.Screen 
        name="Account" 
        component={AccountScreen}
      />
    </Tab.Navigator>
  );
}