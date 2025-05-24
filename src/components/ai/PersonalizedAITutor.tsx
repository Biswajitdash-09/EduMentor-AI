
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Bot, 
  User, 
  Send, 
  BookOpen, 
  Brain, 
  Target, 
  TrendingUp,
  Lightbulb,
  MessageSquare,
  Loader2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'explanation' | 'quiz' | 'suggestion' | 'encouragement';
}

interface LearningProfile {
  style: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  pace: 'fast' | 'medium' | 'slow';
  strengths: string[];
  weaknesses: string[];
  interests: string[];
}

const PersonalizedAITutor = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeSubject, setActiveSubject] = useState('general');
  const [learningProfile, setLearningProfile] = useState<LearningProfile>({
    style: 'visual',
    pace: 'medium',
    strengths: ['Problem solving', 'Logical thinking'],
    weaknesses: ['Time management', 'Complex concepts'],
    interests: ['Technology', 'Science']
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const subjects = [
    { id: 'general', name: 'General Help', icon: Brain },
    { id: 'math', name: 'Mathematics', icon: Target },
    { id: 'science', name: 'Science', icon: BookOpen },
    { id: 'programming', name: 'Programming', icon: TrendingUp },
  ];

  useEffect(() => {
    // Initialize with welcome message
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
  }, [profile]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateAIResponse = async (userMessage: string, subject: string): Promise<string> => {
    // Simulate AI processing based on learning profile
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

  const getMessageIcon = (type?: string) => {
    switch (type) {
      case 'quiz': return <Target className="h-4 w-4" />;
      case 'suggestion': return <Lightbulb className="h-4 w-4" />;
      case 'encouragement': return <TrendingUp className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

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
                  {/* Chat Interface */}
                  <div className="lg:col-span-3">
                    <Card className="h-[600px] flex flex-col">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <subject.icon className="h-5 w-5" />
                            <span className="font-medium">{subject.name} Tutor</span>
                          </div>
                          <Badge variant="outline">{learningProfile.style} learner</Badge>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="flex-1 flex flex-col p-4">
                        <ScrollArea className="flex-1 pr-4">
                          <div className="space-y-4">
                            {messages.map((message) => (
                              <div
                                key={message.id}
                                className={`flex items-start gap-3 ${
                                  message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                                }`}
                              >
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>
                                    {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                                  </AvatarFallback>
                                </Avatar>
                                
                                <div
                                  className={`max-w-[80%] rounded-lg p-3 ${
                                    message.sender === 'user'
                                      ? 'bg-edu-blue text-white'
                                      : 'bg-gray-100 text-gray-900'
                                  }`}
                                >
                                  {message.sender === 'ai' && message.type && (
                                    <div className="flex items-center gap-2 mb-2 text-sm opacity-70">
                                      {getMessageIcon(message.type)}
                                      <span className="capitalize">{message.type}</span>
                                    </div>
                                  )}
                                  <p className="text-sm">{message.content}</p>
                                  <p className="text-xs opacity-50 mt-2">
                                    {message.timestamp.toLocaleTimeString()}
                                  </p>
                                </div>
                              </div>
                            ))}
                            {isLoading && (
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>
                                    <Bot className="h-4 w-4" />
                                  </AvatarFallback>
                                </Avatar>
                                <div className="bg-gray-100 rounded-lg p-3">
                                  <div className="flex items-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span className="text-sm">AI is thinking...</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          <div ref={messagesEndRef} />
                        </ScrollArea>
                        
                        <div className="flex gap-2 pt-4 border-t">
                          <Input
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder={`Ask about ${subject.name.toLowerCase()}...`}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            disabled={isLoading}
                          />
                          <Button 
                            onClick={handleSendMessage} 
                            disabled={isLoading || !inputMessage.trim()}
                            className="bg-edu-blue hover:bg-edu-blue-dark"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Learning Profile Sidebar */}
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Learning Profile</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <p className="text-xs font-medium text-gray-600">Learning Style</p>
                          <Badge variant="secondary">{learningProfile.style}</Badge>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-600">Pace</p>
                          <Badge variant="outline">{learningProfile.pace}</Badge>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-600">Strengths</p>
                          <div className="space-y-1">
                            {learningProfile.strengths.map((strength, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {strength}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Quick Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full text-xs">
                          <Lightbulb className="h-3 w-3 mr-1" />
                          Get Study Tips
                        </Button>
                        <Button variant="outline" size="sm" className="w-full text-xs">
                          <Target className="h-3 w-3 mr-1" />
                          Practice Quiz
                        </Button>
                        <Button variant="outline" size="sm" className="w-full text-xs">
                          <BookOpen className="h-3 w-3 mr-1" />
                          Explain Concept
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
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
