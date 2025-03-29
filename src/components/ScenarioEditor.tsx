"use client";

import React, { useState, useEffect } from "react";
import { ScenarioData, Scene, AnswerOption } from "../types/scenario";
import { useScenario } from "../contexts/ScenarioContext";
import { v4 as uuidv4 } from 'uuid';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash, ArrowLeft, ArrowRight, Save, Info, FileText, Image, List, CheckCircle, Copy, ChevronDown, ChevronUp, X, Play, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

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
  const [sceneCount, setSceneCount] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState("info");
  const [expandedScenes, setExpandedScenes] = useState<Record<string, boolean>>({});
  const [previewMode, setPreviewMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Initialize all scenes as expanded
  useEffect(() => {
    const initialSceneStates: Record<string, boolean> = {};
    newScenario.scenes.forEach(scene => {
      initialSceneStates[scene.id] = true;
    });
    setExpandedScenes(initialSceneStates);
  }, [sceneCount, newScenario.scenes.length]);

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

  const handleSceneCountChange = (value: string) => {
    const count = parseInt(value);
    setSceneCount(count);
    
    const newScenes = [...newScenario.scenes];
    if (count > newScenes.length) {
      for (let i = newScenes.length; i < count; i++) {
        newScenes.push({
          id: uuidv4(),
          title: `Сцена ${i + 1}`,
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
      const savedScenariosJson = localStorage.getItem('savedScenarios');
      const savedScenarios: ScenarioData[] = savedScenariosJson ? JSON.parse(savedScenariosJson) : [];
      
      const filteredScenarios = savedScenarios.filter(s => s.id !== scenario.id);
      
      const updatedScenarios = [...filteredScenarios, scenario];
      
      localStorage.setItem('savedScenarios', JSON.stringify(updatedScenarios));
      
      return true;
    } catch (error) {
      console.error('Error saving scenario:', error);
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let isValid = true;
    
    if (!newScenario.title.trim() || !newScenario.description.trim()) {
      isValid = false;
    }
    
    for (const scene of newScenario.scenes) {
      if (!scene.title.trim() || !scene.description.trim()) {
        isValid = false;
        break;
      }
      
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

  const toggleSceneExpanded = (sceneId: string) => {
    setExpandedScenes(prev => ({
      ...prev,
      [sceneId]: !prev[sceneId]
    }));
  };

  const duplicateScene = (sceneIndex: number) => {
    const sceneToClone = newScenario.scenes[sceneIndex];
    const clonedScene = {
      ...sceneToClone,
      id: uuidv4(),
      title: `${sceneToClone.title} (копия)`,
      options: sceneToClone.options.map(option => ({
        ...option,
        id: uuidv4()
      }))
    };
    
    const updatedScenes = [...newScenario.scenes];
    updatedScenes.splice(sceneIndex + 1, 0, clonedScene);
    
    setNewScenario(prev => ({
      ...prev,
      scenes: updatedScenes
    }));
    setSceneCount(updatedScenes.length);
  };

  const scenesComplete = newScenario.scenes.every(scene => 
    scene.title.trim() !== "" && 
    scene.description.trim() !== "" && 
    scene.options.every(option => 
      option.text.trim() !== "" && 
      option.explanation.trim() !== ""
    )
  );

  const basicInfoComplete = newScenario.title.trim() !== "" && newScenario.description.trim() !== "";

  const getCompletionStatus = () => {
    return {
      info: basicInfoComplete,
      scenes: scenesComplete,
      complete: basicInfoComplete && scenesComplete
    };
  };

  const status = getCompletionStatus();

  const renderWizardStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Основная информация</CardTitle>
                <CardDescription>Введите общую информацию о сценарии</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Название сценария</Label>
                  <Input
                    id="title"
                    name="title"
                    value={newScenario.title}
                    onChange={handleScenarioChange}
                    required
                    placeholder="Например: Задержание вооруженного преступника"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Описание сценария</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={newScenario.description}
                    onChange={handleScenarioChange}
                    required
                    placeholder="Опишите цель и содержание сценария"
                    className="min-h-[120px]"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="previewImageUrl">URL превью-картинки сценария</Label>
                  <Input
                    id="previewImageUrl"
                    name="previewImageUrl"
                    value={newScenario.previewImageUrl || ""}
                    onChange={handleScenarioChange}
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="text-xs text-muted-foreground">
                    Добавьте URL изображения для отображения в списке сценариев (необязательно)
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  onClick={() => setCurrentStep(1)}
                  disabled={!basicInfoComplete}
                >
                  Далее <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Сцены сценария</CardTitle>
                <CardDescription>Добавьте сцены и варианты ответов</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="sceneCount">Количество сцен</Label>
                  <div className="flex gap-4 items-center">
                    <Select 
                      value={sceneCount.toString()} 
                      onValueChange={handleSceneCountChange}
                    >
                      <SelectTrigger id="sceneCount" className="w-[180px]">
                        <SelectValue placeholder="Выберите количество" />
                      </SelectTrigger>
                      <SelectContent>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                          <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Всего сцен: {newScenario.scenes.length}
                    </p>
                  </div>
                </div>
                
                {newScenario.scenes.length > 0 ? (
                  <div className="space-y-4 mt-4">
                    {newScenario.scenes.map((scene, sceneIndex) => (
                      <Card key={scene.id} className="border shadow-sm">
                        <div 
                          className="p-4 flex items-center justify-between cursor-pointer border-b"
                          onClick={() => toggleSceneExpanded(scene.id)}
                        >
                          <div className="flex items-center">
                            <Badge variant="outline" className="mr-2">{sceneIndex + 1}</Badge>
                            <h3 className="font-medium">{scene.title || `Сцена ${sceneIndex + 1}`}</h3>
                            {scene.imageUrl && <Image className="h-4 w-4 ml-2 text-muted-foreground" />}
                            <Badge 
                              variant={scene.options.length > 0 ? "default" : "outline"} 
                              className="ml-2"
                            >
                              {scene.options.length} {getOptionLabel(scene.options.length)}
                            </Badge>
                          </div>
                          <div className="flex items-center">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation();
                                duplicateScene(sceneIndex);
                              }}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            {expandedScenes[scene.id] ? (
                              <ChevronUp className="h-5 w-5 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                        
                        {expandedScenes[scene.id] && (
                          <CardContent className="p-4 pt-4">
                            <div className="grid gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor={`scene-${sceneIndex}-title`}>Заголовок</Label>
                                <Input
                                  id={`scene-${sceneIndex}-title`}
                                  value={scene.title}
                                  onChange={(e) => handleSceneChange(sceneIndex, "title", e.target.value)}
                                  required
                                  placeholder="Введите заголовок сцены"
                                />
                              </div>
                              
                              <div className="grid gap-2">
                                <Label htmlFor={`scene-${sceneIndex}-description`}>Описание</Label>
                                <Textarea
                                  id={`scene-${sceneIndex}-description`}
                                  value={scene.description}
                                  onChange={(e) => handleSceneChange(sceneIndex, "description", e.target.value)}
                                  required
                                  placeholder="Опишите ситуацию в этой сцене"
                                  className="min-h-[100px]"
                                />
                              </div>
                              
                              <div className="grid gap-2">
                                <Label htmlFor={`scene-${sceneIndex}-imageUrl`}>URL изображения</Label>
                                <Input
                                  id={`scene-${sceneIndex}-imageUrl`}
                                  value={scene.imageUrl}
                                  onChange={(e) => handleSceneChange(sceneIndex, "imageUrl", e.target.value)}
                                  placeholder="https://example.com/image.jpg"
                                />
                                {scene.imageUrl && (
                                  <div className="mt-2 w-full max-h-[200px] overflow-hidden rounded-md border">
                                    <img 
                                      src={scene.imageUrl} 
                                      alt={scene.title} 
                                      className="w-full h-auto object-cover"
                                      onError={(e) => {
                                        e.currentTarget.src = '/images/scenario-placeholder.svg';
                                      }}
                                    />
                                  </div>
                                )}
                              </div>
                              
                              <div className="mt-2">
                                <div className="flex items-center justify-between mb-3">
                                  <h3 className="text-base font-medium">Варианты ответов</h3>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => addOption(sceneIndex)}
                                  >
                                    <Plus className="h-4 w-4 mr-2" /> Добавить вариант
                                  </Button>
                                </div>
                                
                                <div className="space-y-3">
                                  {scene.options.map((option, optionIndex) => (
                                    <Card key={option.id} className="border">
                                      <CardHeader className="p-3 pb-1">
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center">
                                            <Badge variant="outline" className="mr-2">{optionIndex + 1}</Badge>
                                            <h4 className="text-sm font-medium">Вариант ответа</h4>
                                          </div>
                                          {scene.options.length > 2 && (
                                            <Button
                                              type="button"
                                              variant="ghost"
                                              size="sm"
                                              onClick={() => removeOption(sceneIndex, optionIndex)}
                                            >
                                              <X className="h-4 w-4 text-destructive" />
                                            </Button>
                                          )}
                                        </div>
                                      </CardHeader>
                                      
                                      <CardContent className="p-3 pt-0 space-y-3">
                                        <div className="grid gap-2">
                                          <Label htmlFor={`option-${sceneIndex}-${optionIndex}-text`}>Текст варианта</Label>
                                          <Input
                                            id={`option-${sceneIndex}-${optionIndex}-text`}
                                            value={option.text}
                                            onChange={(e) => handleOptionChange(sceneIndex, optionIndex, "text", e.target.value)}
                                            required
                                            placeholder="Опишите вариант действия"
                                          />
                                        </div>
                                        
                                        <div className="flex items-center space-x-2">
                                          <Checkbox 
                                            id={`option-${sceneIndex}-${optionIndex}-correct`}
                                            checked={option.isCorrect}
                                            onCheckedChange={(checked) => 
                                              handleOptionChange(sceneIndex, optionIndex, "isCorrect", checked === true)
                                            }
                                          />
                                          <Label 
                                            htmlFor={`option-${sceneIndex}-${optionIndex}-correct`}
                                            className="text-sm font-normal"
                                          >
                                            Правильный ответ
                                          </Label>
                                        </div>
                                        
                                        <div className="grid gap-2">
                                          <Label htmlFor={`option-${sceneIndex}-${optionIndex}-score`}>Баллы</Label>
                                          <Input
                                            id={`option-${sceneIndex}-${optionIndex}-score`}
                                            type="number"
                                            value={option.score}
                                            onChange={(e) => handleOptionChange(sceneIndex, optionIndex, "score", parseInt(e.target.value))}
                                            min="0"
                                            required
                                          />
                                        </div>
                                        
                                        <div className="grid gap-2">
                                          <Label htmlFor={`option-${sceneIndex}-${optionIndex}-explanation`}>Объяснение</Label>
                                          <Textarea
                                            id={`option-${sceneIndex}-${optionIndex}-explanation`}
                                            value={option.explanation}
                                            onChange={(e) => handleOptionChange(sceneIndex, optionIndex, "explanation", e.target.value)}
                                            required
                                            placeholder="Объяснение, почему этот вариант правильный или неправильный"
                                          />
                                        </div>
                                      </CardContent>
                                    </Card>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Alert className="mt-4">
                    <AlertDescription>
                      Выберите количество сцен, чтобы начать создание сценария
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep(0)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Назад
                </Button>
                
                <Button 
                  onClick={() => setCurrentStep(2)} 
                  disabled={!scenesComplete}
                >
                  Далее <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Предпросмотр и сохранение</CardTitle>
                <CardDescription>Просмотрите созданный сценарий перед сохранением</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Основная информация</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Название</p>
                        <p>{newScenario.title}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm font-medium text-muted-foreground">Описание</p>
                        <p>{newScenario.description}</p>
                      </div>
                    </div>
                    
                    {newScenario.previewImageUrl && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-muted-foreground mb-2">Превью</p>
                        <div className="w-full max-h-[200px] overflow-hidden rounded-md border">
                          <img 
                            src={newScenario.previewImageUrl} 
                            alt={newScenario.title} 
                            className="w-full h-auto object-cover"
                            onError={(e) => {
                              e.currentTarget.src = '/images/scenario-placeholder.svg';
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Сцены ({newScenario.scenes.length})</h3>
                    <div className="space-y-4">
                      {newScenario.scenes.map((scene, index) => (
                        <div key={scene.id} className="p-4 border rounded-md">
                          <div className="flex items-center mb-2">
                            <Badge variant="outline" className="mr-2">{index + 1}</Badge>
                            <h4 className="font-medium">{scene.title}</h4>
                          </div>
                          <p className="text-sm mb-3">{scene.description}</p>
                          
                          {scene.imageUrl && (
                            <div className="mb-3 w-full max-h-[120px] overflow-hidden rounded-md border">
                              <img 
                                src={scene.imageUrl} 
                                alt={scene.title} 
                                className="w-full h-auto object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = '/images/scenario-placeholder.svg';
                                }}
                              />
                            </div>
                          )}
                          
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Варианты ответов:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {scene.options.map((option, optIndex) => (
                                <div 
                                  key={option.id} 
                                  className={`p-2 text-sm rounded-md ${option.isCorrect 
                                    ? 'bg-green-50 border-green-200 border' 
                                    : 'bg-gray-50 border border-gray-200'}`}
                                >
                                  <div className="flex gap-2 mb-1">
                                    <Badge variant="outline">{optIndex + 1}</Badge>
                                    <span className="font-medium">{option.text}</span>
                                  </div>
                                  <div className="flex gap-2 text-xs text-muted-foreground">
                                    <span>{option.isCorrect ? 'Правильный' : 'Неправильный'}</span>
                                    <span>•</span>
                                    <span>{option.score} баллов</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep(1)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Назад
                </Button>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => window.open(`/scenarios/${newScenario.id}/preview`, '_blank')}
                  >
                    <Eye className="mr-2 h-4 w-4" /> Тестовый запуск
                  </Button>
                  
                  <Button 
                    type="button"
                    onClick={handleSubmit}
                    disabled={!status.complete}
                  >
                    <Save className="mr-2 h-4 w-4" /> {isEditing ? "Сохранить изменения" : "Создать сценарий"}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        );
    }
  };

  function getOptionLabel(count: number) {
    if (count === 1) return "вариант";
    if (count >= 2 && count <= 4) return "варианта";
    return "вариантов";
  }

  const getStepStatus = (step: number) => {
    const { info, scenes, complete } = status;
    
    switch (step) {
      case 0: 
        return info ? "complete" : "incomplete";
      case 1:
        return scenes ? "complete" : "incomplete";
      case 2:
        return complete ? "complete" : "incomplete";
      default:
        return "incomplete";
    }
  };

  const progressSteps = [
    { name: "Информация", status: getStepStatus(0) },
    { name: "Сцены", status: getStepStatus(1) },
    { name: "Предпросмотр", status: getStepStatus(2) }
  ];

  return (
    <div className="min-h-[60vh] flex flex-col">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">
            {isEditing ? "Редактирование сценария" : "Создание сценария"}
          </h2>
          
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => router.push('/my-scenarios')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> К списку сценариев
            </Button>
          </div>
        </div>
        
        <div className="flex justify-between mb-6">
          <div className="flex items-center gap-2">
            {progressSteps.map((step, index) => (
              <React.Fragment key={index}>
                {index > 0 && <Separator orientation="vertical" className="h-6" />}
                <button
                  onClick={() => {
                    // Allow navigating to completed steps or the current step + 1
                    if (step.status === "complete" || index <= currentStep) {
                      setCurrentStep(index);
                    }
                  }}
                  className={`flex items-center ${
                    currentStep === index 
                      ? 'text-primary font-medium' 
                      : step.status === "complete" 
                        ? 'text-muted-foreground hover:text-primary cursor-pointer' 
                        : 'text-muted-foreground opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                    currentStep === index 
                      ? 'bg-primary text-primary-foreground' 
                      : step.status === "complete" 
                        ? 'bg-primary/20 text-primary' 
                        : 'bg-muted text-muted-foreground'
                  }`}>
                    {step.status === "complete" ? <CheckCircle className="h-4 w-4" /> : index + 1}
                  </div>
                  <span>{step.name}</span>
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      
      {renderWizardStep()}
    </div>
  );
};

export default ScenarioEditor; 