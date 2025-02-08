import { NextRequest, NextResponse } from 'next/server';
import { servicioMP } from '@/app/services/servicioMercadoPago';
import { logger } from '@/app/utils/logger';
import { ApiError } from '@/app/utils/errors';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.items?.length) {
      throw new ApiError('No se proporcionaron items', 400);
    }

    if (!body.comprador?.email) {
      throw new ApiError('El email del comprador es requerido', 400);
    }

    const resultado = await servicioMP.crearPreferencia({
      items: body.items,
      comprador: body.comprador,
    });

    return NextResponse.json({
      success: true,
      init_point: resultado.initPoint,
      preference_id: resultado.preferenceId,
    });
  } catch (error) {
    logger.error('Error al crear pago:', error);

    if (error instanceof ApiError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.statusCode },
      );
    }

    return NextResponse.json(
      { success: false, error: 'Error al procesar el pago' },
      { status: 500 },
    );
  }
}
