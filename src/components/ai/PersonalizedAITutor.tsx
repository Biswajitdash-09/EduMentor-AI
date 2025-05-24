
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, BookOpen, Target, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
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
        content: `Hello ${profile?.first_name || 'there'}! I'm your personalized AI tutor. I'm here to help you learn at your own pace. What would you like to study today?`,
        sender: 'ai',
        timestamp: new Date(),
        type: 'encouragement'
      };
      setMessages([welcomeMessage]);
    }
  }, [profile, messages.length]);

  const generateAIResponse = async (userMessage: string, subject: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const responses = {
      visual: [
        "Let me break this down visually for you. Imagine this concept as...",
        "Think of it like a diagram where...",
        "Picture this scenario..."
      ],
      auditory: [
        "Listen carefully to this explanation...",
        "Think about the rhythm and pattern of...",
        "Let me explain this step by step..."
      ],
      kinesthetic: [
        "Let's work through this hands-on approach...",
        "Try practicing this by doing...",
        "The best way to understand this is by actually trying..."
      ],
      reading: [
        "Let me provide you with a detailed explanation...",
        "Here's a comprehensive breakdown of...",
        "Consider reading about this topic from this perspective..."
      ]
    };

    const styleResponses = responses[learningProfile.style];
    const randomResponse = styleResponses[Math.floor(Math.random() * styleResponses.length)];
    
    return `${randomResponse} Based on your question about "${userMessage}" in ${subject}, I can see you're working on an important concept. Given your learning style (${learningProfile.style}) and pace (${learningProfile.pace}), I recommend focusing on the fundamentals first. Would you like me to explain this concept step by step or provide some practice problems?`;
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
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
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
            Personalized AI Tutor
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
