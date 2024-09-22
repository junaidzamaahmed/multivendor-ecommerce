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
    const category = await db.category.create({
      data: {
        ...values,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[PRODUCT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const categories = await db.category.findMany();
    return NextResponse.json(categories);
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
    await db.category.delete({
      where: {
        id,
      },
    });
    return new NextResponse("Deleted", { status: 200 });
  } catch (error) {
    console.log("[PRODUCT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { userId } = auth();
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    await db.category.update({
      where: {
        id: values.id,
      },
      data: {
        ...values,
      },
    });
    return new NextResponse("Updated", { status: 200 });
  } catch (error) {
    console.log("[PRODUCT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
