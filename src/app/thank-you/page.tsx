import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function ThankYou() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center">
          Thank you for your order!
        </h1>
        <p className="text-center">
          We will send you a confirmation email shortly.
        </p>
        <div className="flex justify-around mt-4">
          <Link href="/my-orders">
            <Button>View Orders</Button>
          </Link>
          <Link href="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
