// app/api/payment/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Payment } from 'mercadopago';
import { mercadopago } from '@/app/config/mercadopago';
import { logger } from '@/app/utils/logger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.data?.id) {
      logger.error('Invalid webhook payload', body);
      return NextResponse.json({ success: true });
    }

    const payment = (await new Payment(mercadopago).get({
      id: String(body.data.id),
    })) as any;

    logger.info('Payment details retrieved', {
      id: payment.id,
      status: payment.status,
      external_reference: payment.external_reference,
      payer: payment.payer || {},
    });

    if (payment.status === 'approved' && payment.payer?.id) {
      logger.success('Payment approved', {
        paymentId: payment.id,
        testUser: payment.payer.id === 'TESTUSER6751802' ? 'Yes' : 'No',
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('Webhook processing error', error);
    return NextResponse.json({ success: false });
  }
}
