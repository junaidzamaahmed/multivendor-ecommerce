"use client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/cart";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Product({
  product,
  index,
}: {
  product: any;
  index: number;
}) {
  const { addToCart } = useCart();

  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
    >
      <div className="relative aspect-square overflow-hidden">
        <Link href={`/shop/${product.id}`}>
          <img
            alt={product.title}
            className="object-cover w-full h-full transition-transform group-hover:scale-105"
            height="400"
            src={product.image || ""}
            style={{
              aspectRatio: "400/400",
              objectFit: "cover",
            }}
            width="400"
          />
        </Link>
      </div>
      <div className="flex flex-col justify-between flex-1 p-6 bg-white dark:bg-gray-950">
        <Link href={`/shop/${product.id}`}>
          <div>
            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
              {product.title}
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {product.desc?.slice(0, 40)}...
            </p>
          </div>
        </Link>
        <div className="flex items-center justify-between mt-4">
          <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
          <Button size="sm" onClick={() => addToCart(product)}>
            Add to Cart
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
