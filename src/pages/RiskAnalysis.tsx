
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { AlertTriangle, TrendingDown, TrendingUp, Activity, AlertCircle, CheckCircle2, User, Users } from "lucide-react";

const RiskAnalysis = () => {
  const { profile } = useAuth();
  
  // Sample data for risk factors
  const riskFactors = {
    attendance: 75,
    assessmentCompletion: 60,
    gradeAverage: 68,
    participationRate: 45,
    lastActiveDate: "2 days ago",
    courseProgress: 65
  };
  
  const getIndicatorClass = (value: number) => {
    if (value >= 80) return "bg-green-500";
    if (value >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  // Faculty view - sample students
  const studentsAtRisk = [
    { id: 1, name: "John Smith", riskScore: 7.8, riskLevel: "high", lastActive: "5 days ago" },
    { id: 2, name: "Maria Garcia", riskScore: 6.5, riskLevel: "medium", lastActive: "3 days ago" },
    { id: 3, name: "Raj Patel", riskScore: 8.2, riskLevel: "high", lastActive: "1 week ago" }
  ];

  // Classification of students by risk level
  const riskSummary = {
    high: 8,
    medium: 15,
    low: 42
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Risk Analysis</h1>
        <p className="text-gray-500">
          {profile?.user_type === "faculty" 
            ? "Identify at-risk students and implement early interventions."
            : "View your academic risk factors and recommended actions."}
        </p>

        {profile?.user_type === "faculty" ? (
          // Faculty view
          <div className="space-y-6">
            {/* Risk Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-red-100 rounded-full">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    </div>
                    <CardTitle>High Risk</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-4xl font-bold">{riskSummary.high}</p>
                      <p className="text-gray-500">Students</p>
                    </div>
                    <div className="text-right">
                      <p className="flex items-center text-red-600">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        +2 since last week
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-amber-100 rounded-full">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                    </div>
                    <CardTitle>Medium Risk</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-4xl font-bold">{riskSummary.medium}</p>
                      <p className="text-gray-500">Students</p>
                    </div>
                    <div className="text-right">
                      <p className="flex items-center text-amber-600">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        +3 since last week
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-green-100 rounded-full">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                    <CardTitle>Low Risk</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-4xl font-bold">{riskSummary.low}</p>
                      <p className="text-gray-500">Students</p>
                    </div>
                    <div className="text-right">
                      <p className="flex items-center text-green-600">
                        <TrendingDown className="h-4 w-4 mr-1" />
                        -5 since last week
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Students at high risk */}
            <Card>
              <CardHeader>
                <CardTitle>Students at High Risk</CardTitle>
                <CardDescription>
                  Students who may need immediate intervention based on our AI analysis.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-3 text-left">Student</th>
                        <th className="px-4 py-3 text-left">Risk Score</th>
                        <th className="px-4 py-3 text-left">Risk Level</th>
                        <th className="px-4 py-3 text-left">Last Active</th>
                        <th className="px-4 py-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentsAtRisk.map(student => (
                        <tr key={student.id} className="border-b">
                          <td className="px-4 py-3">{student.name}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center space-x-2">
                              <span>{student.riskScore}/10</span>
                              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${
                                    student.riskLevel === 'high' ? 'bg-red-500' : 
                                    student.riskLevel === 'medium' ? 'bg-amber-500' : 'bg-green-500'
                                  }`} 
                                  style={{ width: `${student.riskScore * 10}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              student.riskLevel === 'high' ? 'bg-red-100 text-red-800' : 
                              student.riskLevel === 'medium' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {student.riskLevel.charAt(0).toUpperCase() + student.riskLevel.slice(1)}
                            </span>
                          </td>
                          <td className="px-4 py-3">{student.lastActive}</td>
                          <td className="px-4 py-3">
                            <Button size="sm" className="bg-edu-blue hover:bg-edu-blue-dark">View Details</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline">View All At-Risk Students</Button>
                </div>
              </CardContent>
            </Card>

            {/* Risk Intervention Tools */}
            <Card>
              <CardHeader>
                <CardTitle>Intervention Tools</CardTitle>
                <CardDescription>
                  Resources to help students improve their academic performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center space-x-2">
                        <User className="h-5 w-5 text-edu-blue" />
                        <CardTitle className="text-lg">1:1 Sessions</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-600">
                      Schedule personal meetings with students to address specific concerns.
                    </CardContent>
                    <CardContent className="pt-0">
                      <Button variant="outline" className="w-full">Schedule</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-edu-purple" />
                        <CardTitle className="text-lg">Group Support</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-600">
                      Create study groups or additional review sessions for struggling students.
                    </CardContent>
                    <CardContent className="pt-0">
                      <Button variant="outline" className="w-full">Create Group</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center space-x-2">
                        <Activity className="h-5 w-5 text-edu-blue-light" />
                        <CardTitle className="text-lg">Resource Assignment</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-600">
                      Assign additional learning resources targeted to specific knowledge gaps.
                    </CardContent>
                    <CardContent className="pt-0">
                      <Button variant="outline" className="w-full">Assign Resources</Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Student view
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Your Academic Risk Status</CardTitle>
                  <div className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                    Medium Risk
                  </div>
                </div>
                <CardDescription>
                  Based on AI analysis of your academic performance and engagement.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between">
                      <p>Overall Risk Score</p>
                      <p>6.5/10</p>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Attendance</span>
                        <span>{riskFactors.attendance}%</span>
                      </div>
                      <Progress value={riskFactors.attendance} className="h-2" indicatorClassName={getIndicatorClass(riskFactors.attendance)} />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Assessment Completion</span>
                        <span>{riskFactors.assessmentCompletion}%</span>
                      </div>
                      <Progress value={riskFactors.assessmentCompletion} className="h-2" indicatorClassName={getIndicatorClass(riskFactors.assessmentCompletion)} />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Grade Average</span>
                        <span>{riskFactors.gradeAverage}%</span>
                      </div>
                      <Progress value={riskFactors.gradeAverage} className="h-2" indicatorClassName={getIndicatorClass(riskFactors.gradeAverage)} />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Participation Rate</span>
                        <span>{riskFactors.participationRate}%</span>
                      </div>
                      <Progress value={riskFactors.participationRate} className="h-2" indicatorClassName={getIndicatorClass(riskFactors.participationRate)} />
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row justify-between gap-4 p-4 bg-gray-50 rounded-lg mt-6">
                    <div>
                      <p className="font-medium mb-1">Last Active</p>
                      <p className="text-gray-600">{riskFactors.lastActiveDate}</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Course Progress</p>
                      <p className="text-gray-600">{riskFactors.courseProgress}% complete</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Risk Trend</p>
                      <p className="text-amber-600 flex items-center">
                        <Activity className="h-4 w-4 mr-1" /> Stable
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Actions</CardTitle>
                <CardDescription>
                  Steps you can take to improve your academic performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium flex items-center text-amber-700 mb-2">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Attendance Improvement
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Your attendance is below the recommended level. Regular attendance is strongly 
                      correlated with academic success.
                    </p>
                    <div className="bg-amber-50 p-3 rounded-md text-sm">
                      <p className="font-medium text-amber-800 mb-2">Recommendation:</p>
                      <p className="text-amber-700">
                        Try to attend all scheduled classes for the next two weeks. If you're facing 
                        difficulties attending, reach out to your instructor to discuss alternatives.
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium flex items-center text-red-700 mb-2">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Assessment Completion
                    </h3>
                    <p className="text-gray-700 mb-4">
                      You have several incomplete assessments that are affecting your overall performance.
                    </p>
                    <div className="bg-red-50 p-3 rounded-md text-sm">
                      <p className="font-medium text-red-800 mb-2">Recommendation:</p>
                      <p className="text-red-700">
                        Complete your pending assessments as soon as possible. Consider creating a 
                        schedule to work through them systematically.
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium flex items-center text-edu-blue mb-2">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      AI Tutor Usage
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Students who regularly use the AI Tutor show significant improvements in understanding 
                      difficult concepts.
                    </p>
                    <div className="bg-blue-50 p-3 rounded-md text-sm">
                      <p className="font-medium text-edu-blue mb-2">Recommendation:</p>
                      <p className="text-edu-blue">
                        Schedule at least 30 minutes per day with the AI Tutor to review concepts from 
                        your recent classes and ask questions about difficult topics.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button className="w-full bg-edu-blue hover:bg-edu-blue-dark">
                    Get Personalized Study Plan
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Connect with Support</CardTitle>
                <CardDescription>
                  Resources available to help you improve your academic performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">AI Tutor</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-600">
                      Get personalized help with challenging concepts and assignments.
                    </CardContent>
                    <CardContent className="pt-0">
                      <Button className="w-full bg-edu-blue hover:bg-edu-blue-dark">Chat Now</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Faculty Support</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-600">
                      Schedule a meeting with your instructor to discuss your progress.
                    </CardContent>
                    <CardContent className="pt-0">
                      <Button variant="outline" className="w-full">Request Meeting</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Study Groups</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-600">
                      Join peer study groups for collaborative learning and support.
                    </CardContent>
                    <CardContent className="pt-0">
                      <Button variant="outline" className="w-full">Find Groups</Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default RiskAnalysis;
