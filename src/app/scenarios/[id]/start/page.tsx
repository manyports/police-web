"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Book, Target, Scale } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Mock data - in a real app, this would come from an API or database
const scenariosData = [
  {
    id: "1",
    title: "Задержание при патрулировании города",
    lawIds: [128, 129, 130, 131, 132, 133, 134],
    objectives: [
      "Проверить знание статьи 131 УПК РК и процессуальных норм задержания.",
      "Оценить способность игрока принимать законные и тактически верные решения.",
      "Обучить правилам взаимодействия с подозреваемым и соблюдению прав задержанного.",
      "Развить навыки ситуационного анализа и быстрого реагирования.",
      "Обучить правилам взаимодействия с подозреваемым и соблюдению прав задержанного.",
      "Смоделировать реальную служебную ситуацию для подготовки сотрудников полиции.",
    ]
  },
  {
    id: "2",
    title: "Захват заложников в банке",
    lawIds: [3, 4, 131, 132],
    objectives: [
      "Освободить заложников",
      "Минимизировать риски для гражданских лиц",
      "Задержать преступников"
    ]
  },
  {
    id: "3",
    title: "Расследование места преступления",
    lawIds: [6, 7, 10, 11],
    objectives: [
      "Собрать все улики на месте преступления",
      "Установить личность потерпевшего",
      "Определить возможные мотивы преступления"
    ]
  },
  {
    id: "4",
    title: "Кибератака на инфраструктуру",
    lawIds: [8, 9, 17],
    objectives: [
      "Предотвратить утечку данных",
      "Локализовать источник атаки",
      "Восстановить работу систем"
    ]
  },
  {
    id: "5",
    title: "Штурм здания с террористами",
    lawIds: [16, 17, 131, 132],
    objectives: [
      "Нейтрализовать террористов",
      "Освободить захваченное здание",
      "Обеспечить безопасность гражданских лиц"
    ]
  },
  {
    id: "6",
    title: "Дорожно-транспортное происшествие",
    lawIds: [6, 7, 133, 134],
    objectives: [
      "Оказать первую помощь пострадавшим",
      "Оформить документы о ДТП",
      "Установить причины происшествия"
    ]
  }
]

interface Law {
  id: number
  title: string
  article: string
  description: string
  link: string
}

interface Scenario {
  id: string
  title: string
  lawIds: number[]
  laws?: Law[]
  objectives: string[]
}

export default function ScenarioStartPage() {
  const router = useRouter()
  const params = useParams()
  const [scenario, setScenario] = useState<Scenario | null>(null)
  const [loading, setLoading] = useState(true)
  const [lawsData, setLawsData] = useState<Law[]>([])

  useEffect(() => {
    // Fetch laws data from laws.json
    fetch('/data/laws.json')
      .then(response => response.json())
      .then(data => {
        setLawsData(data.laws)
        
        // After laws are loaded, find the scenario
        const id = params.id as string
        const foundScenario = scenariosData.find(s => s.id === id)
        
        if (foundScenario) {
          // Map law IDs to actual law objects
          const scenarioWithLaws = {
            ...foundScenario,
            laws: foundScenario.lawIds.map(lawId => 
              data.laws.find((law: Law) => law.id === lawId)
            ).filter(Boolean) // Filter out any undefined laws
          }
          
          setScenario(scenarioWithLaws)
        } else {
          // Redirect to scenarios page if scenario not found
          router.push('/scenarios')
        }
        
        setLoading(false)
      })
      .catch(error => {
        console.error("Failed to load laws data:", error)
        setLoading(false)
        // Fallback to scenario without laws if fetch fails
        const id = params.id as string
        const foundScenario = scenariosData.find(s => s.id === id)
        
        if (foundScenario) {
          setScenario(foundScenario)
        } else {
          router.push('/scenarios')
        }
      })
  }, [params.id, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!scenario) return null

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <Card className="border-2 border-blue-200 shadow-xl">
          <CardHeader className="bg-blue-100 rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl md:text-3xl text-blue-900">{scenario.title}</CardTitle>
              <Badge variant="outline" className="bg-blue-700 text-white px-3 py-1">
                Сценарий #{scenario.id}
              </Badge>
            </div>
            <CardDescription className="text-blue-700 mt-2">
              Тренировочный сценарий для отработки профессиональных навыков
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6 pb-2 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-blue-800">
                <Scale className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Задействованные законы:</h3>
              </div>
              <ul className="space-y-2 pl-8 list-disc text-gray-700">
                {scenario.laws && scenario.laws.map((law, index) => (
                  <li key={index} className="group">
                    <div className="flex flex-col">
                      <span className="font-medium">{law.article}</span>
                      <span className="text-sm text-gray-600 mt-1">{law.description}</span>
                      <a 
                        href={law.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-blue-400 group-hover:text-blue-800 transition-all mt-1"
                      >
                        Подробнее →
                      </a>
                    </div>
                  </li>
                ))}
                {!scenario.laws && scenario.lawIds && scenario.lawIds.map((lawId, index) => (
                  <li key={index}>Закон ID: {lawId} (данные не загружены)</li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-blue-800">
                <Target className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Цели миссии:</h3>
              </div>
              <ul className="space-y-2 pl-8 list-disc text-gray-700">
                {scenario.objectives.map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))}
              </ul>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between items-center pt-4 pb-6">
            <Button variant="outline" asChild>
              <Link href="/scenarios">
                Вернуться к списку
              </Link>
            </Button>
            
            <Button className="bg-blue-700 hover:bg-blue-800" size="lg" asChild>
              <Link href={`/scenarios/${scenario.id}/play`}>
                Начать миссию
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
