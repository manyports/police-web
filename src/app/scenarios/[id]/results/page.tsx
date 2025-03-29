"use client"

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { firstScenario } from "@/data/first-scenario";
import { secondScenario } from "@/data/second-scenario";
import { thirdScenario } from "@/data/third-scenario";
import { ScenarioProvider, useScenario } from "@/contexts/ScenarioContext";
import ResultsCard from "@/components/scenario/ResultsCard";

const ScenarioResults = () => {
  const router = useRouter();
  const params = useParams();
  const scenarioId = params.id as string;
  
  const {
    scenario,
    scenarioResult,
    isCompleted,
    setScenario,
    calculateResults,
    resetScenario,
  } = useScenario();

  useEffect(() => {
    // In a real app, you would:
    // 1. Fetch the scenario from an API
    // 2. Fetch the user's answers and results from storage/API
    
    // For now, we'll redirect to the play page if no results are available
    if (!isCompleted && !scenarioResult) {
      setScenario(firstScenario);
      router.push(`/scenarios/${scenarioId}/play`);
    }
  }, [scenarioId, isCompleted, scenarioResult, router, setScenario]);

  const handleRestart = () => {
    resetScenario();
    router.push(`/scenarios/${scenarioId}/play`);
  };

  if (!scenarioResult) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Результаты сценария</h1>
      <ResultsCard result={scenarioResult} onRestart={handleRestart} />
    </div>
  );
};

export default function ResultsPage() {
  return (
    <ScenarioProvider>
      <ScenarioResults />
    </ScenarioProvider>
  );
}

