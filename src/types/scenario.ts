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
  id: number
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
} 