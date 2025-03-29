export interface ScenarioOption {
  id: number
  text: string
  feedback: {
    type: string
    text: string
  }
}

export interface ScenarioStep {
  id: number
  title: string
  description: string
  image: string
  options: ScenarioOption[]
}

export interface LegalCode {
  id: number
  title: string
  article: string
  description: string
  link: string
}

export interface Scenario {
  id: string
  title: string
  category: string
  difficulty: string
  duration: string
  rating: number
  reviews: number
  image: string
  description: string
  tags: string[]
  isNew: boolean
  isPopular: boolean
  objectives: string[]
  steps: ScenarioStep[]
  legalCodes: LegalCode[]
  points: string
  scenarioId: string
}

export type AnswerOption = {
  id: string;
  text: string;
  isCorrect: boolean;
  score: number;
  explanation: string;
};

export type Scene = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  options: AnswerOption[];
};

export type ScenarioData = {
  id: string;
  title: string;
  description: string;
  previewImageUrl?: string;
  scenes: Scene[];
  userId?: string;
  isPublic?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ScenarioResult = {
  totalScore: number;
  maxPossibleScore: number;
  mistakes: {
    sceneId: string;
    sceneTitle: string;
    selectedOptionId: string;
    correctOptionId: string;
    explanation: string;
  }[];
  recommendations: string[];
}; 