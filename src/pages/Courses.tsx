import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Film, FileText, BookUser, ListChecks, LucideIcon, Trophy, Award } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import VideoEmbed from "@/components/VideoEmbed";
import MCQuiz from "@/components/MCQuiz";
import { MCQuestion } from "@/components/MCQuiz";
import { supabase } from "@/integrations/supabase/client";
import ViewAssessmentResults, { AssessmentResult } from "@/components/ViewAssessmentResults";

type Course = {
  id: string;
  title: string;
  description: string;
  instructor: string;
  progress: number;
  icon: LucideIcon;
  color: string;
  modules: number;
  videoId?: string;
};

// Sample MCQ questions for each course
const mcqQuestions: Record<string, MCQuestion[]> = {
  "1": [
    {
      id: "ml-q1",
      question: "What is the primary goal of supervised learning?",
      options: [
        "To cluster data without labels",
        "To predict outputs based on labeled inputs",
        "To reduce dimensionality of data",
        "To generate new data samples"
      ],
      correctAnswerIndex: 1
    },
    {
      id: "ml-q2",
      question: "Which algorithm is NOT typically used for classification?",
      options: [
        "Logistic Regression",
        "K-means",
        "Random Forest",
        "Support Vector Machines"
      ],
      correctAnswerIndex: 1
    },
    {
      id: "ml-q3",
      question: "What does the 'gradient' refer to in gradient descent?",
      options: [
        "The slope of the error function",
        "The color scheme of the visualization",
        "The rate of data processing",
        "The number of iterations"
      ],
      correctAnswerIndex: 0
    },
    {
      id: "ml-q4",
      question: "What is overfitting in machine learning?",
      options: [
        "When a model performs well on training data but poorly on new data",
        "When a model is too simple to capture patterns in data",
        "When training takes too long to complete",
        "When the dataset is too small to train effectively"
      ],
      correctAnswerIndex: 0
    },
    {
      id: "ml-q5",
      question: "Which technique is used to prevent overfitting?",
      options: [
        "Increasing model complexity",
        "Using more features",
        "Regularization",
        "Removing validation data"
      ],
      correctAnswerIndex: 2
    }
  ],
  "2": [
    {
      id: "calc-q1",
      question: "What is the derivative of f(x) = x²?",
      options: [
        "f'(x) = x",
        "f'(x) = 2x",
        "f'(x) = x²",
        "f'(x) = 2"
      ],
      correctAnswerIndex: 1
    },
    {
      id: "calc-q2",
      question: "What does the integral ∫f(x)dx represent geometrically?",
      options: [
        "The slope of f(x)",
        "The area under the curve of f(x)",
        "The rate of change of f(x)",
        "The maximum value of f(x)"
      ],
      correctAnswerIndex: 1
    },
    {
      id: "calc-q3",
      question: "Which rule is used to find the derivative of a product of two functions?",
      options: [
        "Chain rule",
        "Power rule",
        "Product rule",
        "Quotient rule"
      ],
      correctAnswerIndex: 2
    },
    {
      id: "calc-q4",
      question: "What is the limit of (sin x)/x as x approaches 0?",
      options: [
        "0",
        "1",
        "∞",
        "undefined"
      ],
      correctAnswerIndex: 1
    },
    {
      id: "calc-q5",
      question: "Which of the following is an application of integration?",
      options: [
        "Finding instantaneous velocity",
        "Calculating the slope of a tangent line",
        "Finding the area between curves",
        "Determining critical points"
      ],
      correctAnswerIndex: 2
    }
  ],
  "3": [
    {
      id: "hist-q1",
      question: "Which event marked the beginning of World War II in Europe?",
      options: [
        "Pearl Harbor attack",
        "German invasion of Poland",
        "D-Day landings",
        "Treaty of Versailles"
      ],
      correctAnswerIndex: 1
    },
    {
      id: "hist-q2",
      question: "Who was the President of the United States during most of World War II?",
      options: [
        "Harry S. Truman",
        "Herbert Hoover",
        "Franklin D. Roosevelt",
        "Dwight D. Eisenhower"
      ],
      correctAnswerIndex: 2
    },
    {
      id: "hist-q3",
      question: "What was the Cold War?",
      options: [
        "A series of armed conflicts between the US and USSR",
        "A period of diplomatic and military tension between capitalist and communist blocs",
        "A war fought in winter conditions",
        "A conflict between Canada and Russia over Arctic territory"
      ],
      correctAnswerIndex: 1
    },
    {
      id: "hist-q4",
      question: "Which of these events occurred in 1989?",
      options: [
        "Fall of the Berlin Wall",
        "Cuban Missile Crisis",
        "Assassination of JFK",
        "Vietnam War ended"
      ],
      correctAnswerIndex: 0
    },
    {
      id: "hist-q5",
      question: "Which movement fought for civil rights for African Americans in the 1950s and 1960s?",
      options: [
        "Prohibition movement",
        "Women's suffrage movement",
        "Civil Rights Movement",
        "Labor movement"
      ],
      correctAnswerIndex: 2
    }
  ]
};

