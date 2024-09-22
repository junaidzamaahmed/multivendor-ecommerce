import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const customers = await db.user.findMany({
      include: {
        orders: {
          include: {
            products: true,
          },
        },
      },
    });

    const customerData = customers.map((customer) => ({
      id: customer.id,
      name: customer.name,
      email: 'akib@gmail.com', // Assuming email field exists
      phone: '+8801972683868', // Assuming phone field exists
      purchaseHistory: customer.orders.map((order) => ({
        id: order.id,
        date: order.createdAt,
        items: order.products.map((product) => product.title),
        total: order.products.reduce((sum, product) => sum + product.price, 0),
      })),
    }));

    return NextResponse.json(customerData);
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.error();
  }
}