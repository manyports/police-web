"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Home, Search, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"

export default function NotFound() {
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setSpotlight({ 
        x: e.clientX, 
        y: e.clientY 
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

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
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen flex flex-col overflow-hidden relative bg-gradient-to-b from-background to-background/95">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <svg width="100%" height="100%" className="absolute opacity-5">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Spotlight effect */}
      <motion.div 
        className="absolute w-[300px] h-[300px] rounded-full bg-primary/20 blur-3xl pointer-events-none"
        animate={{
          x: spotlight.x - 150,
          y: spotlight.y - 150,
        }}
        transition={{ type: "spring", damping: 10 }}
      />

      <div className="flex-grow flex items-center justify-center z-10">
        <motion.div 
          className="mx-auto w-[90%] md:w-[80%] max-w-7xl py-16 md:py-24 text-center"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <div className="relative mb-8">
            <motion.div
              variants={item}
              className="relative z-10"
            >
              <h1 className="text-8xl md:text-9xl font-bold mb-4 relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">404</span>
                <motion.div 
                  className="absolute -top-6 -right-6 w-16 h-16 text-primary"
                  animate={{ 
                    rotate: [0, 10, 0, -10, 0],
                    scale: [1, 1.1, 1, 1.1, 1]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 5,
                    ease: "easeInOut" 
                  }}
                >
                  <Search className="w-full h-full" />
                </motion.div>
              </h1>
            </motion.div>
            
            <motion.div 
              className="absolute inset-0 bg-primary/10 blur-3xl rounded-full transform scale-150"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            />
          </div>
          
          <motion.div
            variants={item}
          >
            <h2 className="text-3xl md:text-4xl font-medium mb-6">Дело о пропавшей странице</h2>
          </motion.div>
          
          <motion.p
            variants={item}
            className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Похоже, файл, который вы ищете, скрылся в неизвестном направлении. Наши лучшие цифровые детективы уже работают над этим делом!
          </motion.p>
          
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              href="/" 
              className="group inline-flex items-center gap-2 bg-primary text-background px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors w-full sm:w-auto justify-center"
            >
              <Home className="h-5 w-5" />
              <span>Вернуться на базу</span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            </Link>
          </motion.div>
          
          {/* Animated decorative element */}
          <motion.div 
            className="w-24 h-1 bg-primary/30 rounded-full mx-auto mt-16"
            animate={{ width: ["20%", "40%", "20%"] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </div>
  )
} 