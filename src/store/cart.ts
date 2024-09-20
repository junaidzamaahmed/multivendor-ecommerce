import { toast } from "sonner";
import { create } from "zustand";

type CartState = {
  cart: { id: number; title: string; price: number; quantity: number }[];
  addToCart: (product: any, quantity: number) => void;
  removeFromCart: (productId: any) => void;
  updateQuantity: (productId: any, newQuantity: any) => void;
};

export const useCart = create<CartState>((set) => ({
  cart:
    typeof window !== "undefined" && window.localStorage
      ? window.localStorage.getItem("cartItems")
        ? JSON.parse(window.localStorage.getItem("cartItems")!)
        : []
      : [],
  addToCart: (product, quantity = 1) => {
    set((state: CartState) => {
      const existing = state.cart.find((item: any) => item.id === product.id);
      if (existing) {
        existing.quantity += quantity;
        if (window != undefined) {
          window.localStorage.setItem("cartItems", JSON.stringify(state.cart));
        }
        return { cart: state.cart };
      }
      const newCart = [...state.cart, { ...product, quantity: quantity }];
      if (window != undefined) {
        window.localStorage.setItem("cartItems", JSON.stringify(newCart));
      }
      return { cart: newCart };
    });
    toast.success(`Item added to cart ${product.title}`);
  },
  removeFromCart: (productId: any) => {
    set((state: CartState) => {
      const newCart = state.cart.filter((item: any) => item.id !== productId);
      if (window != undefined) {
        window.localStorage.setItem("cartItems", JSON.stringify(newCart));
      }
      return { cart: newCart };
    });
  },
  updateQuantity: (productId: any, newQuantity: any) => {
    set((state: CartState) => {
      const newCart = state.cart.map((item: any) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      );
      if (window != undefined) {
        window.localStorage.setItem("cartItems", JSON.stringify(newCart));
      }
      return { cart: newCart };
    });
  },
}));
