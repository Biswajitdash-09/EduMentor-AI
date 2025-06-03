
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Send, Bot } from "lucide-react";

interface Message {
  id?: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const AITutor = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "assistant",
      content: "Hello! I'm your AI tutor powered by Google Gemini. How can I help you with your studies today?",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const getAIResponse = async (question: string): Promise<string> => {
    try {
      const systemPrompt = `You are an AI tutor specializing in academic subjects. Provide clear, educational explanations and help students understand complex concepts. Be encouraging and supportive while maintaining academic accuracy.`;

      const { data, error } = await supabase.functions.invoke('gemini-chat', {
        body: {
          message: question,
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
      console.error('Error getting AI response:', error);
      throw new Error('Failed to get AI response. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    const userMessage: Message = {
      type: "user",
      content: newMessage,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    const currentMessage = newMessage;
    setNewMessage("");
    setIsLoading(true);
    
    try {
      const aiResponse = await getAIResponse(currentMessage);
      
      const assistantMessage: Message = {
        type: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      
      // Save the conversation in the database if user is logged in
      if (user) {
        try {
          await supabase.from("academic_questions").insert([
            {
              user_id: user.id,
              question: currentMessage,
              answer: aiResponse,
            },
          ]);
        } catch (dbError) {
          console.error('Error saving to database:', dbError);
          // Don't show error to user for database save failures
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">AI Tutor</h1>
        </div>
        
        <Card className="border-0 card-shadow">
          <CardHeader className="bg-gradient-to-r from-edu-blue to-edu-purple p-4 rounded-t-lg">
            <CardTitle className="text-white flex items-center">
              <Bot className="h-6 w-6 mr-2" />
              EduMentor AI Assistant (Powered by Google Gemini)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col h-[500px]">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.type === "user"
                          ? "bg-edu-blue text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      <div className="flex items-start">
                        {msg.type === "assistant" && (
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback className="bg-edu-purple text-white">
                              AI
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div>
                          <p className="text-sm">{msg.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {msg.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg p-4 bg-gray-100">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-edu-purple text-white">
                            AI
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-100"></div>
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-200"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <form
                onSubmit={handleSubmit}
                className="border-t p-4 flex items-center space-x-2"
              >
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Ask your academic question here..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading || !newMessage.trim()}>
                  <Send className="h-4 w-4 mr-1" />
                  Send
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AITutor;
