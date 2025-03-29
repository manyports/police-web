"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { User, Lock, LogOut, FileText, RefreshCw } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

// Define a user type if user data is fetched directly
interface UserData {
  _id: string;
  username: string;
  email: string;
  role: string;
}

const ProfilePage = () => {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [directUserData, setDirectUserData] = useState<UserData | null>(null);
  const [loadingError, setLoadingError] = useState<boolean>(false);

  // Try to fetch user data directly from the API if context doesn't have it
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        setDirectUserData(null);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/auth/validate', {
          method: 'GET',
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.user && data.authenticated) {
            setDirectUserData(data.user);
            setLoadingError(false);
          } else {
            setLoadingError(true);
          }
        } else {
          setLoadingError(true);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoadingError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const handleRefresh = () => {
    setIsLoading(true);
    window.location.reload();
  };

  // Display loading state
  if (isLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-gray-200"></div>
          <div className="h-6 w-48 bg-gray-200 rounded"></div>
          <div className="h-4 w-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (loadingError || (!user && !directUserData)) {
    return (
      <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Проблема загрузки профиля</h1>
          <p className="text-muted-foreground mb-6">Возникла проблема при загрузке данных профиля</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={handleRefresh}>
              <RefreshCw className="mr-2 h-4 w-4" /> Обновить страницу
            </Button>
            <Button variant="outline" onClick={() => router.push('/login?callbackUrl=/profile')}>
              Войти заново
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Use either context user or directly fetched user
  const displayUser = user || directUserData;

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6">
      <h1 className="text-3xl font-bold mb-8">Личный кабинет</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="" alt={displayUser?.username} />
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {displayUser?.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="text-center">
                  <h2 className="text-xl font-semibold">{displayUser?.username}</h2>
                  <p className="text-sm text-muted-foreground">{displayUser?.email}</p>
                  <div className="mt-2">
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      {displayUser?.role === 'admin' ? 'Администратор' : 'Пользователь'}
                    </Badge>
                  </div>
                </div>
                
                <Separator />
                
                <Button 
                  variant="destructive" 
                  className="w-full" 
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" /> Выйти
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">
                <User className="h-4 w-4 mr-2" /> Профиль
              </TabsTrigger>
              <TabsTrigger value="security">
                <Lock className="h-4 w-4 mr-2" /> Безопасность
              </TabsTrigger>
              <TabsTrigger value="scenarios">
                <FileText className="h-4 w-4 mr-2" /> Мои сценарии
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Информация о профиле</CardTitle>
                  <CardDescription>
                    Обновите свою личную информацию
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Имя пользователя</Label>
                    <Input id="username" defaultValue={displayUser?.username} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={displayUser?.email} />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Сохранить изменения</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Безопасность</CardTitle>
                  <CardDescription>
                    Обновите пароль для защиты вашего аккаунта
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Текущий пароль</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Новый пароль</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Подтвердите пароль</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Обновить пароль</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="scenarios" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Мои сценарии</CardTitle>
                  <CardDescription>
                    Управляйте созданными вами сценариями
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Нет созданных сценариев</h3>
                    <p className="text-muted-foreground mt-1">Вы пока не создали ни одного сценария</p>
                    <Button 
                      className="mt-4" 
                      onClick={() => router.push('/scenario-editor')}
                    >
                      Создать сценарий
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 