
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'explanation' | 'quiz' | 'suggestion' | 'encouragement';
}

export interface LearningProfile {
  style: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  pace: 'fast' | 'medium' | 'slow';
  strengths: string[];
  weaknesses: string[];
  interests: string[];
}

export interface Subject {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}
