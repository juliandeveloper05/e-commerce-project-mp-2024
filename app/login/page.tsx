'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Eye, EyeOff, Mail, Facebook } from 'lucide-react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Login attempt', { email, password });
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-black">
            Iniciar Sesión
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </Button>
              </div>
            </div>
            <Button
              type="submit"
              className="focus:shadow-outline w-full transform rounded bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 px-4 py-2 font-bold text-black transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:from-yellow-500 hover:via-orange-600 hover:to-orange-700 focus:outline-none"
            >
              Iniciar Sesión
            </Button>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  O continúa con
                </span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialLogin('Gmail')}
                className="inline-flex w-full items-center justify-center gap-2"
              >
                <Mail className="h-5 w-5 text-red-500" />
                <span>Gmail</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialLogin('Facebook')}
                className="inline-flex w-full items-center justify-center gap-2"
              >
                <Facebook className="h-5 w-5 text-blue-600" />
                <span>Facebook</span>
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center pb-6">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginForm;
