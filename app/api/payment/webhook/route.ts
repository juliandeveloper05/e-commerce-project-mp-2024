import { NextRequest, NextResponse } from 'next/server';
import { servicioMP } from '@/app/services/servicioMercadoPago';
import { logger } from '@/app/utils/logger';
import { ApiError } from '@/app/utils/errors';

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    if (!payload?.data?.id) {
      throw new ApiError('Payload de webhook inválido', 400);
    }

    const infoPago = await servicioMP.manejarWebhook(payload.data.id);

    return NextResponse.json({
      received: true,
      status: infoPago.status,
    });
  } catch (error) {
    logger.error('Error procesando webhook:', error);

    return NextResponse.json(
      { error: 'Error al procesar webhook' },
      { status: 500 },
    );
  }
}
