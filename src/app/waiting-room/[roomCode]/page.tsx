"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Users, Copy, UserPlus, X, ArrowLeft, Zap, AlertTriangle, Plus } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function WaitingRoomPage() {
  const router = useRouter()
  const params = useParams()
  const roomCode = params.roomCode as string
  
  const [participants, setParticipants] = useState<string[]>(["Вы (организатор)"])
  const [isLoading, setIsLoading] = useState(true)
  const [scenarioInfo, setScenarioInfo] = useState<any>(null)
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)
  const [isOrganizer, setIsOrganizer] = useState(true)
  
  const [isMobile, setIsMobile] = useState(false)

  const [showAddParticipants, setShowAddParticipants] = useState(false)
  
  const [availableParticipants, setAvailableParticipants] = useState([
    "Александр К.", "Мария В.", "Дмитрий С.", 
    "Елена Р.", "Сергей П.", "Наталья З.",
    "Иван М.", "Ольга Н.", "Андрей Д."
  ])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Call handleResize immediately to set the initial value
    handleResize();
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  useEffect(() => {
    const fetchScenarioInfo = async () => {
      try {
        setIsLoading(true);
        
        const searchParams = new URLSearchParams(window.location.search);
        const userName = searchParams.get('user');
        
        if (userName) {
          setParticipants([
            "Организатор",
            userName,
          ]);
          
          setIsOrganizer(false);
        } else {
          try {
            const savedName = localStorage.getItem('user_name');
            if (savedName) {
              setParticipants([`${savedName} (организатор)`]);
            }
          } catch (err) {
            console.error("Failed to load saved name:", err);
          }
        }
        
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const roomData = localStorage.getItem(`room_${roomCode}`);
        
        if (roomData) {
          const parsedData = JSON.parse(roomData);
          
          setScenarioInfo({
            id: parsedData.scenarioId,
            title: parsedData.title,
            participants: { min: 2, max: 6 },
            difficulty: parsedData.difficulty || "medium",
            duration: parsedData.duration || "30 мин",
          });
        } else {
          setScenarioInfo({
            id: "scenario-demo",
            title: "Демонстрационный сценарий",
            participants: { min: 2, max: 6 },
            difficulty: "medium",
            duration: "30 мин",
          });
        }
      } catch (err) {
        console.error("Error loading scenario info:", err);
        setError("Не удалось загрузить информацию о сценарии. Попробуйте создать новую комнату.");
        
        setScenarioInfo({
          id: "scenario-demo",
          title: "Демонстрационный сценарий",
          participants: { min: 2, max: 6 },
          difficulty: "medium",
          duration: "30 мин",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchScenarioInfo();
  }, [roomCode]);
  
  const addParticipant = (name: string) => {
    if (participants.length < maxParticipants) {
      setParticipants(prev => [...prev, name]);
      
      setAvailableParticipants(prev => prev.filter(p => p !== name));
      
      if (Math.random() > 0.5) {
        setReadyParticipants(prev => {
          const newSet = new Set(prev);
          newSet.add(participants.length);
          return newSet;
        });
      }
    }
  };
  
  useEffect(() => {
    if (error) return;
    if (!isOrganizer) return;
    if (showAddParticipants) return;
  }, [participants, error, isOrganizer, showAddParticipants, availableParticipants]);
  
  useEffect(() => {
    if (error) return;
  }, [participants, scenarioInfo, error]);
  
  useEffect(() => {
  }, [timeLeft, scenarioInfo, error]);
  
  const [showCopiedNotification, setShowCopiedNotification] = useState(false);
  
  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
    setShowCopiedNotification(true);
    setTimeout(() => {
      setShowCopiedNotification(false);
    }, 2000);
  };
  
  const startGame = () => {
    if (scenarioInfo) {
      router.push(`/scenarios/${scenarioInfo.id}/play?mode=multiplayer&room=${roomCode}`);
    }
  }
  
  const [readyParticipants, setReadyParticipants] = useState<Set<number>>(new Set([0]));
  
  const toggleReady = (index: number) => {
    setReadyParticipants(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };
  
  const minParticipants = scenarioInfo?.participants?.min || 2;
  const maxParticipants = scenarioInfo?.participants?.max || 6;
  
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <style jsx global>{`
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      <header className="bg-white border-b py-4">
        <div className="container flex items-center justify-between">
          <Link href="/scenarios" className="flex items-center gap-2 text-muted-foreground">
            <ArrowLeft className="h-4 w-4" />
            {isMobile ? <span>Назад</span> : <span>Вернуться к сценариям</span>}
          </Link>
          
          <div className="flex items-center">
            <h1 className="text-xl font-semibold">Комната ожидания</h1>
          </div>
          
          <div className="invisible">
            {isMobile ? <></>: <span>Вернуться к сценариям</span>}
          </div>
        </div>
      </header>

      <main className="flex-grow container py-8">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-lg border-2 border-primary/20">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <CardTitle>Комната ожидания</CardTitle>
                </div>
                {participants.length >= minParticipants && (
                  <Badge variant="outline" className="px-3 py-1 text-primary">
                    {readyParticipants.size} из {participants.length} готовы
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent>
              {error ? (
                <div className="p-6 text-center space-y-4">
                  <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto" />
                  <h3 className="text-lg font-medium">Ошибка</h3>
                  <p className="text-muted-foreground">{error}</p>
                  <Button asChild className="mt-2">
                    <Link href="/scenarios">Вернуться к сценариям</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full"></div>
                    </div>
                  ) : (
                    <>
                      {scenarioInfo && (
                        <div className="bg-blue-50 rounded-lg p-4">
                          <h2 className="font-medium mb-2">{scenarioInfo.title}</h2>
                          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <span>Сложность:</span>
                              <Badge variant="outline" className="ml-1">
                                {scenarioInfo.difficulty === "easy" ? "Легкий" : 
                                 scenarioInfo.difficulty === "medium" ? "Средний" : 
                                 scenarioInfo.difficulty === "hard" ? "Сложный" : "Экстремальный"}
                              </Badge>
                            </div>
                            <div>Продолжительность: {scenarioInfo.duration}</div>
                          </div>
                        </div>
                      )}
                      
                      <div className="bg-primary/10 rounded-lg p-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Код комнаты</p>
                          <p className="text-2xl font-bold tracking-wider">{roomCode}</p>
                        </div>
                        <div className="relative">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={copyRoomCode}
                            className="flex items-center gap-1"
                          >
                            <Copy className="h-3.5 w-3.5" />
                            <span>Копировать</span>
                          </Button>
                          
                          <AnimatePresence>
                            {showCopiedNotification && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="absolute bottom-full right-0 mb-2 whitespace-nowrap"
                              >
                                <Badge variant="secondary" className="bg-green-100 text-green-800 px-3 py-1">
                                  Код скопирован!
                                </Badge>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-sm font-medium flex items-center gap-2">
                            <UserPlus className="h-4 w-4" />
                            <span>Участники ({participants.length}/{maxParticipants})</span>
                          </h3>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1 no-scrollbar">
                          {participants.map((name, idx) => (
                            <motion.div 
                              key={idx} 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className={`p-3 rounded-lg flex items-center gap-3 ${
                                idx === 0 ? "bg-primary/15" : "bg-gray-100"
                              }`}
                            >
                              <Avatar className={`h-10 w-10 ${
                                readyParticipants.has(idx) 
                                  ? "bg-green-100 text-green-700" 
                                  : "bg-primary/20 text-primary"
                              }`}>
                                <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-grow">
                                <p className="text-sm font-medium">{name}</p>
                                {idx === 0 && (
                                  <p className="text-xs text-primary">Организатор</p>
                                )}
                              </div>
                              {idx !== 0 && (
                                <Badge 
                                  variant={readyParticipants.has(idx) ? "default" : "outline"}
                                  className={`${readyParticipants.has(idx) ? "bg-green-500" : ""} cursor-pointer`}
                                  onClick={() => toggleReady(idx)}
                                >
                                  {readyParticipants.has(idx) ? "Готов" : "Не готов"}
                                </Badge>
                              )}
                            </motion.div>
                          ))}
                          
                          {isOrganizer && participants.length < maxParticipants && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className="p-3 rounded-lg border-2 border-dashed border-primary/20 flex items-center justify-center relative hover:bg-blue-50/50 transition-colors cursor-pointer"
                            >
                              <div 
                                className="flex flex-col items-center gap-2 text-primary/70 w-full h-full"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowAddParticipants(!showAddParticipants);
                                }}
                              >
                                <Plus className="h-6 w-6" />
                                <p className="text-sm font-medium">Добавить участника</p>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                      
                      <AnimatePresence>
                        {showAddParticipants && isOrganizer && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="fixed inset-0 flex items-center justify-center z-50 bg-black/30"
                            onClick={() => setShowAddParticipants(false)}
                          >
                            <motion.div
                              initial={{ y: 20 }}
                              animate={{ y: 0 }}
                              className="bg-white rounded-lg shadow-lg border border-gray-200 w-80 max-h-[80vh] overflow-hidden"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="p-3 flex justify-between items-center border-b">
                                <span className="text-base font-medium">Выберите участника</span>
                                <button 
                                  onClick={() => setShowAddParticipants(false)}
                                  className="p-1 hover:bg-gray-100 rounded-full"
                                >
                                  <X className="h-5 w-5" />
                                </button>
                              </div>
                              
                              <div className="max-h-60 overflow-y-auto py-2 no-scrollbar">
                                {availableParticipants.length > 0 ? (
                                  availableParticipants.map((name, idx) => (
                                    <button
                                      key={idx}
                                      className="w-full text-left px-4 py-2.5 hover:bg-blue-50 flex items-center gap-3 transition-colors"
                                      onClick={() => {
                                        addParticipant(name);
                                        if (participants.length >= maxParticipants - 1) {
                                          setShowAddParticipants(false);
                                        }
                                      }}
                                    >
                                      <Avatar className="h-8 w-8 bg-primary/20 text-primary">
                                        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <span className="font-medium">{name}</span>
                                    </button>
                                  ))
                                ) : (
                                  <div className="px-4 py-8 text-sm text-muted-foreground text-center">
                                    <div className="flex justify-center mb-2">
                                      <AlertTriangle className="h-6 w-6 text-orange-500" />
                                    </div>
                                    Нет доступных участников
                                  </div>
                                )}
                              </div>
                              
                              <div className="p-3 border-t bg-gray-50">
                                <Button 
                                  variant="outline" 
                                  className="w-full" 
                                  onClick={() => setShowAddParticipants(false)}
                                >
                                  Закрыть
                                </Button>
                              </div>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      <div className="bg-blue-50 rounded-lg p-4">
                        <p className="text-sm text-muted-foreground">
                          Отправьте код комнаты другим участникам, чтобы они могли присоединиться к тренировке.
                          Для начала тренировки необходимо минимум {minParticipants} участника.
                        </p>
                      </div>
                      
                      {participants.length >= minParticipants && (
                        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                          <h3 className="text-green-700 font-medium mb-2">Комната готова к запуску</h3>
                          <p className="text-sm text-muted-foreground">
                            Нажмите "Начать сейчас", когда все участники будут готовы.
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </CardContent>
            
            {!error && (
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/scenarios">Отмена</Link>
                </Button>
                
                {isOrganizer ? (
                  <Button 
                    onClick={startGame}
                    disabled={
                      isLoading || 
                      !scenarioInfo || 
                      participants.length < minParticipants || 
                      readyParticipants.size < participants.length
                    }
                    className="gap-2"
                  >
                    <Zap className="h-4 w-4" />
                    <span>
                      {participants.length < minParticipants 
                        ? `Ожидание (${participants.length}/${minParticipants})` 
                        : readyParticipants.size < participants.length 
                          ? `Не все готовы (${readyParticipants.size}/${participants.length})` 
                          : "Начать сейчас"}
                    </span>
                  </Button>
                ) : (
                  <Button 
                    onClick={() => toggleReady(1)}
                    variant={readyParticipants.has(1) ? "default" : "outline"}
                    className="gap-2"
                  >
                    {readyParticipants.has(1) ? (
                      <>
                        <span>Я готов</span>
                        <Badge variant="outline" className="ml-2 bg-white/20">Ожидание начала</Badge>
                      </>
                    ) : (
                      <>
                        <span>Отметиться готовым</span>
                      </>
                    )}
                  </Button>
                )}
              </CardFooter>
            )}
          </Card>
        </div>
      </main>
    </div>
  )
} 