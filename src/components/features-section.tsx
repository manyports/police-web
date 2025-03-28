"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Clock, Zap, BarChart3, Brain, Layers, Repeat, Gauge, Award, Fingerprint } from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Безопасная среда",
      description: "Отработка навыков без риска для жизни и здоровья",
    },
    {
      icon: Clock,
      title: "Экономия времени",
      description: "Быстрая настройка и запуск тренировок",
    },
    {
      icon: Zap,
      title: "Мгновенная обратная связь",
      description: "Немедленная оценка действий и решений",
    },
    {
      icon: BarChart3,
      title: "Детальная аналитика",
      description: "Подробные отчеты о прогрессе и результатах",
    },
    {
      icon: Brain,
      title: "Развитие навыков",
      description: "Целенаправленное улучшение критических компетенций",
    },
    {
      icon: Layers,
      title: "Многоуровневая сложность",
      description: "Постепенное повышение сложности тренировок",
    },
    {
      icon: Repeat,
      title: "Многократное повторение",
      description: "Возможность отработки сценариев до автоматизма",
    },
    {
      icon: Gauge,
      title: "Стрессоустойчивость",
      description: "Тренировка действий в стрессовых ситуациях",
    },
    {
      icon: Award,
      title: "Система достижений",
      description: "Мотивация через награды и признание",
    },
    {
      icon: Fingerprint,
      title: "Персонализация",
      description: "Адаптация тренировок под индивидуальные потребности",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Преимущества платформы</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Наша платформа предлагает уникальные возможности для эффективной подготовки сотрудников правоохранительных
          органов
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            variants={item}
            className="border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <feature.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

