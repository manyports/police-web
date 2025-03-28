"use client"

import { motion } from "framer-motion"
import { Users, BookOpen, Clock, Award } from "lucide-react"

export default function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: "5,000+",
      label: "Активных пользователей",
      description: "Сотрудники из более чем 120 подразделений",
    },
    {
      icon: BookOpen,
      value: "200+",
      label: "Учебных сценариев",
      description: "Регулярно обновляемая база сценариев",
    },
    {
      icon: Clock,
      value: "50,000+",
      label: "Часов тренировок",
      description: "Проведено на платформе за последний год",
    },
    {
      icon: Award,
      value: "92%",
      label: "Эффективность",
      description: "Улучшение показателей после тренировок",
    },
  ]

  return (
    <section className="py-8">
      <div className="bg-primary/5 rounded-2xl p-8 md:p-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Платформа в цифрах</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Результаты использования нашей платформы говорят сами за себя
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-background rounded-xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="font-medium mb-2">{stat.label}</div>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

