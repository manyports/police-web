"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { AnswerOption, Scene, ScenarioData, ScenarioResult } from "../types/scenario";

interface ScenarioContextProps {
  scenario: ScenarioData | null;
  currentSceneIndex: number;
  userAnswers: Record<string, string>;
  isCompleted: boolean;
  scenarioResult: ScenarioResult | null;
  setScenario: (scenario: ScenarioData) => void;
  goToNextScene: () => void;
  goToPreviousScene: () => void;
  answerCurrentScene: (optionId: string) => void;
  getCurrentScene: () => Scene | null;
  calculateResults: () => void;
  resetScenario: () => void;
}

const ScenarioContext = createContext<ScenarioContextProps | undefined>(undefined);

export const useScenario = () => {
  const context = useContext(ScenarioContext);
  if (!context) {
    throw new Error("useScenario must be used within a ScenarioProvider");
  }
  return context;
};

interface ScenarioProviderProps {
  children: ReactNode;
}

export const ScenarioProvider: React.FC<ScenarioProviderProps> = ({ children }) => {
  const [scenario, setScenario] = useState<ScenarioData | null>(null);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [scenarioResult, setScenarioResult] = useState<ScenarioResult | null>(null);

  const getCurrentScene = (): Scene | null => {
    if (!scenario || !scenario.scenes[currentSceneIndex]) return null;
    return scenario.scenes[currentSceneIndex];
  };

  const goToNextScene = () => {
    if (!scenario) return;
    
    if (currentSceneIndex < scenario.scenes.length - 1) {
      setCurrentSceneIndex(currentSceneIndex + 1);
    } else {
      setIsCompleted(true);
      calculateResults();
    }
  };

  const goToPreviousScene = () => {
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex(currentSceneIndex - 1);
    }
  };

  const answerCurrentScene = (optionId: string) => {
    const currentScene = getCurrentScene();
    if (!currentScene) return;

    setUserAnswers({
      ...userAnswers,
      [currentScene.id]: optionId
    });
  };

  const calculateResults = () => {
    if (!scenario) return;

    let totalScore = 0;
    let maxPossibleScore = 0;
    const mistakes: ScenarioResult["mistakes"] = [];

    scenario.scenes.forEach(scene => {
      // Calculate max possible score for this scene
      const bestOption = scene.options.reduce((best, current) => {
        return (best.score > current.score) ? best : current;
      }, scene.options[0]);
      
      maxPossibleScore += bestOption.score;

      // Calculate user's score
      const userOptionId = userAnswers[scene.id];
      if (userOptionId) {
        const selectedOption = scene.options.find(option => option.id === userOptionId);
        if (selectedOption) {
          totalScore += selectedOption.score;

          // Check if this is a mistake
          if (!selectedOption.isCorrect) {
            const correctOption = scene.options.find(option => option.isCorrect);
            if (correctOption) {
              mistakes.push({
                sceneId: scene.id,
                sceneTitle: scene.title,
                selectedOptionId: selectedOption.id,
                correctOptionId: correctOption.id,
                explanation: selectedOption.explanation
              });
            }
          }
        }
      }
    });

    // Generate recommendations based on mistakes
    const recommendations: string[] = [];
    
    if (mistakes.length > 0) {
      recommendations.push("Рекомендуется уделить внимание процедурам правильного реагирования в ситуациях общественной безопасности.");
      
      if (mistakes.some(m => m.explanation.includes("превышением полномочий"))) {
        recommendations.push("Необходимо повторить правила применения силы и границы полномочий.");
      }
      
      if (mistakes.some(m => m.explanation.includes("протокол"))) {
        recommendations.push("Рекомендуется повторить протоколы безопасности при обращении с подозрительными предметами.");
      }
    }

    setScenarioResult({
      totalScore,
      maxPossibleScore,
      mistakes,
      recommendations
    });
  };

  const resetScenario = () => {
    setCurrentSceneIndex(0);
    setUserAnswers({});
    setIsCompleted(false);
    setScenarioResult(null);
  };

  return (
    <ScenarioContext.Provider
      value={{
        scenario,
        currentSceneIndex,
        userAnswers,
        isCompleted,
        scenarioResult,
        setScenario,
        goToNextScene,
        goToPreviousScene,
        answerCurrentScene,
        getCurrentScene,
        calculateResults,
        resetScenario
      }}
    >
      {children}
    </ScenarioContext.Provider>
  );
}; 