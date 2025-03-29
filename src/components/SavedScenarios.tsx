"use client";

import React, { useState, useEffect } from 'react';
import { ScenarioData } from '../types/scenario';
import { useScenario } from '../contexts/ScenarioContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SavedScenarios: React.FC = () => {
  const [savedScenarios, setSavedScenarios] = useState<ScenarioData[]>([]);
  const { setScenario } = useScenario();
  const router = useRouter();

  // Load saved scenarios from localStorage on component mount
  useEffect(() => {
    const loadSavedScenarios = () => {
      try {
        const savedScenariosJson = localStorage.getItem('savedScenarios');
        if (savedScenariosJson) {
          const scenarios = JSON.parse(savedScenariosJson);
          setSavedScenarios(scenarios);
        }
      } catch (error) {
        console.error('Error loading saved scenarios:', error);
      }
    };

    loadSavedScenarios();
  }, []);

  const handleLoadScenario = (scenario: ScenarioData) => {
    setScenario(scenario);
  };

  const handleDeleteScenario = (scenarioId: string) => {
    const updatedScenarios = savedScenarios.filter(s => s.id !== scenarioId);
    setSavedScenarios(updatedScenarios);
    
    // Update localStorage
    try {
      localStorage.setItem('savedScenarios', JSON.stringify(updatedScenarios));
    } catch (error) {
      console.error('Error saving updated scenarios:', error);
    }
  };

  const handlePlayScenario = (scenario: ScenarioData) => {
    setScenario(scenario);
    router.push(`/scenarios/${scenario.id}/play`);
  };

  // Константа для заглушки
  const PLACEHOLDER_IMAGE = '/images/scenario-placeholder.svg';

  // Функция для проверки валидности URL
  const isValidUrl = (urlString: string | undefined): boolean => {
    if (!urlString) return false;
    
    // Проверяем, что URL начинается с http или https
    if (urlString.startsWith('http://') || urlString.startsWith('https://')) {
      try {
        new URL(urlString);
        return true;
      } catch (e) {
        return false;
      }
    }
    
    return false;
  };

  // Функция для определения URL изображения
  const getPreviewImage = (scenario: ScenarioData): string => {
    // Если есть превью-картинка и она валидна (внешний URL), используем её
    if (scenario.previewImageUrl && isValidUrl(scenario.previewImageUrl)) {
      return scenario.previewImageUrl;
    }
    
    // Если превью-картинка есть, но это локальный путь (например из public/scenes)
    if (scenario.previewImageUrl && scenario.previewImageUrl.trim() !== '') {
      return scenario.previewImageUrl.startsWith('/') 
        ? scenario.previewImageUrl 
        : `/${scenario.previewImageUrl}`;
    }
    
    // Иначе пробуем использовать изображение из первой сцены (внешний URL)
    if (scenario.scenes && scenario.scenes.length > 0 && 
        scenario.scenes[0].imageUrl && isValidUrl(scenario.scenes[0].imageUrl)) {
      return scenario.scenes[0].imageUrl;
    }
    
    // Пробуем использовать изображение из первой сцены (локальный путь)
    if (scenario.scenes && scenario.scenes.length > 0 && 
        scenario.scenes[0].imageUrl && scenario.scenes[0].imageUrl.trim() !== '') {
      return scenario.scenes[0].imageUrl.startsWith('/') 
        ? scenario.scenes[0].imageUrl 
        : `/${scenario.scenes[0].imageUrl}`;
    }
    
    // Если ничего не подходит, возвращаем заглушку
    return PLACEHOLDER_IMAGE;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Сохраненные сценарии</h1>
        <Link 
          href="/scenario-editor"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Создать новый сценарий
        </Link>
      </div>

      {savedScenarios.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">У вас пока нет сохраненных сценариев.</p>
          <Link 
            href="/scenario-editor"
            className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Создать первый сценарий
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedScenarios.map(scenario => (
            <div 
              key={scenario.id} 
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-40 bg-gray-100 relative">
                <img
                  src={getPreviewImage(scenario)}
                  alt={scenario.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = PLACEHOLDER_IMAGE;
                  }}
                />
              </div>
              
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{scenario.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-2">{scenario.description}</p>
                
                <div className="flex justify-between mt-4">
                  <span className="text-sm text-gray-500">{scenario.scenes.length} сцен</span>
                  <div className="space-x-2">
                    <button
                      onClick={() => handlePlayScenario(scenario)}
                      className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md"
                    >
                      Запустить
                    </button>
                    <Link
                      href={`/scenario-editor?id=${scenario.id}`}
                      className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-md"
                      onClick={() => handleLoadScenario(scenario)}
                    >
                      Редактировать
                    </Link>
                    <button
                      onClick={() => handleDeleteScenario(scenario.id)}
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded-md"
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedScenarios; 