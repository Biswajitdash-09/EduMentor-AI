
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Film, FileText, BookUser, LucideIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

type Course = {
  id: string;
  title: string;
  description: string;
  instructor: string;
  progress: number;
  icon: LucideIcon;
  color: string;
  modules: number;
};

const dummyCourses: Course[] = [
  {
    id: "1",
    title: "Introduction to Machine Learning",
    description: "Learn the fundamentals of machine learning and AI algorithms.",
    instructor: "Dr. Sarah Johnson",
    progress: 65,
    icon: BookUser,
    color: "from-edu-blue to-edu-blue-light",
    modules: 12
  },
  {
    id: "2",
    title: "Advanced Calculus",
    description: "Master calculus concepts with practical applications.",
    instructor: "Prof. Michael Chen",
    progress: 30,
    icon: BookOpen,
    color: "from-edu-purple to-edu-purple-light",
    modules: 10
  },
  {
    id: "3",
    title: "World History: Modern Era",
    description: "Explore significant events and figures from 1900 to present.",
    instructor: "Dr. Emily Rodriguez",
    progress: 80,
    icon: BookUser,
    color: "from-edu-blue-light to-edu-purple",
    modules: 8
  }
];

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
  const userType = profile?.user_type || "student";

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
        <p className="text-gray-500">
          {userType === "student"
            ? "Access your enrolled courses and explore available courses."
            : "Manage your courses and create new educational content."}
        </p>

        <Tabs defaultValue="enrolled" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="enrolled">My Courses</TabsTrigger>
            <TabsTrigger value="available">Available Courses</TabsTrigger>
            {userType !== "student" && (
              <TabsTrigger value="manage">Manage Courses</TabsTrigger>
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
                      <Button className="w-full bg-edu-blue hover:bg-edu-blue-dark">
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
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Courses;
