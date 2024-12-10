import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShippingAddress } from '../types';

interface AddressStore {
  addresses: ShippingAddress[];
  addAddress: (address: Omit<ShippingAddress, 'id'>) => void;
  updateAddress: (address: ShippingAddress) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
}

export const useAddresses = create<AddressStore>()(
  persist(
    (set) => ({
      addresses: [],
      addAddress: (newAddress) =>
        set((state) => {
          const id = Math.random().toString(36).substr(2, 9);
          const isFirst = state.addresses.length === 0;
          return {
            addresses: [
              ...state.addresses,
              {
                ...newAddress,
                id,
                isDefault: isFirst || newAddress.isDefault,
              },
            ],
          };
        }),
      updateAddress: (updatedAddress) =>
        set((state) => ({
          addresses: state.addresses.map((address) =>
            address.id === updatedAddress.id ? updatedAddress : address
          ),
        })),
      deleteAddress: (id) =>
        set((state) => ({
          addresses: state.addresses.filter((address) => address.id !== id),
        })),
      setDefaultAddress: (id) =>
        set((state) => ({
          addresses: state.addresses.map((address) => ({
            ...address,
            isDefault: address.id === id,
          })),
        })),
    }),
    {
      name: 'shipping-addresses',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);