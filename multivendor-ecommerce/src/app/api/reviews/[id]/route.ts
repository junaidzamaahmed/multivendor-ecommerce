import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const reviews = await db.review.findMany({
      where: {
        productId: Number(params.id),
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.log("[REVIEW]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
