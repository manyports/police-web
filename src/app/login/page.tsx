"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Check, Shield, LogIn } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Login form component that uses useSearchParams
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, loading, clearError } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const registered = searchParams.get('registered');
  const callbackUrl = searchParams.get('callbackUrl');
  
  // Clear error when component unmounts or inputs change
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [email, password, clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[80%] mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* Left side with branding and info */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="text-center lg:text-left">
              <Link href="/" className="inline-block mb-4">
                <div className="flex items-center gap-2 text-2xl font-medium">
                  <Shield className="h-8 w-8 text-primary" />
                  <span>Police<span className="text-primary">Train</span></span>
                </div>
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Вход в систему</h1>
              <p className="mt-3 text-muted-foreground max-w-md mx-auto lg:mx-0">
                Войдите, чтобы получить доступ к платформе тренировки полицейских и начать обучение.
              </p>
            </div>
            
            <div className="hidden lg:block">
              <div className="bg-primary/5 p-6 rounded-lg border border-primary/10">
                <h3 className="font-medium text-lg mb-2">Преимущества платформы</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Интерактивные сценарии обучения</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Детальная аналитика успеваемости</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Актуальные учебные материалы</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Right side with login form */}
          <div className="w-full lg:w-1/2">
            <Card className="w-full shadow-lg border-0 bg-card">
              <CardHeader className="space-y-1 pb-2">
                <CardTitle className="text-xl font-semibold">Авторизация</CardTitle>
                <CardDescription>
                  Введите ваши данные для входа
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pb-3">
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                {registered && (
                  <Alert className="mb-4 border-green-200 text-green-800 bg-green-50">
                    <Check className="h-4 w-4 text-green-600" />
                    <AlertDescription>Регистрация успешна! Теперь вы можете войти.</AlertDescription>
                  </Alert>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-10"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-sm font-medium">Пароль</Label>
                      <Link 
                        href="/forgot-password" 
                        className="text-xs text-primary underline-offset-4 hover:underline"
                      >
                        Забыли пароль?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-10"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full h-10"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Вход...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <LogIn className="mr-2 h-4 w-4" /> Войти
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
              
              <div className="px-6 py-3">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      или
                    </span>
                  </div>
                </div>
              </div>
              
              <CardFooter className="flex flex-col pt-0">
                <p className="text-sm text-center text-muted-foreground mb-4">
                  Еще нет аккаунта?{' '}
                  <Link 
                    href="/register" 
                    className="text-primary underline-offset-4 hover:underline font-medium"
                  >
                    Зарегистрироваться
                  </Link>
                </p>
                
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => router.push('/')}
                >
                  Вернуться на главную
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading fallback component
const LoginPageLoading = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md mx-auto text-center">
        <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Загрузка...</h1>
        <p className="text-muted-foreground">Пожалуйста, подождите</p>
      </div>
    </div>
  );
};

// Main login page component with Suspense
const LoginPage: React.FC = () => {
  return (
    <Suspense fallback={<LoginPageLoading />}>
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage; 