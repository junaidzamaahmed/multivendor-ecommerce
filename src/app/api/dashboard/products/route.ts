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
