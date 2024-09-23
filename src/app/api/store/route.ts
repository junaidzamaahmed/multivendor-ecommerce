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
    const [store, updateUser] = await db.$transaction(async (db) => {
      const store = await db.store.create({
        data: {
          ...values,
          users: {
            connect: {
              id: userId,
            },
          },
        },
      });
      const updateUser = await db.user.update({
        where: {
          id: userId,
        },
        data: {
          storeId: store.id,
        },
      });
      return [store, updateUser];
    });
    return NextResponse.json([store, updateUser]);
  } catch (error) {
    console.log("[STORE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const store = await db.store.findMany({
      // where: {
      //   users: {
      //     some: {
      //       id: userId,
      //     },
      //   },
      // },
      include: {
        // users: true,
        products: true,
        // orders: true,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE]", error);
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
    const store = await db.store.update({
      where: {
        id: values.id,
      },
      data: values,
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
