import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const products = await db.product.findMany({
      where: {
        storeId: Number(params.storeId),
      },
      include: {
        category: true,
        Store: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
