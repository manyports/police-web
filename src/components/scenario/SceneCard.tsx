import React from "react";
import { Scene } from "@/types/scenario";

interface SceneCardProps {
  scene: Scene;
  selectedOptionId: string | undefined;
  onOptionSelect: (optionId: string) => void;
  onNext: () => void;
}

const SceneCard: React.FC<SceneCardProps> = ({
  scene,
  selectedOptionId,
  onOptionSelect,
  onNext,
}) => {
  // Функция для проверки валидности URL
  const isValidUrl = (urlString: string): boolean => {
    if (!urlString) return false;
    
    // Проверяем, что URL начинается с http или https
    if (urlString.startsWith('http://') || urlString.startsWith('https://')) {
      try {
        new URL(urlString);
        return true;
      } catch (e) {
        console.error("Invalid URL:", urlString, e);
        return false;
      }
    }
    
    return false;
  };

  // Константа для заглушки
  const PLACEHOLDER_IMAGE = '/images/scenario-placeholder.svg';

  // Безопасная обработка изображения
  const renderImage = () => {
    if (!scene.imageUrl || scene.imageUrl.trim() === '') {
      return (
        <div className="flex items-center justify-center h-full">
          <img src={PLACEHOLDER_IMAGE} alt="Заглушка изображения" className="w-full h-full object-contain" />
        </div>
      );
    }

    // Для URL, начинающихся с http
    if (isValidUrl(scene.imageUrl)) {
      return (
        <img
          src={scene.imageUrl}
          alt={scene.title || "Изображение сцены"}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null; // Предотвращает бесконечный цикл
            e.currentTarget.src = PLACEHOLDER_IMAGE;
          }}
        />
      );
    }

    // Для локальных изображений из папки public
    return (
      <img
        src={scene.imageUrl.startsWith('/') ? scene.imageUrl : `/${scene.imageUrl}`}
        alt={scene.title || "Изображение сцены"}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = PLACEHOLDER_IMAGE;
        }}
      />
    );
  };

  return (
    <div className="flex flex-col gap-6 p-6 rounded-lg border border-gray-200 shadow-sm">
      <h2 className="text-2xl font-bold">{scene.title || "Без названия"}</h2>
      
      <div className="relative w-full h-[340px] bg-gray-100 rounded-lg overflow-hidden">
        {renderImage()}
      </div>
      
      <p className="text-lg">{scene.description || "Описание отсутствует"}</p>
      
      <div className="flex flex-col gap-3 mt-2">
        <h3 className="text-lg font-semibold">Выберите вариант ответа:</h3>
        {scene.options && scene.options.length > 0 ? (
          scene.options.map((option) => (
            <button
              key={option.id}
              onClick={() => onOptionSelect(option.id)}
              className={`p-4 text-left rounded-lg transition-colors ${
                selectedOptionId === option.id
                  ? "bg-blue-100 border-2 border-blue-500"
                  : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
              }`}
            >
              {option.text || "Вариант без текста"}
            </button>
          ))
        ) : (
          <p className="text-gray-500">Нет доступных вариантов ответа</p>
        )}
      </div>
      
      <div className="flex justify-end mt-4">
        <button
          onClick={onNext}
          disabled={!selectedOptionId}
          className={`px-6 py-2 rounded-lg font-medium ${
            selectedOptionId
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Далее
        </button>
      </div>
    </div>
  );
};

export default SceneCard; 