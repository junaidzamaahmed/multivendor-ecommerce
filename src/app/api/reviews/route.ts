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
    const review = await db.review.create({
      data: {
        ...values,
        userId,
      },
    });
    return NextResponse.json(review);
  } catch (error) {
    console.log("[REVIEW]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
