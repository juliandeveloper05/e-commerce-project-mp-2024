'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error);
    console.error('Error info:', errorInfo);

    // Here you could send the error to your error tracking service
    // e.g., Sentry, LogRocket, etc.
    this.setState({
      error,
      errorInfo,
    });
  }

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  private handleReport = () => {
    // Implement error reporting logic
    const errorDetails = {
      message: this.state.error?.message,
      stack: this.state.error?.stack,
      componentStack: this.state.errorInfo?.componentStack,
    };

    console.log('Reporting error:', errorDetails);
    // Send to your error tracking service
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-md rounded-xl bg-white p-8 shadow-xl"
          >
            <div className="mb-6 flex items-center justify-center">
              <div className="rounded-full bg-red-100 p-3">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>

            <h1 className="mb-4 text-center text-xl font-bold text-gray-900">
              Algo salió mal
            </h1>

            <p className="mb-6 text-center text-gray-600">
              Lo sentimos, ha ocurrido un error inesperado. Nuestro equipo ha
              sido notificado.
            </p>

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={this.handleRetry}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-white transition-colors hover:bg-purple-700"
              >
                <RefreshCcw className="h-4 w-4" />
                Intentar nuevamente
              </motion.button>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mt-6 rounded-lg bg-gray-50 p-4">
                  <h2 className="mb-2 text-sm font-medium text-gray-900">
                    Detalles del error (solo desarrollo):
                  </h2>
                  <pre className="overflow-auto text-xs text-gray-600">
                    {this.state.error.toString()}
                  </pre>
                  {this.state.errorInfo && (
                    <pre className="mt-2 overflow-auto text-xs text-gray-600">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
