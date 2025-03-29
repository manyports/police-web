"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { firstScenario } from "@/data/first-scenario";
import { secondScenario } from "@/data/second-scenario";
import { thirdScenario } from "@/data/third-scenario";
import { fourthScenario } from "@/data/fourth-scenario";
import { fifthScenario } from "@/data/fifth-scenario";
import { sixthScenario } from "@/data/sixth-scenario";
import { seventhScenario } from "@/data/seventh-scenario";
import { ScenarioProvider, useScenario } from "@/contexts/ScenarioContext";
import { ScenarioData } from "@/types/scenario";
import SceneCard from "@/components/scenario/SceneCard";
import ProgressIndicator from "@/components/scenario/ProgressIndicator";
import ResultsCard from "@/components/scenario/ResultsCard";

const ScenarioPlayer = () => {
  const params = useParams();
  const router = useRouter();
  const scenarioId = params.id as string;
  const [loading, setLoading] = useState(true);
  
  const {
    scenario,
    currentSceneIndex,
    userAnswers,
    isCompleted,
    scenarioResult,
    setScenario,
    goToNextScene,
    answerCurrentScene,
    getCurrentScene,
    resetScenario,
  } = useScenario();

  useEffect(() => {
    const loadScenario = () => {
      setLoading(true);
      
      // Сначала проверяем, не является ли это пользовательским сценарием
      try {
        const savedScenariosJson = localStorage.getItem('savedScenarios');
        if (savedScenariosJson) {
          const savedScenarios: ScenarioData[] = JSON.parse(savedScenariosJson);
          const customScenario = savedScenarios.find(s => s.id === scenarioId);
          
          if (customScenario) {
            setScenario(customScenario);
            setLoading(false);
            return;
          }
        }
      } catch (error) {
        console.error('Error loading custom scenario:', error);
      }
      
      // Если не нашли пользовательский сценарий, загружаем встроенный
      switch (scenarioId) {
        case "scenario-1":
          setScenario(firstScenario);
          break;
        case "scenario-2":
          setScenario(secondScenario);
          break;
        case "scenario-3":
          setScenario(thirdScenario);
          break;
        case "scenario-4":
          setScenario(fourthScenario);
          break;
        case "scenario-5":
          setScenario(fifthScenario);
          break;
        case "scenario-6":
          setScenario(sixthScenario);
          break;
        case "scenario-7":
          setScenario(seventhScenario);
          break;
        default:
          // Если не нашли ни пользовательский, ни встроенный сценарий
          router.push('/scenarios');
          return;
      }
      
      setLoading(false);
    };

    loadScenario();
  }, [scenarioId, setScenario, router]);

  const currentScene = getCurrentScene();
  
  const handleOptionSelect = (optionId: string) => {
    answerCurrentScene(optionId);
  };

  const handleRestart = () => {
    resetScenario();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!scenario) {
    return (
      <div className="flex items-center justify-center min-h-screen flex-col">
        <h2 className="text-xl font-bold mb-4">Сценарий не найден</h2>
        <button 
          onClick={() => router.push('/scenarios')}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Вернуться к списку сценариев
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">{scenario.title}</h1>
      <p className="text-lg mb-8">{scenario.description}</p>
      
      {isCompleted && scenarioResult ? (
        <ResultsCard result={scenarioResult} onRestart={handleRestart} />
      ) : (
        currentScene && (
          <>
            <div className="mb-6">
              <ProgressIndicator 
                totalSteps={scenario.scenes.length} 
                currentStep={currentSceneIndex} 
              />
            </div>
            
            <SceneCard
              scene={currentScene}
              selectedOptionId={userAnswers[currentScene.id]}
              onOptionSelect={handleOptionSelect}
              onNext={goToNextScene}
            />
          </>
        )
      )}
    </div>
  );
};

export default function PlayPage() {
  return (
    <ScenarioProvider>
      <ScenarioPlayer />
    </ScenarioProvider>
  );
}
