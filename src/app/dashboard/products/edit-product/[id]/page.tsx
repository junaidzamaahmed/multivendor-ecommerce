import React from "react";
import ProductForm from "./_components/edit-form";
import db from "@/lib/db";

export default async function page({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const product = await db.product.findUnique({
    where: { id },
  });
  return <ProductForm product={product} />;
}
