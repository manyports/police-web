'use client'
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Course {
  id: number
  title: string
  description: string
}

export default function Course2() {
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
                    {theoryData.courses.find(course => course.id === 2)?.title || 'Загрузка...'}
                </h1>
                <p className="text-lg text-gray-600 text-center">
                    {theoryData.courses.find(course => course.id === 2)?.description || 'Загрузка описания...'}
                </p>
            </div>

            <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
                <div className="bg-blue-800 px-6 py-4">
                    <h2 className="text-2xl font-bold text-white">Действия сотрудников полиции при патрулировании</h2>
                </div>
                
                <div className="p-6">
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-blue-800 mb-4">3.1. Нормативно-правовое обеспечение</h3>
                        
                        <div className="mb-6">
                            <div className="flex flex-row">
                                <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">1</span>
                                <h4 className="text-lg font-semibold text-gray-800 pt-1">Закон РК «Об органах внутренних дел РК»</h4>
                            </div>
                            <ul className="ml-11 mt-2 space-y-2 list-disc text-gray-700">
                                <li>Общие нормы, описывающие задачи и функции полиции по охране общественного порядка.</li>
                                <li>Патрульно-постовая служба (ППС) – один из ключевых элементов работы городской и районной полиции.</li>
                            </ul>
                        </div>
                        
                        <div className="mb-6">
                            <div className="flex flex-row">
                                <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">2</span>
                                <h4 className="text-lg font-semibold text-gray-800 pt-1">Приказы и инструкции МВД РК</h4>
                            </div>
                            <ul className="ml-11 mt-2 space-y-2 list-disc text-gray-700">
                                <li>Внутриведомственные приказы и инструкции регламентируют порядок несения патрульно-постовой службы, правила применения физической силы, специальных средств и огнестрельного оружия (с учетом норм Закона «О правоохранительной службе» и уголовного/административного законодательства).</li>
                                <li>Определяют режим работы, маршруты патрулирования, требования к отчетности и взаимодействию с другими службами (дорожной полицией, участковыми и т. д.).</li>
                            </ul>
                        </div>
                        
                        <div className="mb-6">
                            <div className="flex flex-row">
                                <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">3</span>
                                <h4 className="text-lg font-semibold text-gray-800 pt-1">Кодекс Республики Казахстан об административных правонарушениях (КоАП РК)</h4>
                            </div>
                            <ul className="ml-11 mt-2 space-y-2 list-disc text-gray-700">
                                <li>Определяет составы административных правонарушений (мелкое хулиганство, распитие спиртных напитков в общественных местах и т. д.), а также порядок их пресечения.</li>
                                <li>При патрулировании сотрудники полиции наделены правом выявлять и оформлять материалы по административным правонарушениям.</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-xl font-semibold text-blue-800 mb-4">3.2. Основные этапы патрулирования</h3>
                        
                        <div className="mb-6">
                            <div className="flex flex-row">
                                <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">1</span>
                                <h4 className="text-lg font-semibold text-gray-800 pt-1">Инструктаж и распределение маршрутов</h4>
                            </div>
                            <ul className="ml-11 mt-2 space-y-2 list-disc text-gray-700">
                                <li>Перед заступлением на смену сотрудники патрульно-постовой службы проходят инструктаж, получают оперативную информацию о розыске лиц, о возможных очагах криминальной активности, о наиболее уязвимых участках города и т. д.</li>
                                <li>Определяется маршрут патруля (пеший, автопатруль, велопатруль и пр.) в соответствии с местной спецификой.</li>
                            </ul>
                        </div>
                        
                        <div className="mb-6">
                            <div className="flex flex-row">
                                <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">2</span>
                                <h4 className="text-lg font-semibold text-gray-800 pt-1">Несение службы</h4>
                            </div>
                            <ul className="ml-11 mt-2 space-y-2 list-disc text-gray-700">
                                <li>Сотрудники полиции обязаны соблюдать правила ношения форменной одежды, иметь при себе служебное удостоверение, средства связи и спецсредства (палка резиновая, наручники, газовые баллончики и т. д. в соответствии с ведомственными нормами).</li>
                                <li>Патруль обязан поддерживать постоянный контакт с дежурной частью: сообщать о происшествиях, выезжать на вызовы, задерживать правонарушителей и доставлять их в ОВД.</li>
                            </ul>
                        </div>
                        
                        <div className="mb-6">
                            <div className="flex flex-row">
                                <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">3</span>
                                <h4 className="text-lg font-semibold text-gray-800 pt-1">Проверка документов и досмотр</h4>
                            </div>
                            <ul className="ml-11 mt-2 space-y-2 list-disc text-gray-700">
                                <li>Сотрудники имеют право проверять документы у граждан, если есть достаточные основания полагать, что они совершили или намереваются совершить правонарушение.</li>
                                <li>Досмотр вещей и личный досмотр проводится в порядке, установленном КоАП РК и УПК РК (в зависимости от категории возможного правонарушения или преступления).</li>
                            </ul>
                        </div>
                        
                        <div className="mb-6">
                            <div className="flex flex-row">
                                <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">4</span>
                                <h4 className="text-lg font-semibold text-gray-800 pt-1">Применение мер административного принуждения</h4>
                            </div>
                            <ul className="ml-11 mt-2 space-y-2 list-disc text-gray-700">
                                <li>При выявлении административного правонарушения (например, распитие в общественных местах, мелкое хулиганство), сотрудник полиции составляет протокол об административном правонарушении или может вынести предупреждение (в пределах компетенции).</li>
                                <li>При необходимости правонарушители доставляются в полицию для выяснения личности и составления протокола.</li>
                            </ul>
                        </div>
                        
                        <div className="mb-6">
                            <div className="flex flex-row">
                                <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">5</span>
                                <h4 className="text-lg font-semibold text-gray-800 pt-1">Пресечение преступлений и задержание</h4>
                            </div>
                            <ul className="ml-11 mt-2 space-y-2 list-disc text-gray-700">
                                <li>В случае обнаружения признаков уголовного преступления патруль незамедлительно уведомляет дежурную часть и при необходимости задерживает подозреваемых.</li>
                                <li>После задержания осуществляется доставка в дежурную часть и передача материалов следственно-оперативной группе.</li>
                            </ul>
                        </div>
                        
                        <div className="mb-6">
                            <div className="flex flex-row">
                                <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">6</span>
                                <h4 className="text-lg font-semibold text-gray-800 pt-1">Отчет и анализ</h4>
                            </div>
                            <ul className="ml-11 mt-2 space-y-2 list-disc text-gray-700">
                                <li>По окончании смены сотрудники патруля отчитываются о выявленных правонарушениях, задержаниях, происшествиях.</li>
                                <li>Анализ результатов патрулирования используется для корректировки маршрутов, усиления патрулей в «проблемных» районах и т. д.</li>
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
                    <p className="text-lg text-gray-700 mb-3">Для более детального ознакомления с процедурами задержания и осмотра, рекомендуем обратиться к следующим источникам:</p>
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <Link href="https://kodeksy-kz.com/ka/ugolovno-protsessualnyj_kodeks/128.htm" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">
                            Уголовно-процессуальный кодекс РК (статьи 128-134)
                        </Link>
                        <p className="text-gray-600 mt-2">Эти статьи содержат подробную информацию о правовых основаниях задержания, сроках и процедурах.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
