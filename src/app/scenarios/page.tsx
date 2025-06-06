"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, ChevronDown, Clock, Star, Play, Info, AlertTriangle, Zap, Award, X, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Scenario } from "@/types/scenario"
import { v4 as uuidv4 } from 'uuid'

export default function ScenariosPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [activeFilter, setActiveFilter] = useState("all")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [scenarios, setScenarios] = useState<Scenario[]>([])
  const [gameMode, setGameMode] = useState("solo")
  const [openDetailId, setOpenDetailId] = useState<string | null>(null)
  const [openStartId, setOpenStartId] = useState<string | null>(null)
  const router = useRouter()
  
  useEffect(() => {
    // Fetch regular scenarios
    fetch('/data/scenarios.json')
      .then(response => response.json())
      .then(data => {
        let allScenarios = [...data.scenarios];
        
        // Load user-created scenarios from localStorage
        try {
          const savedScenariosJson = localStorage.getItem('savedScenarios');
          if (savedScenariosJson) {
            const userScenarios = JSON.parse(savedScenariosJson);
            
            // Transform user scenarios to match Scenario interface
            const formattedUserScenarios = userScenarios.map((userScenario: any) => {
              // Generate random tags based on scene content
              const tags = [];
              if (userScenario.scenes.length > 0) {
                tags.push("Пользовательский");
                if (userScenario.scenes.length > 3) {
                  tags.push("Многоуровневый");
                }
                if (userScenario.title.toLowerCase().includes("расследование")) {
                  tags.push("Расследование");
                }
              }
              
              // Get the first scene image or use placeholder
              const image = userScenario.previewImageUrl || 
                (userScenario.scenes[0]?.imageUrl || '/images/scenario-placeholder.svg');
              
              // Calculate estimated points based on scenes/options
              const pointsEstimate = userScenario.scenes.reduce((total: number, scene: any) => {
                const scenePoints = scene.options ? scene.options.reduce((sum: number, option: any) => 
                  sum + (option.score || 0), 0) : 0;
                return total + scenePoints;
              }, 0);
              
              return {
                id: userScenario.id,
                title: userScenario.title,
                description: userScenario.description || "Пользовательский сценарий",
                category: "custom",
                difficulty: "medium",
                duration: `${userScenario.scenes.length * 5} мин`,
                rating: 5,
                reviews: 1,
                image: image,
                tags: tags,
                isNew: true,
                isPopular: false,
                objectives: ["Пройти пользовательский сценарий"],
                steps: [],
                legalCodes: [],
                points: pointsEstimate.toString(),
                scenarioId: userScenario.id
              };
            });
            
            // Add user scenarios to all scenarios
            allScenarios = [...allScenarios, ...formattedUserScenarios];
          }
        } catch (error) {
          console.error("Error loading user scenarios:", error);
        }
        
        setScenarios(allScenarios);
      })
  }, [])

  // Закрываем попапы при клике вне их области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Проверяем, кликнули ли мы по кнопке или внутри карточки
      if (!target.closest('.detail-button') && 
          !target.closest('.start-button') && 
          !target.closest('.popup-card')) {
        setOpenDetailId(null);
        setOpenStartId(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const categories = [
    { id: "all", name: "Все сценарии" },
    { id: "custom", name: "Мои сценарии" },
    { id: "patrol", name: "Патрулирование" },
    { id: "hostage", name: "Заложники" },
    { id: "investigation", name: "Расследования" },
    { id: "cyber", name: "Киберпреступления" },
  ]

  const filters = [
    { id: "all", name: "Все" },
    { id: "popular", name: "Популярные" },
    { id: "new", name: "Новые" },
    { id: "recommended", name: "Рекомендуемые" },
  ]


  const filteredScenarios = scenarios.filter((scenario) => {
    if (gameMode === "multiplayer" && !scenario.isMultiplayer) {
      return false
    }
    
    if (gameMode === "solo" && scenario.isMultiplayer) {
      return false
    }

    if (activeCategory !== "all" && scenario.category !== activeCategory) {
      return false
    }

    if (activeFilter === "new" && !scenario.isNew) {
      return false
    }

    if (activeFilter === "popular" && !scenario.isPopular) {
      return false
    }

    if (activeFilter === "all") {
      return true
    }

    return true
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "hard":
        return "bg-orange-100 text-orange-800"
      case "extreme":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "Легкий"
      case "medium":
        return "Средний"
      case "hard":
        return "Сложный"
      case "extreme":
        return "Экстремальный"
      default:
        return difficulty
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const generateRoomCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }
  
  const createMultiplayerRoom = (scenario: Scenario) => {
    try {
      // Генерируем код комнаты
      const roomCode = generateRoomCode();
      
      // Убедимся, что у сценария есть ID
      const scenarioId = scenario.scenarioId || scenario.id;
      if (!scenarioId) {
        console.error("Scenario ID is missing");
        return;
      }
      
      // Подготовим данные для сохранения
      const roomData = {
        scenarioId: scenarioId,
        title: scenario.title || "Неизвестный сценарий",
        difficulty: scenario.difficulty || "medium",
        duration: scenario.duration || "30 мин",
        createdAt: new Date().toISOString()
      };
      
      // Сохраняем информацию о сценарии в localStorage
      localStorage.setItem(`room_${roomCode}`, JSON.stringify(roomData));
      console.log(`Created room ${roomCode} for scenario ${scenarioId}`);
      
      // Перенаправляем на страницу комнаты ожидания
      router.push(`/waiting-room/${roomCode}`);
    } catch (error) {
      console.error("Failed to create multiplayer room:", error);
      alert("Не удалось создать комнату. Пожалуйста, попробуйте еще раз.");
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-blue-50 py-12">
        <div className="mx-auto w-[90%] md:w-[80%] max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Сценарии тренировок</h1>
              <p className="text-muted-foreground">
                Выберите сценарий для начала тренировки или создайте свой собственный
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              {gameMode === "multiplayer" && (
                <Button variant="outline" asChild>
                  <Link href="/join-room" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Присоединиться к комнате</span>
                  </Link>
                </Button>
              )}
              <Button asChild>
                <Link href="/scenario-editor">Создать сценарий</Link>
              </Button>
            </div>
          </div>
        
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Поиск сценариев..." className="pl-10" />
            </div>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => {
                setActiveCategory("all")
                setActiveFilter("all")
              }}
            >
              Сбросить фильтры
            </Button>
            <div className="relative">
              <Button
                variant="outline"
                className="flex items-center gap-2 w-full md:w-auto"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="h-4 w-4" />
                <span>Фильтры</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
              </Button>

              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-border rounded-lg shadow-lg z-10 p-4">
                  <div className="mb-4">
                    <h3 className="font-medium mb-2">Сложность</h3>
                    <div className="space-y-2">
                      {["easy", "medium", "hard", "extreme"].map((difficulty) => (
                        <div key={difficulty} className="flex items-center">
                          <input type="checkbox" id={`difficulty-${difficulty}`} className="mr-2" />
                          <label htmlFor={`difficulty-${difficulty}`} className="text-sm">
                            {getDifficultyText(difficulty)}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-medium mb-2">Баллы</h3>
                    <div className="space-y-2">
                      {["0-100", "101-200", "201-300", "301+"].map((pointsRange) => (
                        <div key={pointsRange} className="flex items-center">
                          <input type="checkbox" id={`points-${pointsRange}`} className="mr-2" />
                          <label htmlFor={`points-${pointsRange}`} className="text-sm">
                            {pointsRange} баллов
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" size="sm">
                      Сбросить
                    </Button>
                    <Button size="sm">Применить</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
          
      <div className="mx-auto w-[90%] md:w-[80%] max-w-7xl py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4 w-full">
            <div className="sticky top-24 bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              <div className="mb-6">
                <h3 className="font-medium mb-3">Режим игры</h3>
                <div className="flex rounded-lg overflow-hidden border border-gray-200">
                  <button
                    className={`flex-1 py-2.5 px-4 text-sm font-medium transition-colors ${
                      gameMode === "solo" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-white hover:bg-blue-50"
                    }`}
                    onClick={() => setGameMode("solo")}
                  >
                    Одиночный
                  </button>
                  <button
                    className={`flex-1 py-2.5 px-4 text-sm font-medium transition-colors ${
                      gameMode === "multiplayer" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-white hover:bg-blue-50"
                    }`}
                    onClick={() => setGameMode("multiplayer")}
                  >
                    Мультиплеер
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-3">Категории</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        activeCategory === category.id ? "bg-primary text-primary-foreground" : "hover:bg-blue-50"
                      }`}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Фильтры</h3>
                <div className="space-y-2">
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        activeFilter === filter.id ? "bg-blue-100 text-primary font-medium" : "hover:bg-blue-50"
                      }`}
                      onClick={() => setActiveFilter(filter.id)}
                    >
                      {filter.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-3/4 w-full">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
              <h2 className="text-xl font-medium">
                {gameMode === "multiplayer" 
                  ? "Мультиплеерные сценарии" 
                  : activeCategory === "all" 
                    ? "Одиночные сценарии" 
                    : categories.find((c) => c.id === activeCategory)?.name}
              </h2>
              <div className="text-sm text-muted-foreground">Найдено: {filteredScenarios.length}</div>
            </div>

            {filteredScenarios.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {filteredScenarios.map((scenario) => (
                  <motion.div
                    key={scenario.id}
                    variants={item}
                    className="border border-gray-200 rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-md transition-all bg-white flex flex-col"
                  >
                    <div className="relative aspect-video">
                      <Image
                        src={scenario.image || "/placeholder.svg"}
                        alt={scenario.title}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          // When the image fails to load, replace it with a placeholder
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                        <div className="p-4 text-white">
                          <div className="flex gap-2 mb-2 flex-wrap">
                            <Badge variant="outline" className="bg-white/20 text-white border-none">
                              {categories.find((c) => c.id === scenario.category)?.name}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={`${getDifficultyColor(scenario.difficulty)} border-none`}
                            >
                              {getDifficultyText(scenario.difficulty)}
                            </Badge>
                            {scenario.isNew && <Badge className="bg-blue-500 text-white">Новый</Badge>}
                            {scenario.isMultiplayer && <Badge className="bg-purple-500 text-white">Мультиплеер</Badge>}
                          </div>
                          <h3 className="text-lg font-medium">{scenario.title}</h3>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40"
                        >
                          <Play className="h-4 w-4 text-white" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 flex-grow flex flex-col">
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3 overflow-hidden">{scenario.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {scenario.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-blue-50 text-primary">
                            {tag}
                          </Badge>
                        ))}
                        {scenario.isMultiplayer && (
                          <Badge variant="secondary" className="bg-purple-50 text-purple-700">
                            Мультиплеер
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between flex-wrap gap-2 mt-auto">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{scenario.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="h-4 w-4" />
                            <span>{scenario.points} баллов</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="font-medium">{scenario.rating}</span>
                          <span className="text-sm text-muted-foreground">({scenario.reviews})</span>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 p-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex justify-start relative">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            style={{ width: '130px' }}
                            onClick={(e) => {
                              e.preventDefault();
                              setOpenDetailId(openDetailId === scenario.id ? null : scenario.id);
                            }}
                            className="flex items-center justify-center gap-2 detail-button"
                          >
                            <Info className="h-4 w-4 flex-shrink-0" />
                            <span>Подробнее</span>
                          </Button>
                          
                          <AnimatePresence>
                            {openDetailId === scenario.id && 
                              <motion.div
                                initial={{ opacity: 0, y: 0 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -60 }}
                                transition={{ duration: 0.5 }}
                                className="z-50"
                              >
                                <Card className="w-80 shadow-lg absolute bottom-14 left-0 popup-card">
                                  <CardHeader className="p-3 sm:p-4 flex items-center gap-2 flex-row">
                                    <div className="flex items-center gap-2">
                                      <Info className="w-4 h-4 rounded-md" />
                                      <CardTitle className="text-center text-sm sm:text-base">Информация о сценарии</CardTitle>
                                    </div>
                                    <button onClick={() => setOpenDetailId(null)}>
                                      <X className="w-4 h-4 font-bold hover:bg-gray-100 rounded-md mb-1 transition-all duration-500" />
                                    </button>
                                  </CardHeader>
                                  <CardContent className="p-3 sm:p-4">
                                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 scrollbar">
                                      <h3 className="font-medium text-sm">Цели:</h3>
                                      <ul className="list-disc pl-4 text-xs sm:text-sm text-muted-foreground">
                                        {scenario.objectives?.map((objective, idx) => (
                                          <li key={idx}>{objective}</li>
                                        )) || <li>Нет информации о целях</li>}
                                      </ul>
                                      
                                      {scenario.legalCodes && scenario.legalCodes.length > 0 && (
                                        <>
                                          <h3 className="font-medium text-sm mt-3">Правовые нормы:</h3>
                                          <ul className="list-disc pl-4 text-xs sm:text-sm text-muted-foreground">
                                            {scenario.legalCodes.map((code, idx) => (
                                              <li key={idx}>{typeof code === 'string' ? code : `${code.article} - ${code.title}`}</li>
                                            ))}
                                          </ul>
                                        </>
                                      )}
                                    </div>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            }
                          </AnimatePresence>
                        </div>
                        <div className="flex justify-end relative">
                          <Button 
                            size="sm" 
                            style={{ width: '130px' }}
                            onClick={(e) => {
                              e.preventDefault();
                              setOpenStartId(openStartId === scenario.id ? null : scenario.id);
                            }}
                            className="flex items-center justify-center gap-2 start-button"
                          >
                            <Zap className="h-4 w-4 flex-shrink-0" />
                            <span>Начать</span>
                          </Button>
                          
                          <AnimatePresence>
                            {openStartId === scenario.id && 
                              <motion.div
                                initial={{ opacity: 0, y: 0 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -60 }}
                                transition={{ duration: 0.5 }}
                                className="z-50"
                              >
                                <Card className="w-80 shadow-lg absolute bottom-14 right-0 popup-card">
                                  <CardHeader className="p-3 sm:p-4 flex items-center gap-2 flex-row">
                                    <div className="flex items-center gap-2">
                                      <Zap className="w-4 h-4 rounded-md" />
                                      <CardTitle className="text-center text-sm sm:text-base">Запуск сценария</CardTitle>
                                    </div>
                                    <button onClick={() => setOpenStartId(null)}>
                                      <X className="w-4 h-4 font-bold hover:bg-gray-100 rounded-md mb-1 transition-all duration-500" />
                                    </button>
                                  </CardHeader>
                                  <CardContent className="p-3 sm:p-4">
                                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 scrollbar">
                                      <h3 className="font-medium text-sm">Информация:</h3>
                                      <ul className="list-disc pl-4 text-xs sm:text-sm text-muted-foreground">
                                        <li>Продолжительность: {scenario.duration}</li>
                                        <li>Сложность: {getDifficultyText(scenario.difficulty)}</li>
                                        <li>Баллы: {scenario.points}</li>
                                      </ul>
                                      
                                      <div className="pt-3 text-center">
                                        {scenario.isMultiplayer ? (
                                          <Button 
                                            size="sm" 
                                            className="w-full flex items-center justify-center gap-2"
                                            onClick={() => {
                                              setOpenStartId(null);
                                              createMultiplayerRoom(scenario);
                                            }}
                                          >
                                            <Users className="h-4 w-4" />
                                            Создать комнату
                                          </Button>
                                        ) : (
                                          <Button asChild size="sm" className="w-full">
                                            <Link href={`/scenarios/${scenario.scenarioId || scenario.id}/play`} 
                                              onClick={() => setOpenStartId(null)}
                                            >
                                              Начать тренировку
                                            </Link>
                                          </Button>
                                        )}
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            }
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200 shadow-sm">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">Сценарии не найдены</h3>
                <p className="text-muted-foreground mb-6">
                  Попробуйте изменить параметры фильтрации или выбрать другую категорию
                </p>
                <Button
                  onClick={() => {
                    setActiveCategory("all")
                    setActiveFilter("popular")
                  }}
                >
                  Сбросить фильтры
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

