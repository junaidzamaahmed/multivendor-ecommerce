"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProducts } from "@/store/products";
import Product from "@/app/_components/product";
import { useStore } from "@/store/store";

export default function StorePage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("all");

  const { products, fetchStoreProducts } = useProducts();
  const { store, fetchStore } = useStore();
  useEffect(() => {
    fetchStoreProducts(params?.id);
    if (params?.id) fetchStore(Number(params?.id));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="flex-1">
        <div className="relative h-[300px] overflow-hidden">
          <img
            src={store?.coverImage}
            alt={`${store?.name} banner`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
            <div className="container pb-8 text-white">
              <div className="flex items-center space-x-4">
                <img
                  src={store?.profileImage}
                  alt={`${store?.name} logo`}
                  className="w-24 h-24 rounded-full border-4 border-white"
                />
                <div>
                  <h1 className="text-3xl font-bold">{store?.name}</h1>
                  <div className="flex items-center mt-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 font-semibold">
                      {(
                        store?.products.reduce(
                          (acc: any, product: any) =>
                            acc +
                            product.reviews.reduce(
                              (acc: any, review: any) => acc + review.rating,
                              0
                            ),
                          0
                        ) /
                        store?.products.reduce(
                          (acc: any, product: any) =>
                            acc + product.reviews.length,
                          0
                        )
                      ).toFixed(1)}
                    </span>
                    <span className="ml-1 text-sm">
                      (
                      {store?.products.reduce(
                        (acc: any, product: any) =>
                          acc + product.reviews.length,
                        0
                      )}{" "}
                      reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Tabs defaultValue="all" className="w-full">
                <TabsList>
                  <TabsTrigger value="all" onClick={() => setActiveTab("all")}>
                    All Products
                  </TabsTrigger>
                  <TabsTrigger
                    value="bestsellers"
                    onClick={() => setActiveTab("bestsellers")}
                  >
                    Bestsellers
                  </TabsTrigger>
                  <TabsTrigger value="new" onClick={() => setActiveTab("new")}>
                    New Arrivals
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                      <Product
                        index={index}
                        key={product.id}
                        product={product}
                      />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="bestsellers">
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Bestselling products will be shown here.
                  </p>
                </TabsContent>
                <TabsContent value="new">
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    New arrivals will be shown here.
                  </p>
                </TabsContent>
              </Tabs>
            </div>
            <div>
              <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">
                  About {store?.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {store?.description}
                </p>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-semibold">Products:</span>{" "}
                    {store?.products.length}
                  </p>
                  <a href={`mailto:${store?.email}`} className="text-sm">
                    <span className="font-semibold">Email:</span> {store?.email}
                  </a>
                </div>
                <Link href={`mailto:${store?.email}`}>
                  <Button className="w-full mt-4">Contact Seller</Button>
                </Link>
              </div>
              <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6 mt-6">
                <h2 className="text-xl font-semibold mb-4">Store Policies</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Shipping</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Free shipping on orders over $50
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Returns</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      30-day return policy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full py-6 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">About Us</h3>
              <p className="max-w-xs text-sm text-gray-500 dark:text-gray-400">
                ACME Marketplace is your go-to platform for discovering unique
                products from various sellers.
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
                    href="/stores"
                    className="hover:text-primary transition-colors"
                  >
                    Stores
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
            © 2023 ACME Marketplace. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
