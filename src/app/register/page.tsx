"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Shield, UserPlus, Lock, Check } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  
  const { register, error, loading, clearError } = useAuth();
  const router = useRouter();
  
  // Clear error when component unmounts or inputs change
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [username, email, password, confirmPassword, clearError]);
  
  // Check password match
  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setPasswordError('Пароли не совпадают');
    } else {
      setPasswordError(null);
    }
  }, [password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setPasswordError('Пароли не совпадают');
      return;
    }
    
    if (password.length < 6) {
      setPasswordError('Пароль должен содержать не менее 6 символов');
      return;
    }
    
    await register(username, email, password);
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
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Регистрация</h1>
              <p className="mt-3 text-muted-foreground max-w-md mx-auto lg:mx-0">
                Создайте аккаунт, чтобы получить доступ ко всем возможностям платформы и начать обучение.
              </p>
            </div>
            
            <div className="hidden lg:block">
              <div className="bg-primary/5 p-6 rounded-lg border border-primary/10">
                <h3 className="font-medium text-lg mb-2">Что вы получите</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Доступ к обширной библиотеке сценариев</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Возможность создавать собственные сценарии</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Персональный профиль с историей обучения</span>
                  </li>
                  <li className="flex items-start">
                    <Lock className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Безопасное хранение данных</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Right side with registration form */}
          <div className="w-full lg:w-1/2">
            <Card className="w-full shadow-lg border-0 bg-card">
              <CardHeader className="space-y-1 pb-2">
                <CardTitle className="text-xl font-semibold">Создание аккаунта</CardTitle>
                <CardDescription>
                  Введите данные для регистрации нового аккаунта
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pb-3">
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-medium">Имя пользователя</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="h-10"
                      required
                      minLength={3}
                    />
                  </div>
                  
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
                    <Label htmlFor="password" className="text-sm font-medium">Пароль</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-10"
                      required
                      minLength={6}
                    />
                    <p className="text-xs text-muted-foreground">
                      Пароль должен содержать не менее 6 символов
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium">Подтверждение пароля</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`h-10 ${passwordError ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                      required
                    />
                    {passwordError && (
                      <p className="text-xs text-destructive">
                        {passwordError}
                      </p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full h-10" 
                    disabled={loading || !!passwordError}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Регистрация...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <UserPlus className="mr-2 h-4 w-4" /> Зарегистрироваться
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
                  Уже есть аккаунт?{' '}
                  <Link 
                    href="/login" 
                    className="text-primary underline-offset-4 hover:underline font-medium"
                  >
                    Войти
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

export default RegisterPage; 