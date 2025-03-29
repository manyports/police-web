"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, ChevronDown, Clock, Star, Play, Info, AlertTriangle, Zap, Award } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Scenario } from "@/types/scenario"

export default function ScenariosPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [activeFilter, setActiveFilter] = useState("all")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [scenarios, setScenarios] = useState<Scenario[]>([])

  useEffect(() => {
    fetch('/data/scenаrios.json')
      .then(response => response.json())
      .then(data => setScenarios(data.scenarios))
  }, [])

  const categories = [
    { id: "all", name: "Все сценарии" },
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
            <Button asChild>
              <Link href="/scenarios/create">Создать сценарий</Link>
            </Button>
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
                {activeCategory === "all" ? "Все сценарии" : categories.find((c) => c.id === activeCategory)?.name}
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
                    className="border border-gray-200 rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-md transition-all bg-white"
                  >
                    <div className="relative aspect-video">
                      <Image
                        src={scenario.image || "/placeholder.svg"}
                        alt={scenario.title}
                        fill
                        className="object-cover"
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
                    <div className="p-4">
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-4">{scenario.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {scenario.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-blue-50 text-primary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between flex-wrap gap-2">
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
                    <div className="border-t border-gray-200 p-4 flex justify-between flex-wrap gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/scenarios/${scenario.scenarioId || scenario.id}`} className="flex items-center gap-2">
                          <Info className="h-4 w-4" />
                          Подробнее
                        </Link>
                      </Button>
                      <Button size="sm" asChild>
                        <Link href={`/scenarios/${scenario.scenarioId || scenario.id}/start`} className="flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          Начать
                        </Link>
                      </Button>
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

