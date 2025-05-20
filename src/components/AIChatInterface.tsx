
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GraduationCap, Send } from "lucide-react";

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
        "Hi there! I'm your EduMentor AI tutor. How can I help you with your learning today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // For demo purposes, we'll simulate AI responses
  const simulateResponse = (question: string) => {
    setIsLoading(true);
    
    // Simulated AI response examples based on questions
    const responses: Record<string, string> = {
      default: "That's an interesting question. Let me explain it in detail. The concept involves several key principles that build upon each other. First, we need to understand the fundamentals, then we can explore more complex aspects. Would you like me to break this down further?",
      math: "In mathematics, this problem can be approached using specific formulas and techniques. Let's work through it step by step. First, identify the key variables and relationships. Then, apply the relevant mathematical principles to find the solution.",
      science: "This scientific concept relates to important natural processes. The key mechanisms involve interaction between multiple factors. Scientists have conducted extensive research in this area, and the current understanding is based on experimental evidence.",
      history: "Historical events are interconnected and influenced by various factors including social, economic, and political contexts. Understanding historical developments requires examining multiple perspectives and primary sources.",
    };

    // Determine response type based on keywords
    let responseText = responses.default;
    if (question.toLowerCase().includes("math") || question.toLowerCase().includes("equation") || question.toLowerCase().includes("formula")) {
      responseText = responses.math;
    } else if (question.toLowerCase().includes("science") || question.toLowerCase().includes("biology") || question.toLowerCase().includes("physics")) {
      responseText = responses.science;
    } else if (question.toLowerCase().includes("history") || question.toLowerCase().includes("war") || question.toLowerCase().includes("civilization")) {
      responseText = responses.history;
    }

    // Simulate network delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: responseText,
          timestamp: new Date(),
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate AI response
    simulateResponse(input);
  };

  return (
    <Card className="border-0 shadow-lg h-[600px] flex flex-col">
      <CardContent className="p-0 flex flex-col h-full">
        <div className="bg-edu-blue p-4 text-white flex items-center">
          <GraduationCap className="h-6 w-6 mr-2" />
          <h2 className="font-semibold text-lg">AI Tutor</h2>
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
