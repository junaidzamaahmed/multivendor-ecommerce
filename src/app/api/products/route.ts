import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const product = await db.product.create({
      data: {
        ...values,
        userId,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const products = await db.product.findMany({
      include: {
        category: true,
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId } = auth();
    const { id } = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    await db.product.delete({
      where: {
        id: Number(id),
      },
    });
    return new NextResponse("Product deleted successfully");
  } catch (error) {
    console.log("[PRODUCT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
