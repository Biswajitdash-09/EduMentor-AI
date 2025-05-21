
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { ClipboardList, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { MCQuestion } from "@/components/MCQuiz";
import { AssessmentResult } from "@/components/ViewAssessmentResults";
import ViewAssessmentResults from "@/components/ViewAssessmentResults";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Sample questions for assessments
const assessmentQuestions: Record<string, MCQuestion[]> = {
  "math-midterm": [
    {
      id: "math-q1",
      question: "Solve for x: 2x + 5 = 15",
      options: ["x = 5", "x = 10", "x = 7.5", "x = 8"],
      correctAnswerIndex: 0
    },
    {
      id: "math-q2",
      question: "What is the derivative of f(x) = x²?",
      options: ["f'(x) = x", "f'(x) = 2x", "f'(x) = x²", "f'(x) = 2"],
      correctAnswerIndex: 1
    },
    {
      id: "math-q3",
      question: "Evaluate: ∫(0 to 1) 2x dx",
      options: ["1", "2", "0", "x²"],
      correctAnswerIndex: 0
    }
  ],
  "ai-ethics": [
    {
      id: "ai-q1",
      question: "Which of these is NOT a key ethical concern in AI development?",
      options: [
        "Privacy",
        "Bias in algorithms",
        "Increasing computing power",
        "Autonomous weapon systems"
      ],
      correctAnswerIndex: 2
    },
    {
      id: "ai-q2",
      question: "What is 'algorithmic bias'?",
      options: [
        "When AI systems have technical errors",
        "When AI systems reflect or amplify existing prejudices in their training data or design",
        "When AI systems require too much computing power",
        "When AI systems are more accurate than humans"
      ],
      correctAnswerIndex: 1
    }
  ],
  "ml-final": [
    {
      id: "ml-f1",
      question: "Which algorithm is best suited for classification problems?",
      options: [
        "Linear Regression",
        "K-means Clustering",
        "Random Forest",
        "Principal Component Analysis"
      ],
      correctAnswerIndex: 2
    },
    {
      id: "ml-f2",
      question: "What is overfitting?",
      options: [
        "When a model performs well on training data but poorly on test data",
        "When a model is too simple to capture patterns in data",
        "When a model has too few parameters",
        "When a model requires too much computing power"
      ],
      correctAnswerIndex: 0
    },
    {
      id: "ml-f3",
      question: "What does the 'gradient' refer to in gradient descent?",
      options: [
        "The slope of the error function",
        "The direction of data clustering",
        "The complexity of the model",
        "The learning rate of the algorithm"
      ],
      correctAnswerIndex: 0
    }
  ]
};

// Sample assessments
const sampleAssessments = [
  {
    id: "math-midterm",
    title: "Mathematics Midterm Exam",
    description: "Test your knowledge of calculus concepts",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    timeLimit: 45, // minutes
    status: "not_started",
    courseTitle: "Advanced Calculus",
    questions: assessmentQuestions["math-midterm"]
  },
  {
    id: "ai-ethics",
    title: "AI Ethics Quiz",
    description: "Understand key ethical considerations in AI development",
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    timeLimit: 20, // minutes
    status: "not_started",
    courseTitle: "Introduction to AI",
    questions: assessmentQuestions["ai-ethics"]
  },
  {
    id: "ml-final",
    title: "Machine Learning Final Exam",
    description: "Test your understanding of ML algorithms and concepts",
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    timeLimit: 60, // minutes
    status: "overdue",
    courseTitle: "Introduction to Machine Learning",
    questions: assessmentQuestions["ml-final"]
  }
];

// Sample completed assessment results
const sampleResults: AssessmentResult[] = [
  {
    id: "history-quiz-1",
    title: "World History Quiz",
    totalQuestions: 5,
    correctAnswers: 4,
    questions: [
      {
        id: "hist-1",
        question: "Which event marked the beginning of World War II in Europe?",
        userAnswer: "German invasion of Poland",
        correctAnswer: "German invasion of Poland",
        isCorrect: true
      },
      {
        id: "hist-2",
        question: "Who was the first President of the United States?",
        userAnswer: "George Washington",
        correctAnswer: "George Washington",
        isCorrect: true
      },
      {
        id: "hist-3",
        question: "In what year did the Berlin Wall fall?",
        userAnswer: "1991",
        correctAnswer: "1989",
        isCorrect: false
      },
      {
        id: "hist-4",
        question: "Which empire was ruled by Genghis Khan?",
        userAnswer: "Mongol Empire",
        correctAnswer: "Mongol Empire",
        isCorrect: true
      },
      {
        id: "hist-5",
        question: "What was the Renaissance?",
        userAnswer: "A cultural movement that spanned roughly the 14th to 17th centuries",
        correctAnswer: "A cultural movement that spanned roughly the 14th to 17th centuries",
        isCorrect: true
      }
    ],
    completedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    score: 80
  }
];

const Assessments = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [assessments, setAssessments] = useState(sampleAssessments);
  const [completedResults, setCompletedResults] = useState<AssessmentResult[]>(sampleResults);
  const [selectedAssessment, setSelectedAssessment] = useState<any>(null);
  const [selectedResult, setSelectedResult] = useState<AssessmentResult | null>(null);
  const [assessmentMode, setAssessmentMode] = useState<"list" | "taking" | "results">("list");

  useEffect(() => {
    if (user) {
      // In a real app, fetch assessments from the database
      // For now, just using our sample data
    }
  }, [user]);

  const startAssessment = (assessment: any) => {
    setSelectedAssessment(assessment);
    setAssessmentMode("taking");
    
    // Update status to in_progress
    const updatedAssessments = assessments.map(a => 
      a.id === assessment.id ? {...a, status: "in_progress"} : a
    );
    setAssessments(updatedAssessments);
  };

  const viewResult = (result: AssessmentResult) => {
    setSelectedResult(result);
    setAssessmentMode("results");
  };

  const completeAssessment = async (score: number, totalQuestions: number) => {
    if (!user || !selectedAssessment) return;
    
    try {
      // Calculate the percentage score
      const percentScore = Math.round((score / totalQuestions) * 100);
      
      // Create mock result for demonstration
      const newResult: AssessmentResult = {
        id: `assessment-${selectedAssessment.id}-${Date.now()}`,
        title: selectedAssessment.title,
        totalQuestions: selectedAssessment.questions.length,
        correctAnswers: score,
        completedAt: new Date().toISOString(),
        score: percentScore,
        questions: selectedAssessment.questions.map((q: MCQuestion, idx: number) => {
          // Randomly determine if the question was answered correctly
          const isCorrect = idx < score;
          return {
            id: q.id,
            question: q.question,
            userAnswer: isCorrect ? q.options[q.correctAnswerIndex] : q.options[(q.correctAnswerIndex + 1) % q.options.length],
            correctAnswer: q.options[q.correctAnswerIndex],
            isCorrect
          };
        })
      };
      
      // Add to completed results
      setCompletedResults([newResult, ...completedResults]);
      
      // Update status to completed
      const updatedAssessments = assessments.map(a => 
        a.id === selectedAssessment.id ? {...a, status: "completed"} : a
      );
      setAssessments(updatedAssessments);
      
      // View results
      setSelectedResult(newResult);
      setAssessmentMode("results");
      
      // Update user achievements
      try {
        const { data: achievements } = await supabase
          .from('user_achievements')
          .select('*')
          .eq('user_id', user.id)
          .single();
          
        if (achievements) {
          // Update existing record
          await supabase
            .from('user_achievements')
            .update({
              points: achievements.points + (percentScore >= 80 ? 100 : 50),
              completed_assessments: achievements.completed_assessments + 1,
              last_activity: new Date().toISOString()
            })
            .eq('user_id', user.id);
        } else {
          // Create new record
          await supabase
            .from('user_achievements')
            .insert({
              user_id: user.id,
              points: percentScore >= 80 ? 100 : 50,
              completed_assessments: 1,
              last_activity: new Date().toISOString()
            });
        }
      } catch (error) {
        console.error('Error updating achievements:', error);
      }
      
      toast({
        title: "Assessment completed",
        description: `You scored ${percentScore}% on this assessment`,
      });
    } catch (error) {
      console.error('Error completing assessment:', error);
    }
  };

  const getUpcomingAssessments = () => {
    return assessments.filter(a => a.status !== "overdue" && a.status !== "completed");
  };

  const getOverdueAssessments = () => {
    return assessments.filter(a => a.status === "overdue");
  };

  const renderAssessmentList = () => {
    return (
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          <div className="grid gap-4">
            {getUpcomingAssessments().length > 0 ? (
              getUpcomingAssessments().map(assessment => (
                <Card key={assessment.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{assessment.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {assessment.courseTitle}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        {assessment.timeLimit} minutes
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 pt-0">
                    <p className="text-sm text-gray-500">{assessment.description}</p>
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center text-amber-600">
                        <Clock className="h-4 w-4 mr-1" />
                        Due: {new Date(assessment.dueDate).toLocaleDateString()}
                      </div>
                      <Button 
                        onClick={() => startAssessment(assessment)}
                        className="bg-edu-blue hover:bg-edu-blue-dark"
                      >
                        Start Assessment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg border">
                <ClipboardList className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium">No upcoming assessments</h3>
                <p className="text-gray-500">You're all caught up!</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="grid gap-4">
            {completedResults.length > 0 ? (
              completedResults.map(result => (
                <Card key={result.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle>{result.title}</CardTitle>
                      <Badge className={result.score >= 70 ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}>
                        {result.score}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 pt-0">
                    <p className="text-sm text-gray-500">
                      Completed on {new Date(result.completedAt).toLocaleDateString()}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        {result.correctAnswers} of {result.totalQuestions} correct
                      </div>
                      <Button 
                        onClick={() => viewResult(result)}
                        variant="outline"
                      >
                        View Results
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg border">
                <CheckCircle className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium">No completed assessments</h3>
                <p className="text-gray-500">Complete assessments to see your results here</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="overdue">
          <div className="grid gap-4">
            {getOverdueAssessments().length > 0 ? (
              getOverdueAssessments().map(assessment => (
                <Card key={assessment.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{assessment.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {assessment.courseTitle}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-red-50 text-red-700">
                        Overdue
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 pt-0">
                    <p className="text-sm text-gray-500">{assessment.description}</p>
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center text-red-600">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        Due date: {new Date(assessment.dueDate).toLocaleDateString()}
                      </div>
                      <Button 
                        onClick={() => startAssessment(assessment)}
                        variant="outline"
                      >
                        Take Anyway
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg border">
                <CheckCircle className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium">No overdue assessments</h3>
                <p className="text-gray-500">Great job staying on top of your work!</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    );
  };

  const renderAssessmentTaking = () => {
    if (!selectedAssessment) return null;
    
    return (
      <Card>
        <CardHeader>
          <CardTitle>{selectedAssessment.title}</CardTitle>
          <CardDescription>
            Time limit: {selectedAssessment.timeLimit} minutes
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Simplified assessment taking - mock interface */}
          <div className="space-y-6">
            {selectedAssessment.questions.map((question: MCQuestion, index: number) => (
              <div key={question.id} className="p-4 border rounded-lg">
                <p className="font-medium mb-3">{index + 1}. {question.question}</p>
                <div className="space-y-2">
                  {question.options.map((option: string, optionIndex: number) => (
                    <div key={optionIndex} className="flex items-center">
                      <input 
                        type="radio" 
                        id={`q${index}-${optionIndex}`}
                        name={`question-${index}`}
                        className="mr-2" 
                      />
                      <label htmlFor={`q${index}-${optionIndex}`}>{option}</label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setAssessmentMode("list")}>
                Cancel
              </Button>
              <Button 
                className="bg-edu-blue hover:bg-edu-blue-dark"
                onClick={() => {
                  // Mock a random score for demonstration
                  const totalQuestions = selectedAssessment.questions.length;
                  const randomScore = Math.floor(Math.random() * (totalQuestions + 1));
                  completeAssessment(randomScore, totalQuestions);
                }}
              >
                Submit Assessment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderAssessmentResults = () => {
    if (!selectedResult) return null;
    
    return (
      <ViewAssessmentResults 
        result={selectedResult}
        onClose={() => {
          setSelectedResult(null);
          setAssessmentMode("list");
        }}
      />
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Assessments</h1>
            <p className="text-gray-500">
              Take quizzes and tests to evaluate your understanding.
            </p>
          </div>
          
          {assessmentMode !== "list" && (
            <Button 
              variant="outline" 
              onClick={() => setAssessmentMode("list")}
            >
              Back to Assessments
            </Button>
          )}
        </div>
        
        {assessmentMode === "list" && renderAssessmentList()}
        {assessmentMode === "taking" && renderAssessmentTaking()}
        {assessmentMode === "results" && renderAssessmentResults()}
      </div>
    </DashboardLayout>
  );
};

export default Assessments;
