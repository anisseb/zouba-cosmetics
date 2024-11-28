import React from 'react';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import TabNavigator from './TabNavigator/TabNavigator';
import { useNavigation } from 'expo-router';
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