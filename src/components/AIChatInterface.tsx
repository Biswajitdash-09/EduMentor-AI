
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GraduationCap, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const AIChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi there! I'm your EduMentor AI tutor powered by Google Gemini. How can I help you with your learning today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const getAIResponse = async (question: string): Promise<string> => {
    try {
      const systemPrompt = `You are EduMentor AI, an educational assistant. Provide helpful, accurate, and encouraging responses to student questions. Focus on explaining concepts clearly and providing educational value.`;

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
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      const aiResponse = await getAIResponse(currentInput);
      
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: aiResponse,
          timestamp: new Date(),
        },
      ]);
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

  return (
    <Card className="border-0 shadow-lg h-[600px] flex flex-col">
      <CardContent className="p-0 flex flex-col h-full">
        <div className="bg-edu-blue p-4 text-white flex items-center">
          <GraduationCap className="h-6 w-6 mr-2" />
          <h2 className="font-semibold text-lg">EduMentor AI (Powered by Google Gemini)</h2>
        </div>
        
        <div className="flex-1 overflow-auto p-4 bg-gray-50">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-edu-blue text-white"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-white border border-gray-200">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-4 bg-white border-t">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your question..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChatInterface;
