import React from 'react';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import TabNavigator from './TabNavigator/TabNavigator';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';
import { Stack, useNavigation } from 'expo-router';
import { useEffect } from 'react';

export default function Home() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);


  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}