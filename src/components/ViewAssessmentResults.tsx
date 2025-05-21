
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export type AssessmentResult = {
  id: string;
  title: string;
  totalQuestions: number;
  correctAnswers: number;
  questions: {
    id: string;
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  }[];
  completedAt: string;
  score: number;
};

interface ViewAssessmentResultsProps {
  result: AssessmentResult;
  onClose: () => void;
}

const ViewAssessmentResults: React.FC<ViewAssessmentResultsProps> = ({
  result,
  onClose
}) => {
  const scorePercentage = (result.correctAnswers / result.totalQuestions) * 100;
  
  const getScoreColor = () => {
    if (scorePercentage >= 80) return "text-green-500";
    if (scorePercentage >= 60) return "text-yellow-500";
    return "text-red-500";
  };
  
  const getProgressColor = () => {
    if (scorePercentage >= 80) return "bg-green-500";
    if (scorePercentage >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Assessment Results</CardTitle>
        <CardDescription>{result.title}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <div className={`text-4xl font-bold ${getScoreColor()}`}>
            {result.correctAnswers} / {result.totalQuestions}
          </div>
          <p className="text-lg">
            Score: <span className={getScoreColor()}>{scorePercentage.toFixed(0)}%</span>
          </p>
          <div className="w-full max-w-md">
            <Progress value={scorePercentage} className={`h-3 ${getProgressColor()}`} />
          </div>
          <p className="text-sm text-gray-500">
            Completed on {new Date(result.completedAt).toLocaleString()}
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-medium">Question Review:</h3>
          {result.questions.map((question, index) => (
            <div
              key={question.id}
              className={`p-4 rounded-lg border ${
                question.isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
              }`}
            >
              <div className="flex items-start">
                <div className="mr-2 mt-1">
                  {question.isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">
                    {index + 1}. {question.question}
                  </p>
                  <div className="mt-2 space-y-1">
                    <p>
                      <span className="font-medium">Your answer: </span>
                      <span className={question.isCorrect ? "text-green-700" : "text-red-700"}>
                        {question.userAnswer}
                      </span>
                    </p>
                    {!question.isCorrect && (
                      <p>
                        <span className="font-medium">Correct answer: </span>
                        <span className="text-green-700">{question.correctAnswer}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 rounded-lg border border-blue-200 bg-blue-50 flex items-start">
          <AlertCircle className="h-5 w-5 text-blue-500 mr-2 mt-1" />
          <div>
            <p className="font-medium">Performance Summary</p>
            <p className="text-sm">
              {scorePercentage >= 80
                ? "Excellent work! You've mastered this topic."
                : scorePercentage >= 60
                ? "Good job! Consider reviewing the questions you missed."
                : "We recommend reviewing this material and trying again."}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={onClose} className="bg-edu-blue hover:bg-edu-blue-dark">
          Back to Assessments
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ViewAssessmentResults;
