
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, 
  Plus, 
  Play, 
  BarChart3, 
  Clock, 
  CheckCircle,
  Brain,
  Target,
  Zap,
  Users,
  TrendingUp,
  Download
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Question {
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

interface Assessment {
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

interface AssessmentResult {
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
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-edu-blue" />
            Available Assessments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {assessments.filter(a => a.status === 'published').map((assessment) => (
              <Card key={assessment.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{assessment.title}</h3>
                      <p className="text-sm text-gray-600">{assessment.description}</p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline">{assessment.subject}</Badge>
                        <Badge variant="secondary">{assessment.difficulty}</Badge>
                        <Badge variant="outline">
                          <Clock className="h-3 w-3 mr-1" />
                          {assessment.duration} min
                        </Badge>
                      </div>
                    </div>
                    <Button className="bg-edu-blue hover:bg-edu-blue-dark">
                      <Play className="h-4 w-4 mr-2" />
                      Start Assessment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    );
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
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Assessment Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Title</label>
                      <Input
                        value={newAssessment.title}
                        onChange={(e) => setNewAssessment(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter assessment title"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <Textarea
                        value={newAssessment.description}
                        onChange={(e) => setNewAssessment(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Enter assessment description"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Subject</label>
                      <Input
                        value={newAssessment.subject}
                        onChange={(e) => setNewAssessment(prev => ({ ...prev, subject: e.target.value }))}
                        placeholder="e.g., Machine Learning, Calculus"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Difficulty</label>
                        <Select
                          value={newAssessment.difficulty}
                          onValueChange={(value) => setNewAssessment(prev => ({ ...prev, difficulty: value as any }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Duration (minutes)</label>
                        <Input
                          type="number"
                          value={newAssessment.duration}
                          onChange={(e) => setNewAssessment(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">AI Question Generation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">
                      Let AI automatically generate questions based on your subject and difficulty level.
                    </p>
                    <Button 
                      onClick={generateAIQuestions}
                      disabled={isGenerating}
                      className="w-full bg-edu-blue hover:bg-edu-blue-dark"
                    >
                      {isGenerating ? (
                        <>
                          <Zap className="h-4 w-4 mr-2 animate-pulse" />
                          Generating Questions...
                        </>
                      ) : (
                        <>
                          <Brain className="h-4 w-4 mr-2" />
                          Generate AI Questions
                        </>
                      )}
                    </Button>
                    
                    {newAssessment.questions && newAssessment.questions.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Generated Questions:</p>
                        <div className="space-y-2">
                          {newAssessment.questions.map((q, index) => (
                            <div key={q.id} className="p-3 border rounded-lg">
                              <p className="text-sm font-medium">Q{index + 1}: {q.question}</p>
                              <div className="flex gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">{q.type}</Badge>
                                <Badge variant="secondary" className="text-xs">{q.points} pts</Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button onClick={publishAssessment} className="w-full">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Publish Assessment
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="manage" className="space-y-4">
              <div className="grid gap-4">
                {assessments.map((assessment) => (
                  <Card key={assessment.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{assessment.title}</h3>
                          <p className="text-sm text-gray-600">{assessment.description}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline">{assessment.subject}</Badge>
                            <Badge 
                              variant={assessment.status === 'published' ? 'default' : 'secondary'}
                            >
                              {assessment.status}
                            </Badge>
                            <Badge variant="outline">
                              <Users className="h-3 w-3 mr-1" />
                              {assessment.submissionsCount} submissions
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <BarChart3 className="h-4 w-4 mr-1" />
                            View Stats
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="results" className="space-y-4">
              <div className="grid gap-4">
                {results.map((result) => (
                  <Card key={result.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{result.studentName}</h3>
                          <p className="text-sm text-gray-600">
                            Assessment: {assessments.find(a => a.id === result.assessmentId)?.title}
                          </p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline">
                              {result.score}/{result.totalPoints} points
                            </Badge>
                            <Badge 
                              variant={result.percentage >= 80 ? 'default' : result.percentage >= 60 ? 'secondary' : 'destructive'}
                            >
                              {result.percentage}%
                            </Badge>
                            <Badge variant="outline">
                              <Clock className="h-3 w-3 mr-1" />
                              {result.timeSpent} min
                            </Badge>
                          </div>
                          <div className="mt-3">
                            <p className="text-xs font-medium text-gray-600">AI Analysis:</p>
                            <p className="text-sm text-gray-700 mt-1">{result.aiAnalysis}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Export
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Assessments</p>
                        <p className="text-2xl font-bold">{assessments.length}</p>
                      </div>
                      <FileText className="h-8 w-8 text-edu-blue" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                        <p className="text-2xl font-bold">
                          {assessments.reduce((sum, a) => sum + a.submissionsCount, 0)}
                        </p>
                      </div>
                      <Users className="h-8 w-8 text-edu-blue" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Average Score</p>
                        <p className="text-2xl font-bold">
                          {Math.round(assessments.reduce((sum, a) => sum + a.averageScore, 0) / assessments.length || 0)}%
                        </p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-edu-blue" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Assessment Performance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assessments.map((assessment) => (
                      <div key={assessment.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{assessment.title}</span>
                          <span className="text-sm text-gray-600">{assessment.averageScore}%</span>
                        </div>
                        <Progress value={assessment.averageScore} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutomatedAssessment;
