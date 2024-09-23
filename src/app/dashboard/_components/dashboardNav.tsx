"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import {
  Home,
  LineChart,
  MessagesSquare,
  Package,
  Package2,
  ShoppingCart,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { usePathname } from "next/navigation";
import { useOrder } from "@/store/orders";
export default function DashboardNav() {
  const path = usePathname();
  const { orders, fetchOrders } = useOrder();
  const pendingOrders = orders.filter((order) => order.status !== "delivered");
  useEffect(() => {
    fetchOrders();
  }, []);

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
      href: "/dashboard/orders",
      badge: pendingOrders.length,
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
      icon: <MessagesSquare className="h-4 w-4" />,
      title: "Messages",
      href: "/dashboard/messages",
      badge: 0,
    },
    {
      icon: <LineChart className="h-4 w-4" />,
      title: "Analytics",
      href: "/dashboard/analytics",
      badge: 0,
    },
  ];
  return (
    <div className="flex h-full max-h-screen flex-col gap-2">
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
