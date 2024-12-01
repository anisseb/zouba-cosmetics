import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import MenuItem from './MenuItem';
import { useTranslation } from 'react-i18next';

type AccountScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AccountScreen: React.FC = () => {
  const navigation = useNavigation<AccountScreenNavigationProp>();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person-circle" size={80} color="#007AFF" />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
      </View>

      <View style={styles.menuContainer}>
        <MenuItem 
          icon="person-outline" 
          title={t('account.editProfile')} 
          onPress={() => {}}
        />
        <MenuItem 
          icon="settings-outline" 
          title={t('account.settings')} 
          onPress={() => navigation.navigate('Settings')}
        />
        <MenuItem 
          icon="location-outline" 
          title={t('account.shippingAddress')} 
          onPress={() => {}}
        />
        <MenuItem 
          icon="card-outline" 
          title={t('account.paymentMethods')} 
          onPress={() => {}}
        />
        <MenuItem 
          icon="star-outline" 
          title={t('account.wishlist')} 
          onPress={() => {}}
        />
        <MenuItem 
          icon="time-outline" 
          title={t('account.orderHistory')} 
          onPress={() => {}}
        />
        <MenuItem 
          icon="help-circle-outline" 
          title={t('account.helpSupport')} 
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  menuContainer: {
    marginTop: 20,
    backgroundColor: 'white',
  },
});

export default AccountScreen;