"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  ShoppingBag,
  User,
  Gift,
  CreditCard,
  Edit,
  Truck,
  X,
} from "lucide-react";
import { useOrder } from "@/store/orders";
import Link from "next/link";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OrderProduct {
  id: string;
  name: string;
  quantity: number;
  price: string;
}

interface Order {
  id: string;
  date: string;
  total: string;
  status: string;
  products: OrderProduct[];
}

interface CustomerProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export default function OrderDashboard() {
  const { orders, fetchOrders, updateStatus } = useOrder();
  const [profile, setProfile] = useState<CustomerProfile>({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, AN 12345",
  });

  const handleStatusChange = async (
    orderId: string,
    newStatus: "Delivered" | "Cancelled" | "Pending" | "Processing"
  ) => {
    await axios.put("/api/order", {
      orderId: orderId,
      status: newStatus,
    });
    fetchOrders();
  };
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const [selectedOrder, setSelectedOrder] = useState<any>();
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);

  const handleEditProfile = () => {
    setProfile(editedProfile);
    setIsEditProfileModalOpen(false);
  };

  const handleViewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };

  const handleCancelOrder = (orderId: number) => {
    updateStatus(orderId, "Cancelled");
    setIsOrderDetailsOpen(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  const OrdersTab = () => (
    <Card>
      <CardHeader>
        <CardTitle>Store Orders</CardTitle>
        <CardDescription>View and manage your recent orders</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.createdAt.toLocaleString()}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === "Delivered" ? "default" : "secondary"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewOrderDetails(order)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      <OrdersTab />

      <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>Order ID: {selectedOrder?.id}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedOrder?.products.map((product: any) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Link href={`/shop/${product.productId}`}>
                        {product.product.title}
                      </Link>
                    </TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{product.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 flex justify-between items-center">
              <span className="font-semibold">Total:</span>
              <span>{selectedOrder?.total}</span>
            </div>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  onValueChange={(
                    value: "Delivered" | "Cancelled" | "Pending" | "Processing"
                  ) =>
                    selectedOrder && handleStatusChange(selectedOrder.id, value)
                  }
                  defaultValue={selectedOrder?.status}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-2 flex justify-between items-center">
              <span className="font-semibold">Status:</span>
              <Badge
                variant={
                  selectedOrder?.status === "Delivered"
                    ? "default"
                    : "secondary"
                }
              >
                {selectedOrder?.status}
              </Badge>
            </div>
          </div>
          <DialogFooter>
            {selectedOrder?.status === "Pending" ||
            selectedOrder?.status === "Processing" ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Cancel Order</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently cancel
                      your order.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>No</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleCancelOrder(selectedOrder.id)}
                    >
                      Yes, Cancel Order
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Button
                variant="secondary"
                onClick={() => setIsOrderDetailsOpen(false)}
              >
                Close
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
