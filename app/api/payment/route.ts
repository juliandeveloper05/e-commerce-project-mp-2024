import { NextRequest, NextResponse } from 'next/server';
import { Preference } from 'mercadopago';
import { mercadopago } from '@/app/config/mercadopago';
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

const getBaseUrl = () => {
  if (process.env.VERCEL_ENV === 'production') {
    return 'https://mariapancha.vercel.app';
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'http://localhost:3000';
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentRequestBody;

    if (!body.items?.length) {
      throw new ApiError('No items provided', 400);
    }

    const preference = new Preference(mercadopago);
    const preferenceData = {
      items: body.items.map((item) => ({
        id: item._id,
        title: item.name,
        unit_price:
          process.env.NODE_ENV === 'development' ? 100 : Number(item.price),
        quantity: Number(item.quantity),
        currency_id: 'ARS',
      })),
      back_urls: {
        success: `${getBaseUrl()}/payment/success`,
        failure: `${getBaseUrl()}/payment/failure`,
        pending: `${getBaseUrl()}/payment/pending`,
      },
      auto_return: 'approved',
      notification_url: `${getBaseUrl()}/api/payment/webhook`,
      statement_descriptor: 'MARIA PANCHA',
      metadata: {
        buyer_id: body.buyer?.id,
        buyer_email: body.buyer?.email,
      },
      payer: {
        email: body.buyer?.email,
      },
      payment_methods: {
        excluded_payment_types: [{ id: 'ticket' }],
        installments: 1,
      },
    };

    logger.info('Creating payment preference', {
      items: preferenceData.items,
      buyerId: body.buyer?.id,
      notificationUrl: preferenceData.notification_url,
    });

    const result = await preference.create({ body: preferenceData });

    return NextResponse.json({
      success: true,
      init_point: result.init_point,
      preference_id: result.id,
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
