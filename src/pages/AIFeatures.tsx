
import React from 'react';
import DashboardLayout from "@/components/DashboardLayout";
import PersonalizedAITutor from "@/components/ai/PersonalizedAITutor";
import AutomatedAssessment from "@/components/ai/AutomatedAssessment";
import StudentRiskPrediction from "@/components/ai/StudentRiskPrediction";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, FileText, AlertTriangle, Sparkles } from 'lucide-react';

const AIFeatures = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight flex items-center justify-center gap-2">
            <Sparkles className="h-8 w-8 text-edu-blue" />
            AI-Powered Learning Suite
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Experience the future of education with our comprehensive AI tools designed to enhance learning, 
            automate assessments, and provide intelligent insights for educators and students.
          </p>
        </div>

        <Tabs defaultValue="tutor" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tutor" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI Tutor
            </TabsTrigger>
            <TabsTrigger value="assessment" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Auto Assessment
            </TabsTrigger>
            <TabsTrigger value="prediction" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Risk Prediction
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tutor" className="mt-6">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-edu-blue" />
                  Personalized AI Tutor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Get instant, personalized help with an AI tutor that adapts to your learning style and pace. 
                  Ask questions, get explanations, and receive customized study recommendations.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Real-time doubt resolution</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Adaptive learning styles</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Personalized recommendations</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <PersonalizedAITutor />
          </TabsContent>

          <TabsContent value="assessment" className="mt-6">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-edu-blue" />
                  Automated Assessment Tool
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Automatically generate, administer, and grade assessments using AI. Create custom quizzes, 
                  track student performance, and get detailed analytics on learning outcomes.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>AI question generation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Automatic grading</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Performance analytics</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <AutomatedAssessment />
          </TabsContent>

          <TabsContent value="prediction" className="mt-6">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-edu-blue" />
                  Student Risk Prediction System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Identify at-risk students early using AI analysis of academic and behavioral data. 
                  Get actionable insights and intervention recommendations to improve student outcomes.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Early risk detection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Intervention suggestions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Predictive analytics</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <StudentRiskPrediction />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AIFeatures;
