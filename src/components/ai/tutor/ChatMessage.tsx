
import React from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bot, User, Target, Lightbulb, TrendingUp, MessageSquare } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'explanation' | 'quiz' | 'suggestion' | 'encouragement';
}

interface ChatMessageProps {
  message: Message;
}

const getMessageIcon = (type?: string) => {
  switch (type) {
    case 'quiz': return <Target className="h-4 w-4" />;
    case 'suggestion': return <Lightbulb className="h-4 w-4" />;
    case 'encouragement': return <TrendingUp className="h-4 w-4" />;
    default: return <MessageSquare className="h-4 w-4" />;
  }
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div
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
  );
};

export default ChatMessage;
