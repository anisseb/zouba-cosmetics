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
import { RootTabParamList, HomeStackParamList } from '../navigation/types';

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          header: () => <SearchHeader />,
        }}
      />
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

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          backgroundColor: '#f5f5f5',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarStyle: {
          elevation: 0,
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
          backgroundColor: 'white',
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
          headerShown: false,
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
};

export default TabNavigator;