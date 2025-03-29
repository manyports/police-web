"use client"

import React from "react"
import { useState, useEffect} from "react"
import { AnimatePresence, motion } from "framer-motion"

// Стили для скрытия скролл-бара
const scrollbarHideStyles = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`;

interface LegalCode {
  id: number
  title: string
  article: string
  description: string
  link: string
}

interface Weapon {
  id: number
  title: string
  category: string
  description: string
  link: string
  image?: string
}

export default function TheoryPage() {
    const [lawsData, setLawsData] = useState<{ laws: LegalCode[] }>({ laws: [] })
    const [weaponsData, setWeaponsData] = useState<{ weapons: Weapon[] }>({ weapons: [] })
    const [activeTab, setActiveTab] = useState<'laws' | 'weapons'>('laws')
    const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

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
      
      const fetchWeaponsData = async () => {
        try {
          const response = await fetch('/data/weapons.json')
          const data = await response.json()
          setWeaponsData(data)
        } catch (error) {
          console.error('Error fetching weapons data:', error)
        }
      }
      
      fetchLawsData()
      fetchWeaponsData()
    }, [])
    
    const openModal = (weapon: Weapon) => {
      setSelectedWeapon(weapon)
      setIsModalOpen(true)
    }
    
    const closeModal = () => {
      setIsModalOpen(false)
      setTimeout(() => setSelectedWeapon(null), 300) // Очищаем после анимации закрытия
    }

  return (
    <div className="container mx-auto py-8 px-4">
      <style>{scrollbarHideStyles}</style>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-3xl font-bold mb-8 text-center"
      >
        Материалы для изучения
      </motion.h1>
      
      {/* Tabs Navigation */}
      <div className="flex justify-center mb-10">
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab('laws')}
            className={`py-2 px-5 rounded-md transition-colors duration-300 ${
              activeTab === 'laws' 
                ? 'bg-blue-900 text-white hover:bg-blue-800'
                : 'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            Законы и кодексы
          </button>
          <button 
            onClick={() => setActiveTab('weapons')}
            className={`py-2 px-5 rounded-md transition-colors duration-300 ${
              activeTab === 'weapons' 
                ? 'bg-blue-900 text-white hover:bg-blue-800'
                : 'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            Оружие и правила обращения
          </button>
        </div>
      </div>
      
      {/* Laws Tab Content */}
      {activeTab === 'laws' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Законодательство Республики Казахстан</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lawsData.laws.map((law: LegalCode, index: number) => (
              <motion.div 
                key={law.id} 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow flex flex-col h-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.05*index }}
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
                    className="inline-block w-full text-center text-sm text-white bg-blue-900 hover:bg-blue-800 px-4 py-2 rounded duration-300 transition-all"
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
        </motion.div>
      )}
      
      {/* Weapons Tab Content */}
      {activeTab === 'weapons' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Оружие МВД РК и правила обращения</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {weaponsData.weapons.map((weapon: Weapon, index: number) => (
              <motion.div 
                key={weapon.id} 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow flex flex-col h-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.05*index }}
              >
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold">{weapon.title}</h2>
                    <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-full">
                      {weapon.category}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-4 overflow-hidden">{weapon.description}</p>
                </div>
                <div className="pt-3 mt-auto border-t border-gray-200 dark:border-gray-700">
                  <button 
                    onClick={() => openModal(weapon)}
                    className="inline-block w-full text-center text-sm text-white bg-blue-900 hover:bg-blue-800 px-4 py-2 rounded duration-300 transition-colors"
                  >
                    Подробнее
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          
          {weaponsData.weapons.length === 0 && (
            <div className="text-center py-10">
              <p className="text-lg text-gray-600 dark:text-gray-400">Загрузка информации об оружии...</p>
            </div>
          )}
        </motion.div>
      )}
      
      {/* Модальное окно для детальной информации */}
      <AnimatePresence>
      {isModalOpen && selectedWeapon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-xl w-[90%] max-h-[90vh] overflow-y-auto no-scrollbar"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{selectedWeapon.title}</h2>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <span className="inline-block text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full mb-4">
              {selectedWeapon.category}
            </span>
            
            {selectedWeapon.image && (
              <div className="mb-4">
                <img 
                  src={selectedWeapon.image} 
                  alt={selectedWeapon.title} 
                  className="w-full rounded-md"
                />
              </div>
            )}
            
            <div className="mt-4">
              <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-line">
                {selectedWeapon.description}
              </p>
              
              {selectedWeapon.link && (
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <a 
                    href={selectedWeapon.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    Видеоматериал
                  </a>
                </div>
              )}
            </div>
            
            <div className="mt-6 pt-4 text-right">
              <button 
                onClick={closeModal}
                className="inline-block text-sm text-white bg-blue-900 hover:bg-blue-800 px-6 py-2 rounded duration-300 transition-colors"
              >
                Закрыть
              </button>
            </div>
          </motion.div>
        </div>
      )}
      </AnimatePresence>
    </div>
  )
}

