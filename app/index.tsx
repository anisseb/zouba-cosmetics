import React from 'react';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import TabNavigator from './TabNavigator/TabNavigator';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsNavigator from './Account/SettingsNavigator';
import { RootStackParamList } from './navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

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