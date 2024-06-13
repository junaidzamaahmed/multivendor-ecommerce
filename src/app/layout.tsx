import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="">{children}</body>
    </html>
  );
}
