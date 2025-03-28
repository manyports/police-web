"use client"

import { motion } from "framer-motion"
import {
  CheckCircle,
  Clock,
  Download,
  ExternalLink,
  Medal,
  Share2,
  Shield,
  ThumbsUp,
  X,
  AlertTriangle,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function ScenarioResultsPage({ params }: { params: { id: string } }) {
  const results = {
    scenarioId: params.id,
    scenarioTitle: "Захват заложников в банке",
    completionTime: "38:24",
    score: 78,
    maxScore: 100,
    decisions: [
      {
        step: "Прибытие на место",
        decision: "Оцепить территорию и начать переговоры",
        evaluation: "positive",
        points: 20,
        maxPoints: 20,
        feedback:
          "Правильное решение. Оцепление территории и начало переговоров позволяет выиграть время для оценки ситуации и подготовки плана действий.",
      },
      {
        step: "Переговоры с преступниками",
        decision: "Вести переговоры, выигрывая время для подготовки операции",
        evaluation: "positive",
        points: 20,
        maxPoints: 20,
        feedback:
          "Оптимальное решение. Переговоры позволяют выиграть время для разработки плана, сбора информации и подготовки штурмовой группы, если переговоры зайдут в тупик.",
      },
      {
        step: "Планирование операции",
        decision: "Использовать снайперов для нейтрализации преступников",
        evaluation: "neutral",
        points: 10,
        maxPoints: 20,
        feedback:
          "Использование снайперов может быть эффективным, но только при наличии четкой видимости целей и уверенности в отсутствии риска для заложников. Требуется дополнительная разведка.",
      },
      {
        step: "Штурм здания",
        decision: "Провести одновременный штурм со всех сторон",
        evaluation: "neutral",
        points: 10,
        maxPoints: 20,
        feedback:
          "Одновременный штурм может быть эффективным, но требует высокого уровня координации и создает риск перекрестного огня. Необходимо четкое распределение зон ответственности.",
      },
      {
        step: "Эвакуация заложников",
        decision: "Проверить каждого заложника перед эвакуацией",
        evaluation: "positive",
        points: 20,
        maxPoints: 20,
        feedback:
          "Правильное решение. Проверка заложников позволяет выявить возможных сообщников и оказать первую помощь пострадавшим.",
      },
    ],
    objectives: [
      {
        text: "Установить контакт с преступниками",
        completed: true,
      },
      {
        text: "Оценить ситуацию и риски",
        completed: true,
      },
      {
        text: "Разработать план освобождения заложников",
        completed: true,
      },
      {
        text: "Минимизировать потери среди гражданских лиц",
        completed: true,
      },
      {
        text: "Задержать преступников",
        completed: true,
      },
    ],
    skills: [
      {
        name: "Тактическое мышление",
        score: 75,
        improvement: "+5",
      },
      {
        name: "Принятие решений",
        score: 80,
        improvement: "+8",
      },
      {
        name: "Командная работа",
        score: 85,
        improvement: "+3",
      },
      {
        name: "Коммуникация",
        score: 70,
        improvement: "+2",
      },
      {
        name: "Стрессоустойчивость",
        score: 65,
        improvement: "+10",
      },
    ],
    achievements: [
      {
        icon: Medal,
        title: "Спасатель",
        description: "Все заложники спасены без потерь",
      },
      {
        icon: Clock,
        title: "Эффективность",
        description: "Сценарий завершен быстрее среднего времени",
      },
    ],
    recommendations: [
      "Уделите больше внимания планированию операций с учетом всех возможных рисков",
      "Тренируйте навыки принятия решений в условиях неопределенности",
      "Рекомендуется пройти дополнительные тренировки по тактическому планированию",
    ],
  }

  const getEvaluationColor = (evaluation: string) => {
    switch (evaluation) {
      case "positive":
        return "text-green-600"
      case "negative":
        return "text-red-600"
      case "neutral":
        return "text-yellow-600"
      default:
        return "text-gray-600"
    }
  }

  const getEvaluationIcon = (evaluation: string) => {
    switch (evaluation) {
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

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-blue-50 py-8 md:py-12">
        <div className="mx-auto w-[90%] md:w-[80%] max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Результаты тренировки</h1>
              <p className="text-muted-foreground">
                {results.scenarioTitle} • Завершено за {results.completionTime}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">Поделиться</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Скачать отчет</span>
              </Button>
              <Button asChild>
                <Link href="/scenarios" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">К списку сценариев</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-[90%] md:w-[80%] max-w-7xl py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={item} className="flex flex-col md:flex-row items-center gap-6 mb-6">
                <div className="relative w-24 h-24 md:w-32 md:h-32">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-2xl md:text-3xl font-bold">{results.score}%</div>
                  </div>
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#eee"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      strokeDasharray={`${results.score}, 100`}
                    />
                  </svg>
                </div>

                <div className="flex-grow text-center md:text-left">
                  <h2 className="text-xl font-bold mb-2">Общий результат</h2>
                  <p className="text-muted-foreground mb-4">
                    Вы успешно завершили сценарий и достигли {results.score} из {results.maxScore} возможных баллов.
                  </p>

                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <span>{results.completionTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>
                        {results.objectives.filter((o) => o.completed).length} из {results.objectives.length} целей
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="h-5 w-5 text-primary" />
                      <span>
                        {results.decisions.filter((d) => d.evaluation === "positive").length} оптимальных решений
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={item}>
                <h3 className="font-medium mb-3">Достижение целей</h3>
                <div className="space-y-2 mb-6">
                  {results.objectives.map((objective, index) => (
                    <div key={index} className="flex items-start gap-2">
                      {objective.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      ) : (
                        <X className="h-5 w-5 text-red-600 mt-0.5" />
                      )}
                      <span>{objective.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={item}>
                <h3 className="font-medium mb-3">Достижения</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <achievement.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{achievement.title}</div>
                        <div className="text-sm text-muted-foreground">{achievement.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6"
              variants={container}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.2 }}
            >
              <motion.h2 variants={item} className="text-xl font-bold mb-6">
                Принятые решения
              </motion.h2>

              <motion.div variants={item} className="space-y-6">
                {results.decisions.map((decision, index) => (
                  <div key={index} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                    <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                      <div className="font-medium">{decision.step}</div>
                      <div className="flex items-center gap-1">
                        <span>{decision.points}</span>
                        <span className="text-muted-foreground">/ {decision.maxPoints}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 mb-3">
                      {getEvaluationIcon(decision.evaluation)}
                      <div>
                        <div className={`font-medium ${getEvaluationColor(decision.evaluation)}`}>
                          {decision.decision}
                        </div>
                        <p className="text-sm text-muted-foreground">{decision.feedback}</p>
                      </div>
                    </div>

                    <Progress value={(decision.points / decision.maxPoints) * 100} className="h-1" />
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          <div className="space-y-8">
            <motion.div
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6"
              variants={container}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.3 }}
            >
              <motion.h2 variants={item} className="text-xl font-bold mb-6">
                Развитие навыков
              </motion.h2>

              <motion.div variants={item} className="space-y-4">
                {results.skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <div className="font-medium">{skill.name}</div>
                      <div className="flex items-center gap-2">
                        <span>{skill.score}%</span>
                        <span className="text-green-600 text-sm">{skill.improvement}</span>
                      </div>
                    </div>
                    <Progress value={skill.score} className="h-2" />
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6"
              variants={container}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.4 }}
            >
              <motion.h2 variants={item} className="text-xl font-bold mb-6">
                Рекомендации
              </motion.h2>

              <motion.div variants={item} className="space-y-3">
                {results.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
                    <span>{recommendation}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6"
              variants={container}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.5 }}
            >
              <motion.h2 variants={item} className="text-xl font-bold mb-6">
                Рекомендуемые сценарии
              </motion.h2>

              <motion.div variants={item} className="space-y-4">
                {[
                  {
                    id: 1,
                    title: "Переговоры с преступниками",
                    image: "/placeholder.svg?height=100&width=100&text=Переговоры",
                    difficulty: "medium",
                  },
                  {
                    id: 2,
                    title: "Тактическое планирование спецопераций",
                    image: "/placeholder.svg?height=100&width=100&text=Тактика",
                    difficulty: "hard",
                  },
                  {
                    id: 3,
                    title: "Эвакуация при чрезвычайных ситуациях",
                    image: "/placeholder.svg?height=100&width=100&text=Эвакуация",
                    difficulty: "medium",
                  },
                ].map((scenario) => (
                  <Link
                    key={scenario.id}
                    href={`/scenarios/${scenario.id}`}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <div className="relative w-12 h-12 rounded-md overflow-hidden">
                      <Image
                        src={scenario.image || "/placeholder.svg"}
                        alt={scenario.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="font-medium text-sm">{scenario.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {scenario.difficulty === "easy" && "Легкий"}
                        {scenario.difficulty === "medium" && "Средний"}
                        {scenario.difficulty === "hard" && "Сложный"}
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </Link>
                ))}
              </motion.div>

              <motion.div variants={item} className="mt-4">
                <Button variant="outline" asChild className="w-full">
                  <Link href="/scenarios">Просмотреть все сценарии</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

