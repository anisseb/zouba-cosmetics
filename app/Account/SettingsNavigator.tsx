import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from './SettingsScreen';
import LanguageScreen from './LanguageScreen';
import { SettingsStackParamList } from '../navigation/types';

const Stack = createNativeStackNavigator<SettingsStackParamList>();

const SettingsNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingsList"
        component={SettingsScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Language"
        component={LanguageScreen}
        options={{
          presentation: 'modal',
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;