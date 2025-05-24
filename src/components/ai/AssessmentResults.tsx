
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Download } from 'lucide-react';
import { AssessmentResult, Assessment } from '@/types/assessment';

interface AssessmentResultsProps {
  results: AssessmentResult[];
  assessments: Assessment[];
}

const AssessmentResults: React.FC<AssessmentResultsProps> = ({ results, assessments }) => {
  return (
    <div className="space-y-4">
      {results.map((result) => (
        <Card key={result.id}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{result.studentName}</h3>
                <p className="text-sm text-gray-600">
                  Assessment: {assessments.find(a => a.id === result.assessmentId)?.title}
                </p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline">
                    {result.score}/{result.totalPoints} points
                  </Badge>
                  <Badge 
                    variant={result.percentage >= 80 ? 'default' : result.percentage >= 60 ? 'secondary' : 'destructive'}
                  >
                    {result.percentage}%
                  </Badge>
                  <Badge variant="outline">
                    <Clock className="h-3 w-3 mr-1" />
                    {result.timeSpent} min
                  </Badge>
                </div>
                <div className="mt-3">
                  <p className="text-xs font-medium text-gray-600">AI Analysis:</p>
                  <p className="text-sm text-gray-700 mt-1">{result.aiAnalysis}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AssessmentResults;
