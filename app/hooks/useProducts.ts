import { create } from 'zustand';
import { Product } from '../types';
import { SAMPLE_PRODUCTS } from '../data/products';

interface ProductStore {
  products: Product[];
  filteredProducts: Product[];
  setFilter: (category: string | null) => void;
}

export const useProducts = create<ProductStore>()((set) => ({
  products: SAMPLE_PRODUCTS,
  filteredProducts: SAMPLE_PRODUCTS,
  setFilter: (category) =>
    set((state) => ({
      filteredProducts: category
        ? state.products.filter((product) => product.category === category)
        : state.products,
    })),
}));