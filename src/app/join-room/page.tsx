"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Users, AlertCircle } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

export default function JoinRoomPage() {
  const [roomCode, setRoomCode] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [isJoining, setIsJoining] = useState(false)
  const router = useRouter()
  
  // При загрузке страницы сохраняем имя пользователя из localStorage (если оно есть)
  useEffect(() => {
    try {
      const savedName = localStorage.getItem('user_name');
      if (savedName) {
        setName(savedName);
      }
    } catch (err) {
      console.error("Failed to load saved name:", err);
    }
  }, []);
  
  const handleJoin = () => {
    setError("");
    
    // Проверяем, что введен код комнаты
    if (!roomCode.trim()) {
      setError("Пожалуйста, введите код комнаты");
      return;
    }
    
    // Проверяем, что введено имя
    if (!name.trim()) {
      setError("Пожалуйста, введите ваше имя");
      return;
    }
    
    // Показываем индикатор загрузки
    setIsJoining(true);
    
    try {
      // Форматируем код комнаты
      const formattedCode = roomCode.trim().toUpperCase();
      
      // Сохраняем имя пользователя в localStorage для будущих сессий
      localStorage.setItem('user_name', name.trim());
      
      // В реальном приложении здесь был бы API запрос для проверки комнаты
      // Для демо проверяем существует ли такая комната в localStorage
      const existingRoom = localStorage.getItem(`room_${formattedCode}`);
      
      // Имитация задержки сети
      setTimeout(() => {
        if (existingRoom) {
          // Если комната найдена, перенаправляем на страницу комнаты с именем пользователя
          router.push(`/waiting-room/${formattedCode}?user=${encodeURIComponent(name.trim())}`);
        } else {
          // Если комната не найдена, показываем ошибку
          setError(`Комната с кодом ${formattedCode} не найдена`);
          setIsJoining(false);
        }
      }, 1000);
    } catch (err) {
      console.error("Error joining room:", err);
      setError("Произошла ошибка при попытке присоединиться к комнате");
      setIsJoining(false);
    }
  };
  
  // Обработчик нажатия Enter в поле ввода
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isJoining) {
      handleJoin();
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-5 w-5 text-primary" />
            <CardTitle>Присоединиться к комнате</CardTitle>
          </div>
          <CardDescription>
            Введите код комнаты, который вам предоставил организатор, и ваше имя для участия в мультиплеерном сценарии.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="roomCode">Код комнаты</Label>
            <Input
              id="roomCode"
              placeholder="Введите 6-значный код"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              onKeyDown={handleKeyDown}
              maxLength={6}
              className="text-lg tracking-wider font-medium placeholder:text-gray-400"
              disabled={isJoining}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Ваше имя</Label>
            <Input
              id="name"
              placeholder="Имя Фамилия"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="placeholder:text-gray-400"
              disabled={isJoining}
            />
          </div>
          
          {error && (
            <Alert variant="destructive" className="py-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 sm:justify-between">
          <Button variant="outline" asChild className="w-full sm:w-auto" disabled={isJoining}>
            <Link href="/scenarios">Вернуться к сценариям</Link>
          </Button>
          <Button 
            onClick={handleJoin} 
            disabled={isJoining}
            className="w-full sm:w-auto flex items-center gap-2"
          >
            {isJoining ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-primary-foreground rounded-full border-t-transparent"></div>
                <span>Подключение...</span>
              </>
            ) : (
              <>
                <span>Присоединиться</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 