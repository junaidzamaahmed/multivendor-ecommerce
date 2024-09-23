import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const store = await db.store.findFirst({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        users: true,
        products: {
          include: {
            orders: {
              include: {
                order: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
