import { NextResponse } from 'next/server';
import { logger } from '../../app/utils/logger';

export function handleApiError(error: any) {
  logger.error('API Error:', error);

  const message = error.message || 'Error interno del servidor';
  const status = error.status || 500;

  return NextResponse.json({ error: message }, { status });
}
