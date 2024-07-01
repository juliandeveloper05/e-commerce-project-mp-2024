import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Mail } from 'lucide-react';

const LoginForm = () => {
  const handleGoogleLogin = () => {
    console.log('Inicio de sesión con Google simulado');
  };

  return (
    <div className="flex min-h-[calc(75vh-30px)] items-start justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 pt-16">
      <div className=" "></div>
      <div className="relative z-10 w-full max-w-md px-8 py-24 sm:px-6 lg:px-8">
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-yellow-300 opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-blue-300 opacity-50 blur-3xl"></div>
        <Card className="overflow-hidden shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-orange-400 to-rose-400 pb-6 pt-8">
            <CardTitle className="text-center text-2xl font-bold text-white">
              Iniciar Sesión
            </CardTitle>
          </CardHeader>
          <CardContent className="bg-white p-6">
            <div className="space-y-6">
              <Button
                type="button"
                variant="outline"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-gray-200 bg-white py-3 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                <Mail className="h-5 w-5 text-red-500" />
                <span>Iniciar sesión con Gmail</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
