import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";

type StoreState = {
  store: any;
  stores: any[];
  setStore: (store: any) => void;
  fetchStores: () => void;
  fetchStore: (storeId: number) => void;
  createStore: (e: any, newStore: any) => void;
  editStore: (e: any, store: any) => void;
  fetchUserStore: () => void;
  addAdmin: (e: any, storeId: number, email: string) => void;
  removeAdmin: (id: string) => void;
};

export const useStore = create<StoreState>((set) => ({
  stores: [],
  store: null,
  setStore: (store: any) => set({ store }),
  fetchStores: async () => {
    try {
      const { data } = await axios.get(`/api/store`);
      return set({ stores: data });
    } catch (error) {
      toast.error("Failed to fetch store.");
    }
  },
  fetchStore: async (storeId: number) => {
    try {
      const { data } = await axios.get(`/api/store/${storeId}`);
      return set({ store: data });
    } catch (error) {
      toast.error("Failed to fetch store.");
    }
  },
  fetchUserStore: async () => {
    try {
      const { data } = await axios.get("/api/store/userStore");
      return set({ store: data });
    } catch (error) {
      toast.error("Failed to fetch store.");
    }
  },
  createStore: async (e, newStore: any) => {
    e.preventDefault();
    if (
      !newStore.name ||
      !newStore.description ||
      !newStore.email ||
      !newStore.phone ||
      !newStore.profileImage ||
      !newStore.coverImage
    ) {
      return toast.error("All fields are required.");
    }
    try {
      await axios.post("/api/store", newStore);
      const { fetchUserStore } = useStore.getState();
      fetchUserStore();

      toast.success("Store created successfully.");
    } catch (error) {
      toast.error("Failed to create store.");
    }
  },
  editStore: async (e, store: any) => {
    e.preventDefault();
    if (
      !store.name ||
      !store.address ||
      !store.city ||
      !store.state ||
      !store.zip ||
      !store.phone ||
      !store.email
    ) {
      return toast.error("All fields are required.");
    }
    try {
      await axios.put(`/api/store/${store.id}`, store);
      toast.success("Store updated successfully.");
    } catch (error) {
      toast.error("Failed to update store.");
    }
  },
  addAdmin: async (e, storeId: number, email: string) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Email is required.");
    }
    try {
      await axios.post(`/api/store/admin`, { email, storeId });
      const { fetchUserStore } = useStore.getState();
      fetchUserStore();
      toast.success("Admin added successfully.");
    } catch (error) {
      toast.error("Failed to add admin.");
    }
  },
  removeAdmin: async (id: string) => {
    try {
      await axios.delete(`/api/store/admin`, { data: { id } });
      const { fetchUserStore } = useStore.getState();
      fetchUserStore();
      toast.success("Admin removed successfully.");
    } catch (error) {
      toast.error("Failed to remove admin.");
    }
  },
}));
