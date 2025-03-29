"use client"

import { motion } from "framer-motion"
import { Shield, Users, BarChart, BookOpen, Monitor, CheckCircle } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ModulesSection() {
  const modules = [
    {
      title: "Сценарные симуляции",
      description: "Реалистичные сценарии для отработки действий в различных ситуациях",
      icon: Shield,
      image: "main/images/2.1.svg?height=400&width=600&text=Сценарные+симуляции",
      features: [
        "Более 50 реалистичных сценариев",
        "Настраиваемые параметры сложности",
        "Случайные события для непредсказуемости",
        "Различные локации и условия",
      ],
    },
    {
      title: "Анализ действий",
      description: "Детальный разбор и оценка действий с рекомендациями по улучшению",
      icon: BarChart,
      image: "main/images/2.2.svg?height=400&width=600&text=Анализ+действий",
      features: [
        "Запись и воспроизведение действий",
        "Автоматическая оценка эффективности",
        "Персональные рекомендации",
        "Сравнение с эталонными показателями",
      ],
    },
    {
      title: "Командная работа",
      description: "Многопользовательский режим для отработки взаимодействия в команде",
      icon: Users,
      image: "main/images/2.3.svg?height=400&width=600&text=Командная+работа",
      features: [
        "До 8 участников одновременно",
        "Распределение ролей и обязанностей",
        "Голосовая связь между участниками",
        "Сценарии для отработки командного взаимодействия",
      ],
    },
    {
      title: "VR-тренировки",
      description: "Максимальное погружение с использованием технологий виртуальной реальности",
      icon: Monitor,
      image: "main/images/2.4.svg?height=400&width=600&text=VR-тренировки",
      features: [
        "Поддержка популярных VR-гарнитур",
        "Полное отслеживание движений",
        "Реалистичная физика взаимодействия",
        "Тактильная обратная связь",
      ],
    },
    {
      title: "Теоретическая база",
      description: "Доступ к справочникам, нормативным актам и учебным материалам",
      icon: BookOpen,
      image: "main/images/2.5.svg?height=400&width=600&text=Теоретическая+база",
      features: [
        "Обширная библиотека материалов",
        "Интерактивные учебные курсы",
        "Регулярные обновления контента",
        "Тесты для проверки знаний",
      ],
    },
  ]

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
    <section>
      <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Основные модули платформы</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto px-2 sm:px-4 text-sm sm:text-base">
          Наша платформа предлагает комплексный подход к обучению, сочетая практические тренировки с теоретической
          подготовкой
        </p>
      </div>

      <motion.div
        className="space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-16"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        {modules.map((module, index) => (
          <motion.div
            key={module.title}
            variants={item}
            className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-4 sm:gap-6 md:gap-8 items-center`}
          >
            <div className="w-full md:w-1/2">
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-md">
                <Image src={module.image || "/placeholder.svg"} alt={module.title} fill className="object-cover" />
              </div>
            </div>
            <div className="w-full md:w-1/2 mt-4 md:mt-0">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-blue-50 text-primary px-2 sm:px-3 py-0.5 sm:py-1 rounded-full mb-2 sm:mb-3 md:mb-4">
                <module.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm font-medium">Модуль {index + 1}</span>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">
                {module.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                {module.description}
              </p>

              <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 text-sm sm:text-base">
                {module.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="text-xs sm:text-sm py-1.5 px-3 sm:py-2 sm:px-4" asChild>
                <Link href={`/modules/${module.title.toLowerCase().replace(/\s+/g, "-")}`}>
                  Подробнее о модуле
                </Link>
              </Button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

