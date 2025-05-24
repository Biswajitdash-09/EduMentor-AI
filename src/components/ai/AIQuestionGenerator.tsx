
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, CheckCircle } from 'lucide-react';
import { Assessment, Question } from '@/types/assessment';
import { useToast } from '@/hooks/use-toast';

interface AIQuestionGeneratorProps {
  newAssessment: Partial<Assessment>;
  isGenerating: boolean;
  onGenerateQuestions: () => void;
  onPublishAssessment: () => void;
}

const AIQuestionGenerator: React.FC<AIQuestionGeneratorProps> = ({
  newAssessment,
  isGenerating,
  onGenerateQuestions,
  onPublishAssessment
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">AI Question Generation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">
          Let AI automatically generate questions based on your subject and difficulty level.
        </p>
        <Button 
          onClick={onGenerateQuestions}
          disabled={isGenerating}
          className="w-full bg-edu-blue hover:bg-edu-blue-dark"
        >
          {isGenerating ? (
            <>
              <Zap className="h-4 w-4 mr-2 animate-pulse" />
              Generating Questions...
            </>
          ) : (
            <>
              <Brain className="h-4 w-4 mr-2" />
              Generate AI Questions
            </>
          )}
        </Button>
        
        {newAssessment.questions && newAssessment.questions.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Generated Questions:</p>
            <div className="space-y-2">
              {newAssessment.questions.map((q, index) => (
                <div key={q.id} className="p-3 border rounded-lg">
                  <p className="text-sm font-medium">Q{index + 1}: {q.question}</p>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">{q.type}</Badge>
                    <Badge variant="secondary" className="text-xs">{q.points} pts</Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button onClick={onPublishAssessment} className="w-full">
              <CheckCircle className="h-4 w-4 mr-2" />
              Publish Assessment
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIQuestionGenerator;
