// app/utils/notifications.ts
import { logger } from './logger';

// Tipos de notificaciones soportados
export type NotificationType =
  | 'payment.success'
  | 'payment.failed'
  | 'payment.pending'
  | 'order.created'
  | 'order.updated'
  | 'order.cancelled'
  | 'system.error'
  | 'system.warning';

// Canales de notificación disponibles
export type NotificationChannel =
  | 'email'
  | 'sms'
  | 'webhook'
  | 'slack'
  | 'console';

// Prioridad de las notificaciones
export type NotificationPriority = 'low' | 'medium' | 'high' | 'critical';

// Interfaz base para notificaciones
export interface BaseNotification {
  type: NotificationType;
  title: string;
  message: string;
  priority: NotificationPriority;
  timestamp?: Date;
  channels?: NotificationChannel[];
  data?: Record<string, unknown>;
}

// Interfaz específica para notificaciones de pago
export interface PaymentNotification extends BaseNotification {
  type: 'payment.success' | 'payment.failed' | 'payment.pending';
  data: {
    orderId: string;
    paymentId: string;
    amount: number;
    status: string;
    customerEmail?: string;
  };
}

// Interfaz específica para notificaciones de orden
export interface OrderNotification extends BaseNotification {
  type: 'order.created' | 'order.updated' | 'order.cancelled';
  data: {
    orderId: string;
    status: string;
    customer: {
      email: string;
      name?: string;
    };
    items?: Array<{
      id: string;
      name: string;
      quantity: number;
    }>;
  };
}

// Interfaz específica para notificaciones del sistema
export interface SystemNotification extends BaseNotification {
  type: 'system.error' | 'system.warning';
  data: {
    error?: Error;
    context?: string;
    severity: string;
    componentName: string;
  };
}

// Tipo unión de todas las notificaciones
export type Notification =
  | PaymentNotification
  | OrderNotification
  | SystemNotification;

// Configuración de canales de notificación
interface NotificationChannelConfig {
  enabled: boolean;
  priority: NotificationPriority[];
  config?: Record<string, unknown>;
}

// Clase para manejar el envío de notificaciones
class NotificationService {
  private channels: Map<NotificationChannel, NotificationChannelConfig>;

  constructor() {
    this.channels = new Map([
      [
        'console',
        {
          enabled: true,
          priority: ['low', 'medium', 'high', 'critical'],
        },
      ],
      [
        'email',
        {
          enabled: process.env.EMAIL_NOTIFICATIONS === 'true',
          priority: ['high', 'critical'],
          config: {
            from: process.env.EMAIL_FROM,
            apiKey: process.env.EMAIL_API_KEY,
          },
        },
      ],
      [
        'slack',
        {
          enabled: process.env.SLACK_WEBHOOK_URL !== undefined,
          priority: ['high', 'critical'],
          config: {
            webhookUrl: process.env.SLACK_WEBHOOK_URL,
          },
        },
      ],
    ]);
  }

  private async sendToChannel(
    channel: NotificationChannel,
    notification: Notification,
  ): Promise<boolean> {
    const channelConfig = this.channels.get(channel);

    if (
      !channelConfig?.enabled ||
      !channelConfig.priority.includes(notification.priority)
    ) {
      return false;
    }

    try {
      switch (channel) {
        case 'console':
          this.sendToConsole(notification);
          break;
        case 'email':
          await this.sendToEmail(notification);
          break;
        case 'slack':
          await this.sendToSlack(notification);
          break;
        // Añadir más canales según sea necesario
      }
      return true;
    } catch (error) {
      logger.error(`Failed to send notification to ${channel}`, error);
      return false;
    }
  }

  private sendToConsole(notification: Notification): void {
    const emoji = this.getNotificationEmoji(notification.type);
    console.log(`\n${emoji} ${notification.title}`, {
      type: notification.type,
      message: notification.message,
      priority: notification.priority,
      timestamp: notification.timestamp || new Date(),
      data: notification.data,
    });
  }

  private async sendToEmail(notification: Notification): Promise<void> {
    // Implementar lógica de envío de email
    // Por ejemplo, usando SendGrid, NodeMailer, etc.
    logger.info('Email notification would be sent here', notification);
  }

  private async sendToSlack(notification: Notification): Promise<void> {
    // Implementar lógica de envío a Slack
    // Por ejemplo, usando Webhook de Slack
    logger.info('Slack notification would be sent here', notification);
  }

  private getNotificationEmoji(type: NotificationType): string {
    const emojiMap: Record<NotificationType, string> = {
      'payment.success': '💰',
      'payment.failed': '❌',
      'payment.pending': '⏳',
      'order.created': '📦',
      'order.updated': '📝',
      'order.cancelled': '🚫',
      'system.error': '🔥',
      'system.warning': '⚠️',
    };
    return emojiMap[type] || '📢';
  }

  public async notify(notification: Notification): Promise<void> {
    notification.timestamp = notification.timestamp || new Date();

    const results = await Promise.all(
      Array.from(this.channels.keys()).map((channel) =>
        this.sendToChannel(channel, notification),
      ),
    );

    const sentCount = results.filter(Boolean).length;
    if (sentCount === 0) {
      logger.warn('Notification was not sent to any channel', notification);
    }
  }
}

// Exportar una instancia singleton del servicio
export const notificationService = new NotificationService();

// Función helper para notificar estados de pago
export async function notifyPaymentStatus({
  orderId,
  status,
  amount,
  payerEmail,
}: {
  orderId: string;
  status: string;
  amount: number;
  payerEmail?: string;
}): Promise<void> {
  const notification: PaymentNotification = {
    type:
      status === 'approved'
        ? 'payment.success'
        : status === 'rejected'
        ? 'payment.failed'
        : 'payment.pending',
    title: `Pago ${
      status === 'approved'
        ? 'exitoso'
        : status === 'rejected'
        ? 'rechazado'
        : 'pendiente'
    }`,
    message: `Se ha ${
      status === 'approved'
        ? 'recibido'
        : status === 'rejected'
        ? 'rechazado'
        : 'registrado'
    } un pago por ${formatCurrency(amount)}`,
    priority:
      status === 'approved'
        ? 'high'
        : status === 'rejected'
        ? 'high'
        : 'medium',
    data: {
      orderId,
      paymentId: orderId, // Asumiendo que usamos el mismo ID
      amount,
      status,
      customerEmail: payerEmail,
    },
  };

  await notificationService.notify(notification);
}

// Helper para formatear moneda
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(amount);
}
