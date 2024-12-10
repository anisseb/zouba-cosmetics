import React from 'react';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import TabNavigator from './navigation/TabNavigator';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsNavigator from './Account/Settings/SettingsNavigator';
import { AccountStackParamList } from './types/types';
import AccountNavigator from './navigation/AccountNavigator';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const Stack = createNativeStackNavigator<AccountStackParamList>();

export default function Home() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Root" component={TabNavigator} />
            <Stack.Screen
              name="AccountScreen" 
              component={AccountNavigator}
              options={{ 
                headerShown: true,
                title: 'Shipping Addresses',
              }}
            />
            <Stack.Screen
              name="Settings" 
              component={SettingsNavigator}
              options={{ 
                headerShown: true,
                title: 'Settings',
              }}
            />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}