// Updated course data with YouTube videoIds
const dummyCourses: Course[] = [
  {
    id: "1",
    title: "Introduction to Machine Learning",
    description: "Learn the fundamentals of machine learning and AI algorithms.",
    instructor: "Dr. Sarah Johnson",
    progress: 65,
    icon: BookUser,
    color: "from-edu-blue to-edu-blue-light",
    modules: 12,
    videoId: "ukzFI9rgwfU" // Machine Learning introduction video
  },
  {
    id: "2",
    title: "Advanced Calculus",
    description: "Master calculus concepts with practical applications.",
    instructor: "Prof. Michael Chen",
    progress: 30,
    icon: BookOpen,
    color: "from-edu-purple to-edu-purple-light",
    modules: 10,
    videoId: "WUvTyaaNkzM" // Calculus introduction video
  },
  {
    id: "3",
    title: "World History: Modern Era",
    description: "Explore significant events and figures from 1900 to present.",
    instructor: "Dr. Emily Rodriguez",
    progress: 80,
    icon: BookUser,
    color: "from-edu-blue-light to-edu-purple",
    modules: 8,
    videoId: "Yocja_N5s1I" // Updated Modern history video - Crash Course World History
  }
];

// Keeping the available courses the same
const availableCourses = [
  {
    id: "4",
    title: "Introduction to Computer Science",
    description: "A comprehensive introduction to computer science principles and programming.",
    instructor: "Prof. James Wilson",
    icon: BookUser,
    color: "from-edu-blue to-edu-blue-light",
    modules: 15
  },
  {
    id: "5",
    title: "Organic Chemistry",
    description: "Study organic compounds, reactions, and laboratory techniques.",
    instructor: "Dr. Lisa Wang",
    icon: BookOpen,
    color: "from-edu-purple to-edu-purple-light",
    modules: 12
  },
  {
    id: "6",
    title: "Business Economics",
    description: "Learn economic principles applied to business decision-making.",
    instructor: "Prof. Robert Martinez",
    icon: BookUser,
    color: "from-edu-blue-light to-edu-purple",
    modules: 10
  }
];

