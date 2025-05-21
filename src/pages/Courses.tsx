import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Film, FileText, BookUser, ListChecks, LucideIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import VideoEmbed from "@/components/VideoEmbed";
import MCQuiz from "@/components/MCQuiz";
import { MCQuestion } from "@/components/MCQuiz";

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
    videoId: "Mii5FdTzqjs" // Modern history video
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
  const { profile } = useAuth();
  const [enrolledCourses] = useState<Course[]>(dummyCourses);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "video" | "assignments">("overview");
  const userType = profile?.user_type || "student";

  const selectedCourse = enrolledCourses.find(course => course.id === selectedCourseId);

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
            {enrolledCourses.length > 0 ? (
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
                <Button className="bg-edu-blue hover:bg-edu-blue-dark">
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
                    <Button className="w-full bg-edu-blue hover:bg-edu-blue-dark">
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
                        {mcqQuestions[selectedCourse.id] ? (
                          <MCQuiz
                            title={`${selectedCourse.title} - Knowledge Check`}
                            description="Complete this quiz to test your understanding of the video lecture"
                            questions={mcqQuestions[selectedCourse.id]}
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
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Courses;
