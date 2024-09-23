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
import { Label } from "@/components/ui/label";
import {
  Package,
  DollarSign,
  ShoppingCart,
  Users,
  Edit,
  Plus,
  UserPlus,
} from "lucide-react";
import { useStore } from "@/store/store";
import { useAuth } from "@clerk/nextjs";
import { useOrder } from "@/store/orders";

// interface StoreDetails {
//   name: string;
//   description: string;
//   email: string;
//   phone: string;
// }

export default function Dashboard() {
  // const [storeDetails, setStoreDetails] = useState<Store | null>(null);
  const {
    store,
    fetchUserStore,
    createStore,
    editStore,
    addAdmin,
    removeAdmin,
  } = useStore();
  const { orders, fetchOrders } = useOrder();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateStoreModalOpen, setIsCreateStoreModalOpen] = useState(false);
  const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);
  const [editedStoreDetails, setEditedStoreDetails] = useState({
    name: "",
    description: "",
    email: "",
    phone: "",
    profileImage: "",
    coverImage: "",
  });
  const [newAdminEmail, setNewAdminEmail] = useState("");

  const [recentOrders, setRecentOrders] = useState([
    { id: "1234", customer: "John Doe", total: "$129.99", status: "Completed" },
    {
      id: "1235",
      customer: "Jane Smith",
      total: "$79.99",
      status: "Processing",
    },
    {
      id: "1236",
      customer: "Bob Johnson",
      total: "$199.99",
      status: "Shipped",
    },
    { id: "1237", customer: "Alice Brown", total: "$59.99", status: "Pending" },
  ]);

  const { userId } = useAuth();
  useEffect(() => {
    fetchUserStore();
    if (store) {
      setEditedStoreDetails({
        name: store.name,
        description: store.description,
        email: store.email,
        phone: store.phone,
        profileImage: store.profileImage,
        coverImage: store.coverImage,
      });
    }
    fetchOrders();
  }, []);

  const handleCreateStore = (e: any) => {
    createStore(e, editedStoreDetails);
    setIsCreateStoreModalOpen(false);
  };

  const handleEditStore = (e: any) => {
    editStore(e, editedStoreDetails);
    setIsEditModalOpen(false);
  };

  const handleAddAdmin = (e: any) => {
    const data = new FormData(e.target);
    addAdmin(e, store.id, data.get("admin-email") as string);
    setIsAddAdminModalOpen(false);
  };

  const StoreMetrics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            $
            {store?.orders?.reduce(
              (acc: any, order: any) =>
                acc +
                order.products?.reduce(
                  (acc: any, product: any) => acc + product.price
                ),
              0
            ) || 0}
          </div>
          <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{store?.orders?.length}</div>
          <p className="text-xs text-muted-foreground">+19% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{store?.products?.length}</div>
          <p className="text-xs text-muted-foreground">
            +12 new products this month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Customer Reach</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {
              // Unique number of users who ordered from this store
              store?.orders?.reduce((acc: any, order: any) => {
                if (!acc.includes(order.userId)) {
                  acc.append(order.userId);
                }
                return acc;
              }, []).length
            }
          </div>
          <p className="text-xs text-muted-foreground">
            +573 new customers this month
          </p>
        </CardContent>
      </Card>
    </div>
  );

  const StoreDetailsCard = () => {
    return store ? (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Store Details</CardTitle>
            <div className="space-x-2">
              {/* <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Store
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Store Details</DialogTitle>
                    <DialogDescription>
                      Make changes to your store details here. Click save when
                      you&apos;re done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        defaultValue={editedStoreDetails?.name}
                        id="name"
                        value={editedStoreDetails.name}
                        onChange={(e) =>
                          setEditedStoreDetails({
                            ...editedStoreDetails,
                            name: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        defaultValue={editedStoreDetails?.description}
                        id="description"
                        value={editedStoreDetails.description}
                        onChange={(e) =>
                          setEditedStoreDetails({
                            ...editedStoreDetails,
                            description: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input
                        defaultValue={editedStoreDetails?.email}
                        id="email"
                        type="email"
                        value={editedStoreDetails.email}
                        onChange={(e) =>
                          setEditedStoreDetails({
                            ...editedStoreDetails,
                            email: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="phone" className="text-right">
                        Phone
                      </Label>
                      <Input
                        defaultValue={editedStoreDetails?.phone}
                        id="phone"
                        type="tel"
                        value={editedStoreDetails.phone}
                        onChange={(e) =>
                          setEditedStoreDetails({
                            ...editedStoreDetails,
                            phone: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="profileImage" className="text-right">
                        Profile Image
                      </Label>
                      <Input
                        defaultValue={editedStoreDetails?.profileImage}
                        id="profileImage"
                        type="url"
                        value={editedStoreDetails.profileImage}
                        onChange={(e) =>
                          setEditedStoreDetails({
                            ...editedStoreDetails,
                            profileImage: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="coverImage" className="text-right">
                        Cover Image
                      </Label>
                      <Input
                        defaultValue={editedStoreDetails?.coverImage}
                        id="coverImage"
                        type="url"
                        value={editedStoreDetails.coverImage}
                        onChange={(e) =>
                          setEditedStoreDetails({
                            ...editedStoreDetails,
                            coverImage: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleEditStore}>
                      Save changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog> */}
              <Dialog
                open={isAddAdminModalOpen}
                onOpenChange={setIsAddAdminModalOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Admin
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Admin</DialogTitle>
                    <DialogDescription>
                      Enter the email of the user you want to add as an admin to
                      your store.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={(e) => handleAddAdmin(e)}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="admin-email" className="text-right">
                          Email
                        </Label>
                        <Input
                          id="admin-email"
                          name="admin-email"
                          type="email"
                          // defaultValue={newAdminEmail}
                          // value={newAdminEmail}
                          // onChange={(e) => {
                          //   // e.preventDefault();
                          //   setNewAdminEmail(e.target.value);
                          //   console.log(e.target.value);
                          // }}
                          className="col-span-3"
                        />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button type="submit">Add Admin</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {store?.name}
            </p>
            <p>
              <strong>Description:</strong> {store?.description}
            </p>
            <p>
              <strong>Email:</strong> {store?.email}
            </p>
            <p>
              <strong>Phone:</strong> {store?.phone}
            </p>
          </div>

          {/* Admins Table */}
          <div className="mt-4">
            <h3 className="text-md font-bold">Admins</h3>
            <p className="text-xs text-muted-foreground">
              You have {store?.users?.length} admins
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {store?.users?.map((user: any) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <span className="font-semibold">{user.name}</span>
                    </TableCell>
                    <TableCell>Admin</TableCell>
                    <TableCell>
                      {userId === user.id ? null : (
                        <Button
                          onClick={() => removeAdmin(user.id)}
                          variant="outline"
                          size="sm"
                        >
                          Remove
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    ) : null;
  };

  const RecentOrdersCard = () => (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>
          You have {orders.length} recent orders
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.user.name}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <div
        // className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        {store ? (
          <>
            <StoreMetrics />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <StoreDetailsCard />
              <RecentOrdersCard />
            </div>
          </>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Welcome to the Seller Dashboard</CardTitle>
              <CardDescription>
                You haven&apos;t created a store yet. Get started by creating
                your store now!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog
                open={isCreateStoreModalOpen}
                onOpenChange={setIsCreateStoreModalOpen}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your Store
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create Your Store</DialogTitle>
                    <DialogDescription>
                      Fill in the details to create your new store.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="create-name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="create-name"
                        value={editedStoreDetails.name}
                        onChange={(e) =>
                          setEditedStoreDetails({
                            ...editedStoreDetails,
                            name: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        htmlFor="create-description"
                        className="text-right"
                      >
                        Description
                      </Label>
                      <Textarea
                        id="create-description"
                        value={editedStoreDetails.description}
                        onChange={(e) =>
                          setEditedStoreDetails({
                            ...editedStoreDetails,
                            description: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="create-email" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="create-email"
                        type="email"
                        value={editedStoreDetails.email}
                        onChange={(e) =>
                          setEditedStoreDetails({
                            ...editedStoreDetails,
                            email: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="create-phone" className="text-right">
                        Phone
                      </Label>
                      <Input
                        id="create-phone"
                        type="tel"
                        value={editedStoreDetails.phone}
                        onChange={(e) =>
                          setEditedStoreDetails({
                            ...editedStoreDetails,
                            phone: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        htmlFor="create-profileImage"
                        className="text-right"
                      >
                        Profile Image Url
                      </Label>
                      <Input
                        id="create-profileImg"
                        type="url"
                        value={editedStoreDetails.profileImage}
                        onChange={(e) =>
                          setEditedStoreDetails({
                            ...editedStoreDetails,
                            profileImage: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="create-coverImage" className="text-right">
                        Cover Image Url
                      </Label>
                      <Input
                        id="create-coverImage"
                        type="url"
                        value={editedStoreDetails.coverImage}
                        onChange={(e) =>
                          setEditedStoreDetails({
                            ...editedStoreDetails,
                            coverImage: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleCreateStore}>
                      Create Store
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
