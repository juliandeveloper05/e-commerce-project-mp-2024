import { MercadoPagoConfig } from 'mercadopago';
import { logger } from '@/app/utils/logger';

interface ConfiguracionMercadoPago {
  accessToken: string;
  publicKey: string;
  esProduccion: boolean;
}

function validarConfiguracionMercadoPago(): ConfiguracionMercadoPago {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  const publicKey = process.env.MERCADOPAGO_PUBLIC_KEY;
  const esProduccion = process.env.NODE_ENV === 'production';

  if (!accessToken) {
    const error = new Error('MERCADOPAGO_ACCESS_TOKEN debe estar definido');
    logger.error('Error en configuración de MercadoPago', { error });
    throw error;
  }

  if (!publicKey) {
    const error = new Error('MERCADOPAGO_PUBLIC_KEY debe estar definido');
    logger.error('Error en configuración de MercadoPago', { error });
    throw error;
  }

  return { accessToken, publicKey, esProduccion };
}

export const configuracionMP = validarConfiguracionMercadoPago();

export const mercadopago = new MercadoPagoConfig({
  accessToken: configuracionMP.accessToken,
});

// Exportar configuración para uso del lado del cliente (solo public key)
export const configuracionPublicaMP = {
  publicKey: configuracionMP.publicKey,
  esProduccion: configuracionMP.esProduccion,
};
