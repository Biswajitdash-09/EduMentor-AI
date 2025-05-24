
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  AlertTriangle, 
  TrendingDown, 
  TrendingUp, 
  Clock, 
  Target,
  Brain,
  Users,
  BookOpen,
  MessageSquare,
  Calendar,
  CheckCircle,
  XCircle,
  Mail,
  Phone
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface StudentRiskData {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  riskScore: number;
  lastActivity: Date;
  attendance: number;
  assignmentCompletion: number;
  gradeAverage: number;
  participationScore: number;
  predictedOutcome: 'success' | 'at-risk' | 'likely-to-fail';
  riskFactors: string[];
  recommendations: string[];
  interventions: Intervention[];
  courses: string[];
}

interface Intervention {
  id: string;
  type: 'email' | 'meeting' | 'tutoring' | 'counseling';
  title: string;
  description: string;
  status: 'pending' | 'scheduled' | 'completed';
  scheduledDate?: Date;
  outcome?: string;
}

interface RiskMetrics {
  totalStudents: number;
  highRiskStudents: number;
  mediumRiskStudents: number;
  lowRiskStudents: number;
  interventionSuccessRate: number;
  earlyWarningAccuracy: number;
}

const StudentRiskPrediction = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [studentsData, setStudentsData] = useState<StudentRiskData[]>([]);
  const [metrics, setMetrics] = useState<RiskMetrics>({
    totalStudents: 0,
    highRiskStudents: 0,
    mediumRiskStudents: 0,
    lowRiskStudents: 0,
    interventionSuccessRate: 0,
    earlyWarningAccuracy: 0
  });
  const [selectedStudent, setSelectedStudent] = useState<StudentRiskData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const userType = profile?.user_type || 'student';

  // Sample data for demonstration
  useEffect(() => {
    if (userType === 'faculty' || userType === 'admin') {
      const sampleStudents: StudentRiskData[] = [
        {
          id: '1',
          name: 'Alex Johnson',
          email: 'alex.j@university.edu',
          riskLevel: 'high',
          riskScore: 78,
          lastActivity: new Date('2024-01-20'),
          attendance: 65,
          assignmentCompletion: 45,
          gradeAverage: 2.1,
          participationScore: 30,
          predictedOutcome: 'at-risk',
          riskFactors: [
            'Low assignment completion rate (45%)',
            'Poor attendance (65%)',
            'Declining grade trend',
            'Limited class participation',
            'No recent login activity'
          ],
          recommendations: [
            'Schedule immediate one-on-one meeting',
            'Provide additional tutoring support',
            'Connect with academic advisor',
            'Implement flexible deadline policy'
          ],
          interventions: [
            {
              id: '1',
              type: 'email',
              title: 'Initial Outreach',
              description: 'Check-in email sent regarding recent performance',
              status: 'completed',
              outcome: 'Student responded, agreed to meeting'
            },
            {
              id: '2',
              type: 'meeting',
              title: 'Academic Performance Review',
              description: 'One-on-one meeting to discuss challenges',
              status: 'scheduled',
              scheduledDate: new Date('2024-01-25')
            }
          ],
          courses: ['Machine Learning', 'Data Structures']
        },
        {
          id: '2',
          name: 'Sarah Chen',
          email: 'sarah.c@university.edu',
          riskLevel: 'medium',
          riskScore: 45,
          lastActivity: new Date('2024-01-22'),
          attendance: 85,
          assignmentCompletion: 70,
          gradeAverage: 2.8,
          participationScore: 75,
          predictedOutcome: 'success',
          riskFactors: [
            'Slight decline in recent assignments',
            'Missed two consecutive classes',
            'Lower quiz scores in last week'
          ],
          recommendations: [
            'Monitor closely for next two weeks',
            'Offer study group participation',
            'Provide additional practice materials'
          ],
          interventions: [
            {
              id: '3',
              type: 'email',
              title: 'Resource Sharing',
              description: 'Shared study materials and practice problems',
              status: 'completed',
              outcome: 'Student appreciated the resources'
            }
          ],
          courses: ['Calculus', 'Physics']
        },
        {
          id: '3',
          name: 'Michael Rodriguez',
          email: 'michael.r@university.edu',
          riskLevel: 'low',
          riskScore: 15,
          lastActivity: new Date('2024-01-23'),
          attendance: 95,
          assignmentCompletion: 92,
          gradeAverage: 3.7,
          participationScore: 88,
          predictedOutcome: 'success',
          riskFactors: [],
          recommendations: [
            'Continue current performance',
            'Consider leadership opportunities',
            'Peer tutoring candidate'
          ],
          interventions: [],
          courses: ['Advanced Mathematics', 'Computer Science']
        }
      ];

      setStudentsData(sampleStudents);
      
      const calculatedMetrics: RiskMetrics = {
        totalStudents: sampleStudents.length,
        highRiskStudents: sampleStudents.filter(s => s.riskLevel === 'high' || s.riskLevel === 'critical').length,
        mediumRiskStudents: sampleStudents.filter(s => s.riskLevel === 'medium').length,
        lowRiskStudents: sampleStudents.filter(s => s.riskLevel === 'low').length,
        interventionSuccessRate: 85,
        earlyWarningAccuracy: 92
      };
      
      setMetrics(calculatedMetrics);
    }
  }, [userType]);

  const runRiskAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Update risk scores (simulate new analysis)
    setStudentsData(prev => prev.map(student => ({
      ...student,
      riskScore: Math.max(0, student.riskScore + (Math.random() - 0.5) * 10)
    })));
    
    setIsAnalyzing(false);
    toast({
      title: "Analysis Complete",
      description: "Risk prediction model has been updated with latest data."
    });
  };

  const scheduleIntervention = (studentId: string, type: Intervention['type']) => {
    const student = studentsData.find(s => s.id === studentId);
    if (!student) return;

    const newIntervention: Intervention = {
      id: Date.now().toString(),
      type,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Intervention`,
      description: `Scheduled ${type} intervention for ${student.name}`,
      status: 'scheduled',
      scheduledDate: new Date(Date.now() + 24 * 60 * 60 * 1000) // Tomorrow
    };

    setStudentsData(prev => prev.map(s => 
      s.id === studentId 
        ? { ...s, interventions: [...s.interventions, newIntervention] }
        : s
    ));

    toast({
      title: "Intervention Scheduled",
      description: `${type} intervention scheduled for ${student.name}.`
    });
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical':
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'medium': return <Clock className="h-4 w-4" />;
      case 'low': return <CheckCircle className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  if (userType === 'student') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6 text-edu-blue" />
            Academic Progress Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              This feature is available to faculty and administrators only.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-edu-blue" />
              Student Risk Prediction System
            </CardTitle>
            <Button 
              onClick={runRiskAnalysis}
              disabled={isAnalyzing}
              className="bg-edu-blue hover:bg-edu-blue-dark"
            >
              {isAnalyzing ? (
                <>
                  <Brain className="h-4 w-4 mr-2 animate-pulse" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Run Analysis
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Students</p>
                    <p className="text-2xl font-bold">{metrics.totalStudents}</p>
                  </div>
                  <Users className="h-8 w-8 text-edu-blue" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">High Risk</p>
                    <p className="text-2xl font-bold text-red-600">{metrics.highRiskStudents}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Success Rate</p>
                    <p className="text-2xl font-bold text-green-600">{metrics.interventionSuccessRate}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Accuracy</p>
                    <p className="text-2xl font-bold text-blue-600">{metrics.earlyWarningAccuracy}%</p>
                  </div>
                  <Target className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="students">Student Details</TabsTrigger>
              <TabsTrigger value="interventions">Interventions</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-4">
              {/* Risk Level Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Risk Level Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Low Risk</span>
                        <span className="text-sm text-gray-600">{metrics.lowRiskStudents} students</span>
                      </div>
                      <Progress value={(metrics.lowRiskStudents / metrics.totalStudents) * 100} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Medium Risk</span>
                        <span className="text-sm text-gray-600">{metrics.mediumRiskStudents} students</span>
                      </div>
                      <Progress value={(metrics.mediumRiskStudents / metrics.totalStudents) * 100} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">High Risk</span>
                        <span className="text-sm text-gray-600">{metrics.highRiskStudents} students</span>
                      </div>
                      <Progress value={(metrics.highRiskStudents / metrics.totalStudents) * 100} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="students" className="space-y-4">
              <div className="grid gap-4">
                {studentsData.map((student) => (
                  <Card key={student.id} className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setSelectedStudent(student)}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={student.avatar} />
                            <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{student.name}</h3>
                            <p className="text-sm text-gray-600">{student.email}</p>
                            <div className="flex gap-2 mt-1">
                              {student.courses.map((course) => (
                                <Badge key={course} variant="outline" className="text-xs">
                                  {course}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <p className="text-xs text-gray-600">Risk Score</p>
                            <p className="text-sm font-bold">{student.riskScore}%</p>
                          </div>
                          
                          <Badge className={`${getRiskColor(student.riskLevel)} text-white`}>
                            {getRiskIcon(student.riskLevel)}
                            <span className="ml-1 capitalize">{student.riskLevel}</span>
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4 mt-4">
                        <div className="text-center">
                          <p className="text-xs text-gray-600">Attendance</p>
                          <p className="text-sm font-medium">{student.attendance}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-600">Assignments</p>
                          <p className="text-sm font-medium">{student.assignmentCompletion}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-600">GPA</p>
                          <p className="text-sm font-medium">{student.gradeAverage}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-600">Participation</p>
                          <p className="text-sm font-medium">{student.participationScore}%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {selectedStudent && (
                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Analysis: {selectedStudent.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Risk Factors</h4>
                        <ul className="space-y-1">
                          {selectedStudent.riskFactors.map((factor, index) => (
                            <li key={index} className="text-sm text-red-600 flex items-center gap-2">
                              <XCircle className="h-3 w-3" />
                              {factor}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Recommendations</h4>
                        <ul className="space-y-1">
                          {selectedStudent.recommendations.map((rec, index) => (
                            <li key={index} className="text-sm text-green-600 flex items-center gap-2">
                              <CheckCircle className="h-3 w-3" />
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => scheduleIntervention(selectedStudent.id, 'email')}
                        className="bg-edu-blue hover:bg-edu-blue-dark"
                      >
                        <Mail className="h-4 w-4 mr-1" />
                        Send Email
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => scheduleIntervention(selectedStudent.id, 'meeting')}
                      >
                        <Calendar className="h-4 w-4 mr-1" />
                        Schedule Meeting
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => scheduleIntervention(selectedStudent.id, 'tutoring')}
                      >
                        <BookOpen className="h-4 w-4 mr-1" />
                        Assign Tutor
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="interventions" className="space-y-4">
              {studentsData.map((student) => (
                student.interventions.length > 0 && (
                  <Card key={student.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{student.name} - Interventions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {student.interventions.map((intervention) => (
                          <div key={intervention.id} className="flex justify-between items-center p-3 border rounded-lg">
                            <div>
                              <h4 className="font-medium">{intervention.title}</h4>
                              <p className="text-sm text-gray-600">{intervention.description}</p>
                              {intervention.scheduledDate && (
                                <p className="text-xs text-gray-500">
                                  Scheduled: {intervention.scheduledDate.toLocaleDateString()}
                                </p>
                              )}
                              {intervention.outcome && (
                                <p className="text-xs text-green-600">
                                  Outcome: {intervention.outcome}
                                </p>
                              )}
                            </div>
                            <Badge 
                              variant={intervention.status === 'completed' ? 'default' : 'secondary'}
                            >
                              {intervention.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentRiskPrediction;
