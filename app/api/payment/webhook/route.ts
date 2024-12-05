// app/api/payment/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Payment } from 'mercadopago';
import { mercadopago } from '@/app/config/mercadopago';
import { logger } from '@/app/utils/logger';
import { dbConnect } from '@/app/utils/db';
import Order from '@/app/model/Order';
import { sendNotification } from '@/app/utils/notifications';

interface PaymentWebhookData {
  id: string;
  status: string;
  external_reference: string;
  transaction_amount: number;
  payer?: {
    email?: string;
    identification?: {
      type?: string;
      number?: string;
    };
  };
  transaction_details?: {
    payment_method_id?: string;
    installments?: number;
  };
}

interface WebhookBody {
  type: string;
  data: {
    id: string;
  };
  action?: string;
}

async function validateWebhookData(body: unknown): Promise<WebhookBody> {
  if (!body || typeof body !== 'object') {
    throw new Error('Invalid webhook body');
  }

  const webhookData = body as WebhookBody;
  if (!webhookData.data?.id) {
    throw new Error('Missing payment ID in webhook data');
  }

  return webhookData;
}

async function processApprovedPayment(paymentData: PaymentWebhookData) {
  const order = await Order.findOneAndUpdate(
    { reference_id: paymentData.external_reference },
    {
      status: 'approved',
      paymentId: paymentData.id,
      paymentDetails: paymentData,
      updatedAt: new Date(),
    },
    { new: true },
  );

  if (!order) {
    logger.warn('Order not found for approved payment', {
      paymentId: paymentData.id,
      referenceId: paymentData.external_reference,
    });
    return;
  }

  // Registrar el pago exitoso
  logger.payment.success(order._id.toString(), paymentData.id, {
    amount: paymentData.transaction_amount,
    payerEmail: paymentData.payer?.email,
    paymentMethod: paymentData.transaction_details?.payment_method_id,
  });

  // Enviar notificación
  await sendNotification({
    type: 'payment_success',
    title: 'Pago Aprobado',
    message: `Se ha recibido un pago por $${paymentData.transaction_amount}`,
    data: {
      orderId: order._id,
      paymentId: paymentData.id,
      amount: paymentData.transaction_amount,
      customerEmail: paymentData.payer?.email,
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validar datos del webhook
    const webhookData = await validateWebhookData(body);

    // Registrar recepción del webhook
    logger.payment.webhook(webhookData.type, {
      action: webhookData.action,
      paymentId: webhookData.data.id,
    });

    // Conectar a la base de datos
    await dbConnect();

    // Obtener datos del pago
    const paymentData = (await new Payment(mercadopago).get({
      id: String(webhookData.data.id),
    })) as unknown as PaymentWebhookData;

    // Procesar según el estado del pago
    switch (paymentData.status) {
      case 'approved':
        await processApprovedPayment(paymentData);
        break;

      case 'rejected':
        logger.payment.failed(paymentData.external_reference, {
          status: 'rejected',
          paymentId: paymentData.id,
        });
        break;

      default:
        logger.info('Payment status updated', {
          status: paymentData.status,
          paymentId: paymentData.id,
        });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('Webhook processing error', error);

    return NextResponse.json(
      {
        error: 'Webhook processing failed',
        details: process.env.NODE_ENV === 'development' ? error : undefined,
      },
      { status: 500 },
    );
  }
}
