export interface Prompt {
  id: string;
  title: string;
  content: string;
  sport: string;
  category: 'traditional' | 'racing' | 'esports';
  type: 'general' | 'specific';
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isFavorite?: boolean;
  usageCount?: number;
  lastUsed?: string;
  successRate?: number;
  totalBets?: number;
  winningBets?: number;
  roi?: number;
}

export interface SportCategory {
  id: string;
  name: string;
  category: 'traditional' | 'racing' | 'esports';
  icon: string;
}

export interface PromptAnalytics {
  promptId: string;
  usageCount: number;
  lastUsed: string;
  successRate: number;
  totalBets: number;
  winningBets: number;
  roi: number;
}

export interface AIGenerationRequest {
  image: File;
  sport: string;
  promptTemplate: string;
}