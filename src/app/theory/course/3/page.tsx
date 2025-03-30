'use client'
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Course {
  id: number
  title: string
  description: string
}

export default function Course3() {
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
                    {theoryData.courses.find(course => course.id === 3)?.title || 'Загрузка...'}
                </h1>
                <p className="text-lg text-gray-600 text-center">
                    {theoryData.courses.find(course => course.id === 3)?.description || 'Загрузка описания...'}
                </p>
            </div>

            <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
                <div className="bg-blue-800 px-6 py-4">
                    <h2 className="text-2xl font-bold text-white">Действия сотрудников полиции при расследовании киберпреступлений</h2>
                </div>
                
                <div className="p-6">
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-blue-800 mb-4">2.1. Общие правовые источники</h3>
                        
                        <div className="mb-6">
                            <div className="flex flex-row">
                                <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">1</span>
                                <h4 className="text-lg font-semibold text-gray-800 pt-1">Уголовный кодекс РК</h4>
                            </div>
                            <ul className="ml-11 mt-2 space-y-2 list-disc text-gray-700">
                                <li>Содержит статьи, связанные с киберпреступностью:
                                    <ul className="ml-6 mt-1 space-y-1 list-square text-gray-600">
                                        <li>Неправомерный доступ к компьютерной информации</li>
                                        <li>Создание, использование или распространение вредоносных компьютерных программ</li>
                                    </ul>
                                </li>
                                <li>В ряде случаев квалификация деяний может происходить по совокупности статей (например, вымогательство, если оно осуществляется через интернет).</li>
                            </ul>
                        </div>
                        
                        <div className="mb-6">
                            <div className="flex flex-row">
                                <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">2</span>
                                <h4 className="text-lg font-semibold text-gray-800 pt-1">Уголовно-процессуальный кодекс РК</h4>
                            </div>
                            <ul className="ml-11 mt-2 space-y-2 list-disc text-gray-700">
                                <li>Определяет процессуальные процедуры и гарантии при расследовании киберпреступлений:
                                    <ul className="ml-6 mt-1 space-y-1 list-square text-gray-600">
                                        <li>Назначение компьютерно-технических экспертиз</li>
                                        <li>Изъятие и осмотр электронных носителей</li>
                                        <li>Проведение негласных следственных действий (слежение в сетях, контроль электронных сообщений и т. д.) с судебной санкцией</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="mb-6">
                            <div className="flex flex-row">
                                <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">3</span>
                                <h4 className="text-lg font-semibold text-gray-800 pt-1">Закон РК «Об органах внутренних дел РК»</h4>
                            </div>
                            <ul className="ml-11 mt-2 space-y-2 list-disc text-gray-700">
                                <li>Регулирует функции и компетенцию полиции при выявлении и раскрытии преступлений, в том числе в сфере информационной безопасности.</li>
                            </ul>
                        </div>
                        
                        <div className="mb-6">
                            <div className="flex flex-row">
                                <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">4</span>
                                <h4 className="text-lg font-semibold text-gray-800 pt-1">Закон РК «Об информатизации»</h4>
                            </div>
                            <ul className="ml-11 mt-2 space-y-2 list-disc text-gray-700">
                                <li>Содержит общие нормы о правовом регулировании в IT-сфере, основах электронных документов и цифровых сервисов, защите информации.</li>
                                <li>Дополняется подзаконными актами, регламентирующими порядок взаимодействия государственных органов при расследовании киберпреступлений (например, с Комитетом национальной безопасности и профильными структурами).</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-xl font-semibold text-blue-800 mb-4">2.2. Порядок расследования киберпреступлений</h3>
                        
                        <div className="mb-6">
                            <div className="flex flex-row">
                                <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">1</span>
                                <h4 className="text-lg font-semibold text-gray-800 pt-1">Регистрация сообщения о преступлении</h4>
                            </div>
                            <ul className="ml-11 mt-2 space-y-2 list-disc text-gray-700">
                                <li>Любое заявление о киберпреступлении (хакерская атака, кража средств с банковской карты, мошенничество в интернете и т. д.) регистрируется в Едином реестре досудебных расследований (ЕРДР), после чего начинается досудебное производство.</li>
                            </ul>
                        </div>
                        
                        <div className="mb-6">
                            <div className="flex flex-row">
                                <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">2</span>
                                <h4 className="text-lg font-semibold text-gray-800 pt-1">Создание следственной группы</h4>
                            </div>
                            <ul className="ml-11 mt-2 space-y-2 list-disc text-gray-700">
                                <li>Назначается следователь или группа следователей, которые могут работать совместно со специалистами в области информационных технологий, а также с экспертами из государственных или частных организаций (по компьютерной безопасности).</li>
                            </ul>
                        </div>
                        
                        <div className="mb-6">
                            <div className="flex flex-row">
                                <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">3</span>
                                <h4 className="text-lg font-semibold text-gray-800 pt-1">Оперативно-розыскные мероприятия</h4>
                            </div>
                            <ul className="ml-11 mt-2 space-y-2 list-disc text-gray-700">
                                <li>На основе УПК РК и соответствующих подзаконных актов сотрудники полиции могут проводить негласные следственные действия (контроль трафика, перехват информации и т. д.) исключительно с санкции суда и при наличии законных оснований.</li>
                                <li>Часто используется взаимодействие с провайдерами интернета, хостинговыми компаниями, владельцами социальных сетей и мессенджеров (в рамках соглашений о сотрудничестве и при наличии судебных решений).</li>
                            </ul>
                        </div>
                        
                        <div className="mb-6">
                            <div className="flex flex-row">
                                <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">4</span>
                                <h4 className="text-lg font-semibold text-gray-800 pt-1">Компьютерная экспертиза</h4>
                            </div>
                            <ul className="ml-11 mt-2 space-y-2 list-disc text-gray-700">
                                <li>Проводится изъятие подозрительных электронных носителей (компьютеры, смартфоны, жесткие диски, флеш-накопители и т. п.).</li>
                                <li>Экспертные организации (чаще всего при МВД РК, КНБ или сертифицированные частные компании) проводят компьютерно-технические экспертизы, восстанавливают удаленные данные, анализируют логи, трафик, сетевые подключения и др.</li>
                            </ul>
                        </div>
                        
                        <div className="mb-6">
                            <div className="flex flex-row">
                                <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">5</span>
                                <h4 className="text-lg font-semibold text-gray-800 pt-1">Предъявление обвинения и завершение расследования</h4>
                            </div>
                            <ul className="ml-11 mt-2 space-y-2 list-disc text-gray-700">
                                <li>По результатам собираются доказательства, формируются материалы дела, подозреваемому(ым) предъявляется обвинение.</li>
                                <li>Уголовное дело направляется в прокуратуру для утверждения обвинительного заключения и последующей передачи в суд.</li>
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
                    <p className="text-lg text-gray-700 mb-3">Для более детального ознакомления с методами расследования киберпреступлений, рекомендуем обратиться к следующим источникам:</p>
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <Link href="https://digital.gov.kz/ru/cybersecurity" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">
                            Национальный координационный центр информационной безопасности РК
                        </Link>
                        <p className="text-gray-600 mt-2">Этот ресурс содержит информацию о национальной политике и стратегии в области кибербезопасности, а также рекомендации по защите от киберугроз.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
