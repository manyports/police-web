'use client'
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Course {
  id: number
  title: string
  description: string
}

export default function Course4() {
    const router = useRouter()
    const [theoryData, setTheoryData] = useState<{ courses: Course[] }>({ courses: [] })

    useEffect(() => {
        const fetchTheoryData = async () => {
            const response = await fetch('/data/courses.json')
            const data = await response.json()
            setTheoryData(data)
        }
        fetchTheoryData()
    }, [])

    return (
        <div className="flex flex-col items-center min-h-screen py-12 px-4 bg-gray-50">
            <div className="w-full max-w-4xl mx-auto mb-8">
                <div className="flex justify-between items-center mb-4">
                    <button 
                        onClick={() => router.push('/theory')}
                        className="bg-white shadow-sm border bg-opacity-70 hover:bg-opacity-100 text-blue-900 p-3 rounded-full flex items-center justify-center transition-all"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <h1 className="text-3xl font-bold text-blue-900 text-center mb-3">
                    {theoryData.courses.find(course => course.id === 4)?.title || 'Загрузка...'}
                </h1>
                <p className="text-lg text-gray-600 text-center">
                    {theoryData.courses.find(course => course.id === 4)?.description || 'Загрузка описания...'}
                </p>
            </div>

            <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
                <div className="bg-blue-800 px-6 py-4">
                    <h2 className="text-2xl font-bold text-white">Действия сотрудников полиции при захвате заложников</h2>
                </div>
                
                <div className="p-6">
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-blue-800 mb-4">1.1. Общий правовой фундамент</h3>
                        
                        <div className="mb-6">
                            <div className="flex flex-row">
                                <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">1</span>
                                <h4 className="text-lg font-semibold text-gray-800 pt-1">Конституция Республики Казахстан</h4>
                            </div>
                            <ul className="ml-11 mt-2 space-y-2 list-disc text-gray-700">
                                <li>Гарантирует основные права и свободы граждан.</li>
                                <li>Органы внутренних дел и другие правоохранительные органы обязаны обеспечивать охрану правопорядка и защищать безопасность граждан.</li>
                            </ul>
                        </div>
                        
                        <div className="mb-6">
                            <div className="flex flex-row">
                                <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">2</span>
                                <h4 className="text-lg font-semibold text-gray-800 pt-1">Уголовный кодекс Республики Казахстан (УК РК)</h4>
                            </div>
                            <ul className="ml-11 mt-2 space-y-2 list-disc text-gray-700">
                                <li>Прямо устанавливает уголовную ответственность за захват заложников и ряд смежных преступлений (терроризм, бандитизм и т.п.).</li>
                                <li>При квалификации и расследовании такого вида преступлений сотрудники ОВД взаимодействуют с органами прокуратуры, КНБ и др.</li>
                            </ul>
                        </div>
                        
                        <div className="mb-6">
                            <div className="flex flex-row">
                                <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">3</span>
                                <h4 className="text-lg font-semibold text-gray-800 pt-1">Уголовно-процессуальный кодекс Республики Казахстан (УПК РК)</h4>
                            </div>
                            <ul className="ml-11 mt-2 space-y-2 list-disc text-gray-700">
                                <li>Определяет порядок досудебного расследования, полномочия оперативно-следственных групп, основания и порядок проведения оперативно-розыскных мероприятий.</li>
                                <li>При захвате заложников может проводиться комплекс специальных действий (негласные следственные действия, прослушивание переговоров, слежение и т. д.) на основании постановления следственных органов и/или санкции суда.</li>
                            </ul>
                        </div>
                        
                        <div className="mb-6">
                            <div className="flex flex-row">
                                <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">4</span>
                                <h4 className="text-lg font-semibold text-gray-800 pt-1">Закон Республики Казахстан «О противодействии терроризму»</h4>
                            </div>
                            <ul className="ml-11 mt-2 space-y-2 list-disc text-gray-700">
                                <li>Включает положения о мерах по предотвращению и пресечению актов терроризма, к которым может относиться и захват заложников, если он сопровождается террористическими целями.</li>
                                <li>Регламентирует создание и деятельность антитеррористических структур, участие полиции при взаимодействии с КНБ и другими силовыми ведомствами.</li>
                            </ul>
                        </div>
                        
                        <div className="mb-6">
                            <div className="flex flex-row">
                                <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">5</span>
                                <h4 className="text-lg font-semibold text-gray-800 pt-1">Закон Республики Казахстан «Об органах внутренних дел РК»</h4>
                            </div>
                            <ul className="ml-11 mt-2 space-y-2 list-disc text-gray-700">
                                <li>Определяет задачи, функции и полномочия сотрудников полиции при обеспечении общественной безопасности, включая пресечение особо опасных преступлений.</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-xl font-semibold text-blue-800 mb-4">1.2. Порядок действий при захвате заложников</h3>
                        
                        <div className="mb-6">
                            <div className="flex flex-row">
                                <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">1</span>
                                <h4 className="text-lg font-semibold text-gray-800 pt-1">Оповещение и мобилизация</h4>
                            </div>
                            <ul className="ml-11 mt-2 space-y-2 list-disc text-gray-700">
                                <li>После поступления информации о захвате заложников дежурный орган ОВД незамедлительно передает сведения руководству, в антитеррористический центр (при подозрении на террористический характер преступления) и координируется с другими оперативными службами.</li>
                                <li>Создается специальная оперативно-следственная группа (при необходимости – совместно с КНБ, прокуратурой, СОБР, спецподразделениями МВД и т. д.).</li>
                            </ul>
                        </div>
                        
                        <div className="mb-6">
                            <div className="flex flex-row">
                                <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">2</span>
                                <h4 className="text-lg font-semibold text-gray-800 pt-1">Установление зоны оцепления и обеспечение безопасности</h4>
                            </div>
                            <ul className="ml-11 mt-2 space-y-2 list-disc text-gray-700">
                                <li>Силы полиции формируют периметр вокруг места происшествия (жилой дом, учреждение, транспорт и т. д.).</li>
                                <li>Проводится эвакуация граждан, оцепление территории, блокирование путей отхода и обеспечение беспрепятственного доступа для спецподразделений.</li>
                            </ul>
                        </div>
                        
                        <div className="mb-6">
                            <div className="flex flex-row">
                                <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">3</span>
                                <h4 className="text-lg font-semibold text-gray-800 pt-1">Переговоры</h4>
                            </div>
                            <ul className="ml-11 mt-2 space-y-2 list-disc text-gray-700">
                                <li>В соответствии с ведомственными инструкциями МВД РК, переговорный процесс ведется специально подготовленными сотрудниками.</li>
                                <li>Цель – минимизировать угрозу жизни и здоровью заложников, убедить злоумышленников освободить заложников и сдаться властям.</li>
                                <li>Возможно привлечение психологов, переговорщиков, использование технических средств контроля (прослушивание, видеонаблюдение и т. д.).</li>
                            </ul>
                        </div>
                        
                        <div className="mb-6">
                            <div className="flex flex-row">
                                <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">4</span>
                                <h4 className="text-lg font-semibold text-gray-800 pt-1">Штурм и задержание</h4>
                            </div>
                            <ul className="ml-11 mt-2 space-y-2 list-disc text-gray-700">
                                <li>Если переговоры не дают результата и/или ситуация требует немедленного вмешательства (угроза жизни заложников), по решению руководства операции возможна силовая фаза – штурм спецподразделениями.</li>
                                <li>Полиция (при необходимости совместно с СОБР, спецназом КНБ, Национальной гвардией) проводит операцию по освобождению заложников, задержанию или ликвидации преступников.</li>
                                <li>После освобождения заложников проводится детальный осмотр места происшествия, изымаются улики, берутся показания и т. д.</li>
                            </ul>
                        </div>
                        
                        <div className="mb-6">
                            <div className="flex flex-row">
                                <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">5</span>
                                <h4 className="text-lg font-semibold text-gray-800 pt-1">Досудебное расследование</h4>
                            </div>
                            <ul className="ml-11 mt-2 space-y-2 list-disc text-gray-700">
                                <li>Создается следственно-оперативная группа, которая документирует факты, собирает вещественные доказательства, проводит допросы, экспертизы (баллистические, медицинские и т. д.).</li>
                                <li>Уголовное дело ведется в строгом соответствии с УПК РК, подозреваемым обеспечиваются процессуальные права (защита, ознакомление с материалами дела и др.).</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 mt-8">
                <div className="bg-blue-800 px-6 py-4">
                    <h2 className="text-2xl font-bold text-white">Дополнительные ресурсы</h2>
                </div>
                <div className="p-6">
                    <p className="text-lg text-gray-700 mb-3">Для более детального ознакомления с правовыми аспектами и процедурами при захвате заложников, рекомендуем обратиться к следующим источникам:</p>
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <Link href="https://www.gov.kz/memleket/entities/antiterror" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">
                            Антитеррористический центр Республики Казахстан
                        </Link>
                        <p className="text-gray-600 mt-2">Этот ресурс содержит информацию о противодействии терроризму, включая меры по освобождению заложников и обеспечению безопасности граждан.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
