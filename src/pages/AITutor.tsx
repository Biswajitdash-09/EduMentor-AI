
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import BackButton from "@/components/common/BackButton";
import AIChatInterface from "@/components/AIChatInterface";
import PersonalizedAITutor from "@/components/ai/PersonalizedAITutor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Brain, BookOpen, HelpCircle } from "lucide-react";

const AITutor = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <BackButton />
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Tutor</h1>
            <p className="text-gray-500">Get personalized help and guidance from our AI-powered tutoring system</p>
          </div>
        </div>

        <Tabs defaultValue="personalized" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="personalized" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Personalized Tutor
            </TabsTrigger>
            <TabsTrigger value="general" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              General Chat
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personalized">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-edu-blue" />
                  Personalized AI Tutor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PersonalizedAITutor />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-edu-blue" />
                  EduMentor AI Assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AIChatInterface />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Help Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 mx-auto mb-3 text-edu-blue" />
              <h3 className="font-semibold mb-2">Study Help</h3>
              <p className="text-sm text-gray-600">Get help with your coursework and assignments</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <HelpCircle className="h-8 w-8 mx-auto mb-3 text-edu-purple" />
              <h3 className="font-semibold mb-2">Concept Clarification</h3>
              <p className="text-sm text-gray-600">Understand difficult concepts with personalized explanations</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Brain className="h-8 w-8 mx-auto mb-3 text-edu-blue-light" />
              <h3 className="font-semibold mb-2">Practice Problems</h3>
              <p className="text-sm text-gray-600">Get additional practice problems and solutions</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AITutor;
