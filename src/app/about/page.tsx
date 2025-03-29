'use client'
import { motion } from "framer-motion"
import Image from "next/image"
import { Target, History, Heart, ShieldCheck, Brain, BarChart3, Users } from "lucide-react"

export default function About() {
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
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-14 text-center">О нас</h1>
      
      {/* Main section */}
      <div className="w-full mb-16">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-700"
        >
          <motion.h2 
            variants={item} 
            className="text-2xl font-bold mb-6 flex items-center gap-2"
          >
            <Target className="w-6 h-6 text-blue-600" />
            Наша цель
          </motion.h2>
          <motion.p 
            variants={item}
            className="text-gray-700 dark:text-gray-300 text-lg mb-8"
          >
            Создать платформу для обучения и тренировки сотрудников правоохранительных органов, которая будет использоваться в течение всей их карьеры.
          </motion.p>
          
          <motion.div 
            variants={item}
            className="relative h-64 w-full rounded-lg overflow-hidden mb-8"
          >
            <Image
              src="/images/elements/AboutUs.jpg?height=400&width=1200&text=Команда+24" 
              width={1200}
              height={400}
              alt="Наша команда" 
              className="object-cover w-full h-full"
            />
          </motion.div>

          <motion.h2 
            variants={item}
            className="text-2xl font-bold mb-6 flex items-center gap-2"
          >
            <History className="w-6 h-6 text-blue-600" />
            О нас
          </motion.h2>
          <motion.p 
            variants={item}
            className="text-gray-700 dark:text-gray-300 text-lg mb-10"
          >
            Мы команда 23, участвующая на хакатоне Law-and-code 2025. Наш проект направлен на создание инновационной платформы для тренировки и обучения сотрудников правоохранительных органов с использованием современных технологий.
          </motion.p>
          
          {/* Values section */}
          <motion.h2 
            variants={item}
            className="text-2xl font-bold mb-6 flex items-center gap-2"
          >
            <Heart className="w-6 h-6 text-blue-600" />
            Наши ценности
          </motion.h2>
          <motion.div 
            variants={item}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
          >
            <motion.div 
              variants={item}
              className="flex flex-col items-center text-center"
            >
              <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-4 mb-4">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Безопасность</h3>
              <p className="text-gray-700 dark:text-gray-300">Мы создаем безопасную среду для отработки даже самых рискованных сценариев.</p>
            </motion.div>
            <motion.div 
              variants={item}
              className="flex flex-col items-center text-center"
            >
              <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-4 mb-4">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Развитие</h3>
              <p className="text-gray-700 dark:text-gray-300">Мы верим в постоянное совершенствование навыков и компетенций.</p>
            </motion.div>
            <motion.div 
              variants={item}
              className="flex flex-col items-center text-center"
            >
              <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-4 mb-4">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Аналитика</h3>
              <p className="text-gray-700 dark:text-gray-300">Мы используем данные для постоянного улучшения методик обучения.</p>
            </motion.div>
          </motion.div>
          
          {/* Team section */}
          <motion.h2 
            variants={item}
            className="text-2xl font-bold mb-6 flex items-center gap-2"
          >
            <Users className="w-6 h-6 text-blue-600" />
            Наша команда
          </motion.h2>
          <motion.div 
            variants={item}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            <motion.div
              variants={item}
              className="flex flex-col items-center text-center"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <Image width={128} height={128} src="/images/elements/Yerassyl.jpg?height=128&width=128&text=Фото" alt="Team member" className="object-cover w-full h-full" />
              </div>
              <h3 className="font-bold mb-1">Базарбаев Ерасыл</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Developer</p>
            </motion.div>
            <motion.div
              variants={item}
              className="flex flex-col items-center text-center"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <Image width={128} height={128} src="/images/elements/Ayzhas.jpg?height=128&width=128&text=Фото" alt="Team member" className="object-cover w-full h-full" />
              </div>
              <h3 className="font-bold mb-1">Сериков Айжас</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Developer</p>
            </motion.div>
            <motion.div
              variants={item}
              className="flex flex-col items-center text-center"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <Image width={128} height={128} src="/images/elements/Alinur.jpg?height=128&width=128&text=Фото" alt="Team member" className="object-cover w-full h-full" />
              </div>
              <h3 className="font-bold mb-1">Толбаев Алинур</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Team-Lead | Creativity Director</p>
            </motion.div>
            <motion.div
              variants={item}
              className="flex flex-col items-center text-center"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <Image width={128} height={128} src="/images/elements/Alimzhan.jpg?height=128&width=128&text=Фото" alt="Team member" className="object-cover w-full h-full" />
              </div>    
              <h3 className="font-bold mb-1">Жорабек Алимжан</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Designer</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

