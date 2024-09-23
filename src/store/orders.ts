import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";

type OrderState = {
  orders: any[];
  order: any;
  setOrder: (order: any) => void;
  fetchOrders: () => void;
  fetchUserOrders: (userId: string) => void;
  fetchOrder: (orderId: number) => void;
  createOrder: (e: any, newOrder: any) => void;
  updateStatus: (orderId: number, status: string) => void;
};

export const useOrder = create<OrderState>((set) => ({
  orders: [],
  order: null,
  setOrder: (order: any) => set({ order }),
  fetchOrders: async () => {
    try {
      const { data } = await axios.get(`/api/order`);
      return set({ orders: data });
    } catch (error) {
      toast.error("Failed to fetch orders.");
    }
  },
  fetchUserOrders: async (userId: string) => {
    try {
      const { data } = await axios.get(`/api/order/user/${userId}`);
      return set({ orders: data });
    } catch (error) {
      toast.error("Failed to fetch orders.");
    }
  },
  fetchOrder: async (orderId: number) => {
    try {
      const { data } = await axios.get(`/api/order/${orderId}`);
      return set({ order: data });
    } catch (error) {
      toast.error("Failed to fetch order.");
    }
  },
  createOrder: async (e, newOrder: any) => {
    e.preventDefault();
    if (!newOrder.order || !newOrder.products) {
      return toast.error("All fields are required.");
    }
    try {
      await axios.post("/api/order", newOrder);
      const { fetchOrders } = useOrder.getState();
      fetchOrders();
      toast.success("Order created successfully.");
    } catch (error) {
      toast.error("Failed to create order.");
    }
  },
  updateStatus: async (orderId: number, status: string) => {
    try {
      await axios.put(`/api/order`, { status, orderId });
      const { fetchOrders } = useOrder.getState();
      fetchOrders();
      toast.success("Order cancelled successfully.");
    } catch (error) {
      toast.error("Failed to cancel order.");
    }
  },
}));
