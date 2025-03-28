import React from "react";
import Link from "next/link";
import { ScenarioResult } from "@/types/scenario";

interface ResultsCardProps {
  result: ScenarioResult;
  onRestart: () => void;
}

const ResultsCard: React.FC<ResultsCardProps> = ({ result, onRestart }) => {
  const scorePercentage = Math.round((result.totalScore / result.maxPossibleScore) * 100);
  
  let resultCategory: { title: string; description: string; className: string } = {
    title: "",
    description: "",
    className: ""
  };
  
  if (scorePercentage >= 80) {
    resultCategory = {
      title: "Отличный результат!",
      description: "Вы показали высокий уровень понимания правильных действий в большинстве ситуаций.",
      className: "bg-green-100 border-green-500 text-green-800"
    };
  } else if (scorePercentage >= 60) {
    resultCategory = {
      title: "Хороший результат",
      description: "Вы показали достаточный уровень компетенции, но есть области для улучшения.",
      className: "bg-blue-100 border-blue-500 text-blue-800"
    };
  } else {
    resultCategory = {
      title: "Требуется улучшение",
      description: "Вам рекомендуется повторить материалы по данной теме и попробовать снова.",
      className: "bg-yellow-100 border-yellow-500 text-yellow-800"
    };
  }

  return (
    <div className="flex flex-col gap-6 p-6 rounded-lg border border-gray-200 shadow-sm">
      <h2 className="text-2xl font-bold">Результаты прохождения сценария</h2>
      
      <div className={`p-4 rounded-lg border ${resultCategory.className}`}>
        <h3 className="text-xl font-semibold">{resultCategory.title}</h3>
        <p>{resultCategory.description}</p>
      </div>
      
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="text-lg">Ваш результат:</span>
          <span className="text-2xl font-bold">
            {result.totalScore} / {result.maxPossibleScore} баллов ({scorePercentage}%)
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className={`h-4 rounded-full ${
              scorePercentage >= 80 
                ? "bg-green-500" 
                : scorePercentage >= 60 
                  ? "bg-blue-500" 
                  : "bg-yellow-500"
            }`}
            style={{ width: `${scorePercentage}%` }}
          />
        </div>
      </div>
      
      {result.mistakes.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-3">Допущенные ошибки:</h3>
          <div className="flex flex-col gap-4">
            {result.mistakes.map((mistake, index) => (
              <div key={index} className="p-4 bg-red-50 rounded-lg border border-red-200">
                <h4 className="font-semibold text-lg">Сцена: </h4>{mistake.sceneTitle}
                <p className="mt-1 text-red-700">{mistake.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {result.recommendations.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-3">Рекомендации:</h3>
          <ul className="list-disc pl-6 space-y-2">
            {result.recommendations.map((recommendation, index) => (
              <li key={index}>{recommendation}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="flex justify-between mt-6">
        <button
          onClick={onRestart}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Пройти сценарий заново
        </button>
        
        <Link href="/scenarios" className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          К списку сценариев
        </Link>
      </div>
    </div>
  );
};

export default ResultsCard; 