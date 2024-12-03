import { NextRequest, NextResponse } from 'next/server';
import { Preference } from 'mercadopago';
import { mercadopago } from '../../../app/config/mercadopago';
import { logger } from '@/app/utils/logger';
import { ApiError } from '@/app/utils/errors';

interface PaymentRequestItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

interface PaymentRequestBody {
  items: PaymentRequestItem[];
  buyer?: {
    id?: string;
    email?: string;
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentRequestBody;

    if (!body.items?.length) {
      throw new ApiError('No items provided', 400);
    }

    const preference = new Preference(mercadopago);
    const result = await preference.create({
      body: {
        items: body.items.map((item) => ({
          id: item._id,
          title: item.name,
          unit_price:
            process.env.NODE_ENV === 'development' ? 100 : Number(item.price),
          quantity: Number(item.quantity),
          currency_id: 'ARS',
        })),
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_API_URL}/payment/success`,
          failure: `${process.env.NEXT_PUBLIC_API_URL}/payment/failure`,
          pending: `${process.env.NEXT_PUBLIC_API_URL}/payment/pending`,
        },
        auto_return: 'approved',
        notification_url: `${process.env.NEXT_PUBLIC_API_URL}/api/payment/webhook`,
        metadata: {
          buyer_id: body.buyer?.id,
        },
      },
    });

    return NextResponse.json({
      success: true,
      init_point: result.init_point,
    });
  } catch (error) {
    logger.error('Payment creation error', error);

    const statusCode = error instanceof ApiError ? error.statusCode : 500;
    const message =
      error instanceof Error ? error.message : 'Error processing payment';

    return NextResponse.json(
      {
        success: false,
        error: message,
        details: process.env.NODE_ENV === 'development' ? error : undefined,
      },
      { status: statusCode },
    );
  }
}
