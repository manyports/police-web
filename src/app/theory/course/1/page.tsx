'use client'
import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface Course {
  id: number
  title: string
  description: string
}

export default function Theory1() {
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
              {theoryData.courses.find(course => course.id === 1)?.title || 'Загрузка...'}
            </h1>
            <p className="text-lg text-gray-600 text-center">
              {theoryData.courses.find(course => course.id === 1)?.description || 'Загрузка описания...'}
            </p>
        </div>
        
        <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
            <div className="bg-blue-800 px-6 py-4">
                <h2 className="text-2xl font-bold text-white">Меры безопасности при обращении с оружием и боеприпасами</h2>
            </div>
            
            <div className="p-6">
                <ul className="space-y-4">
                    <li className="flex">
                        <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">1</span>
                        <p className="text-lg pt-1">Взял оружие – проверь, не заряжено ли оно.</p>
                    </li>
                    
                    <li className="flex">
                        <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">2</span>
                        <p className="text-lg pt-1">При обращении с оружием не направляй ствол в сторону людей, не целься в другого и не допускай, чтобы целились в тебя.</p>
                    </li>
                    
                    <li className="flex">
                        <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">3</span>
                        <p className="text-lg pt-1">Любое оружие считай заряженным до тех пор, пока сам не проверишь и не разрядишь.</p>
                    </li>
                    
                    <li className="flex">
                        <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">4</span>
                        <p className="text-lg pt-1">Разрядил оружие – обращайся с ним как с заряженным.</p>
                    </li>
                    
                    <li className="flex">
                        <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">5</span>
                        <p className="text-lg pt-1">При взводе курка (при отводе затвора назад) ствол оружия направляй только к цели или вверх.</p>
                    </li>
                    
                    <li className="flex">
                        <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">6</span>
                        <p className="text-lg pt-1">Во всех случаях не накладывай палец на спусковой крючок до тех пор, пока не будет необходимости в открытии огня.</p>
                    </li>
                    
                    <li className="flex">
                        <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">7</span>
                        <p className="text-lg pt-1">Перед учебной стрельбой, выходом на службу насухо протри канал ствола, проверь, нет ли в стволе посторонних предметов, убедись в исправности оружия и снаряжения к нему.</p>
                    </li>
                </ul>
            </div>
        </div>
        <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 mt-8">
            <div className="bg-blue-800 px-6 py-4">
                <h2 className="text-2xl font-bold text-white">Пистолеты, состоящие на вооружении в органах внутренних дел</h2>
            </div>
            <div className="p-6">
                <div className="mb-6">
                  <div className="flex flex-row">
                    <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">1</span>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">9 мм пистолет Макарова</h3>
                  </div>
                    <p className="text-lg text-gray-700">
                        Является личным оружием нападения и защиты и предназначен для поражения противника на коротких расстояниях.
                    </p>
                </div>
                
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Тактико-технические характеристики:</h3>
                    <Image src="/data/weapon/PM/PM_techincal.png" alt="9 мм пистолет Макарова" width={500} height={500} />
                    <Image src="/data/weapon/PM/PM_view.png" alt="9 мм пистолет Макарова" width={500} height={500} />
                    <Image src="/data/weapon/PM/PM_byparts.png" alt="9 мм пистолет Макарова" width={500} height={500} />
                    
                    <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Основные части ПМ:</h3>
                    <ul className="space-y-2 mb-4">
                        <li className="flex items-start">
                            <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">1</span>
                            <p className="text-lg pt-1">Рамка со стволом и спусковой скобой</p>
                        </li>
                        <li className="flex items-start">
                            <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">2</span>
                            <p className="text-lg pt-1">Затвор с ударником, выбрасывателем и предохранителем</p>
                        </li>
                        <li className="flex items-start">
                            <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">3</span>
                            <p className="text-lg pt-1">Ударно-спусковой механизм</p>
                        </li>
                        <li className="flex items-start">
                            <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">4</span>
                            <p className="text-lg pt-1">Возвратная пружина</p>
                        </li>
                        <li className="flex items-start">
                            <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">5</span>
                            <p className="text-lg pt-1">Затворная задержка</p>
                        </li>
                        <li className="flex items-start">
                            <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">6</span>
                            <p className="text-lg pt-1">Рукоятка с винтом</p>
                        </li>
                        <li className="flex items-start">
                            <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">7</span>
                            <p className="text-lg pt-1">Магазин</p>
                        </li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Порядок неполной разборки:</h3>
                    <ul className="space-y-2 mb-4">
                        <li className="flex items-start">
                            <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">1</span>
                            <p className="text-lg pt-1">Извлечь магазин из основания рукоятки.</p>
                        </li>
                        <li className="flex items-start">
                            <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">2</span>
                            <p className="text-lg pt-1">Проверить, нет ли патрона в патроннике. Для этого: перевести предохранитель в положение «огонь», отвести затвор назад, поставив его на затворную задержку и осмотреть патронник. Отпустить затвор.</p>
                        </li>
                        <li className="flex items-start">
                            <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">3</span>
                            <p className="text-lg pt-1">Отделить затвор от рамки. Для этого: оттянуть спусковую скобу вниз и сдвинуть ее влево, отвести затвор в заднее положение, приподнять его заднюю часть и снять с рамки. Поставить на место спусковую скобу.</p>
                        </li>
                        <li className="flex items-start">
                            <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">4</span>
                            <p className="text-lg pt-1">Отделить от ствола возвратную пружину.</p>
                        </li>
                    </ul>
                    <p className="text-lg text-gray-700 mb-4">Сборка производится в обратном порядке.</p>
                </div>
                
            </div>
        </div>
        
        <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 mt-8">
            <div className="bg-blue-800 px-6 py-4">
                <h2 className="text-2xl font-bold text-white">Автоматы, состоящие на вооружении в органах внутренних дел</h2>
            </div>
            <div className="p-6">
                <div className="mb-6">
                  <div className="flex flex-row">
                    <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">1</span>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Автомат Калашникова</h3>
                  </div>
                    <p className="text-lg text-gray-700 mb-4">
                        Является основным видом автоматического стрелкового оружия, предназначен для уничтожения живой силы и огневых средств противника.
                    </p>
                    
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Модификации автомата Калашникова:</h3>
                    <div className="mb-6">
                        <h4 className="text-lg font-medium text-gray-800 mb-2">АК-74:</h4>
                        <Image src="/data/weapon/AK/AK_view.png" alt="Автомат Калашникова АК-74" width={500} height={300} className="rounded-lg shadow-md" />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Тактико-технические характеристики:</h3>
                    <Image src="/data/weapon/AK/AK_technical.png" alt="ТТХ Автомата Калашникова" width={600} height={400} className="rounded-lg shadow-md mb-6" />
                    
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Порядок неполной разборки АК:</h3>
                    <ul className="space-y-2 mb-4">
                        <li className="flex items-start">
                            <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">1</span>
                            <p className="text-lg pt-1">Отделить магазин. Удерживая автомат левой рукой за шейку приклада, правой рукой обхватить магазин, нажимая большим пальцем на защелку, подать нижнюю часть магазина вперед и отделить его.</p>
                        </li>
                        <li className="flex items-start">
                            <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">2</span>
                            <p className="text-lg pt-1">Проверить, нет ли патрона в патроннике. Для этого опустить переводчик вниз, отвести рукоятку затворной рамы назад, осмотреть патронник и отпустить рукоятку затворной рамы.</p>
                        </li>
                        <li className="flex items-start">
                            <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">3</span>
                            <p className="text-lg pt-1">Вынуть пенал с принадлежностью. Утопить пальцем правой руки крышку гнезда приклада так, чтобы пенал под действием пружины вышел из гнезда.</p>
                        </li>
                        <li className="flex items-start">
                            <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">4</span>
                            <p className="text-lg pt-1">Отделить шомпол. Оттянуть конец шомпола от ствола и вынуть его.</p>
                        </li>
                        <li className="flex items-start">
                            <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">5</span>
                            <p className="text-lg pt-1">Отделить крышку ствольной коробки. Левой рукой обхватить шейку приклада, большим пальцем этой руки нажать на выступ направляющего стержня возвратного механизма, правой рукой приподнять вверх заднюю часть крышки ствольной коробки и отделить крышку.</p>
                        </li>
                        <li className="flex items-start">
                            <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">6</span>
                            <p className="text-lg pt-1">Отделить возвратный механизм. Удерживая автомат левой рукой за шейку приклада, правой рукой подать вперед направляющий стержень возвратного механизма до выхода его пятки из продольного паза ствольной коробки; приподнять задний конец направляющего стержня и извлечь возвратный механизм из канала затворной рамы.</p>
                        </li>
                        <li className="flex items-start">
                            <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">7</span>
                            <p className="text-lg pt-1">Отделить затворную раму с затвором. Продолжая удерживать автомат левой рукой, правой рукой отвести затворную раму назад до отказа, приподнять ее вместе с затвором и отделить от ствольной коробки.</p>
                        </li>
                        <li className="flex items-start">
                            <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">8</span>
                            <p className="text-lg pt-1">Отделить затвор от затворной рамы. Взять затворную раму в левую руку затвором кверху; правой рукой отвести затвор назад, повернуть по часовой стрелке и вывести его вперед.</p>
                        </li>
                        <li className="flex items-start">
                            <span className="flex-shrink-0 bg-blue-100 h-8 w-8 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">9</span>
                            <p className="text-lg pt-1">Отделить газовую трубку со ствольной накладкой. Удерживая автомат левой рукой, правой рукой надеть пенал принадлежности прямоугольным отверстием на выступ замыкателя газовой трубки, повернуть замыкатель от себя до вертикального положения и снять газовую трубку с патрубка газовой камеры.</p>
                        </li>
                    </ul>
                    
                    <p className="text-lg text-gray-700 mb-4">Сборка автомата после неполной разборки производится в обратном порядке.</p>
                </div>
            </div>
        </div>
    </div>
  )
}
