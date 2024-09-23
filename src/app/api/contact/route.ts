import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const values = await req.json();
    const message = await db.contactMessage.create({
      data: {
        ...values,
      },
    });
    return NextResponse.json(message);
  } catch (error) {
    console.log("[Messages]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const messages = await db.contactMessage.findMany();
    return NextResponse.json(messages);
  } catch (error) {
    console.log("[Messages]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
