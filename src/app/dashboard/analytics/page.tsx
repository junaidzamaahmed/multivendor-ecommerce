"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  ArrowDown,
  ArrowUp,
  DollarSign,
  ShoppingBag,
  Users,
  Calendar,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useOrder } from "@/store/orders";
import { useCategories } from "@/store/categories";

const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4500 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 5500 },
];

const categoryData = [
  { name: "Electronics", value: 400 },
  { name: "Clothing", value: 300 },
  { name: "Home & Garden", value: 200 },
  { name: "Books", value: 100 },
];

// const topSellingProducts = [
//   { id: 1, name: "Wireless Earbuds", sales: 1234, revenue: 98720 },
//   { id: 2, name: "Smart Watch", sales: 987, revenue: 197400 },
//   { id: 3, name: "Laptop Backpack", sales: 876, revenue: 52560 },
//   { id: 4, name: "4K Monitor", sales: 765, revenue: 229500 },
//   { id: 5, name: "Ergonomic Keyboard", sales: 654, revenue: 85020 },
// ];

const COLORS = ["#FF8042", "#00C49F", , "#0088FE", "#FFBB28"];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("last-30-days");

  const { orders, fetchOrders } = useOrder();
  const { categories, fetchCategories } = useCategories();

  useEffect(() => {
    fetchOrders();
    fetchCategories();
  }, []);
  const totalRevenue = orders.reduce(
    (acc: number, order: any) => acc + order.total,
    0
  );
  const uniqueCustomers = new Set(orders.map((order: any) => order.userId))
    .size;
  const averageOrderQuantity = (
    orders.reduce(
      (acc: number, order: any) =>
        acc +
        order.products.reduce(
          (acc: number, product: any) => acc + product.quantity,
          0
        ),
      0
    ) / orders.length
  ).toFixed(0);

  const revenueByCategory: any = [];
  const salesByCategory = orders.reduce((acc: any, order: any) => {
    order.products.forEach((product: any) => {
      const category = categories.find(
        (category: any) => category.id === product.product.categoryId
      );
      if (category) {
        if (acc[category.name]) {
          acc[category.name].sales += product.quantity;
          acc[category.name].revenue += product.price * product.quantity;
        } else {
          acc[category.name] = {
            sales: product.quantity,
            revenue: product.price * product.quantity,
          };
          revenueByCategory.push({
            name: category.name,
            revenue: product.price * product.quantity,
          });
        }
      }
    });
    return acc;
  }, {});

  //   const topSellingProducts = orders
  //     ? orders?.reduce((acc: any, order: any) => {
  //         order.products.forEach((product: any) => {
  //           if (acc[product.productId]) {
  //             acc[product.productId].sales += product.quantity;
  //             acc[product.productId].revenue += product.price * product.quantity;
  //           } else {
  //             acc[product.productId] = {
  //               name: product.product.name,
  //               sales: product.quantity,
  //               revenue: product.price * product.quantity,
  //             };
  //           }
  //         });

  //         return acc;
  //       }, {})
  //     : [];

  const topSellingProducts = orders?.reduce((acc: any, order: any) => {
    order.products.forEach((product: any) => {
      if (acc[product.productId]) {
        acc[product.productId].sales += product.quantity;
        acc[product.productId].revenue += product.price * product.quantity;
      } else {
        acc[product.productId] = {
          id: product.productId,
          name: product.product.title,
          sales: product.quantity,
          revenue: product.price * product.quantity,
        };
      }
    });
    return acc;
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-8">Analytics</h1>
        <div className="mb-8">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7-days">Last 7 days</SelectItem>
              <SelectItem value="last-30-days">Last 30 days</SelectItem>
              <SelectItem value="last-90-days">Last 90 days</SelectItem>
              <SelectItem value="year-to-date">Year to date</SelectItem>
              <SelectItem value="all-time">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue}</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Orders
              </CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
              <p className="text-xs text-muted-foreground">
                +15.3% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                New Customers
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{uniqueCustomers}</div>
              <p className="text-xs text-muted-foreground">
                +10.5% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Order Quantity
              </CardTitle>
              <ArrowUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageOrderQuantity}</div>
              <p className="text-xs text-muted-foreground">
                +2.1% from last month
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-8 mt-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={revenueByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="revenue"
                    label={({
                      name,
                      percent,
                    }: {
                      name: string;
                      percent: number;
                    }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {Object.entries(salesByCategory)?.map(
                      (entry: any, index: number) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      )
                    )}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Total Sales</TableHead>
                  <TableHead>Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topSellingProducts?.map((product: any) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.sales}</TableCell>
                    <TableCell>${product.revenue.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
