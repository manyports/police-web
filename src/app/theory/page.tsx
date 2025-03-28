"use client"

import { useState, useEffect} from "react"
import { motion } from "framer-motion"

interface LegalCode {
  id: number
  title: string
  article: string
  description: string
  link: string
}

export default function TheoryPage() {
    const [lawsData, setLawsData] = useState<{ laws: LegalCode[] }>({ laws: [] })

    // Fetch laws data
    useEffect(() => {
    const fetchLawsData = async () => {
      try {
        const response = await fetch('/data/laws.json')
        const data = await response.json()
        setLawsData(data)
      } catch (error) {
        console.error('Error fetching laws data:', error)
      }
    }
    fetchLawsData()
  }, [])

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-3xl font-bold mb-14 text-center"
      >
        Материалы для изучения
      </motion.h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lawsData.laws.map((law: LegalCode, index: number) => (
          <motion.div 
            key={law.id} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow flex flex-col h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1*index }}
          >
            <div className="flex-grow">
              <h2 className="text-xl font-bold mb-2">{law.title}</h2>
              <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">{law.article}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{law.description}</p>
            </div>
            <div className="pt-3 mt-auto border-t border-gray-200 dark:border-gray-700">
              <a 
                href={law.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block w-full text-center text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors"
              >
                Подробнее
              </a>
            </div>
          </motion.div>
        ))}
      </div>
      
      {lawsData.laws.length === 0 && (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600 dark:text-gray-400">Загрузка законов...</p>
        </div>
      )}
    </div>
  )
}

