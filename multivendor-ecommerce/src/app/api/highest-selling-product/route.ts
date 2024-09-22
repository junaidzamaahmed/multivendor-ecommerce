import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch the highest selling product
    const highestSellingProduct = await db.product.findFirst({
      orderBy: {
        orders: {
          _count: 'desc',
        },
      },
      include: {
        category: true,
      },
    });

    // If no product is found, return a 404
    if (!highestSellingProduct) {
      return new NextResponse("No products found", { status: 404 });
    }

    return NextResponse.json(highestSellingProduct);
  } catch (error) {
    console.log("[HIGHEST_SELLING_PRODUCT]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
