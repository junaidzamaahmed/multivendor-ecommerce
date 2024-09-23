"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Users, Store, Package, Search, Edit } from "lucide-react";
import axios from "axios";
import { useStore } from "@/store/store";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const { stores, fetchStores } = useStore();
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await axios.get("/api/users");
      setUsers(users.data);
      console.log(users.data);
    };
    fetchUsers();
    fetchStores();
  }, []);

  const [selectedUser, setSelectedUser] = useState<any>();
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<any>();
  const [isStoreDialogOpen, setIsStoreDialogOpen] = useState(false);

  const handleRoleChange = async (
    userId: string,
    newRole: "user" | "seller" | "admin"
  ) => {
    await axios.put("/api/users", {
      id: userId,
      role: newRole,
    });
    const users = await axios.get("/api/users");
    setUsers(users.data);
    setIsUserDialogOpen(false);
  };

  const UserManagementTab = () => (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>Manage user roles and permissions</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: any) => (
              <TableRow key={user.id}>
                <TableCell>{user.firstName + " " + user.lastName}</TableCell>
                <TableCell>{user.emailAddresses[0].emailAddress}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.publicMetadata.role === "admin"
                        ? "destructive"
                        : "default"
                    }
                  >
                    {user.publicMetadata.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Dialog
                    open={isUserDialogOpen}
                    onOpenChange={setIsUserDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedUser(user)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Role
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit User Role</DialogTitle>
                        <DialogDescription>
                          Change the role for user {selectedUser?.name}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="role" className="text-right">
                            Role
                          </Label>
                          <Select
                            onValueChange={(
                              value: "user" | "seller" | "admin"
                            ) =>
                              selectedUser &&
                              handleRoleChange(selectedUser.id, value)
                            }
                            defaultValue={selectedUser?.publicMetadata.role}
                          >
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="user">User</SelectItem>
                              <SelectItem value="seller">Seller</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          type="submit"
                          onClick={() => setIsUserDialogOpen(false)}
                        >
                          Save changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const StoreManagementTab = () => (
    <Card>
      <CardHeader>
        <CardTitle>Store Management</CardTitle>
        <CardDescription>View and manage stores</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Store Name</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stores.map((store) => (
              <TableRow key={store.id}>
                <TableCell>{store.name}</TableCell>
                <TableCell>{store.owner}</TableCell>
                <TableCell>{store.products.length}</TableCell>
                <TableCell>
                  <Dialog
                    open={isStoreDialogOpen}
                    onOpenChange={setIsStoreDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedStore(store)}
                      >
                        View Products
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px]">
                      <DialogHeader>
                        <DialogTitle>
                          {selectedStore?.name} Products
                        </DialogTitle>
                        <DialogDescription>
                          Products available in {selectedStore?.name}
                        </DialogDescription>
                      </DialogHeader>
                      <Table>
                        <ScrollArea className="max-h-[70vh] overflow-y-scroll">
                          <TableHeader>
                            <TableRow>
                              <TableHead>Product Name</TableHead>
                              <TableHead>Price</TableHead>
                              <TableHead>Stock</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedStore?.products.map((product: any) => (
                              <TableRow key={product.id} className="min-w-96">
                                <TableCell>{product.title}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.stock}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </ScrollArea>
                      </Table>
                      <DialogFooter>
                        <Button
                          type="button"
                          onClick={() => setIsStoreDialogOpen(false)}
                        >
                          Close
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
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
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stores</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stores.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stores.reduce(
                (total, store) => total + store.products.length,
                0
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users, stores, or products"
            className="pl-8"
          />
        </div>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users" className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Users
          </TabsTrigger>
          <TabsTrigger value="stores" className="flex items-center">
            <Store className="h-4 w-4 mr-2" />
            Stores
          </TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <UserManagementTab />
        </TabsContent>
        <TabsContent value="stores">
          <StoreManagementTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
