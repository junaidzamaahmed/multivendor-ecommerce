import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const orders = await db.order.findMany({
      where: {
        userId: params.id,
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
        user: true,
      },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.log("[ORDER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
