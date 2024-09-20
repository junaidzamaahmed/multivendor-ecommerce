import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";

type ReviewState = {
  reviews: any[];
  setReviews: (reviews: any) => void;
  fetchReviews: (productId: number) => void;
  addReview: (e: any, newReview: any) => void;
};

export const useReviews = create<ReviewState>((set) => ({
  reviews: [],
  setReviews: (reviews: any) => set({ reviews }),
  fetchReviews: async (productId: number) => {
    try {
      const { data } = await axios.get(`/api/reviews/${productId}`);
      return set({ reviews: data });
    } catch (error) {
      toast.error("Failed to fetch reviews.");
    }
  },
  addReview: async (e, newReview: any) => {
    e.preventDefault();
    if (!newReview.rating || !newReview.comment || !newReview.productId) {
      return toast.error("All fields are required.");
    }
    try {
      await axios.post("/api/reviews", newReview);
      toast.success("Review added successfully.");
      const { fetchReviews } = useReviews.getState();
      fetchReviews(newReview.productId);
    } catch (error) {
      toast.error("Failed to add review.");
    }
  },
}));
