// app/utils/logger.ts

interface LoggerOptions {
  timestamp?: boolean;
  level?: 'debug' | 'info' | 'success' | 'warn' | 'error';
}

export const logger = {
  info: (message: string, data?: any) => {
    console.log('\x1b[34m%s\x1b[0m', '📘 INFO:', message);
    if (data) console.log(JSON.stringify(data, null, 2));
  },

  success: (message: string, data?: any) => {
    console.log('\x1b[32m%s\x1b[0m', '✅ SUCCESS:', message);
    if (data) console.log(JSON.stringify(data, null, 2));
  },

  error: (message: string, error: any) => {
    console.error('\x1b[31m%s\x1b[0m', '❌ ERROR:', message);
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
        ...(error as any),
      });
    } else {
      console.error(error);
    }
  },

  payment: {
    started: (orderId: string, amount: number) => {
      logger.info('Payment process started', {
        orderId,
        amount,
        timestamp: new Date().toISOString(),
      });
    },

    success: (orderId: string, transactionId: string, data?: any) => {
      logger.success('Payment successful', {
        orderId,
        transactionId,
        timestamp: new Date().toISOString(),
        ...data,
      });
    },

    failed: (orderId: string, error: any) => {
      logger.error(`Payment failed for order ${orderId}`, error);
    },

    webhook: (event: string, data: any) => {
      logger.info(`Payment webhook received: ${event}`, {
        event,
        data: logger.sanitizeData(data),
        timestamp: new Date().toISOString(),
      });
    },
  },

  sanitizeData: (data: any): any => {
    const sensitiveFields = ['password', 'token', 'secret', 'credit_card'];

    if (typeof data !== 'object' || data === null) {
      return data;
    }

    return Object.entries(data).reduce(
      (acc: any, [key, value]) => {
        if (
          sensitiveFields.some((field) => key.toLowerCase().includes(field))
        ) {
          acc[key] = '[REDACTED]';
        } else if (typeof value === 'object' && value !== null) {
          acc[key] = logger.sanitizeData(value);
        } else {
          acc[key] = value;
        }
        return acc;
      },
      Array.isArray(data) ? [] : {},
    );
  },
};

if (process.env.NODE_ENV === 'production') {
  // Add production-specific logging configuration
  // Example: Integrate with external logging service
}

export type Logger = typeof logger;
