"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/store/cart";
import { useProducts } from "@/store/products";
import { useEffect } from "react";
import axios from "axios";

export default function HomePage() {
  const { addToCart } = useCart();
  const { products, setProducts } = useProducts();
  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);
  console.log(products);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-primary/20 via-primary/5 to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to ACME Store
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Discover amazing products at unbeatable prices. Shop now and
                  enjoy free shipping on orders over $50!
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Categories
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Electronics",
                "Clothing",
                "Home & Garden",
                "Sports",
                "Beauty",
                "Books",
              ].map((category, index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    className="group relative flex items-center justify-center h-48 rounded-lg bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow dark:bg-gray-950"
                    href={`/category/${category
                      .toLowerCase()
                      .replace(" & ", "-")}`}
                  >
                    <h3 className="text-2xl font-semibold text-center z-10 transition-transform group-hover:scale-110">
                      {category}
                    </h3>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products?.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group flex flex-col overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Link href={`/products/${product.id}`}>
                      <img
                        alt={product.title}
                        className="object-cover w-full h-full transition-transform group-hover:scale-105"
                        height="400"
                        src={product.image || ""}
                        style={{
                          aspectRatio: "400/400",
                          objectFit: "cover",
                        }}
                        width="400"
                      />
                    </Link>
                  </div>
                  <div className="flex flex-col justify-between flex-1 p-6 bg-white dark:bg-gray-950">
                    <Link href={`/products/${product.id}`}>
                      <div>
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                          {product.title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit.
                        </p>
                      </div>
                    </Link>
                    <div className="flex items-center justify-between mt-4">
                      <p className="text-lg font-semibold">
                        ${product.price.toFixed(2)}
                      </p>
                      <Button size="sm" onClick={() => addToCart(product)}>
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">About Us</h3>
              <p className="max-w-xs text-sm text-gray-500 dark:text-gray-400">
                ACME Store is your one-stop shop for all your needs. We offer a
                wide range of high-quality products at competitive prices.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Customer Service</h3>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-primary transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="hover:text-primary transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shipping"
                    className="hover:text-primary transition-colors"
                  >
                    Shipping Information
                  </Link>
                </li>
                <li>
                  <Link
                    href="/returns"
                    className="hover:text-primary transition-colors"
                  >
                    Returns & Exchanges
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li>
                  <Link
                    href="/products"
                    className="hover:text-primary transition-colors"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories"
                    className="hover:text-primary transition-colors"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    href="/deals"
                    className="hover:text-primary transition-colors"
                  >
                    Deals
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-primary transition-colors"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Newsletter</h3>
              <form className="space-y-2">
                <Input placeholder="Enter your email" type="email" />
                <Button type="submit" className="w-full">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
          <div className="mt-8 text-sm text-center text-gray-500 dark:text-gray-400">
            © 2023 ACME Store. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
