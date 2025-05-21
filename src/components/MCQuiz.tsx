
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, HelpCircle } from "lucide-react";

export type MCQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
};

interface MCQuizProps {
  title: string;
  description?: string;
  questions: MCQuestion[];
  onQuizSubmit?: (score: number, totalQuestions: number) => void;
}

const MCQuiz: React.FC<MCQuizProps> = ({
  title,
  description,
  questions,
  onQuizSubmit
}) => {
  const [currentAnswers, setCurrentAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleOptionSelect = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    
    setCurrentAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmit = () => {
    if (questions.length === 0) return;
    
    // Calculate score
    let correctCount = 0;
    
    questions.forEach(question => {
      const selectedOption = currentAnswers[question.id];
      if (selectedOption === question.correctAnswerIndex) {
        correctCount++;
      }
    });
    
    setScore(correctCount);
    setSubmitted(true);
    
    // Call the callback if provided
    if (onQuizSubmit) {
      onQuizSubmit(correctCount, questions.length);
    }
  };

  const resetQuiz = () => {
    setCurrentAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const getOptionStatus = (question: MCQuestion, optionIndex: number) => {
    if (!submitted) return '';
    
    if (optionIndex === question.correctAnswerIndex) {
      return 'correct';
    }
    
    if (currentAnswers[question.id] === optionIndex && optionIndex !== question.correctAnswerIndex) {
      return 'incorrect';
    }
    
    return '';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {submitted && (
          <Alert className={`mb-6 ${score / questions.length > 0.6 ? 'bg-green-50' : 'bg-amber-50'}`}>
            <AlertDescription className="flex items-center">
              <span className="font-medium">Your score: {score} out of {questions.length} </span>
              <Badge className="ml-2 bg-gray-100">
                {Math.round((score / questions.length) * 100)}%
              </Badge>
            </AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-6">
          {questions.map((question, qIndex) => (
            <div key={question.id} className="p-4 border rounded-lg">
              <p className="font-medium mb-3">
                {qIndex + 1}. {question.question}
              </p>
              <div className="space-y-2">
                {question.options.map((option, oIndex) => {
                  const status = getOptionStatus(question, oIndex);
                  
                  return (
                    <div 
                      key={oIndex}
                      onClick={() => handleOptionSelect(question.id, oIndex)}
                      className={`
                        p-3 rounded-md flex items-center cursor-pointer 
                        ${currentAnswers[question.id] === oIndex ? 'border-2 border-edu-blue' : 'border border-gray-200'} 
                        ${status === 'correct' ? 'bg-green-50 border-green-300' : ''} 
                        ${status === 'incorrect' ? 'bg-red-50 border-red-300' : ''} 
                        ${submitted ? '' : 'hover:border-edu-blue hover:bg-edu-blue/5 transition-colors'}
                      `}
                    >
                      <div className="mr-2">
                        {submitted ? (
                          oIndex === question.correctAnswerIndex ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : currentAnswers[question.id] === oIndex ? (
                            <XCircle className="h-5 w-5 text-red-500" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                          )
                        ) : (
                          <div 
                            className={`w-5 h-5 rounded-full border-2 ${
                              currentAnswers[question.id] === oIndex 
                                ? 'border-edu-blue bg-edu-blue/10' 
                                : 'border-gray-300'
                            }`}
                          >
                            {currentAnswers[question.id] === oIndex && (
                              <div className="w-3 h-3 rounded-full bg-edu-blue m-[3px]" />
                            )}
                          </div>
                        )}
                      </div>
                      <span>{option}</span>
                    </div>
                  );
                })}
              </div>
              
              {submitted && (
                <div className="mt-3 text-sm flex items-start">
                  <HelpCircle className="h-4 w-4 mr-1 mt-0.5 text-edu-blue" />
                  <span>
                    <strong>Explanation:</strong> The correct answer is{' '}
                    <span className="font-medium">
                      {question.options[question.correctAnswerIndex]}
                    </span>
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        {submitted ? (
          <Button onClick={resetQuiz} className="bg-edu-blue hover:bg-edu-blue-dark">
            Try Again
          </Button>
        ) : (
          <Button 
            onClick={handleSubmit}
            disabled={Object.keys(currentAnswers).length < questions.length}
            className="bg-edu-blue hover:bg-edu-blue-dark"
          >
            Submit Answers
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MCQuiz;
