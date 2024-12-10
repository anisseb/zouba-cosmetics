import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShippingAddressesScreen from '../Account/Shipping/ShippingAddressesScreen';
import AddEditAddressScreen from '../Account/Shipping/AddEditAddressScreen';
import { AccountStackParamList } from '../types/types';

const Stack = createNativeStackNavigator<AccountStackParamList>();

export default function AccountNavigator() {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ShippingAddresses"
        component={ShippingAddressesScreen}
        options={{ 
          title: 'Shipping Addresses',
          headerShown: false
        }}
      />
      <Stack.Screen
        name="AddEditAddress"
        component={AddEditAddressScreen}
        options={({ route }) => ({
          title: route.params?.addressId ? 'Edit Address' : 'Add New Address',
          headerShown: true,
          presentation: 'modal',
        })}
      />
    </Stack.Navigator>
  );
}