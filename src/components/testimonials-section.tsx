"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import Image from "next/image"

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const testimonials = [
    {
      id: 1,
      name: "Александр Петров",
      role: "Начальник отдела подготовки",
      text: "Внедрение этой платформы позволило нам значительно повысить качество подготовки сотрудников. Особенно ценна возможность моделировать сложные ситуации без риска для жизни и здоровья.",
      image: "/images/elements/Sasha.jpg?height=100&width=100",
      rating: 5,
    },
    {
      id: 2,
      name: "Елена Соколова",
      role: "Инструктор тактической подготовки",
      text: "Как инструктор, я высоко ценю аналитические возможности платформы. Детальный разбор действий позволяет выявлять слабые места и целенаправленно работать над их устранением.",
      image: "/images/elements/Elen.jpg?height=100&width=100",
      rating: 5,
    },
    {
      id: 3,
      name: "Дмитрий Волков",
      role: "Сотрудник спецподразделения",
      text: "Тренировки в виртуальной реальности дают ощущение полного погружения. После регулярных занятий на платформе я стал действовать более уверенно и эффективно в реальных ситуациях.",
      image: "/images/elements/Dima.jpg?height=100&width=100",
      rating: 4,  
    },
  ]

  const next = () => setCurrent((current + 1) % testimonials.length)
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length)

  useEffect(() => {
    if (!autoplay) return
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [current, autoplay])

  return (
    <section>
      <h2 className="text-3xl font-bold mb-12 text-center">Отзывы пользователей</h2>

      <div
        className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-transparent rounded-2xl"
        onMouseEnter={() => setAutoplay(false)}
        onMouseLeave={() => setAutoplay(true)}
      >
        <div className="absolute top-6 left-8 opacity-10">
          <Quote className="h-24 w-24 text-primary" />
        </div>

        <div className="p-8 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row gap-8 items-center"
            >
              <div className="md:w-1/4 flex flex-col items-center text-center">
                <motion.div
                  className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Image
                    src={testimonials[current].image || "/placeholder.svg"}
                    alt={testimonials[current].name}
                    fill
                    className="object-cover"
                  />
                </motion.div>

                <motion.h3
                  className="font-medium text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {testimonials[current].name}
                </motion.h3>

                <motion.p
                  className="text-sm text-muted-foreground mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {testimonials[current].role}
                </motion.p>

                <motion.div
                  className="flex"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < testimonials[current].rating ? "text-yellow-500" : "text-gray-300"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </motion.div>
              </div>

              <div className="md:w-3/4 relative">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative z-10"
                >
                  <p className="text-lg leading-relaxed italic mb-6 md:pl-6">"{testimonials[current].text}"</p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-4 right-4 flex gap-2">
          <motion.button
            onClick={prev}
            className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="h-5 w-5 text-primary" />
          </motion.button>

          <motion.button
            onClick={next}
            className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="h-5 w-5 text-primary" />
          </motion.button>
        </div>

        <div className="absolute bottom-4 left-4 flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === current ? "bg-primary" : "bg-primary/20 hover:bg-primary/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

