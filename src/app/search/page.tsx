"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function SearchResultsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const products = [
    {
      id: 1,
      name: "Wireless Earbuds",
      price: 79.99,
      category: "Electronics",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 199.99,
      category: "Electronics",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 3,
      name: "Laptop Backpack",
      price: 59.99,
      category: "Accessories",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 4,
      name: "4K Monitor",
      price: 299.99,
      category: "Electronics",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 5,
      name: "Ergonomic Keyboard",
      price: 129.99,
      category: "Electronics",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 6,
      name: "Wireless Mouse",
      price: 39.99,
      category: "Electronics",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 7,
      name: "Desk Lamp",
      price: 49.99,
      category: "Home & Office",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 8,
      name: "Notebook Set",
      price: 24.99,
      category: "Stationery",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 9,
      name: "Portable Charger",
      price: 49.99,
      category: "Electronics",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 10,
      name: "Wireless Keyboard",
      price: 89.99,
      category: "Electronics",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 11,
      name: "Desk Organizer",
      price: 34.99,
      category: "Home & Office",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 12,
      name: "Laptop Stand",
      price: 39.99,
      category: "Accessories",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 13,
      name: "Noise-Canceling Headphones",
      price: 249.99,
      category: "Electronics",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 14,
      name: "Wireless Presenter",
      price: 29.99,
      category: "Electronics",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 15,
      name: "USB Hub",
      price: 19.99,
      category: "Electronics",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 16,
      name: "Desk Plant",
      price: 14.99,
      category: "Home & Office",
      image: "/placeholder.svg?height=200&width=200",
    },
  ];

  const categories = [
    "Electronics",
    "Accessories",
    "Home & Office",
    "Stationery",
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low-high") return a.price - b.price;
    if (sortBy === "price-high-low") return b.price - a.price;
    return 0; // Default to relevance
  });

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleCategoryChange = (category: any) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
        <div className="container flex h-16 items-center">
          <div className="mr-4 hidden md:flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <span className="hidden font-bold text-xl bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent sm:inline-block">
                ACME Store
              </span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link
                href="/products"
                className="text-foreground/60 transition-colors hover:text-foreground/80"
              >
                Products
              </Link>
              <Link
                href="/categories"
                className="text-foreground/60 transition-colors hover:text-foreground/80"
              >
                Categories
              </Link>
              <Link
                href="/deals"
                className="text-foreground/60 transition-colors hover:text-foreground/80"
              >
                Deals
              </Link>
              <Link
                href="/about"
                className="text-foreground/60 transition-colors hover:text-foreground/80"
              >
                About
              </Link>
            </nav>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>Navigate through our store</SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-4">
                <Link
                  href="/products"
                  className="text-foreground/60 transition-colors hover:text-foreground/80"
                >
                  Products
                </Link>
                <Link
                  href="/categories"
                  className="text-foreground/60 transition-colors hover:text-foreground/80"
                >
                  Categories
                </Link>
                <Link
                  href="/deals"
                  className="text-foreground/60 transition-colors hover:text-foreground/80"
                >
                  Deals
                </Link>
                <Link
                  href="/about"
                  className="text-foreground/60 transition-colors hover:text-foreground/80"
                >
                  About
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex w-full items-center gap-4 md:w-auto">
            <form
              className="flex-1 md:flex-initial"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-background/50"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </form>
            <Button variant="ghost" size="icon" className="ml-auto relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Orders</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-8">Search Results</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="categories">
                  <AccordionTrigger>Categories</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div
                          key={category}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={category}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() =>
                              handleCategoryChange(category)
                            }
                          />
                          <label
                            htmlFor={category}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="price">
                  <AccordionTrigger>Price Range</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={priceRange[0]}
                          onChange={(e) => {
                            setPriceRange([
                              Number(e.target.value),
                              priceRange[1],
                            ]);
                            setCurrentPage(1);
                          }}
                          className="w-20"
                        />
                        <span>-</span>
                        <Input
                          type="number"
                          placeholder="Max"
                          value={priceRange[1]}
                          onChange={(e) => {
                            setPriceRange([
                              priceRange[0],
                              Number(e.target.value),
                            ]);
                            setCurrentPage(1);
                          }}
                          className="w-20"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </aside>
          <div className="flex-1 space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                {sortedProducts.length} results found
              </p>
              <Select
                value={sortBy}
                onValueChange={(value) => {
                  setSortBy(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low-high">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem value="price-high-low">
                    Price: High to Low
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentProducts.map((product) => (
                <div
                  key={product.id}
                  className="group flex flex-col overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      alt={product.name}
                      className="object-cover w-full h-full transition-transform group-hover:scale-105"
                      height="200"
                      src={product.image}
                      style={{
                        aspectRatio: "200/200",
                        objectFit: "cover",
                      }}
                      width="200"
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-1 p-6 bg-white dark:bg-gray-950">
                    <div>
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {product.category}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <p className="text-lg font-semibold">
                        ${product.price.toFixed(2)}
                      </p>
                      <Button size="sm">Add to Cart</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center space-x-2 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="icon"
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Button>
                )
              )}
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
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
