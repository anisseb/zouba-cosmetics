import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';

interface LanguageStore {
  currentLanguage: string;
  setLanguage: (lang: string) => Promise<void>;
}

export const useLanguage = create<LanguageStore>((set) => ({
  currentLanguage: 'en',
  setLanguage: async (lang: string) => {
    await AsyncStorage.setItem('userLanguage', lang);
    await i18n.changeLanguage(lang);
    set({ currentLanguage: lang });
  },
}));