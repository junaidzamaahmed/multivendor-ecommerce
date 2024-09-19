import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";

type CategoryState = {
  categories: { id: number; name: string }[];
  setCategories: (categories: any) => void;
  fetchCategories: () => void;
  addCategory: (newCategory: any) => void;
  deleteCategory: (categoryId: any) => void;
  updateCategory: (categoryId: any, newCategory: any) => void;
};

export const useCategories = create<CategoryState>((set) => ({
  categories: [],
  setCategories: (categories: any) => set({ categories }),
  fetchCategories: async () => {
    try {
      const { data } = await axios.get("/api/categories");
      return set({ categories: data });
    } catch (error) {
      toast.error("Failed to fetch categories.");
    }
  },
  addCategory: async (newCategory: any) => {
    if (!newCategory.name) {
      return toast.error("Category name is required.");
    }
    try {
      await axios.post("/api/categories", newCategory);
      toast.success("Category added successfully.");
      const { fetchCategories } = useCategories.getState();
      fetchCategories();
    } catch (error) {
      toast.error("Failed to add category.");
    }
  },
  deleteCategory: async (categoryId: any) => {
    try {
      await axios.delete("/api/categories", { data: { id: categoryId } });
      toast.success("Category deleted successfully.");
      const { fetchCategories } = useCategories.getState();
      fetchCategories();
    } catch (error) {
      toast.error("Failed to delete category.");
    }
  },
  updateCategory: async (categoryId: any, newCategory: any) => {
    if (!newCategory.name) {
      return toast.error("Category name is required.");
    }
    try {
      await axios.put("/api/categories", { ...newCategory, id: categoryId });
      toast.success("Category updated successfully.");
      const { fetchCategories } = useCategories.getState();
      fetchCategories();
    } catch (error) {
      toast.error("Failed to update category.");
    }
  },
}));
