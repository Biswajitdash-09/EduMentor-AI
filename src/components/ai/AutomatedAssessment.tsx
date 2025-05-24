
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Assessment, AssessmentResult, Question } from '@/types/assessment';
import AssessmentCreationForm from './AssessmentCreationForm';
import AIQuestionGenerator from './AIQuestionGenerator';
import AssessmentManagement from './AssessmentManagement';
import AssessmentResults from './AssessmentResults';
import AssessmentAnalytics from './AssessmentAnalytics';
import StudentAssessmentView from './StudentAssessmentView';

const AutomatedAssessment = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('create');
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [results, setResults] = useState<AssessmentResult[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [newAssessment, setNewAssessment] = useState<Partial<Assessment>>({
    title: '',
    description: '',
    subject: '',
    difficulty: 'medium',
    duration: 60
  });

  const userType = profile?.user_type || 'student';

  // Sample data for demonstration
  useEffect(() => {
    if (userType === 'faculty' || userType === 'admin') {
      const sampleAssessments: Assessment[] = [
        {
          id: '1',
          title: 'Machine Learning Fundamentals Quiz',
          description: 'Test your understanding of basic ML concepts',
          subject: 'Computer Science',
          difficulty: 'medium',
          duration: 45,
          questions: [],
          totalPoints: 100,
          status: 'published',
          createdAt: new Date('2024-01-15'),
          submissionsCount: 25,
          averageScore: 78.5
        },
        {
          id: '2',
          title: 'Calculus Integration Test',
          description: 'Advanced integration techniques assessment',
          subject: 'Mathematics',
          difficulty: 'hard',
          duration: 90,
          questions: [],
          totalPoints: 150,
          status: 'published',
          createdAt: new Date('2024-01-10'),
          submissionsCount: 18,
          averageScore: 65.2
        }
      ];
      setAssessments(sampleAssessments);

      const sampleResults: AssessmentResult[] = [
        {
          id: '1',
          assessmentId: '1',
          studentId: 'student1',
          studentName: 'John Doe',
          score: 85,
          totalPoints: 100,
          percentage: 85,
          timeSpent: 42,
          submittedAt: new Date(),
          answers: {},
          aiAnalysis: 'Strong performance overall. Student shows good understanding of supervised learning concepts but may need more practice with unsupervised learning algorithms.'
        },
        {
          id: '2',
          assessmentId: '1',
          studentId: 'student2',
          studentName: 'Jane Smith',
          score: 92,
          totalPoints: 100,
          percentage: 92,
          timeSpent: 38,
          submittedAt: new Date(),
          answers: {},
          aiAnalysis: 'Excellent performance. Student demonstrates mastery of core concepts and shows strong analytical thinking skills.'
        }
      ];
      setResults(sampleResults);
    }
  }, [userType]);

  const generateAIQuestions = async () => {
    if (!newAssessment.subject || !newAssessment.title) {
      toast({
        title: "Missing Information",
        description: "Please fill in the subject and title first.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI question generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const generatedQuestions: Question[] = [
      {
        id: '1',
        type: 'multiple-choice',
        question: `What is the main difference between supervised and unsupervised learning in ${newAssessment.subject}?`,
        options: [
          'Supervised learning uses labeled data, unsupervised does not',
          'Unsupervised learning is always more accurate',
          'Supervised learning is faster to train',
          'There is no difference'
        ],
        correctAnswer: 0,
        points: 10,
        difficulty: 'medium',
        subject: newAssessment.subject || '',
        topic: 'Machine Learning Basics'
      },
      {
        id: '2',
        type: 'short-answer',
        question: `Explain one practical application of ${newAssessment.subject} in real-world scenarios.`,
        points: 15,
        difficulty: 'medium',
        subject: newAssessment.subject || '',
        topic: 'Applications'
      },
      {
        id: '3',
        type: 'multiple-choice',
        question: 'Which algorithm is commonly used for classification problems?',
        options: ['K-means', 'Linear Regression', 'Random Forest', 'PCA'],
        correctAnswer: 2,
        points: 10,
        difficulty: 'easy',
        subject: newAssessment.subject || '',
        topic: 'Algorithms'
      }
    ];

    setNewAssessment(prev => ({
      ...prev,
      questions: generatedQuestions,
      totalPoints: generatedQuestions.reduce((sum, q) => sum + q.points, 0)
    }));

    setIsGenerating(false);
    toast({
      title: "Questions Generated",
      description: `Generated ${generatedQuestions.length} questions using AI.`
    });
  };

  const publishAssessment = () => {
    if (!newAssessment.title || !newAssessment.questions?.length) {
      toast({
        title: "Cannot Publish",
        description: "Please add a title and questions first.",
        variant: "destructive"
      });
      return;
    }

    const assessment: Assessment = {
      id: Date.now().toString(),
      title: newAssessment.title,
      description: newAssessment.description || '',
      subject: newAssessment.subject || '',
      difficulty: newAssessment.difficulty || 'medium',
      duration: newAssessment.duration || 60,
      questions: newAssessment.questions || [],
      totalPoints: newAssessment.totalPoints || 0,
      status: 'published',
      createdAt: new Date(),
      submissionsCount: 0,
      averageScore: 0
    };

    setAssessments(prev => [...prev, assessment]);
    setNewAssessment({
      title: '',
      description: '',
      subject: '',
      difficulty: 'medium',
      duration: 60
    });

    toast({
      title: "Assessment Published",
      description: "Your assessment is now available to students."
    });
  };

  if (userType === 'student') {
    return <StudentAssessmentView assessments={assessments} />;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-edu-blue" />
            Automated Assessment Tool
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="create">Create Assessment</TabsTrigger>
              <TabsTrigger value="manage">Manage Assessments</TabsTrigger>
              <TabsTrigger value="results">View Results</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="create" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AssessmentCreationForm
                  newAssessment={newAssessment}
                  onAssessmentChange={setNewAssessment}
                />
                <AIQuestionGenerator
                  newAssessment={newAssessment}
                  isGenerating={isGenerating}
                  onGenerateQuestions={generateAIQuestions}
                  onPublishAssessment={publishAssessment}
                />
              </div>
            </TabsContent>

            <TabsContent value="manage" className="space-y-4">
              <AssessmentManagement assessments={assessments} />
            </TabsContent>

            <TabsContent value="results" className="space-y-4">
              <AssessmentResults results={results} assessments={assessments} />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <AssessmentAnalytics assessments={assessments} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutomatedAssessment;
