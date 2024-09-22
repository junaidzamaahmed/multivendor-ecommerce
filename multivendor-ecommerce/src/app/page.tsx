"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProducts } from "@/store/products";
import { useCategories } from "@/store/categories";
import Product from "./_components/product";

export default function HomePage() {
  const { products, setProducts } = useProducts();
  const { categories, fetchCategories } = useCategories();
  const [highestSellingProduct, setHighestSellingProduct] = useState(null);

  useEffect(() => {
    // Fetch all products
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });

    // Fetch categories
    fetchCategories();

    // Fetch highest selling product
    axios.get("/api/highest-selling-product").then((response) => {
      setHighestSellingProduct(response.data);
    });
  }, [setProducts, fetchCategories]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-primary/20 via-primary/5 to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to ACME Store
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Discover amazing products at unbeatable prices. Shop now and enjoy free shipping on orders over $50!
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg" className="animate-pulse">
                  Shop Now
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Highest Selling Product Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Highest Selling Product
            </h2>
            {highestSellingProduct ? (
              <div className="flex justify-center">
                <Product product={highestSellingProduct} index={69} />
              </div>
            ) : (
              <p className="text-center">Loading...</p>
            )}
          </div>
        </section>

        {/* Categories Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Categories
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    className="group relative flex items-center justify-center h-48 rounded-lg bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow dark:bg-gray-950"
                    href={`/shop?category=${category.id}`}
                  >
                    <h3 className="text-2xl font-semibold text-center z-10 transition-transform group-hover:scale-110">
                      {category.name}
                    </h3>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products?.map((product, index) => (
                <Product key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="w-full py-6 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          {/* Footer content */}
        </div>
      </footer>
    </div>
  );
}
