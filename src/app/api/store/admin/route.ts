import db from "@/lib/db";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await clerkClient.users.getUserList({
      emailAddress: values.email,
    });
    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }
    const updateUser = await db.$transaction(async (db) => {
      const userUpdate = await db.user.update({
        where: {
          id: user.data[0].id,
        },
        data: {
          storeId: values.storeId,
        },
      });
      const roleUpdate = await clerkClient.users.updateUserMetadata(
        user.data[0].id,
        {
          publicMetadata: {
            role: "seller",
          },
        }
      );
      return [userUpdate, roleUpdate];
    });

    return NextResponse.json(updateUser);
  } catch (error) {
    console.log("[STORE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// Remove user from admin
export async function DELETE(req: Request) {
  try {
    const { userId } = auth();
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updateUser = await db.$transaction(async (db) => {
      const updateUser = await db.user.update({
        where: {
          id: values.id,
        },
        data: {
          storeId: null,
        },
      });
      const roleUpdate = await clerkClient.users.updateUserMetadata(values.id, {
        publicMetadata: {
          role: "user",
        },
      });
      return [updateUser, roleUpdate];
    });

    return NextResponse.json(updateUser);
  } catch (error) {
    console.log("[STORE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
