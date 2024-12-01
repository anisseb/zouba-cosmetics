import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MenuItem from './MenuItem';
import { useLanguage } from '../hooks/useLanguage';
import { useTranslation } from 'react-i18next';

const LanguageScreen: React.FC = () => {
  const navigation = useNavigation();
  const { currentLanguage, setLanguage } = useLanguage();
  const { t } = useTranslation();

  const handleLanguageSelect = async (lang: string) => {
    await setLanguage(lang);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <MenuItem
        icon="language"
        title="English"
        onPress={() => handleLanguageSelect('en')}
        showCheck={currentLanguage === 'en'}
      />
      <MenuItem
        icon="language"
        title="Français"
        onPress={() => handleLanguageSelect('fr')}
        showCheck={currentLanguage === 'fr'}
      />
      <MenuItem
        icon="language"
        title="العربية"
        onPress={() => handleLanguageSelect('ar')}
        showCheck={currentLanguage === 'ar'}
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

export default LanguageScreen;