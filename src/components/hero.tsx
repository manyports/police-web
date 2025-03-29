"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronRight, Shield, Users, BarChart, BookOpen, Monitor } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Hero() {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    {
      title: "Сценарные симуляции",
      description: "Моделирование реальных ситуаций для отработки навыков принятия решений",
      icon: Shield,
      image: "main/images/1.1.svg?height=600&width=1200&text=Сценарные+симуляции",
    },
    {
      title: "Анализ действий",
      description: "Детальный разбор и оценка действий с рекомендациями по улучшению",
      icon: BarChart,
      image: "main/images/1.2.svg?height=600&width=1200&text=Анализ+действий",
    },
    {
      title: "Командная работа",
      description: "Многопользовательский режим для отработки взаимодействия в команде",
      icon: Users,
      image: "main/images/1.3.svg?height=600&width=1200&text=Командная+работа",
    },
    {
      title: "VR-тренировки",
      description: "Максимальное погружение с использованием технологий виртуальной реальности",
      icon: Monitor,
      image: "main/images/1.4.svg?height=600&width=1200&text=VR-тренировки",
    },
    {
      title: "Теоретическая база",
      description: "Доступ к справочникам, нормативным актам и учебным материалам",
      icon: BookOpen,
      image: "main/images/1.5.svg?height=600&width=1200&text=Теоретическая+база",
    },
  ]

  return (
    <div className="relative bg-gradient-to-b from-blue-50 to-white pt-4 sm:pt-6 md:pt-12 lg:pt-16 pb-4 sm:pb-6 md:pb-12 lg:pb-16">
      <div className="mx-auto w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] max-w-7xl">
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center">
          <motion.div
            className="w-full md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              Виртуальная тренировочная платформа для полицейских
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6">
              Инновационная система подготовки к реальным ситуациям с использованием передовых технологий симуляции и
              виртуальной реальности
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4">
              <Button size="lg" className="text-sm sm:text-base py-2 px-4 sm:py-2.5 sm:px-5" asChild>
                <Link href="/scenarios">Начать тренировку</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-sm sm:text-base py-2 px-4 sm:py-2.5 sm:px-5" asChild>
                <Link href="/about" className="flex items-center gap-2">
                  Узнать больше
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 relative mt-6 md:mt-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
              <Image
                src={tabs[activeTab].image || "/placeholder.svg"}
                alt={tabs[activeTab].title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-3 sm:p-4 md:p-5 lg:p-6 text-white">
                  <h3 className="text-base sm:text-lg md:text-xl font-medium mb-1 sm:mb-2">{tabs[activeTab].title}</h3>
                  <p className="text-white/80 text-xs sm:text-sm md:text-base">{tabs[activeTab].description}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-3 sm:mt-4 gap-1.5 sm:gap-2">
              {tabs.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-colors ${
                    index === activeTab ? "bg-primary" : "bg-primary/20 hover:bg-primary/40"
                  }`}
                  onClick={() => setActiveTab(index)}
                  aria-label={`Переключиться на ${tabs[index].title}`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1.5 sm:gap-2 md:gap-3 lg:gap-4">
          {tabs.map((tab, index) => (
            <motion.button
              key={index}
              className={`p-2 sm:p-3 md:p-4 rounded-lg border transition-all ${
                activeTab === index
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-gray-200 hover:border-primary/50 hover:bg-primary/5"
              }`}
              onClick={() => setActiveTab(index)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <div className="flex flex-col items-center text-center">
                <tab.icon
                  className={`h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 mb-1 sm:mb-2 ${activeTab === index ? "text-primary" : "text-muted-foreground"}`}
                />
                <span className={`text-[10px] xs:text-xs sm:text-xs md:text-sm font-medium ${activeTab === index ? "text-primary" : ""}`}>
                  {tab.title}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

