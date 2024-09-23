import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const values = await req.json();
    const order = await db.$transaction(async (db) => {
      const orderCreated = await db.order.create({
        data: {
          ...values.order,
        },
      });
      console.log(values.products);
      const orderItemCreated = await db.productOrder.createMany({
        data: values.products.map((product: any) => ({
          orderId: orderCreated.id,
          productId: product.productId,
          quantity: product.quantity,
          price: product.price,
        })),
      });
      return [orderCreated, orderItemCreated];
    });
    return NextResponse.json(order);
  } catch (error) {
    console.log("[ORDER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const orders = await db.order.findMany({
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

export async function PUT(req: Request) {
  try {
    const { status, orderId } = await req.json();
    const order = await db.order.update({
      where: { id: Number(orderId) },
      data: { status },
    });
    return NextResponse.json(order);
  } catch (error) {
    console.log("[ORDER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
