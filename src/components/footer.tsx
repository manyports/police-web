"use client"

import { Facebook, Instagram, Twitter, Youtube, Mail, Phone } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Footer() {
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
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <footer className="bg-foreground text-background mt-16 md:mt-24">
      <div className="mx-auto w-[90%] md:w-[80%] max-w-7xl py-12 md:py-16">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div variants={item}>
            <h3 className="text-xl font-medium mb-6">
              Police<span className="text-primary-foreground">Train</span>
            </h3>
            <p className="text-sm text-background/70 leading-relaxed">
              Инновационная платформа для тренировки сотрудников правоохранительных органов с использованием передовых
              технологий
            </p>
          </motion.div>

          <motion.div variants={item}>
            <h4 className="font-medium mb-6">О платформе</h4>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-sm text-background/70 hover:text-background transition-colors">
                  О нас
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-background/70 hover:text-background transition-colors">
                  Технологии
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-background/70 hover:text-background transition-colors">
                  Партнеры
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={item}>
            <h4 className="font-medium mb-6">Поддержка</h4>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-sm text-background/70 hover:text-background transition-colors">
                  Связаться с нами
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-background/70 hover:text-background transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-background/70 hover:text-background transition-colors">
                  Документация
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={item}>
            <h4 className="font-medium mb-6">Контакты</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-background/70">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>info@policetrain.kz</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-background/70">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+7 (707) 000-00-00</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              <motion.a
                href="#"
                className="text-background/70 hover:text-background transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                className="text-background/70 hover:text-background transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                className="text-background/70 hover:text-background transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                className="text-background/70 hover:text-background transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Youtube className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}

