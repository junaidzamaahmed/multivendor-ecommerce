import db from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const users = await clerkClient.users.getUserList();
    return NextResponse.json(users.data);
  } catch (error) {
    console.log("[USERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const values = await req.json();
    const user = await clerkClient.users.updateUser(values.id, {
      publicMetadata: {
        role: values.role,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log("[USERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
