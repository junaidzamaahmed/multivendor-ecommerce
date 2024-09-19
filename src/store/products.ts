import { create } from "zustand";

type Product = {
  id: number;
  title: string;
  price: number;
  desc: string | null;
  image: string | null;
  categoryId: number | null;
  stock: number;
  userId: string;
  category: {
    id: number;
    name: string;
  };
};

type ProductsState = {
  products: Product[];
  setProducts: (products: Product[]) => void;
};

export const useProducts = create<ProductsState>((set) => ({
  products: [],
  setProducts: (products: Product[]) => set({ products }),
}));
