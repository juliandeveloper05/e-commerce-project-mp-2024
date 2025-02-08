
import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/utils/db';
import Order from '@/app/model/Order';

export async function POST(req: Request) {
  try {
    await dbConnect();

    const orderData = await req.json();
    
    const order = new Order({
      reference_id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      status: 'pending_payment',
      items: orderData.items.map((item: any) => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size
      })),
      customer: {
        name: orderData.customerInfo.name,
        email: orderData.userEmail,
        phone: orderData.customerInfo.phone,
        address: orderData.customerInfo.address
      },
      total: orderData.total,
      comments: orderData.customerInfo.comments || '',
      createdAt: new Date()
    });

    await order.save();

    return NextResponse.json({
      message: 'Order created successfully',
      orderId: order.reference_id
    });

  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Error creating order' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    const orders = await Order.find(
      email ? { 'customer.email': email } : {}
    ).sort({ createdAt: -1 });

    return NextResponse.json(orders);

  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Error fetching orders' },
      { status: 500 }
    );
  }
}