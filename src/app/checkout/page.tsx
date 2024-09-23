"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardElement } from "@stripe/react-stripe-js";
import { Stripe } from "../_components/stripe";
import { useCart } from "@/store/cart";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [billingAddress, setBillingAddress] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 10; // Flat rate shipping for this example
  const tax = subtotal * 0.1; // 10% tax rate for this example
  const total = subtotal + shipping + tax;

  const handleShippingAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShippingAddress((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleBillingAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBillingAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSameAsShippingChange = (checked: boolean) => {
    setSameAsShipping(checked);
    if (checked) {
      setBillingAddress(shippingAddress);
    }
  };
  const { userId } = useAuth();

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const order = {
      address: shippingAddress.addressLine1,
      city: shippingAddress.city,
      state: shippingAddress.state,
      zip: shippingAddress.zipCode,
      country: shippingAddress.country,
      total: total,
      userId: userId,
    };
    console.log(cart);
    const products = cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      price: item.price,
    }));
    console.log(products);
    await axios.post("/api/order", { order, products });
    toast.success("Order placed successfully!");
    router.push("/thank-you");
  };
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <Link
            href="/"
            className="text-primary hover:underline inline-flex items-center"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Shopping
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={shippingAddress.fullName}
                        onChange={handleShippingAddressChange}
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="addressLine1">Address Line 1</Label>
                      <Input
                        id="addressLine1"
                        name="addressLine1"
                        value={shippingAddress.addressLine1}
                        onChange={handleShippingAddressChange}
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="addressLine2">Address Line 2</Label>
                      <Input
                        id="addressLine2"
                        name="addressLine2"
                        value={shippingAddress.addressLine2}
                        onChange={handleShippingAddressChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={shippingAddress.city}
                        onChange={handleShippingAddressChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        value={shippingAddress.state}
                        onChange={handleShippingAddressChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={shippingAddress.zipCode}
                        onChange={handleShippingAddressChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Select
                        name="country"
                        value={shippingAddress.country}
                        onValueChange={(value) =>
                          setShippingAddress((prev) => ({
                            ...prev,
                            country: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bd">Bangladesh</SelectItem>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sameAsShipping"
                      checked={sameAsShipping}
                      onCheckedChange={handleSameAsShippingChange}
                    />
                    <label
                      htmlFor="sameAsShipping"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Same as shipping address
                    </label>
                  </div>
                  {!sameAsShipping && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="billingFullName">Full Name</Label>
                        <Input
                          id="billingFullName"
                          name="fullName"
                          value={billingAddress.fullName}
                          onChange={handleBillingAddressChange}
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="billingAddressLine1">
                          Address Line 1
                        </Label>
                        <Input
                          id="billingAddressLine1"
                          name="addressLine1"
                          value={billingAddress.addressLine1}
                          onChange={handleBillingAddressChange}
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="billingAddressLine2">
                          Address Line 2
                        </Label>
                        <Input
                          id="billingAddressLine2"
                          name="addressLine2"
                          value={billingAddress.addressLine2}
                          onChange={handleBillingAddressChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="billingCity">City</Label>
                        <Input
                          id="billingCity"
                          name="city"
                          value={billingAddress.city}
                          onChange={handleBillingAddressChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="billingState">State</Label>
                        <Input
                          id="billingState"
                          name="state"
                          value={billingAddress.state}
                          onChange={handleBillingAddressChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="billingZipCode">ZIP Code</Label>
                        <Input
                          id="billingZipCode"
                          name="zipCode"
                          value={billingAddress.zipCode}
                          onChange={handleBillingAddressChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="billingCountry">Country</Label>
                        <Select
                          name="country"
                          value={billingAddress.country}
                          onValueChange={(value) =>
                            setBillingAddress((prev) => ({
                              ...prev,
                              country: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bd">Bangladesh</SelectItem>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="credit-card" id="credit-card" />
                      <Label htmlFor="credit-card">Credit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal">PayPal</Label>
                    </div>
                  </RadioGroup>
                  {paymentMethod === "credit-card" && (
                    <div className="mt-4">
                      <Stripe>
                        <CardElement />
                      </Stripe>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center"
                      >
                        <div>
                          <h3 className="font-semibold">{item.title}</h3>
                          {/* <p className="text-sm text-gray-500">
                            Sold by: {item.store}
                          </p> */}
                          <div className="flex items-center mt-1">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              -
                            </Button>
                            <span className="mx-2">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              +
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <div className="w-full space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
              <div className="mt-8">
                {/* <Stripe>
                  <StripeCheckout
                    clientSecret={process.env.STRIPE_CLIENT_SECRET}
                  >
                    <Button type="submit" className="w-full" size="lg">
                      Place Order
                    </Button>
                  </StripeCheckout>
                </Stripe> */}
                <Button type="submit" className="w-full" size="lg">
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
