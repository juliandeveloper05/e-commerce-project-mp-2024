// app/utils/logger.ts

type LogLevel = 'debug' | 'info' | 'success' | 'warn' | 'error';

interface LogMessage {
  message: string;
  data?: unknown;
  error?: Error | unknown;
  timestamp?: string;
}

interface LoggerConfig {
  enableConsole?: boolean;
  enableFileLogging?: boolean;
  logLevel?: LogLevel;
  sanitizeFields?: string[];
}

class Logger {
  private config: LoggerConfig;
  private readonly defaultSanitizedFields = [
    'password',
    'token',
    'secret',
    'credit_card',
    'cvv',
    'key',
  ];

  constructor(config: LoggerConfig = {}) {
    this.config = {
      enableConsole: true,
      enableFileLogging: process.env.NODE_ENV === 'production',
      logLevel: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
      sanitizeFields: this.defaultSanitizedFields,
      ...config,
    };
  }

  private formatMessage({
    message,
    data,
    error,
    timestamp = new Date().toISOString(),
  }: LogMessage): string {
    const baseMessage = `[${timestamp}] ${message}`;
    const details = [];

    if (data) {
      details.push(
        `\nData: ${JSON.stringify(this.sanitizeData(data), null, 2)}`,
      );
    }

    if (error) {
      if (error instanceof Error) {
        details.push(`\nError: ${error.message}\nStack: ${error.stack}`);
      } else {
        details.push(`\nError: ${JSON.stringify(error)}`);
      }
    }

    return `${baseMessage}${details.join('')}`;
  }

  private sanitizeData(data: unknown): unknown {
    if (!data || typeof data !== 'object') {
      return data;
    }

    const sanitizedData = { ...(data as object) };
    const fieldsToSanitize = new Set([
      ...this.defaultSanitizedFields,
      ...(this.config.sanitizeFields || []),
    ]);

    for (const [key, value] of Object.entries(sanitizedData)) {
      if (fieldsToSanitize.has(key.toLowerCase())) {
        (sanitizedData as any)[key] = '[REDACTED]';
      } else if (typeof value === 'object' && value !== null) {
        (sanitizedData as any)[key] = this.sanitizeData(value);
      }
    }

    return sanitizedData;
  }

  debug(message: string, data?: unknown) {
    if (this.config.logLevel === 'debug') {
      console.log(
        '\x1b[36m%s\x1b[0m',
        '🔍 DEBUG:',
        this.formatMessage({ message, data }),
      );
    }
  }

  info(message: string, data?: unknown) {
    console.log(
      '\x1b[34m%s\x1b[0m',
      '📘 INFO:',
      this.formatMessage({ message, data }),
    );
  }

  success(message: string, data?: unknown) {
    console.log(
      '\x1b[32m%s\x1b[0m',
      '✅ SUCCESS:',
      this.formatMessage({ message, data }),
    );
  }

  warn(message: string, data?: unknown) {
    console.warn(
      '\x1b[33m%s\x1b[0m',
      '⚠️ WARNING:',
      this.formatMessage({ message, data }),
    );
  }

  error(message: string, error?: unknown) {
    console.error(
      '\x1b[31m%s\x1b[0m',
      '❌ ERROR:',
      this.formatMessage({ message, error }),
    );
  }

  payment = {
    started: (orderId: string, amount: number, metadata?: unknown) => {
      this.info('Payment process started', {
        orderId,
        amount,
        metadata,
        timestamp: new Date().toISOString(),
      });
    },

    success: (orderId: string, transactionId: string, data?: unknown) => {
      this.success('Payment successful', {
        orderId,
        transactionId,
        data,
        timestamp: new Date().toISOString(),
      });
    },

    failed: (orderId: string, error: unknown) => {
      this.error(`Payment failed for order ${orderId}`, error);
    },

    webhook: (event: string, data: unknown) => {
      this.info(`Payment webhook received: ${event}`, {
        event,
        data: this.sanitizeData(data),
        timestamp: new Date().toISOString(),
      });
    },
  };
}

// Exportar una instancia singleton del logger
export const logger = new Logger({
  enableConsole: true,
  logLevel: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
});
