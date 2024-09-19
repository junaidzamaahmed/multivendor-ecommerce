"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useProducts } from "@/store/products";
import { useCategories } from "@/store/categories";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormSchema = z.object({
  id: z.number(),
  title: z.string().min(1, {
    message: "Title must be at least 1 character long",
  }),
  price: z.coerce.number().int().positive({
    message: "Price must be a positive integer",
  }),
  desc: z.string(),
  image: z.string().url({
    message: "Image must be a valid URL",
  }),
  stock: z.coerce.number().int().positive({
    message: "Stock must be a positive integer",
  }),
  categoryId: z.preprocess((val) => {
    if (typeof val === "string") {
      return parseInt(val);
    }

    return val;
  }, z.number()),
});

export default function ProductForm({ product }: { product: any }) {
  const router = useRouter();

  const { isLoading, fetchProducts } = useProducts();
  const { categories, fetchCategories } = useCategories();

  useEffect(() => {
    fetchCategories();
  }, []);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await axios.put(`/api/products/`, data);
      toast.success("Product updated successfully");
      fetchProducts();
      router.push("/dashboard/products");
    } catch (error) {
      toast.error("Failed to update product");
    }
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: product?.id,
      title: product?.title,
      price: product?.price,
      desc: product?.desc!,
      image: product?.image!,
      stock: product?.stock,
      categoryId: product?.categoryId,
    },
  });
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Form {...form}>
          <h1 className="text-lg font-semibold md:text-2xl">Edit Product</h1>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      //   defaultValue={`${product?.title || ""}`}
                      placeholder="eg. Nvidia RTX 4070 Super"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      //   defaultValue={product?.price}
                      type="number"
                      placeholder="eg. 500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      //   defaultValue={product?.stock}
                      type="number"
                      placeholder="eg. 50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    {/* <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      defaultValue={String(field.value)}
                      value={String(field.value)}
                    >
                      <SelectTrigger>
                        <SelectValue>
                          {categories.find(
                            (category) => category.id === product?.categoryId
                          )?.name || "Select a category"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={22}
                            {...field}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select> */}
                    {/* Select Category using html select with nothing selected by default and a beautiful ui */}
                    <select
                      {...field}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-black"
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input
                      //   defaultValue={product?.image!}
                      type="text"
                      placeholder="https://facebook.com/image.jpg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      //   defaultValue={product?.desc!}
                      placeholder="eg. A powerful GPU for gaming"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      )}
    </>
  );
}
