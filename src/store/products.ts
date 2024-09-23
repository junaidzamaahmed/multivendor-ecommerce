import axios from "axios";
import { toast } from "sonner";
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
  isLoading: boolean;
  setProducts: (products: Product[]) => void;
  fetchProducts: () => void;
  fetchStoreProducts: (storeId: string) => void;
};

export const useProducts = create<ProductsState>((set) => ({
  products: [],
  isLoading: false,
  setProducts: (products: Product[]) => set({ products }),
  fetchProducts: async () => {
    try {
      set({ isLoading: true });
      const { data } = await axios.get("/api/products");
      set({ isLoading: false });
      return set({ products: data });
    } catch (error) {
      toast.error("Failed to fetch products.");
      set({ isLoading: false });
    }
  },
  fetchStoreProducts: async (storeId: string) => {
    try {
      set({ isLoading: true });
      const { data } = await axios.get(`/api/products/${storeId}`);
      set({ isLoading: false });
      return set({ products: data });
    } catch (error) {
      toast.error("Failed to fetch categories.");
      set({ isLoading: false });
    }
  },
}));
