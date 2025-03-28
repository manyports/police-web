"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { firstScenario } from "@/data/first-scenario";
import { secondScenario } from "@/data/second-scenario";
import { thirdScenario } from "@/data/third-scenario";
import { ScenarioProvider, useScenario } from "@/contexts/ScenarioContext";
import SceneCard from "@/components/scenario/SceneCard";
import ProgressIndicator from "@/components/scenario/ProgressIndicator";
import ResultsCard from "@/components/scenario/ResultsCard";

const ScenarioPlayer = () => {
  const router = useRouter();
  const params = useParams();
  const scenarioId = params.id as string;
  
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
    // Load the appropriate scenario based on the scenario ID
    if (scenarioId === "scenario-1") {
      setScenario(firstScenario);
    } else if (scenarioId === "scenario-2") {
      setScenario(secondScenario);
    } else if (scenarioId === "scenario-3") {
      setScenario(thirdScenario);
    } else {
      setScenario(firstScenario);
    }
  }, [scenarioId, setScenario]);

  const currentScene = getCurrentScene();
  
  const handleOptionSelect = (optionId: string) => {
    answerCurrentScene(optionId);
  };

  const handleRestart = () => {
    resetScenario();
  };

  if (!scenario) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
