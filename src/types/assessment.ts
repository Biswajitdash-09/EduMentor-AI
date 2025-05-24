
export interface Question {
  id: string;
  type: 'multiple-choice' | 'short-answer' | 'essay' | 'true-false';
  question: string;
  options?: string[];
  correctAnswer?: string | number;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  subject: string;
  topic: string;
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: number;
  questions: Question[];
  totalPoints: number;
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  submissionsCount: number;
  averageScore: number;
}

export interface AssessmentResult {
  id: string;
  assessmentId: string;
  studentId: string;
  studentName: string;
  score: number;
  totalPoints: number;
  percentage: number;
  timeSpent: number;
  submittedAt: Date;
  answers: Record<string, any>;
  aiAnalysis: string;
}
