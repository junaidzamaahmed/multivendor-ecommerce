"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/store/cart";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const totalItems = cart.reduce(
    (sum: any, item: any) => sum + item.quantity,
    0
  );
  const totalPrice = cart.reduce(
    (sum: any, item: any) => sum + item.price * item.quantity,
    0
  );
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <span className="hidden font-bold text-xl sm:inline-block">
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
          <form className="flex-1 md:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-background/50"
              />
            </div>
          </form>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-auto relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
                <SheetDescription>
                  You have {totalItems} items in your cart
                </SheetDescription>
              </SheetHeader>
              <div className="mt-8 space-y-4">
                {cart.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex space-x-3">
                      {/* Image */}
                      <img
                        src={item.image || ""}
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-gray-500">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between font-semibold">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <Button className="w-full">Checkout</Button>
              </div>
            </SheetContent>
          </Sheet>
          <div>
            <SignedIn>
              <Link href={"/dashboard"}>
                <Button className="flex items-center">Dashboard</Button>
              </Link>
            </SignedIn>
          </div>
          <div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}
