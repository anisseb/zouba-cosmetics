import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SearchStore {
  history: string[];
  addToHistory: (query: string) => void;
  clearHistory: () => void;
}

export const useSearch = create<SearchStore>()(
  persist(
    (set) => ({
      history: [],
      addToHistory: (query) =>
        set((state) => ({
          history: [
            query,
            ...state.history.filter((item) => item !== query),
          ].slice(0, 10),
        })),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'search-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);