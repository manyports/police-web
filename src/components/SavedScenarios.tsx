"use client";

import React, { useState, useEffect } from 'react';
import { ScenarioData } from '../types/scenario';
import { useScenario } from '../contexts/ScenarioContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Play, Edit, Trash } from 'lucide-react';

const SavedScenarios: React.FC = () => {
  const [savedScenarios, setSavedScenarios] = useState<ScenarioData[]>([]);
  const { setScenario } = useScenario();
  const router = useRouter();

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

  const PLACEHOLDER_IMAGE = '/images/scenario-placeholder.svg';

  const isValidUrl = (urlString: string | undefined): boolean => {
    if (!urlString) return false;
    
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

  const getPreviewImage = (scenario: ScenarioData): string => {
    if (scenario.previewImageUrl && isValidUrl(scenario.previewImageUrl)) {
      return scenario.previewImageUrl;
    }
    
    if (scenario.previewImageUrl && scenario.previewImageUrl.trim() !== '') {
      return scenario.previewImageUrl.startsWith('/') 
        ? scenario.previewImageUrl 
        : `/${scenario.previewImageUrl}`;
    }
    
    if (scenario.scenes && scenario.scenes.length > 0 && 
        scenario.scenes[0].imageUrl && isValidUrl(scenario.scenes[0].imageUrl)) {
      return scenario.scenes[0].imageUrl;
    }
    
    if (scenario.scenes && scenario.scenes.length > 0 && 
        scenario.scenes[0].imageUrl && scenario.scenes[0].imageUrl.trim() !== '') {
      return scenario.scenes[0].imageUrl.startsWith('/') 
        ? scenario.scenes[0].imageUrl 
        : `/${scenario.scenes[0].imageUrl}`;
    }
    
    return PLACEHOLDER_IMAGE;
  };

  return (
    <div className="min-h-[60vh] flex flex-col">
      <div className="mb-6">
        <Button asChild className="w-full sm:w-auto">
          <Link href="/scenario-editor">
            <PlusCircle className="mr-2" />
            Создать новый сценарий
          </Link>
        </Button>
      </div>

      {savedScenarios.length === 0 ? (
        <Card className="flex-grow flex flex-col justify-center items-center py-16">
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">У вас пока нет сохраненных сценариев.</p>
            <Button asChild>
              <Link href="/scenario-editor">
                <PlusCircle className="mr-2" />
                Создать первый сценарий
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {savedScenarios.map(scenario => (
            <Card key={scenario.id} className="overflow-hidden flex flex-col h-full">
              <div className="h-32 sm:h-40 bg-gray-100 relative">
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
              
              <div className="flex flex-col flex-grow">
                <CardHeader className="p-3 sm:p-4 pb-0">
                  <h2 className="text-lg sm:text-xl font-semibold line-clamp-1">{scenario.title}</h2>
                </CardHeader>
                
                <CardContent className="p-3 sm:p-4 pt-2 flex-grow">
                  <p className="text-muted-foreground text-sm line-clamp-2">{scenario.description}</p>
                  <div className="mt-2">
                    <span className="text-sm text-muted-foreground">{scenario.scenes.length} сцен</span>
                  </div>
                </CardContent>
                
                <CardFooter className="p-3 sm:p-4 pt-0 flex flex-wrap sm:flex-nowrap justify-end gap-2">
                  <Button 
                    size="sm" 
                    variant="destructive" 
                    onClick={() => handleDeleteScenario(scenario.id)}
                    className="w-auto"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    asChild
                    className="w-auto"
                    onClick={() => handleLoadScenario(scenario)}
                  >
                    <Link href={`/scenario-editor?id=${scenario.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button 
                    size="sm"
                    className="w-auto" 
                    onClick={() => handlePlayScenario(scenario)}
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedScenarios; 