import React from "react";
import Image from "next/image";
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
  return (
    <div className="flex flex-col gap-6 p-6 rounded-lg border border-gray-200 shadow-sm">
      <h2 className="text-2xl font-bold">{scene.title}</h2>
      
      <div className="relative w-full h-[340px] bg-gray-100 rounded-lg overflow-hidden">
        {scene.imageUrl ? (
          <Image
            src={scene.imageUrl}
            alt={scene.title}
            layout="fill"
            objectFit="cover"
            priority
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Изображение недоступно</p>
          </div>
        )}
      </div>
      
      <p className="text-lg">{scene.description}</p>
      
      <div className="flex flex-col gap-3 mt-2">
        <h3 className="text-lg font-semibold">Выберите вариант ответа:</h3>
        {scene.options.map((option) => (
          <button
            key={option.id}
            onClick={() => onOptionSelect(option.id)}
            className={`p-4 text-left rounded-lg transition-colors ${
              selectedOptionId === option.id
                ? "bg-blue-100 border-2 border-blue-500"
                : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
            }`}
          >
            {option.text}
          </button>
        ))}
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