import { create } from 'zustand';
import { Category } from '../types';
import { CATEGORIES } from '../data/categories';

interface CategoryStore {
  categories: Category[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

export const useCategories = create<CategoryStore>()((set) => ({
  categories: CATEGORIES,
  selectedCategory: null,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));