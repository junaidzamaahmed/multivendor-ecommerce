import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const stores = await db.store.findFirst({
      where: {
        id: Number(params.id),
      },
      include: {
        products: {
          include: {
            reviews: true,
          },
        },
      },
    });
    return NextResponse.json(stores);
  } catch (error) {
    console.log("[STORES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
