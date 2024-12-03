'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import { logger } from '@/app/utils/logger';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class PaymentErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error('Payment error:', {
      error,
      componentStack: errorInfo.componentStack,
    });
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
          <div className="mx-auto max-w-md rounded-xl bg-white p-8 shadow-xl">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-red-100 p-3">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>

            <h1 className="mb-4 text-center text-xl font-bold text-gray-900">
              Error en el proceso de pago
            </h1>

            <p className="mb-6 text-center text-gray-600">
              Lo sentimos, ha ocurrido un error durante el proceso de pago. Por
              favor, intenta nuevamente o contacta con soporte.
            </p>

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={this.handleRetry}
                className="w-full rounded-lg bg-purple-600 py-2 text-white transition-colors hover:bg-purple-700"
              >
                <RefreshCcw className="mr-2 inline-block h-4 w-4" />
                Intentar nuevamente
              </motion.button>

              <Link href="/cart">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-lg border border-purple-600 py-2 text-purple-600 transition-colors hover:bg-purple-50"
                >
                  Volver al carrito
                </motion.button>
              </Link>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mt-6 rounded-lg bg-gray-50 p-4">
                <h2 className="mb-2 text-sm font-medium text-gray-900">
                  Detalles del error (desarrollo):
                </h2>
                <pre className="overflow-auto text-xs text-gray-600">
                  {this.state.error.toString()}
                </pre>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default PaymentErrorBoundary;
