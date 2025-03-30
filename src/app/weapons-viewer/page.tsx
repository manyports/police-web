"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, Info, Maximize2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface WeaponJsonData {
  id: number
  title: string
  category: string
  description?: string
  image?: string
  link?: string
}

interface WeaponInfo {
  id: string
  name: string
  type: string
  description: string
  details: {
    caliber: string
    weight: string
    length: string
    year: string
    capacity: string
  }
  embedUrl: string
  jsonData?: WeaponJsonData[]
}

export default function WeaponsViewerPage() {
  const [selectedWeapon, setSelectedWeapon] = useState<string>("ak74m")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [weaponsJsonData, setWeaponsJsonData] = useState<WeaponJsonData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchWeaponsData = async () => {
      try {
        const response = await fetch('/data/weapons.json');
        const data = await response.json();
        setWeaponsJsonData(data.weapons);
      } catch (error) {
        console.error('Ошибка при загрузке данных об оружии:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeaponsData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const getWeaponDescription = (weaponId: string): string => {
    let description = "";
    
    if (weaponId === "ak74m") {
      // Ищем описание для АК
      const akData = weaponsJsonData.filter(w => 
        w.category === "Автоматы" && 
        (w.title.includes("Калашникова") || w.title.includes("АК"))
      );
      
      // Берем основное описание
      const mainDesc = akData.find(w => !w.title.includes("технические характеристики"))?.description || "";
      if (mainDesc) description = mainDesc;
      
    } else if (weaponId === "makarov") {
      // Ищем описание для ПМ
      const pmData = weaponsJsonData.filter(w => 
        w.title.includes("Макарова") && 
        !w.title.includes("технические характеристики") && 
        !w.title.includes("разборка")
      );
      
      const mainDesc = pmData.find(w => w.description)?.description || "";
      if (mainDesc) description = mainDesc;
      
    } else if (weaponId === "tt") {
      // Для ТТ у нас нет данных в JSON, оставляем старое описание
    }
    
    return description;
  };

  const weapons: WeaponInfo[] = [
    {
      id: "ak74m",
      name: "АК-74М",
      type: "assault-rifle",
      description: weaponsJsonData.length > 0 
        ? getWeaponDescription("ak74m") || "Автомат Калашникова модернизированный, основной автомат Вооружённых Сил Республики Казахстан. Принят на вооружение после распада СССР и является стандартным оружием казахстанских военнослужащих и сотрудников правоохранительных органов."
        : "Автомат Калашникова модернизированный, основной автомат Вооружённых Сил Республики Казахстан. Принят на вооружение после распада СССР и является стандартным оружием казахстанских военнослужащих и сотрудников правоохранительных органов.",
      details: {
        caliber: "5,45×39 мм",
        weight: "3,6 кг",
        length: "943 мм",
        year: "1991",
        capacity: "30 патронов"
      },
      embedUrl: "https://sketchfab.com/models/f6b764e0c55241aab0535e19c696198a/embed?autostart=1&preload=1"
    },
    {
      id: "makarov",
      name: "ПМ (Пистолет Макарова)",
      type: "pistol",
      description: weaponsJsonData.length > 0 
        ? getWeaponDescription("makarov") || "9 мм пистолет Макарова – табельное оружие офицерского состава и сотрудников правоохранительных органов Республики Казахстан. Используется для поражения противника на коротких расстояниях. Отличается надежностью и простотой в обслуживании."
        : "9 мм пистолет Макарова – табельное оружие офицерского состава и сотрудников правоохранительных органов Республики Казахстан. Используется для поражения противника на коротких расстояниях. Отличается надежностью и простотой в обслуживании.",
      details: {
        caliber: "9×18 мм",
        weight: "0,73 кг",
        length: "161 мм",
        year: "1951",
        capacity: "8 патронов"
      },
      embedUrl: "https://sketchfab.com/models/9ff97020738f4466921ca92e0a87fb17/embed?autostart=1&preload=1&transparent=1"
    },
    {
      id: "tt",
      name: "ТТ (Тульский Токарев)",
      type: "pistol",
      description: "Самозарядный пистолет системы Токарева, исторически использовался в вооруженных силах Казахской ССР. В настоящее время встречается на вооружении некоторых подразделений специального назначения Республики Казахстан. Ценится за мощность патрона и высокую пробивную способность.",
      details: {
        caliber: "7,62×25 мм",
        weight: "0,85 кг",
        length: "195 мм",
        year: "1933",
        capacity: "8 патронов"
      },
      embedUrl: "https://sketchfab.com/models/9faa7ed101444d57929f7da5bc6d5592/embed?autostart=1&preload=1"
    }
  ]

  const selectedWeaponInfo = weapons.find(w => w.id === selectedWeapon) || weapons[0]

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <style jsx global>{`
        .sketchfab-embed-wrapper iframe {
          width: 100%;
          height: 100%;
          border-radius: 0.5rem;
        }
        
        .fullscreen-viewer {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 50;
          background: #000;
        }
        
        .fullscreen-viewer iframe {
          border-radius: 0;
        }
      `}</style>
      
      <header className="bg-white border-b py-4">
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground">
            <ChevronLeft className="h-4 w-4" />
            {isMobile ? <span>Назад</span> : <span>Вернуться на главную</span>}
          </Link>
          
          <div className="flex items-center">
            <h1 className="text-xl font-semibold">Просмотр оружия 3D</h1>
          </div>
          
          <div className="invisible">
            <ChevronLeft className="h-4 w-4" />
          </div>
        </div>
      </header>

      <main className="flex-grow container py-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="shadow-lg border overflow-hidden">
                <CardHeader className="pb-0 flex-row justify-between items-center">
                  <CardTitle>{selectedWeaponInfo.name}</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={toggleFullscreen}
                    className="gap-1"
                  >
                    <Maximize2 className="h-4 w-4" />
                    <span>На весь экран</span>
                  </Button>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className={`sketchfab-embed-wrapper relative ${isFullscreen ? 'fullscreen-viewer' : 'h-[400px] md:h-[500px]'}`}>
                    <iframe 
                      title={selectedWeaponInfo.name} 
                      frameBorder="0" 
                      allowFullScreen 
                      allow="autoplay; fullscreen; xr-spatial-tracking; mozilla; webkit"
                      src={selectedWeaponInfo.embedUrl}
                    ></iframe>
                    
                    {isFullscreen && (
                      <Button 
                        className="absolute top-4 right-4 bg-black/70 hover:bg-black/90"
                        onClick={toggleFullscreen}
                      >
                        Закрыть
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <div className="space-y-6">
                <Card className="shadow-sm border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Выбор оружия</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2">
                      {weapons.map(weapon => (
                        <button
                          key={weapon.id}
                          className={`p-3 rounded-lg border text-left flex items-center gap-3 transition-colors hover:bg-blue-50 ${
                            selectedWeapon === weapon.id 
                              ? "border-primary bg-primary/10" 
                              : "border-transparent"
                          }`}
                          onClick={() => setSelectedWeapon(weapon.id)}
                        >
                          <div className="flex-grow">
                            <p className="font-medium">{weapon.name}</p>
                            <Badge variant="outline" className="mt-1">
                              {weapon.type === "pistol" ? "Пистолет" : "Автомат"}
                            </Badge>
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-sm border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Информация</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="description">
                      <TabsList className="grid grid-cols-2 mb-4">
                        <TabsTrigger value="description">
                          Описание
                        </TabsTrigger>
                        <TabsTrigger value="characteristics">
                          Характеристики
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="description" className="space-y-4">
                        <p className="text-sm whitespace-pre-line">
                          {selectedWeaponInfo.description}
                        </p>
                      </TabsContent>
                      
                      <TabsContent value="characteristics">
                        <div className="space-y-2">
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-sm text-muted-foreground">
                              Калибр
                            </span>
                            <span className="text-sm font-medium">
                              {selectedWeaponInfo.details.caliber}
                            </span>
                          </div>
                          
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-sm text-muted-foreground">
                              Масса
                            </span>
                            <span className="text-sm font-medium">
                              {selectedWeaponInfo.details.weight}
                            </span>
                          </div>
                          
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-sm text-muted-foreground">
                              Длина
                            </span>
                            <span className="text-sm font-medium">
                              {selectedWeaponInfo.details.length}
                            </span>
                          </div>
                          
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-sm text-muted-foreground">
                              Год принятия
                            </span>
                            <span className="text-sm font-medium">
                              {selectedWeaponInfo.details.year}
                            </span>
                          </div>
                          
                          <div className="flex justify-between py-2">
                            <span className="text-sm text-muted-foreground">
                              Ёмкость магазина
                            </span>
                            <span className="text-sm font-medium">
                              {selectedWeaponInfo.details.capacity}
                            </span>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex gap-3">
                    <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      Используйте мышь для вращения модели. Колесико мыши для приближения/отдаления. Нажмите кнопку 'На весь экран' для детального просмотра.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
} 