import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "./_components/navbar";

export const metadata: Metadata = {
  title: "Multivendor Ecommerce",
  description: "Multivendor Ecommerce with Next.js and Prisma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        <body className="">
          <Toaster className="bg-black text-white" position="top-center" />
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
