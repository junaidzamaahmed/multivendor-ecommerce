"use client";
import React from "react";
import Link from "next/link";
import {
  Bell,
  Home,
  LineChart,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePathname } from "next/navigation";
export default function DashboardNav() {
  const path = usePathname();
  const nav = [
    {
      icon: <Home className="h-4 w-4" />,
      title: "Dashboard",
      href: "/dashboard",
      badge: 0,
    },
    {
      icon: <ShoppingCart className="h-4 w-4" />,
      title: "Orders",
      href: "#",
      badge: 6,
    },
    {
      icon: <Package2 className="h-4 w-4" />,
      title: "Categories",
      href: "/dashboard/categories",
      badge: 0,
    },
    {
      icon: <Package className="h-4 w-4" />,
      title: "Products",
      href: "/dashboard/products",
      badge: 0,
    },
    {
      icon: <Users className="h-4 w-4" />,
      title: "Customers",
      href: "#",
      badge: 0,
    },
    {
      icon: <LineChart className="h-4 w-4" />,
      title: "Analytics",
      href: "#",
      badge: 0,
    },
  ];
  return (
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Package2 className="h-6 w-6" />
          <span className="">Acme Inc</span>
        </Link>
        <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {nav.map((item, index) => (
            <Link
              href={item.href}
              key={index}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                path === item.href ? "bg-muted text-primary" : ""
              }`}
            >
              {item.icon}
              {item.title}
              {item.badge > 0 && (
                <Badge className="ml-auto flex h-4 w-4 shrink-0 items-center justify-center rounded-full">
                  {item.badge}
                </Badge>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
