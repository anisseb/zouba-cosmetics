export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  subCategory: string;
  brand: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
  parentId: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface FilterOptions {
  brand: string | null;
  priceRange: {
    min: number | null;
    max: number | null;
  };
}

export interface ShippingAddress {
  id: string;
  fullName: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}