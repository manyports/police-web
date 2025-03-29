"use client";

import React, { useState, useEffect } from "react";
import { ScenarioData, Scene, AnswerOption } from "../types/scenario";
import { useScenario } from "../contexts/ScenarioContext";
import { v4 as uuidv4 } from 'uuid';
import { useSearchParams, useRouter } from 'next/navigation';

const ScenarioEditor: React.FC = () => {
  const { scenario, setScenario } = useScenario();
  const searchParams = useSearchParams();
  const router = useRouter();
  const scenarioId = searchParams.get('id');
  
  const [newScenario, setNewScenario] = useState<ScenarioData>({
    id: uuidv4(),
    title: "",
    description: "",
    previewImageUrl: "",
    scenes: []
  });
  const [sceneCount, setSceneCount] = useState<number>(1);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Load scenario for editing if ID is provided
  useEffect(() => {
    const loadScenarioForEditing = () => {
      if (scenarioId) {
        try {
          const savedScenariosJson = localStorage.getItem('savedScenarios');
          if (savedScenariosJson) {
            const scenarios: ScenarioData[] = JSON.parse(savedScenariosJson);
            const scenarioToEdit = scenarios.find(s => s.id === scenarioId);
            
            if (scenarioToEdit) {
              setNewScenario(scenarioToEdit);
              setSceneCount(scenarioToEdit.scenes.length);
              setIsEditing(true);
            }
          }
        } catch (error) {
          console.error('Error loading scenario for editing:', error);
        }
      } else if (scenario) {
        // If we have a scenario in context but no ID in URL, it's a new creation
        setNewScenario(scenario);
        setSceneCount(scenario.scenes.length);
      }
    };

    loadScenarioForEditing();
  }, [scenarioId, scenario]);

  const handleScenarioChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewScenario(prev => ({ ...prev, [name]: value }));
  };

  const handleSceneCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const count = parseInt(e.target.value);
    setSceneCount(count);
    
    // Resize scenes array based on the new count
    const newScenes = [...newScenario.scenes];
    if (count > newScenes.length) {
      // Add new scenes
      for (let i = newScenes.length; i < count; i++) {
        newScenes.push({
          id: uuidv4(),
          title: "",
          description: "",
          imageUrl: "",
          options: [
            {
              id: uuidv4(),
              text: "",
              isCorrect: true,
              score: 10,
              explanation: ""
            },
            {
              id: uuidv4(),
              text: "",
              isCorrect: false,
              score: 0,
              explanation: ""
            }
          ]
        });
      }
    } else if (count < newScenes.length) {
      // Remove excess scenes
      newScenes.splice(count);
    }
    
    setNewScenario(prev => ({ ...prev, scenes: newScenes }));
  };

  const handleSceneChange = (sceneIndex: number, field: keyof Scene, value: string) => {
    const updatedScenes = [...newScenario.scenes];
    updatedScenes[sceneIndex] = {
      ...updatedScenes[sceneIndex],
      [field]: value
    };
    setNewScenario(prev => ({ ...prev, scenes: updatedScenes }));
  };

  const handleOptionChange = (
    sceneIndex: number,
    optionIndex: number,
    field: keyof AnswerOption,
    value: string | boolean | number
  ) => {
    const updatedScenes = [...newScenario.scenes];
    const updatedOptions = [...updatedScenes[sceneIndex].options];
    
    updatedOptions[optionIndex] = {
      ...updatedOptions[optionIndex],
      [field]: value
    };
    
    updatedScenes[sceneIndex] = {
      ...updatedScenes[sceneIndex],
      options: updatedOptions
    };
    
    setNewScenario(prev => ({ ...prev, scenes: updatedScenes }));
  };

  const addOption = (sceneIndex: number) => {
    const updatedScenes = [...newScenario.scenes];
    updatedScenes[sceneIndex].options.push({
      id: uuidv4(),
      text: "",
      isCorrect: false,
      score: 0,
      explanation: ""
    });
    setNewScenario(prev => ({ ...prev, scenes: updatedScenes }));
  };

  const removeOption = (sceneIndex: number, optionIndex: number) => {
    const updatedScenes = [...newScenario.scenes];
    updatedScenes[sceneIndex].options.splice(optionIndex, 1);
    setNewScenario(prev => ({ ...prev, scenes: updatedScenes }));
  };

  const saveScenarioToLocalStorage = (scenario: ScenarioData) => {
    try {
      // Get existing scenarios
      const savedScenariosJson = localStorage.getItem('savedScenarios');
      const savedScenarios: ScenarioData[] = savedScenariosJson ? JSON.parse(savedScenariosJson) : [];
      
      // If we're editing, remove the old version
      const filteredScenarios = savedScenarios.filter(s => s.id !== scenario.id);
      
      // Add the new/updated scenario
      const updatedScenarios = [...filteredScenarios, scenario];
      
      // Save back to localStorage
      localStorage.setItem('savedScenarios', JSON.stringify(updatedScenarios));
      
      return true;
    } catch (error) {
      console.error('Error saving scenario:', error);
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all required fields
    let isValid = true;
    
    // Check if title and description are provided
    if (!newScenario.title.trim() || !newScenario.description.trim()) {
      isValid = false;
    }
    
    // Check if all scenes have title, description and options
    for (const scene of newScenario.scenes) {
      if (!scene.title.trim() || !scene.description.trim()) {
        isValid = false;
        break;
      }
      
      // Check if all options have text
      for (const option of scene.options) {
        if (!option.text.trim() || !option.explanation.trim()) {
          isValid = false;
          break;
        }
      }
    }
    
    if (!isValid) {
      alert("Пожалуйста, заполните все обязательные поля.");
      return;
    }
    
    setScenario(newScenario);
    const saved = saveScenarioToLocalStorage(newScenario);
    
    if (saved) {
      alert(isEditing ? "Сценарий успешно обновлен!" : "Сценарий успешно создан!");
      router.push('/my-scenarios');
    } else {
      alert("Произошла ошибка при сохранении сценария.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{isEditing ? "Редактирование сценария" : "Создание нового сценария"}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Название сценария:
            <input
              type="text"
              name="title"
              value={newScenario.title}
              onChange={handleScenarioChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              required
            />
          </label>
          
          <label className="block text-sm font-medium">
            Описание сценария:
            <textarea
              name="description"
              value={newScenario.description}
              onChange={handleScenarioChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              required
            />
          </label>
          
          <label className="block text-sm font-medium">
            URL превью-картинки сценария:
            <input
              type="text"
              name="previewImageUrl"
              value={newScenario.previewImageUrl || ""}
              onChange={handleScenarioChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              placeholder="https://example.com/image.jpg"
            />
            <span className="text-xs text-gray-500 mt-1 block">
              Добавьте URL изображения для отображения в списке сценариев (необязательно)
            </span>
          </label>
          
          <label className="block text-sm font-medium">
            Количество сцен:
            <select
              value={sceneCount}
              onChange={handleSceneCountChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </label>
        </div>

        {newScenario.scenes.map((scene, sceneIndex) => (
          <div key={scene.id} className="border p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Сцена {sceneIndex + 1}</h2>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Заголовок:
                <input
                  type="text"
                  value={scene.title}
                  onChange={(e) => handleSceneChange(sceneIndex, "title", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                  required
                />
              </label>
              
              <label className="block text-sm font-medium">
                Описание:
                <textarea
                  value={scene.description}
                  onChange={(e) => handleSceneChange(sceneIndex, "description", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                  required
                />
              </label>
              
              <label className="block text-sm font-medium">
                URL изображения:
                <input
                  type="text"
                  value={scene.imageUrl}
                  onChange={(e) => handleSceneChange(sceneIndex, "imageUrl", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                  placeholder="https://example.com/image.jpg"
                />
              </label>
              
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Варианты ответов:</h3>
                
                {scene.options.map((option, optionIndex) => (
                  <div key={option.id} className="border p-3 rounded-md mb-2">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Вариант {optionIndex + 1}</h4>
                      {scene.options.length > 2 && (
                        <button
                          type="button"
                          onClick={() => removeOption(sceneIndex, optionIndex)}
                          className="text-red-500"
                        >
                          Удалить
                        </button>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">
                        Текст варианта:
                        <input
                          type="text"
                          value={option.text}
                          onChange={(e) => handleOptionChange(sceneIndex, optionIndex, "text", e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                          required
                        />
                      </label>
                      
                      <div className="flex items-center">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            checked={option.isCorrect}
                            onChange={(e) => handleOptionChange(sceneIndex, optionIndex, "isCorrect", e.target.checked)}
                            className="form-checkbox rounded"
                          />
                          <span className="ml-2">Правильный ответ</span>
                        </label>
                      </div>
                      
                      <label className="block text-sm font-medium">
                        Баллы:
                        <input
                          type="number"
                          value={option.score}
                          onChange={(e) => handleOptionChange(sceneIndex, optionIndex, "score", parseInt(e.target.value))}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                          min="0"
                          required
                        />
                      </label>
                      
                      <label className="block text-sm font-medium">
                        Объяснение:
                        <textarea
                          value={option.explanation}
                          onChange={(e) => handleOptionChange(sceneIndex, optionIndex, "explanation", e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                          required
                          placeholder="Объяснение, почему этот вариант правильный или неправильный"
                        />
                      </label>
                    </div>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={() => addOption(sceneIndex)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Добавить вариант ответа
                </button>
              </div>
            </div>
          </div>
        ))}
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => router.push('/my-scenarios')}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
          >
            Отмена
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            {isEditing ? "Сохранить изменения" : "Создать сценарий"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScenarioEditor; 