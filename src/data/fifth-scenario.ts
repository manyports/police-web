import { ScenarioData } from "../types/scenario";

export const fifthScenario: ScenarioData = {
  id: "scenario-5",
  title: "Пустой сценарий 5",
  description: "Сценарий в разработке",
  scenes: [
    {
      id: "scene-1",
      title: "Начальная сцена",
      description: "Описание начальной сцены",
      imageUrl: "/scenes/placeholder.png",
      options: [
        {
          id: "option-1-1",
          text: "Вариант 1",
          isCorrect: true,
          score: 10,
          explanation: "Объяснение"
        },
        {
          id: "option-1-2",
          text: "Вариант 2",
          isCorrect: false,
          score: 0,
          explanation: "Объяснение"
        }
      ]
    }
  ]
}; 