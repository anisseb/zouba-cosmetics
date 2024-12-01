import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import MenuItem from './MenuItem';
import { SettingsStackParamList } from '../navigation/types';
import { useTranslation } from 'react-i18next';

type SettingsScreenNavigationProp = NativeStackNavigationProp<SettingsStackParamList, 'SettingsList'>;

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <MenuItem
        icon="language-outline"
        title={t('settings.language')}
        onPress={() => navigation.navigate('Language')}
      />
      <MenuItem
        icon="notifications-outline"
        title={t('settings.notifications')}
        onPress={() => {}}
      />
      <MenuItem
        icon="lock-closed-outline"
        title={t('settings.privacy')}
        onPress={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default SettingsScreen;