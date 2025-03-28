"use client"

import { useState, useEffect } from "react"
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
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function ScenarioSimulationPage({ params }: { params: { id: string } }) {
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

  const scenario = {
    id: params.id,
    title: "Захват заложников в банке",
    description:
      "Сложная ситуация с захватом заложников в банке. Тренировка навыков ведения переговоров, тактического планирования и координации действий группы.",
    difficulty: "hard",
    duration: "45-60 мин",
    players: "4-8",
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
          {
            id: 3,
            text: "Запросить дополнительные силы и ждать",
            feedback: {
              type: "neutral",
              text: "Запрос дополнительных сил оправдан, но пассивное ожидание может привести к эскалации ситуации. Необходимо предпринимать активные действия по оценке обстановки.",
            },
          },
        ],
      },
      {
        id: 2,
        title: "Переговоры с преступниками",
        description:
          "Установлен контакт с главарем преступной группы. Он требует предоставить транспорт для бегства и гарантии безопасности в обмен на заложников.",
        image: "/placeholder.svg?height=720&width=1280&text=Переговоры",
        options: [
          {
            id: 1,
            text: "Согласиться на все требования",
            feedback: {
              type: "negative",
              text: "Немедленное согласие на все требования может восприниматься как слабость и привести к выдвижению новых требований. Необходимо вести переговоры более стратегически.",
            },
          },
          {
            id: 2,
            text: "Отказать в требованиях и угрожать штурмом",
            feedback: {
              type: "negative",
              text: "Прямые угрозы могут спровоцировать преступников на причинение вреда заложникам. Это увеличивает риск жертв.",
            },
          },
          {
            id: 3,
            text: "Вести переговоры, выигрывая время для подготовки операции",
            feedback: {
              type: "positive",
              text: "Оптимальное решение. Переговоры позволяют выиграть время для разработки плана, сбора информации и подготовки штурмовой группы, если переговоры зайдут в тупик.",
            },
          },
        ],
      },
      {
        id: 3,
        title: "Планирование операции",
        description:
          "Получена информация о расположении преступников и заложников внутри здания. Необходимо разработать план действий.",
        image: "/placeholder.svg?height=720&width=1280&text=Планирование",
        options: [
          {
            id: 1,
            text: "Использовать снайперов для нейтрализации преступников",
            feedback: {
              type: "neutral",
              text: "Использование снайперов может быть эффективным, но только при наличии четкой видимости целей и уверенности в отсутствии риска для заложников. Требуется дополнительная разведка.",
            },
          },
          {
            id: 2,
            text: "Провести скрытное проникновение через служебные помещения",
            feedback: {
              type: "positive",
              text: "Хорошее решение. Скрытное проникновение минимизирует риск для заложников и позволяет застать преступников врасплох.",
            },
          },
          {
            id: 3,
            text: "Использовать газ для нейтрализации всех находящихся в здании",
            feedback: {
              type: "negative",
              text: "Использование газа в замкнутом пространстве с большим количеством гражданских лиц создает высокий риск для их здоровья и жизни. Это крайняя мера, которую следует применять только в исключительных случаях.",
            },
          },
        ],
      },
      {
        id: 4,
        title: "Штурм здания",
        description:
          "Переговоры зашли в тупик, преступники начинают проявлять агрессию. Принято решение о проведении штурма.",
        image: "/placeholder.svg?height=720&width=1280&text=Штурм",
        options: [
          {
            id: 1,
            text: "Провести одновременный штурм со всех сторон",
            feedback: {
              type: "neutral",
              text: "Одновременный штурм может быть эффективным, но требует высокого уровня координации и создает риск перекрестного огня. Необходимо четкое распределение зон ответственности.",
            },
          },
          {
            id: 2,
            text: "Использовать отвлекающий маневр и основную штурмовую группу",
            feedback: {
              type: "positive",
              text: "Отличное решение. Отвлекающий маневр позволяет перенаправить внимание преступников, в то время как основная группа может действовать более эффективно.",
            },
          },
          {
            id: 3,
            text: "Дождаться, пока преступники сами выйдут с заложниками",
            feedback: {
              type: "negative",
              text: "Пассивное ожидание в ситуации, когда преступники проявляют агрессию, увеличивает риск для заложников. Необходимы активные действия.",
            },
          },
        ],
      },
      {
        id: 5,
        title: "Эвакуация заложников",
        description: "Преступники нейтрализованы, необходимо организовать эвакуацию заложников.",
        image: "/placeholder.svg?height=720&width=1280&text=Эвакуация",
        options: [
          {
            id: 1,
            text: "Быстро вывести всех заложников одновременно",
            feedback: {
              type: "negative",
              text: "Массовая одновременная эвакуация может привести к панике и давке. Кроме того, среди заложников могут быть сообщники преступников.",
            },
          },
          {
            id: 2,
            text: "Проверить каждого заложника перед эвакуацией",
            feedback: {
              type: "positive",
              text: "Правильное решение. Проверка заложников позволяет выявить возможных сообщников и оказать первую помощь пострадавшим.",
            },
          },
          {
            id: 3,
            text: "Сначала эвакуировать раненых, затем остальных",
            feedback: {
              type: "neutral",
              text: "Приоритет эвакуации раненых оправдан, но необходимо также обеспечить безопасность процесса эвакуации для всех заложников.",
            },
          },
        ],
      },
    ],
    team: [
      {
        id: 1,
        name: "Капитан Иванов",
        role: "Руководитель операции",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 2,
        name: "Лейтенант Петров",
        role: "Переговорщик",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 3,
        name: "Сержант Сидоров",
        role: "Командир штурмовой группы",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 4,
        name: "Старший лейтенант Козлов",
        role: "Снайпер",
        avatar: "/placeholder.svg?height=100&width=100",
      },
    ],
  }

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

  useEffect(() => {
    const totalSeconds = Math.floor((progress / 100) * 600) 
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    setCurrentTime(`${minutes}:${seconds.toString().padStart(2, "0")}`)
  }, [progress])

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
    if (currentStep < scenario.steps.length - 1) {
      setCurrentStep(currentStep + 1)
      setSelectedOption(null)
      setFeedbackVisible(false)
      setShowDecision(false)
      setProgress(0)
      setIsPlaying(true)
    } else {
      window.location.href = `/scenarios/${params.id}/results`
    }
  }

  const getSelectedOption = () => {
    if (selectedOption === null) return null
    return scenario.steps[currentStep].options.find((option) => option.id === selectedOption)
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

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 z-50 bg-gray-900 flex flex-col items-center justify-center p-4 md:p-8"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="max-w-2xl w-full space-y-6 text-center bg-white/5 p-6 md:p-8 rounded-xl backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{scenario.title}</h1>
              <p className="text-base md:text-lg text-gray-300 mb-4">{scenario.description}</p>

              <div className="flex justify-center gap-4 md:gap-6 mb-6 flex-wrap">
                <div className="flex flex-col items-center">
                  <Clock className="h-5 w-5 md:h-6 md:w-6 text-gray-400 mb-2" />
                  <span className="text-xs md:text-sm text-gray-400">Длительность</span>
                  <span className="font-medium text-sm md:text-base">{scenario.duration}</span>
                </div>
                <div className="flex flex-col items-center">
                  <Users className="h-5 w-5 md:h-6 md:w-6 text-gray-400 mb-2" />
                  <span className="text-xs md:text-sm text-gray-400">Участники</span>
                  <span className="font-medium text-sm md:text-base">{scenario.players}</span>
                </div>
                <div className="flex flex-col items-center">
                  <Shield className="h-5 w-5 md:h-6 md:w-6 text-gray-400 mb-2" />
                  <span className="text-xs md:text-sm text-gray-400">Сложность</span>
                  <span className="font-medium text-sm md:text-base">Сложный</span>
                </div>
              </div>

              <div className="bg-gray-800/70 rounded-lg p-4 md:p-6 mb-6">
                <h2 className="text-lg md:text-xl font-medium mb-4">Цели миссии:</h2>
                <ul className="space-y-2 text-left">
                  {scenario.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-sm md:text-base">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-800/70 rounded-lg p-4 md:p-6 mb-8">
                <h2 className="text-lg md:text-xl font-medium mb-4">Ваша команда:</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {scenario.team.map((member) => (
                    <div key={member.id} className="flex flex-col items-center">
                      <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden mb-2">
                        <Image
                          src={member.avatar || "/placeholder.svg"}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="text-sm font-medium">{member.name}</div>
                      <div className="text-xs text-gray-400">{member.role}</div>
                    </div>
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
            href={`/scenarios/${params.id}`}
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
                    {scenario.steps[currentStep].options.map((option) => (
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
                  <div className="flex-grow overflow-y-auto space-y-4 mb-4">
                    {scenario.team.map((member) => (
                      <div key={member.id} className="flex items-start gap-2">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={member.avatar || "/placeholder.svg"}
                            alt={member.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="bg-gray-800 rounded-lg p-2 text-sm">
                          <div className="font-medium text-xs text-gray-400 mb-1">{member.name}</div>
                          <p>Готов выполнять свои обязанности. Жду указаний.</p>
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

