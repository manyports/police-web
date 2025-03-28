"use client"

import { useState, useEffect, use } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Play,
  Pause,
  VolumeX,
  Volume2,
  Maximize,
  ChevronLeft,
  Shield,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  X,
  MessageSquare,
  Mic,
  MicOff,
  Volume,
  Goal,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

type PageParams = {
  id: string
}

interface ScenarioOption {
  id: number
  text: string
  feedback: {
    type: string
    text: string
  }
}

interface ScenarioStep {
  id: number
  title: string
  description: string
  image: string
  options: ScenarioOption[]
}

interface TeamMember {
  id: number
  name: string
  role: string
  avatar: string
}

interface LegalCode {
  id: number
  title: string
  article: string
  description: string
  link: string
}

interface Scenario {
  id: number
  title: string
  category: string
  difficulty: string
  duration: string
  rating: number
  reviews: number
  image: string
  description: string
  tags: string[]
  isNew: boolean
  isPopular: boolean
  objectives: string[]
  steps: ScenarioStep[]
  legalCodes: LegalCode[]
  points: string
}

export default function ScenarioSimulationPage({ params }: { params: PageParams }) {
  const unwrappedParams = use(params as any)
  // @ts-ignore
  const id = unwrappedParams.id
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState("0:00")
  const [duration, setDuration] = useState("10:00")
  const [showControls, setShowControls] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const [showDecision, setShowDecision] = useState(false)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [feedbackVisible, setFeedbackVisible] = useState(false)
  const [micActive, setMicActive] = useState(false)
  const [teamChatOpen, setTeamChatOpen] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [scenarioData, setScenarioData] = useState<Scenario | null>(null)
  const [lawsData, setLawsData] = useState<{ laws: LegalCode[] }>({ laws: [] })

  // Fetch laws data
  useEffect(() => {
    const fetchLawsData = async () => {
      try {
        const response = await fetch('/data/laws.json')
        const data = await response.json()
        setLawsData(data)
      } catch (error) {
        console.error('Error fetching laws data:', error)
      }
    }
    
    fetchLawsData()
  }, [])

  // Fetch scenario data
  useEffect(() => {
    const fetchScenario = async () => {
      try {
        // In a real app, this would be an API call
        // For now, we'll use the static data from scenarios page
        const scenarios = [
          {
            id: 1,
            title: "Патрулирование в ночное время",
            category: "patrol",
            difficulty: "medium",
            duration: "30-45 мин",
            rating: 4.8,
            reviews: 124,
            image: "/placeholder.svg?height=400&width=600&text=Патрулирование",
            description:
              "Сценарий моделирует ночное патрулирование в городском районе с высоким уровнем преступности. Отработка навыков наблюдения, реагирования на подозрительное поведение и взаимодействия с гражданами.",
            tags: ["Ночь", "Город", "Патруль"],
            isNew: false,
            isPopular: true,
            objectives: [
              "Обеспечить безопасность в районе",
              "Выявить подозрительную активность",
              "Правильно реагировать на происшествия",
              "Взаимодействовать с гражданами",
              "Документировать все инциденты",
            ],
            steps: [
              {
                id: 1,
                title: "Начало патруля",
                description: "Вы начинаете ночное патрулирование в районе с высоким уровнем преступности.",
                image: "/placeholder.svg?height=720&width=1280&text=Начало+патруля",
                options: [
                  {
                    id: 1,
                    text: "Начать с осмотра темных переулков",
                    feedback: {
                      type: "positive",
                      text: "Хорошее решение. Темные переулки часто становятся местом совершения преступлений.",
                    },
                  },
                  {
                    id: 2,
                    text: "Сначала проверить освещенные улицы",
                    feedback: {
                      type: "neutral",
                      text: "Освещенные улицы тоже важны, но преступники чаще действуют в темных местах.",
                    },
                  },
                ],
              },
            ],
            legalCodes: lawsData.laws.filter((law: LegalCode) => law.id === 1 || law.id === 2),
            points: "100",
          },
          {
            id: 2,
            title: "Захват заложников в банке",
            category: "hostage",
            difficulty: "hard",
            duration: "45-60 мин",
            rating: 4.9,
            reviews: 87,
            image: "/placeholder.svg?height=400&width=600&text=Заложники",
            description:
              "Сложная ситуация с захватом заложников в банке. Тренировка навыков ведения переговоров, тактического планирования и координации действий группы.",
            tags: ["Заложники", "Переговоры", "Тактика"],
            isNew: false,
            isPopular: true,
            objectives: [
              "Установить контакт с преступниками",
              "Оценить ситуацию и риски",
              "Разработать план освобождения заложников",
              "Минимизировать потери среди гражданских лиц",
              "Задержать преступников",
            ],
            steps: [
              {
                id: 1,
                title: "Прибытие на место",
                description:
                  "Вы прибыли к зданию банка. По предварительной информации, внутри находятся 3-4 вооруженных преступника и около 15 заложников.",
                image: "/placeholder.svg?height=720&width=1280&text=Прибытие+на+место",
                options: [
                  {
                    id: 1,
                    text: "Немедленно штурмовать здание",
                    feedback: {
                      type: "negative",
                      text: "Поспешные действия без разведки и плана могут привести к жертвам среди заложников. Необходимо сначала оценить ситуацию.",
                    },
                  },
                  {
                    id: 2,
                    text: "Оцепить территорию и начать переговоры",
                    feedback: {
                      type: "positive",
                      text: "Правильное решение. Оцепление территории и начало переговоров позволяет выиграть время для оценки ситуации и подготовки плана действий.",
                    },
                  },
                ],
              },
            ],
            legalCodes: lawsData.laws.filter((law: LegalCode) => law.id === 3 || law.id === 4 || law.id === 5),
            points: "150",
          },
          {
            id: 3,
            title: "Расследование места преступления",
            category: "investigation",
            difficulty: "medium",
            duration: "40-50 мин",
            rating: 4.7,
            reviews: 56,
            image: "/placeholder.svg?height=400&width=600&text=Расследование",
            description:
              "Детальное изучение места преступления, сбор улик и формирование версий. Развитие навыков наблюдательности, логического мышления и процедурных знаний.",
            tags: ["Улики", "Анализ", "Криминалистика"],
            isNew: true,
            isPopular: false,
            objectives: [
              "Осмотреть место преступления",
              "Собрать все улики",
              "Опросить свидетелей",
              "Сформировать версии происшествия",
              "Составить протокол осмотра"
            ],
            steps: [
              {
                id: 1,
                title: "Начало осмотра",
                description: "Вы прибыли на место преступления. Необходимо организовать работу следственно-оперативной группы.",
                image: "/placeholder.svg?height=720&width=1280&text=Осмотр+места+преступления",
                options: [
                  {
                    id: 1,
                    text: "Начать осмотр с центра места происшествия",
                    feedback: {
                      type: "positive",
                      text: "Правильное решение. Осмотр от центра к периферии позволяет не упустить важные детали.",
                    },
                  },
                  {
                    id: 2,
                    text: "Сразу опросить свидетелей",
                    feedback: {
                      type: "neutral",
                      text: "Опрос свидетелей важен, но сначала нужно зафиксировать обстановку на месте происшествия.",
                    },
                  },
                ],
              },
            ],
            legalCodes: lawsData.laws.filter((law: LegalCode) => law.id === 6 || law.id === 7),
            points: "120",
          },
          {
            id: 4,
            title: "Кибератака на инфраструктуру",
            category: "cyber",
            difficulty: "hard",
            duration: "50-70 мин",
            rating: 4.6,
            reviews: 42,
            image: "/placeholder.svg?height=400&width=600&text=Киберпреступления",
            description:
              "Реагирование на кибератаку, направленную на критическую инфраструктуру. Отработка навыков цифровой криминалистики, координации с техническими специалистами и принятия решений в условиях неопределенности.",
            tags: ["Кибербезопасность", "Технологии", "Расследование"],
            isNew: true,
            isPopular: false,
            objectives: [
              "Локализовать источник атаки",
              "Минимизировать ущерб",
              "Собрать цифровые улики",
              "Восстановить работу систем",
              "Предотвратить повторные атаки"
            ],
            steps: [
              {
                id: 1,
                title: "Обнаружение атаки",
                description: "Зафиксирована массовая кибератака на критическую инфраструктуру города.",
                image: "/placeholder.svg?height=720&width=1280&text=Кибератака",
                options: [
                  {
                    id: 1,
                    text: "Отключить все системы",
                    feedback: {
                      type: "negative",
                      text: "Полное отключение систем может привести к коллапсу городской инфраструктуры.",
                    },
                  },
                  {
                    id: 2,
                    text: "Изолировать критические узлы сети",
                    feedback: {
                      type: "positive",
                      text: "Отличное решение. Изоляция критических узлов поможет предотвратить распространение атаки, сохранив при этом работоспособность основных систем.",
                    },
                  },
                ],
              },
            ],
            legalCodes: lawsData.laws.filter((law: LegalCode) => law.id === 8 || law.id === 9),
            points: "180",
          }
        ]

        const selectedScenario = scenarios.find((s) => s.id === parseInt(id))
        if (selectedScenario) {
          setScenarioData(selectedScenario)
        } else {
          // Handle scenario not found
          window.location.href = "/scenarios"
        }
      } catch (error) {
        console.error("Error fetching scenario:", error)
        window.location.href = "/scenarios"
      } finally {
        setIsLoading(false)
      }
    }

    fetchScenario()
  }, [id, lawsData.laws])

  // Progress timer effect
  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer)
            setIsPlaying(false)
            setShowDecision(true)
            return 100
          }
          return prev + 0.5
        })
      }, 100)

      return () => clearInterval(timer)
    }
  }, [isPlaying])

  // Time display effect
  useEffect(() => {
    const totalSeconds = Math.floor((progress / 100) * 600)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    setCurrentTime(`${minutes}:${seconds.toString().padStart(2, "0")}`)
  }, [progress])

  // Controls visibility effect
  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        setShowControls(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isPlaying, showControls])

  const handleOptionSelect = (optionId: number) => {
    setSelectedOption(optionId)
    setFeedbackVisible(true)
  }

  const handleNextStep = () => {
    if (scenarioData && currentStep < scenarioData.steps.length - 1) {
      setCurrentStep(currentStep + 1)
      setSelectedOption(null)
      setFeedbackVisible(false)
      setShowDecision(false)
      setProgress(0)
      setIsPlaying(true)
    } else {
      window.location.href = `/scenarios/${id}/results`
    }
  }

  const getSelectedOption = () => {
    if (!scenarioData || selectedOption === null) return null
    return scenarioData.steps[currentStep].options.find((option) => option.id === selectedOption)
  }

  const getFeedbackColor = (type: string) => {
    switch (type) {
      case "positive":
        return "bg-green-100 text-green-800 border-green-200"
      case "negative":
        return "bg-red-100 text-red-800 border-red-200"
      case "neutral":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getFeedbackIcon = (type: string) => {
    switch (type) {
      case "positive":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "negative":
        return <X className="h-5 w-5 text-red-600" />
      case "neutral":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!scenarioData) {
    return null
  }

  const scenario = scenarioData

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 z-50 bg-gray-900 flex flex-col items-center justify-center p-4 md:p-8 overflow-y-auto"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="max-w-2xl w-full space-y-4 text-center bg-white/5 p-4 md:p-6 rounded-xl backdrop-blur-sm my-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Shield className="h-12 w-12 text-primary mx-auto mb-2" />
              <h1 className="text-xl md:text-2xl font-bold mb-1">{scenario.title}</h1>
              <p className="text-sm md:text-base text-gray-300 mb-3">{scenario.description}</p>

              <div className="flex justify-center gap-3 md:gap-4 mb-4 flex-wrap">
                <div className="flex flex-col items-center">
                  <Clock className="h-4 w-4 md:h-5 md:w-5 text-gray-400 mb-1" />
                  <span className="text-xs text-gray-400">Длительность</span>
                  <span className="font-medium text-xs md:text-sm">{scenario.duration}</span>
                </div>
                <div className="flex flex-col items-center">
                  <Goal className="h-4 w-4 md:h-5 md:w-5 text-gray-400 mb-1" />
                  <span className="text-xs text-gray-400">Баллы:</span>
                  <span className="font-medium text-xs md:text-sm">{scenario.points}</span>
                </div>
                <div className="flex flex-col items-center">
                  <Shield className="h-4 w-4 md:h-5 md:w-5 text-gray-400 mb-1" />
                  <span className="text-xs text-gray-400">Сложность</span>
                  <span className="font-medium text-xs md:text-sm">
                    {scenario.difficulty === "easy" && "Легкий"}
                    {scenario.difficulty === "medium" && "Средний"}
                    {scenario.difficulty === "hard" && "Сложный"}
                    {scenario.difficulty === "extreme" && "Экстремальный"}
                  </span>
                </div>
              </div>

              <div className="bg-gray-800/70 rounded-lg p-3 md:p-4 mb-4">
                <h2 className="text-base md:text-lg font-medium mb-2">Цели миссии:</h2>
                <ul className="space-y-1.5 text-left">
                  {scenario.objectives.map((objective: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 text-xs">
                        {index + 1}
                      </span>
                      <span className="text-xs md:text-sm">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-800/70 rounded-lg p-3 md:p-4 mb-6 max-h-[300px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                <h2 className="text-base md:text-lg font-medium mb-2 sticky top-0 bg-gray-800/70 py-1">Материалы для этого сценария:</h2>
                <div className="space-y-2">
                  {scenario.legalCodes.map((code: LegalCode) => (
                    <a 
                      key={code.id}
                      href={code.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 text-xs">
                        {code.id}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{code.title}</div>
                        <div className="text-xs text-gray-400">{code.article}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <Button
                size="lg"
                onClick={() => setShowIntro(false)}
                className="bg-primary hover:bg-primary/90 text-white w-full md:w-auto"
              >
                Начать миссию
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative h-screen flex flex-col">
        <div className="bg-gray-900 p-3 md:p-4 flex items-center justify-between border-b border-gray-800">
          <Link
            href={`/scenarios/${id}`}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="hidden sm:inline">Выход</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="text-xs sm:text-sm bg-primary/20 text-primary px-2 py-1 rounded-full">
              Шаг {currentStep + 1} из {scenario.steps.length}
            </div>
            <h1 className="text-base sm:text-lg font-medium truncate max-w-[150px] sm:max-w-none">
              {scenario.steps[currentStep].title}
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              className={`p-2 rounded-full ${micActive ? "bg-primary text-white" : "bg-gray-800 text-gray-300"}`}
              onClick={() => setMicActive(!micActive)}
            >
              {micActive ? <Mic className="h-4 w-4 sm:h-5 sm:w-5" /> : <MicOff className="h-4 w-4 sm:h-5 sm:w-5" />}
            </button>

            <button
              className={`p-2 rounded-full ${teamChatOpen ? "bg-primary text-white" : "bg-gray-800 text-gray-300"}`}
              onClick={() => setTeamChatOpen(!teamChatOpen)}
            >
              <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>

        <div
          className="relative flex-grow"
          onMouseMove={() => {
            if (isPlaying) setShowControls(true)
          }}
        >
          <div className="absolute inset-0">
            <Image
              src={scenario.steps[currentStep].image || "/placeholder.svg"}
              alt={scenario.steps[currentStep].title}
              fill
              className="object-cover"
            />
          </div>

          <AnimatePresence>
            {showControls && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <div className="mb-4">
                  <Progress value={progress} className="h-1" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      className="text-white hover:text-primary transition-colors"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                    </button>

                    <button
                      className="text-white hover:text-primary transition-colors"
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </button>

                    <div className="text-sm text-white/80">
                      {currentTime} / {duration}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button className="text-white hover:text-primary transition-colors">
                      <Volume className="h-5 w-5" />
                    </button>

                    <button className="text-white hover:text-primary transition-colors">
                      <Maximize className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-6">
            <p className="text-white/90 max-w-3xl">{scenario.steps[currentStep].description}</p>
          </div>

          <AnimatePresence>
            {showDecision && (
              <motion.div
                className="absolute inset-0 bg-black/70 flex items-center justify-center p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-gray-900 rounded-xl p-6 max-w-2xl w-full"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-xl font-medium mb-4">Выберите действие:</h2>

                  <div className="space-y-3 mb-6">
                    {scenario.steps[currentStep].options.map((option: ScenarioOption) => (
                      <button
                        key={option.id}
                        className={`w-full text-left p-4 rounded-lg border transition-colors ${
                          selectedOption === option.id
                            ? "bg-primary/20 border-primary"
                            : "bg-gray-800 border-gray-700 hover:border-gray-600"
                        }`}
                        onClick={() => handleOptionSelect(option.id)}
                        disabled={feedbackVisible}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                            {option.id}
                          </div>
                          <span>{option.text}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <AnimatePresence>
                    {feedbackVisible && selectedOption !== null && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        {getSelectedOption() && (
                          <div
                            className={`p-4 rounded-lg border mb-6 ${getFeedbackColor(
                              getSelectedOption()?.feedback.type || "",
                            )}`}
                          >
                            <div className="flex items-start gap-3">
                              {getFeedbackIcon(getSelectedOption()?.feedback.type || "")}
                              <div>
                                <div className="font-medium mb-1">
                                  {getSelectedOption()?.feedback.type === "positive" && "Отличное решение!"}
                                  {getSelectedOption()?.feedback.type === "negative" && "Неоптимальное решение"}
                                  {getSelectedOption()?.feedback.type === "neutral" && "Приемлемое решение"}
                                </div>
                                <p>{getSelectedOption()?.feedback.text}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        <Button onClick={handleNextStep} className="w-full">
                          {currentStep < scenario.steps.length - 1 ? "Продолжить" : "Завершить сценарий"}
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        
          <AnimatePresence>
            {teamChatOpen && (
              <motion.div
                className="absolute top-0 right-0 bottom-0 w-80 bg-gray-900 border-l border-gray-800"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 20 }}
              >
                <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                  <h3 className="font-medium">Командный чат</h3>
                  <button onClick={() => setTeamChatOpen(false)}>
                    <X className="h-5 w-5 text-gray-400 hover:text-white" />
                  </button>
                </div>

                <div className="p-4 h-[calc(100%-60px)] flex flex-col">
                  <div className="flex-grow overflow-y-auto space-y-4 mb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                    {scenario.legalCodes.map((code: LegalCode) => (
                      <div key={code.id} className="flex items-start gap-2">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src="/placeholder.svg"
                            alt={code.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="bg-gray-800 rounded-lg p-2 text-sm">
                          <div className="font-medium text-xs text-gray-400 mb-1">{code.title}</div>
                          <p>{code.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Введите сообщение..."
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 pr-10 text-sm"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 text-primary">
                      <MessageSquare className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}


