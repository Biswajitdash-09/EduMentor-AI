
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";

export interface MCQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

interface MCQuizProps {
  title: string;
  description?: string;
  questions: MCQuestion[];
}

const MCQuiz = ({ title, description, questions }: MCQuizProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number | null>>({});
  const [showResults, setShowResults] = useState(false);
  
  const handleAnswerChange = (questionId: string, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswerIndex) {
        correct++;
      }
    });
    return `${correct}/${questions.length}`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-6">
        {questions.map((question, qIndex) => (
          <div key={question.id} className="space-y-3">
            <div className="flex items-start gap-2">
              <span className="font-medium">{qIndex + 1}.</span>
              <div>
                <p className="font-medium">{question.question}</p>
                
                <RadioGroup 
                  value={selectedAnswers[question.id]?.toString()} 
                  onValueChange={(value) => handleAnswerChange(question.id, parseInt(value))}
                  className="mt-3 space-y-2"
                  disabled={showResults}
                >
                  {question.options.map((option, oIndex) => (
                    <div key={oIndex} className="flex items-center gap-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value={oIndex.toString()} 
                          id={`${question.id}-option-${oIndex}`}
                        />
                        <Label htmlFor={`${question.id}-option-${oIndex}`}>
                          {String.fromCharCode(65 + oIndex)}) {option}
                        </Label>
                      </div>
                      {showResults && oIndex === question.correctAnswerIndex && (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      )}
                      {showResults && 
                        selectedAnswers[question.id] === oIndex && 
                        oIndex !== question.correctAnswerIndex && (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between">
        {showResults ? (
          <>
            <div className="text-lg font-medium">
              Score: <span className="text-edu-blue">{calculateScore()}</span>
            </div>
            <Button onClick={handleReset}>Try Again</Button>
          </>
        ) : (
          <Button 
            onClick={handleSubmit}
            className="ml-auto"
            disabled={Object.keys(selectedAnswers).length < questions.length}
          >
            Submit
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MCQuiz;
