
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, BookOpen, Target, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ChatInterface from './tutor/ChatInterface';
import LearningProfileSidebar from './tutor/LearningProfileSidebar';
import { Message, LearningProfile, Subject } from '@/types/tutor';

const PersonalizedAITutor = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeSubject, setActiveSubject] = useState('general');
  const [learningProfile] = useState<LearningProfile>({
    style: 'visual',
    pace: 'medium',
    strengths: ['Problem solving', 'Logical thinking'],
    weaknesses: ['Time management', 'Complex concepts'],
    interests: ['Technology', 'Science']
  });

  const subjects: Subject[] = [
    { id: 'general', name: 'General Help', icon: Brain },
    { id: 'math', name: 'Mathematics', icon: Target },
    { id: 'science', name: 'Science', icon: BookOpen },
    { id: 'programming', name: 'Programming', icon: TrendingUp },
  ];

  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        content: `Hello ${profile?.first_name || 'there'}! I'm your personalized AI tutor powered by Google Gemini. I'm here to help you learn at your own pace. What would you like to study today?`,
        sender: 'ai',
        timestamp: new Date(),
        type: 'encouragement'
      };
      setMessages([welcomeMessage]);
    }
  }, [profile, messages.length]);

  const generateAIResponse = async (userMessage: string, subject: string): Promise<string> => {
    try {
      const systemPrompt = `You are a personalized AI tutor specializing in ${subject}. The student has a ${learningProfile.style} learning style and prefers a ${learningProfile.pace} pace. Their strengths include: ${learningProfile.strengths.join(', ')}. Their areas for improvement include: ${learningProfile.weaknesses.join(', ')}. Their interests are: ${learningProfile.interests.join(', ')}. 

Please provide educational, encouraging, and personalized responses that match their learning style. Break down complex concepts into digestible parts and provide practical examples when possible.`;

      const { data, error } = await supabase.functions.invoke('gemini-chat', {
        body: {
          message: userMessage,
          context: `Subject: ${subject}, Learning Style: ${learningProfile.style}`,
          systemPrompt: systemPrompt
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to get AI response');
      }

      return data.response;
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw new Error('Failed to get AI response. Please try again.');
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(inputMessage, activeSubject);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        type: 'explanation'
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to get AI response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const currentSubject = subjects.find(s => s.id === activeSubject) || subjects[0];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-edu-blue" />
            Personalized AI Tutor (Powered by Google Gemini)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeSubject} onValueChange={setActiveSubject} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              {subjects.map((subject) => (
                <TabsTrigger key={subject.id} value={subject.id} className="flex items-center gap-2">
                  <subject.icon className="h-4 w-4" />
                  {subject.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {subjects.map((subject) => (
              <TabsContent key={subject.id} value={subject.id} className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-3">
                    <ChatInterface
                      messages={messages}
                      inputMessage={inputMessage}
                      setInputMessage={setInputMessage}
                      isLoading={isLoading}
                      onSendMessage={handleSendMessage}
                      subject={subject}
                      learningProfile={learningProfile}
                    />
                  </div>
                  <LearningProfileSidebar learningProfile={learningProfile} />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalizedAITutor;