const Courses = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "video" | "assignments">("overview");
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);
  const [quizResults, setQuizResults] = useState<AssessmentResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const userType = profile?.user_type || "student";

  const selectedCourse = enrolledCourses.find(course => course.id === selectedCourseId);
  
  useEffect(() => {
    // Initialize with default courses but check for any enrolled courses in Supabase
    if (user) {
      fetchEnrolledCourses();
    } else {
      setEnrolledCourses(dummyCourses);
      setLoading(false);
    }
  }, [user]);

  const fetchEnrolledCourses = async () => {
    setLoading(true);
    try {
      // Get user's enrollments
      const { data: enrollmentsData, error: enrollmentsError } = await supabase
        .from('enrollments')
        .select('course_id')
        .eq('user_id', user?.id);
        
      if (enrollmentsError) throw enrollmentsError;
      
      if (enrollmentsData && enrollmentsData.length > 0) {
        // User has enrollments, let's use those course IDs
        const userCourseIds = enrollmentsData.map(enrollment => enrollment.course_id);
        
        // Filter dummyCourses to only include enrolled courses
        // In a real app, we would fetch course details from the database here
        const userCourses = dummyCourses.filter(course => 
          userCourseIds.includes(course.id)
        );
        
        setEnrolledCourses(userCourses.length > 0 ? userCourses : dummyCourses);
      } else {
        // No enrollments yet, use default courses
        setEnrolledCourses(dummyCourses);
      }
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
      setEnrolledCourses(dummyCourses);
    } finally {
      setLoading(false);
    }
  };

  const handleEnrollNow = async (courseId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to enroll in this course",
        variant: "destructive",
      });
      navigate('/signin/student');
      return;
    }
    
    try {
      // Check if already enrolled
      const { data: existingEnrollment } = await supabase
        .from('enrollments')
        .select('id')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .single();
        
      if (existingEnrollment) {
        toast({
          title: "Already enrolled",
          description: "You are already enrolled in this course",
        });
        
        // Add the course to enrolledCourses if it's not already there
        const courseExists = enrolledCourses.some(course => course.id === courseId);
        if (!courseExists) {
          const courseToAdd = dummyCourses.find(course => course.id === courseId);
          if (courseToAdd) {
            setEnrolledCourses(prev => [...prev, courseToAdd]);
          }
        }
        
        setSelectedCourseId(courseId);
        setActiveTab("overview");
        return;
      }
      
      // Create new enrollment
      await supabase.from('enrollments').insert({
        user_id: user.id,
        course_id: courseId
      });
      
      // Find the course from available courses
      const enrolledCourse = dummyCourses.find(course => course.id === courseId);
      
      if (enrolledCourse) {
        // Add to enrolledCourses
        setEnrolledCourses(prev => [...prev, enrolledCourse]);
        
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
                points: achievements.points + 50,
                last_activity: new Date().toISOString()
              })
              .eq('user_id', user.id);
          } else {
            // Create new record
            await supabase
              .from('user_achievements')
              .insert({
                user_id: user.id,
                points: 50,
                completed_courses: 0,
                completed_assessments: 0,
                last_activity: new Date().toISOString()
              });
          }
        } catch (achievementError) {
          console.error('Error updating achievements:', achievementError);
        }
        
        toast({
          title: "Enrollment successful",
          description: `You have been enrolled in ${enrolledCourse.title}`,
        });
        
        // Navigate to the course
        setSelectedCourseId(courseId);
        setActiveTab("overview");
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
      toast({
        title: "Enrollment failed",
        description: "There was an error enrolling in this course",
        variant: "destructive",
      });
    }
  };
  
  const handleQuizSubmit = async (score: number, totalQuestions: number) => {
    if (!user || !selectedCourse) return;
    
    try {
      // Calculate the percentage score
      const percentScore = Math.round((score / totalQuestions) * 100);
      
      // Create mock quiz results
      const courseQuestions = mcqQuestions[selectedCourse.id];
      if (!courseQuestions) return;
      
      // Create random results for demonstration purposes
      const mockResults: AssessmentResult = {
        id: `quiz-${selectedCourse.id}-${Date.now()}`,
        title: `${selectedCourse.title} Quiz`,
        totalQuestions: courseQuestions.length,
        correctAnswers: score,
        completedAt: new Date().toISOString(),
        score: percentScore,
        questions: courseQuestions.map((q, idx) => {
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
      
      setQuizResults(mockResults);
      setIsQuizCompleted(true);
      
      // Update user achievements
      try {
        const { data: achievements } = await supabase
          .from('user_achievements')
          .select('*')
          .eq('user_id', user.id)
          .single();
          
        if (achievements) {
          // Update existing record with points and completed assessment
          await supabase
            .from('user_achievements')
            .update({
              points: achievements.points + (percentScore > 70 ? 100 : 50),
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
              points: percentScore > 70 ? 100 : 50,
              completed_courses: 0,
              completed_assessments: 1,
              last_activity: new Date().toISOString()
            });
        }
        
        toast({
          title: "Assessment completed",
          description: `You scored ${percentScore}% on this assessment`,
        });
      } catch (achievementError) {
        console.error('Error updating achievements:', achievementError);
      }
    } catch (error) {
      console.error('Error saving quiz results:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
        <p className="text-gray-500">
          {userType === "student"
            ? "Access your enrolled courses and explore available courses."
            : "Manage your courses and create new educational content."}
        </p>

        <Tabs defaultValue={selectedCourseId ? "course-details" : "enrolled"} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger 
              value="enrolled"
              onClick={() => setSelectedCourseId(null)}
            >
              My Courses
            </TabsTrigger>
            <TabsTrigger 
              value="available"
              onClick={() => setSelectedCourseId(null)}
            >
              Available Courses
            </TabsTrigger>
            {userType !== "student" && (
              <TabsTrigger 
                value="manage"
                onClick={() => setSelectedCourseId(null)}
              >
                Manage Courses
              </TabsTrigger>
            )}
            {selectedCourseId && (
              <TabsTrigger value="course-details">
                {selectedCourse?.title}
              </TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="enrolled">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-edu-blue"></div>
              </div>
            ) : enrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className={`h-2 bg-gradient-to-r ${course.color}`}></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center mb-2">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-r ${course.color}`}>
                          <course.icon className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-sm text-gray-500">{course.modules} modules</span>
                      </div>
                      <CardTitle>{course.title}</CardTitle>
                      <CardDescription className="text-gray-600">
                        Instructor: {course.instructor}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 text-sm mb-4">{course.description}</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full bg-edu-blue hover:bg-edu-blue-dark"
                        onClick={() => {
                          setSelectedCourseId(course.id);
                          setActiveTab("overview");
                          setIsQuizCompleted(false);
                        }}
                      >
                        Continue Learning
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">No courses enrolled</h3>
                <p className="text-gray-500 mb-4">
                  You haven't enrolled in any courses yet. Browse available courses to get started.
                </p>
                <Button 
                  className="bg-edu-blue hover:bg-edu-blue-dark"
                  onClick={() => {
                    const tabElements = document.querySelectorAll('[role="tab"]');
                    const availableTab = Array.from(tabElements).find(
                      (tab) => tab.getAttribute('data-value') === 'available' ||
                              tab.getAttribute('value') === 'available'
                    );
                    if (availableTab instanceof HTMLElement) {
                      availableTab.click();
                    }
                  }}
                >
                  Browse Courses
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="available">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className={`h-2 bg-gradient-to-r ${course.color}`}></div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center mb-2">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-r ${course.color}`}>
                        <course.icon className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-sm text-gray-500">{course.modules} modules</span>
                    </div>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      Instructor: {course.instructor}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 text-sm mb-4">{course.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-edu-blue/10 text-edu-blue px-2 py-1 rounded-full">
                        Beginner
                      </span>
                      <span className="text-xs bg-edu-purple/10 text-edu-purple px-2 py-1 rounded-full">
                        Self-paced
                      </span>
                      <span className="text-xs bg-edu-blue-light/10 text-edu-blue-light px-2 py-1 rounded-full">
                        Online
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-edu-blue hover:bg-edu-blue-dark"
                      onClick={() => handleEnrollNow(course.id)}
                    >
                      Enroll Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {userType !== "student" && (
            <TabsContent value="manage">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Management</CardTitle>
                    <CardDescription>
                      Create and manage courses for your students.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="bg-edu-blue hover:bg-edu-blue-dark">
                      Create New Course
                    </Button>
                    
                    <div className="border rounded-lg p-4 mt-4">
                      <h3 className="font-medium mb-4">Your Created Courses</h3>
                      <p className="text-gray-500">
                        Start creating courses to see them listed here.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Resource Library</CardTitle>
                    <CardDescription>
                      Manage learning materials for your courses.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center space-x-2">
                            <Film className="h-5 w-5 text-edu-blue" />
                            <CardTitle className="text-lg">Video Lectures</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600">
                            Manage recorded lectures and video content.
                          </p>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">Manage</Button>
                        </CardFooter>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-5 w-5 text-edu-purple" />
                            <CardTitle className="text-lg">Documents</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600">
                            Manage PDFs, slides, and reading materials.
                          </p>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">Manage</Button>
                        </CardFooter>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center space-x-2">
                            <BookOpen className="h-5 w-5 text-edu-blue-light" />
                            <CardTitle className="text-lg">Quizzes</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600">
                            Create and manage assessments and quizzes.
                          </p>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">Manage</Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}
          
          {/* New course details tab */}
          <TabsContent value="course-details">
            {selectedCourse && (
              <div className="space-y-6">
                <Card>
                  <CardHeader className={`bg-gradient-to-r ${selectedCourse.color} text-white`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl">{selectedCourse.title}</CardTitle>
                        <CardDescription className="text-white/80 mt-1">
                          Instructor: {selectedCourse.instructor}
                        </CardDescription>
                      </div>
                      <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
                        {selectedCourse.progress}% Complete
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
                      <TabsList className="mb-6">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="video">Video Lectures</TabsTrigger>
                        <TabsTrigger value="assignments">Assignments</TabsTrigger>
                      </TabsList>

                      <TabsContent value="overview" className="space-y-6">
                        <div>
                          <h3 className="text-xl font-medium mb-2">Course Description</h3>
                          <p className="text-gray-600">{selectedCourse.description}</p>
                        </div>

                        <div>
                          <h3 className="text-xl font-medium mb-2">What You'll Learn</h3>
                          <ul className="list-disc pl-5 space-y-1 text-gray-600">
                            {selectedCourse.id === "1" && (
                              <>
                                <li>Understand machine learning foundations and algorithms</li>
                                <li>Implement supervised and unsupervised learning techniques</li>
                                <li>Apply neural networks and deep learning concepts</li>
                                <li>Evaluate and optimize model performance</li>
                                <li>Work with real-world datasets and problems</li>
                              </>
                            )}
                            {selectedCourse.id === "2" && (
                              <>
                                <li>Master advanced calculus concepts and theorems</li>
                                <li>Solve complex integration and differentiation problems</li>
                                <li>Apply multivariable calculus techniques</li>
                                <li>Understand series, sequences and convergence</li>
                                <li>Use calculus in real-world applications</li>
                              </>
                            )}
                            {selectedCourse.id === "3" && (
                              <>
                                <li>Analyze key events of the 20th and 21st centuries</li>
                                <li>Evaluate the causes and effects of major global conflicts</li>
                                <li>Understand political, social, and economic developments</li>
                                <li>Examine technological innovations and cultural movements</li>
                                <li>Develop critical thinking skills through historical analysis</li>
                              </>
                            )}
                          </ul>
                        </div>

                        <div className="flex justify-end">
                          <Button 
                            className="bg-edu-blue hover:bg-edu-blue-dark"
                            onClick={() => setActiveTab("video")}
                          >
                            Start Learning
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="video" className="space-y-6">
                        {selectedCourse.videoId ? (
                          <VideoEmbed 
                            videoId={selectedCourse.videoId} 
                            title={`${selectedCourse.title} - Introduction`}
                            courseId={selectedCourse.id}
                          />
                        ) : (
                          <div className="text-center py-10">
                            <Film className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium mb-2">No videos available</h3>
                            <p className="text-gray-500">
                              Video content for this course is coming soon.
                            </p>
                          </div>
                        )}

                        <div className="flex justify-between">
                          <Button 
                            variant="outline"
                            onClick={() => setActiveTab("overview")}
                          >
                            Back to Overview
                          </Button>
                          <Button 
                            className="bg-edu-blue hover:bg-edu-blue-dark"
                            onClick={() => setActiveTab("assignments")}
                          >
                            Take Quiz
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="assignments" className="space-y-6">
                        {isQuizCompleted && quizResults ? (
                          <ViewAssessmentResults 
                            result={quizResults} 
                            onClose={() => {
                              setIsQuizCompleted(false);
                              setQuizResults(null);
                            }} 
                          />
                        ) : mcqQuestions[selectedCourse.id] ? (
                          <MCQuiz
                            title={`${selectedCourse.title} - Knowledge Check`}
                            description="Complete this quiz to test your understanding of the video lecture"
                            questions={mcqQuestions[selectedCourse.id]}
                            onQuizSubmit={handleQuizSubmit}
                          />
                        ) : (
                          <div className="text-center py-10">
                            <ListChecks className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium mb-2">No assignments available</h3>
                            <p className="text-gray-500">
                              Assignments for this course are coming soon.
                            </p>
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
                
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center">
                    <Trophy className="h-5 w-5 text-edu-blue mr-2" />
                    <span className="font-medium">Complete this course to earn achievement badges and points!</span>
                  </div>
                  <Button 
                    variant="outline"
                    onClick={() => navigate("/leaderboard")}
                    className="flex items-center"
                  >
                    <Award className="h-4 w-4 mr-1" />
                    View Leaderboard
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Courses;
