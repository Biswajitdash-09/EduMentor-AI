
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { ListChecks, CheckCircle2, Clock, AlertTriangle, Calendar } from "lucide-react";

type Assessment = {
  id: string;
  title: string;
  course: string;
  dueDate?: string;
  completedDate?: string;
  status: 'pending' | 'completed' | 'overdue';
  score?: number;
  totalQuestions: number;
};

const sampleAssessments: Assessment[] = [
  {
    id: "1",
    title: "Machine Learning Fundamentals",
    course: "Introduction to Machine Learning",
    dueDate: "2025-05-25T23:59:59",
    status: "pending",
    totalQuestions: 15,
  },
  {
    id: "2",
    title: "Calculus Mid-Term",
    course: "Advanced Calculus",
    completedDate: "2025-05-15T14:30:00",
    status: "completed",
    score: 85,
    totalQuestions: 20,
  },
  {
    id: "3",
    title: "World War II Quiz",
    course: "World History: Modern Era",
    dueDate: "2025-05-10T23:59:59",
    status: "overdue",
    totalQuestions: 10,
  }
];

const Assessments = () => {
  const { profile } = useAuth();
  const [assessments] = useState<Assessment[]>(sampleAssessments);
  const userType = profile?.user_type || "student";
  
  const pendingAssessments = assessments.filter(a => a.status === "pending");
  const completedAssessments = assessments.filter(a => a.status === "completed");
  const overdueAssessments = assessments.filter(a => a.status === "overdue");

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const renderStatusBadge = (status: Assessment['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="border-amber-500 text-amber-500 flex items-center gap-1"><Clock className="h-3 w-3" /> Pending</Badge>;
      case 'completed':
        return <Badge variant="outline" className="border-green-500 text-green-500 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Completed</Badge>;
      case 'overdue':
        return <Badge variant="outline" className="border-red-500 text-red-500 flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Overdue</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Assessments</h1>
        <p className="text-gray-500">
          {userType === "student"
            ? "Take quizzes and tests, and view your assessment scores."
            : "Create and manage assessments for your students."}
        </p>

        {userType === "student" ? (
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="pending">Pending ({pendingAssessments.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completedAssessments.length})</TabsTrigger>
              <TabsTrigger value="overdue">Overdue ({overdueAssessments.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="pending">
              {pendingAssessments.length > 0 ? (
                <div className="space-y-4">
                  {pendingAssessments.map((assessment) => (
                    <Card key={assessment.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle>{assessment.title}</CardTitle>
                          {renderStatusBadge(assessment.status)}
                        </div>
                        <CardDescription>
                          Course: {assessment.course}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <ListChecks className="h-4 w-4" />
                            <span>{assessment.totalQuestions} Questions</span>
                          </div>
                          {assessment.dueDate && (
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>Due: {formatDate(assessment.dueDate)}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-edu-blue hover:bg-edu-blue-dark">
                          Start Assessment
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <CheckCircle2 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No pending assessments</h3>
                  <p className="text-gray-500">
                    You're all caught up! Check back later for new assessments.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="completed">
              {completedAssessments.length > 0 ? (
                <div className="space-y-4">
                  {completedAssessments.map((assessment) => (
                    <Card key={assessment.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle>{assessment.title}</CardTitle>
                          {renderStatusBadge(assessment.status)}
                        </div>
                        <CardDescription>
                          Course: {assessment.course}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col space-y-4">
                          <div className="flex justify-between items-center text-sm text-gray-600">
                            {assessment.completedDate && (
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>Submitted: {formatDate(assessment.completedDate)}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <ListChecks className="h-4 w-4" />
                              <span>{assessment.totalQuestions} Questions</span>
                            </div>
                          </div>
                          
                          {assessment.score !== undefined && (
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Score</span>
                                <span>{assessment.score}%</span>
                              </div>
                              <Progress 
                                value={assessment.score} 
                                className="h-2"
                                indicatorColor={
                                  assessment.score >= 80 ? "bg-green-500" : 
                                  assessment.score >= 60 ? "bg-amber-500" : "bg-red-500"
                                }
                              />
                            </div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          View Results
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <ListChecks className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No completed assessments</h3>
                  <p className="text-gray-500">
                    Start taking assessments to see your results here.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="overdue">
              {overdueAssessments.length > 0 ? (
                <div className="space-y-4">
                  {overdueAssessments.map((assessment) => (
                    <Card key={assessment.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle>{assessment.title}</CardTitle>
                          {renderStatusBadge(assessment.status)}
                        </div>
                        <CardDescription>
                          Course: {assessment.course}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <ListChecks className="h-4 w-4" />
                            <span>{assessment.totalQuestions} Questions</span>
                          </div>
                          {assessment.dueDate && (
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-red-500" />
                              <span className="text-red-500">Due: {formatDate(assessment.dueDate)}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col sm:flex-row gap-2">
                        <Button 
                          className="w-full sm:w-auto bg-edu-blue hover:bg-edu-blue-dark"
                        >
                          Take Late Submission
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full sm:w-auto"
                        >
                          Request Extension
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <CheckCircle2 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No overdue assessments</h3>
                  <p className="text-gray-500">
                    Great job staying on top of your work!
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        ) : (
          // Faculty view
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Assessment</CardTitle>
                <CardDescription>
                  Design new quizzes, tests and assignments for your courses.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">New Quiz</CardTitle>
                      <CardDescription>
                        Short assessment with multiple choice questions
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button className="w-full bg-edu-blue hover:bg-edu-blue-dark">
                        Create Quiz
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">New Test</CardTitle>
                      <CardDescription>
                        Comprehensive assessment with various question types
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button className="w-full bg-edu-blue hover:bg-edu-blue-dark">
                        Create Test
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">New Assignment</CardTitle>
                      <CardDescription>
                        Project or homework with file submission
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button className="w-full bg-edu-blue hover:bg-edu-blue-dark">
                        Create Assignment
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Assessment Management</CardTitle>
                <CardDescription>
                  View, edit and grade your created assessments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <ListChecks className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No assessments created yet</h3>
                  <p className="text-gray-500 mb-4">
                    Create your first assessment to start evaluating student knowledge.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Assessments;
