"use client";
import Link from "next/link";
import {
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
export default function DashboardNavMob() {
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
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            {nav.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
                  path === item.href
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground"
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
        </SheetContent>
      </Sheet>
    </header>
  );
}
