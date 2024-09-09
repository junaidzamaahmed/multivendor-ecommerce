import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

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
    <ClerkProvider>
      <html lang="en">
        <body className="">
          <Toaster className="bg-black text-white" position="top-center" />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
