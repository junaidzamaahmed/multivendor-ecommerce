import { create } from "zustand";

const useCart = create()((set) => ({
  cart:
    typeof window !== "undefined" && window.localStorage
      ? window.localStorage.getItem("cartItems")
        ? JSON.parse(window.localStorage.getItem("cartItems")!)
        : []
      : [],
  updateCart: (newState: any) => set(() => ({ cart: newState })),
}));
