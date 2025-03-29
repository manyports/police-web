"use client"

import React from "react"
import { useState, useEffect} from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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
    const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

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
      setTimeout(() => setSelectedWeapon(null), 300)
    }

  return (
    <div className="container mx-auto py-8 sm:py-10 md:py-12 px-4 max-w-6xl">
      <style>{scrollbarHideStyles}</style>
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent drop-shadow-sm"
      >
        Материалы для изучения
      </motion.h1>
      
      <Tabs defaultValue="laws" className="w-full">
        <div className="flex justify-center mb-8 sm:mb-10 md:mb-12">
          <TabsList className="shadow-md relative overflow-hidden">
            <TabsTrigger 
              value="laws"
              className="px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 text-sm sm:text-base transition-all duration-300 relative z-10 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
            >
              Законы и кодексы
            </TabsTrigger>
            <TabsTrigger 
              value="weapons"
              className="px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 text-sm sm:text-base transition-all duration-300 relative z-10 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
            >
              Оружие и правила обращения
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="laws">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="focus:outline-none"
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 text-center">
              <span className="inline-block pb-2 border-b-2 border-primary/50">
                Законодательство Республики Казахстан
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {lawsData.laws.map((law: LegalCode, index: number) => (
                <motion.div 
                  key={law.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.05*index }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="h-full"
                >
                  <Card className="h-full flex flex-col shadow-lg border-opacity-50 hover:shadow-xl transition-shadow duration-300 group">
                    <CardHeader className="pb-2 sm:pb-3 space-y-1.5">
                      <CardTitle className="text-lg sm:text-xl group-hover:text-primary transition-colors duration-300">{law.title}</CardTitle>
                      <CardDescription className="text-base sm:text-lg font-semibold text-primary/90 mt-1">{law.article}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow pt-0">
                      <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{law.description}</p>
                    </CardContent>
                    <CardFooter className="pt-3 sm:pt-4 border-t">
                      <Button 
                        className="w-full font-medium shadow-sm transition-all duration-300 hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2" 
                        asChild
                      >
                        <a 
                          href={law.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <span>Подробнее</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            {lawsData.laws.length === 0 && (
              <div className="text-center py-10 sm:py-16">
                <motion.div
                  animate={{ 
                    opacity: [0.5, 1, 0.5],
                    scale: [0.98, 1, 0.98]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2
                  }}
                >
                  <p className="text-base sm:text-lg text-muted-foreground">Загрузка законов...</p>
                </motion.div>
              </div>
            )}
          </motion.div>
        </TabsContent>
        
        <TabsContent value="weapons">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="focus:outline-none"
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 text-center">
              <span className="inline-block pb-2 border-b-2 border-primary/50">
                Оружие МВД РК и правила обращения
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {weaponsData.weapons.map((weapon: Weapon, index: number) => (
                <motion.div 
                  key={weapon.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.05*index }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="h-full"
                >
                  <Card className="h-full flex flex-col shadow-lg border-opacity-50 hover:shadow-xl transition-shadow duration-300 group">
                    <CardHeader className="pb-2 sm:pb-3 space-y-1.5">
                      <div className="flex justify-between items-start gap-3">
                        <CardTitle className="text-lg sm:text-xl group-hover:text-primary transition-colors duration-300">{weapon.title}</CardTitle>
                        <span className="text-xs bg-primary/10 text-primary px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full font-medium shrink-0">
                          {weapon.category}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow pt-0">
                      <p className="text-muted-foreground line-clamp-4 overflow-hidden leading-relaxed text-sm sm:text-base">{weapon.description}</p>
                    </CardContent>
                    <CardFooter className="pt-3 sm:pt-4 border-t">
                      <Button 
                        className="w-full font-medium shadow-sm transition-all duration-300 hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2" 
                        onClick={() => openModal(weapon)}
                      >
                        <span className="flex items-center justify-center gap-2">
                          <span>Подробнее</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </span>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            {weaponsData.weapons.length === 0 && (
              <div className="text-center py-10 sm:py-16">
                <motion.div
                  animate={{ 
                    opacity: [0.5, 1, 0.5],
                    scale: [0.98, 1, 0.98]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2
                  }}
                >
                  <p className="text-base sm:text-lg text-muted-foreground">Загрузка информации об оружии...</p>
                </motion.div>
              </div>
            )}
          </motion.div>
        </TabsContent>
      </Tabs>
      
      <AnimatePresence>
      {isModalOpen && selectedWeapon && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
            className="bg-card text-card-foreground rounded-xl shadow-2xl p-4 sm:p-6 max-w-xl w-[95%] sm:w-[90%] max-h-[85vh] sm:max-h-[90vh] overflow-y-auto no-scrollbar border border-border/50"
          >
            <div className="flex justify-between items-start mb-3 sm:mb-4 sticky top-0 bg-card pt-1 pb-2 z-10">
              <h2 className="text-xl sm:text-2xl font-bold pr-8">{selectedWeapon.title}</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={closeModal}
                className="h-7 w-7 sm:h-8 sm:w-8 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors absolute top-0 right-0 focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="sr-only">Закрыть</span>
              </Button>
            </div>
            
            <span className="inline-block text-xs sm:text-sm bg-primary/10 text-primary px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full mb-4 sm:mb-5 font-medium">
              {selectedWeapon.category}
            </span>
            
            {selectedWeapon.image && (
              <div className="mb-4 sm:mb-5 overflow-hidden rounded-lg shadow-md">
                <img 
                  src={selectedWeapon.image} 
                  alt={selectedWeapon.title} 
                  className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
            )}
            
            <div className="mt-3 sm:mt-4">
              <p className="text-muted-foreground mb-4 sm:mb-5 whitespace-pre-line leading-relaxed text-sm sm:text-base">
                {selectedWeapon.description}
              </p>
              
              {selectedWeapon.link && (
                <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full font-medium  transition-colors focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
                    asChild
                  >
                    <a 
                      href={selectedWeapon.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-center gap-2 py-2 h-auto sm:h-11"
                    >
                      <span>Узнать больше</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
      </AnimatePresence>
    </div>
  )
}

