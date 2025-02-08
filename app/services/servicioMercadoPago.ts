import { Preference, Payment } from 'mercadopago';
import { mercadopago } from '../config/mercadopago';
import { logger } from '@/app/utils/logger';
import { CartItem } from '@/app/types/cart';
import { notifyPaymentStatus } from '@/app/utils/notifications';

export interface ParametrosCrearPreferencia {
  items: CartItem[];
  comprador: {
    email: string;
    nombre?: string;
  };
  urlsRetorno?: {
    exito?: string;
    fallo?: string;
    pendiente?: string;
  };
}

class ServicioMercadoPago {
  private urlBase = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  private obtenerUrlsRetornoPredeterminadas() {
    return {
      exito: `${this.urlBase}/payment/success`,
      fallo: `${this.urlBase}/payment/failure`,
      pendiente: `${this.urlBase}/payment/pending`,
    };
  }

  async crearPreferencia({
    items,
    comprador,
    urlsRetorno,
  }: ParametrosCrearPreferencia) {
    try {
      const preference = new Preference(mercadopago);

      const datosPreferencia = {
        items: items.map((item) => ({
          id: item._id,
          title: item.name,
          unit_price: Number(item.price),
          quantity: Number(item.quantity),
          currency_id: 'ARS',
        })),
        payer: {
          email: comprador.email,
          name: comprador.nombre,
        },
        back_urls: {
          success:
            urlsRetorno?.exito ||
            this.obtenerUrlsRetornoPredeterminadas().exito,
          failure:
            urlsRetorno?.fallo ||
            this.obtenerUrlsRetornoPredeterminadas().fallo,
          pending:
            urlsRetorno?.pendiente ||
            this.obtenerUrlsRetornoPredeterminadas().pendiente,
        },
        auto_return: 'approved',
        notification_url: `${this.urlBase}/api/payment/webhook`,
        statement_descriptor: 'Maria Pancha',
      };

      const resultado = await preference.create({ body: datosPreferencia });

      logger.payment.started(
        resultado.id || '',
        items.reduce((total, item) => total + item.price * item.quantity, 0),
        { items, comprador },
      );

      return {
        preferenceId: resultado.id,
        initPoint: resultado.init_point,
      };
    } catch (error) {
      logger.error('Error al crear preferencia de pago', error);
      throw new Error('Error al crear preferencia de pago');
    }
  }

  async manejarWebhook(idPago: string) {
    try {
      const pago = new Payment(mercadopago);
      const infoPago = await pago.get({ id: idPago });

      await notifyPaymentStatus({
        orderId: idPago,
        status: infoPago.status || 'unknown',
        amount: infoPago.transaction_amount ?? 0,
        payerEmail: infoPago.payer?.email || 'unknown',
      });

      return infoPago;
    } catch (error) {
      logger.error('Error procesando webhook de pago', error);
      throw new Error('Error al procesar notificación de pago');
    }
  }
}

export const servicioMP = new ServicioMercadoPago();
