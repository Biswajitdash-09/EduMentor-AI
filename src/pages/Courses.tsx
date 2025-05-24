import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Film, FileText, BookUser, ListChecks, LucideIcon, Trophy, Award, Clock, Play, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import VideoEmbed from "@/components/VideoEmbed";
import MCQuiz from "@/components/MCQuiz";
import { MCQuestion } from "@/components/MCQuiz";
import { supabase } from "@/integrations/supabase/client";
import ViewAssessmentResults, { AssessmentResult } from "@/components/ViewAssessmentResults";
import { allCourses, getEnrolledCourses, getAvailableCourses, getCourseById, Course, VideoLecture } from "@/data/coursesData";

// Sample MCQ questions for each course - keeping the existing ones and adding more
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
  ],
  "4": [
    {
      id: "cs-q1",
      question: "What is the time complexity of binary search?",
      options: [
        "O(n)",
        "O(log n)",
        "O(n²)",
        "O(1)"
      ],
      correctAnswerIndex: 1
    },
    {
      id: "cs-q2",
      question: "Which data structure follows LIFO principle?",
      options: [
        "Queue",
        "Array",
        "Stack",
        "Linked List"
      ],
      correctAnswerIndex: 2
    }
  ],
  "5": [
    {
      id: "chem-q1",
      question: "What is the general formula for alkanes?",
      options: [
        "CnH2n",
        "CnH2n+2",
        "CnH2n-2",
        "CnHn"
      ],
      correctAnswerIndex: 1
    },
    {
      id: "chem-q2",
      question: "Which functional group characterizes alcohols?",
      options: [
        "-COOH",
        "-OH",
        "-NH2",
        "-CHO"
      ],
      correctAnswerIndex: 1
    }
  ]
};

const Courses = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "video" | "assignments">("overview");
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);
  const [quizResults, setQuizResults] = useState<AssessmentResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const userType = profile?.user_type || "student";

  const selectedCourse = selectedCourseId ? getCourseById(selectedCourseId) : null;
  const availableCourses = getAvailableCourses(enrolledCourses.map(c => c.id));
  
  useEffect(() => {
    // Initialize with default courses but check for any enrolled courses in Supabase
    if (user) {
      fetchEnrolledCourses();
    } else {
      // For demo, show first 3 courses as enrolled
      setEnrolledCourses(allCourses.slice(0, 3));
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
        // User has enrollments, get those courses
        const userCourseIds = enrollmentsData.map(enrollment => enrollment.course_id);
        const userCourses = getEnrolledCourses(userCourseIds);
        setEnrolledCourses(userCourses.length > 0 ? userCourses : allCourses.slice(0, 3));
      } else {
        // No enrollments yet, use default courses for demo
        setEnrolledCourses(allCourses.slice(0, 3));
      }
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
      setEnrolledCourses(allCourses.slice(0, 3));
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
          const courseToAdd = getCourseById(courseId);
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
      
      // Find the course from all courses
      const enrolledCourse = getCourseById(courseId);
      
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
                        <div className="text-right">
                          <Badge variant="outline" className="text-xs">{course.difficulty}</Badge>
                          <p className="text-xs text-gray-500 mt-1">{course.estimatedHours}h</p>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription className="text-gray-600">
                        {course.instructor} • {course.videoLectures.length} lectures
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
                          setSelectedVideoIndex(0);
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
                      <div className="text-right">
                        <Badge variant="outline" className="text-xs">{course.difficulty}</Badge>
                        <p className="text-xs text-gray-500 mt-1">{course.estimatedHours}h</p>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {course.instructor} • {course.videoLectures.length} lectures
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 text-sm mb-4">{course.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="text-xs">{course.category}</Badge>
                      <Badge variant="secondary" className="text-xs">{course.difficulty}</Badge>
                      <Badge variant="outline" className="text-xs">Online</Badge>
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
          
          {/* New course details tab with video lecture list */}
          <TabsContent value="course-details">
            {selectedCourse && (
              <div className="space-y-6">
                <Card>
                  <CardHeader className={`bg-gradient-to-r ${selectedCourse.color} text-white`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl">{selectedCourse.title}</CardTitle>
                        <CardDescription className="text-white/80 mt-1">
                          {selectedCourse.instructor} • {selectedCourse.videoLectures.length} lectures • {selectedCourse.estimatedHours} hours
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
                            {selectedCourse.id === "4" && (
                              <>
                                <li>Understand the time complexity of binary search</li>
                                <li>Learn about different data structures and their properties</li>
                              </>
                            )}
                            {selectedCourse.id === "5" && (
                              <>
                                <li>Study the general formula for alkanes</li>
                                <li>Understand the functional groups of alcohols</li>
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
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {/* Video Player */}
                          <div className="lg:col-span-2">
                            {selectedCourse.videoLectures[selectedVideoIndex] ? (
                              <VideoEmbed 
                                videoId={selectedCourse.videoLectures[selectedVideoIndex].videoId} 
                                title={selectedCourse.videoLectures[selectedVideoIndex].title}
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
                          </div>

                          {/* Video Playlist */}
                          <div className="space-y-2">
                            <h3 className="font-semibold mb-4">Course Content</h3>
                            <div className="space-y-2 max-h-96 overflow-y-auto">
                              {selectedCourse.videoLectures.map((lecture, index) => (
                                <Card 
                                  key={lecture.id} 
                                  className={`cursor-pointer transition-colors ${
                                    selectedVideoIndex === index ? 'bg-edu-blue/10 border-edu-blue' : 'hover:bg-gray-50'
                                  }`}
                                  onClick={() => setSelectedVideoIndex(index)}
                                >
                                  <CardContent className="p-3">
                                    <div className="flex items-start gap-3">
                                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                                        selectedVideoIndex === index ? 'bg-edu-blue text-white' : 'bg-gray-200'
                                      }`}>
                                        {index < selectedVideoIndex ? <CheckCircle className="h-4 w-4" /> : index + 1}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-sm leading-tight">{lecture.title}</h4>
                                        <p className="text-xs text-gray-600 mt-1">{lecture.description}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                          <Clock className="h-3 w-3 text-gray-400" />
                                          <span className="text-xs text-gray-500">{lecture.duration}</span>
                                        </div>
                                      </div>
                                      {selectedVideoIndex === index && (
                                        <Play className="h-4 w-4 text-edu-blue" />
                                      )}
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <Button 
                            variant="outline"
                            onClick={() => setActiveTab("overview")}
                          >
                            Back to Overview
                          </Button>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline"
                              disabled={selectedVideoIndex === 0}
                              onClick={() => setSelectedVideoIndex(Math.max(0, selectedVideoIndex - 1))}
                            >
                              Previous Lecture
                            </Button>
                            <Button 
                              variant="outline"
                              disabled={selectedVideoIndex === selectedCourse.videoLectures.length - 1}
                              onClick={() => setSelectedVideoIndex(Math.min(selectedCourse.videoLectures.length - 1, selectedVideoIndex + 1))}
                            >
                              Next Lecture
                            </Button>
                            <Button 
                              className="bg-edu-blue hover:bg-edu-blue-dark"
                              onClick={() => setActiveTab("assignments")}
                            >
                              Take Quiz
                            </Button>
                          </div>
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

          {userType !== "student" && (
            <TabsContent value="manage">
              <div>
                <h2>Manage Courses</h2>
                <p>This section is under development and will allow faculty and admins to manage courses.</p>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Courses;
