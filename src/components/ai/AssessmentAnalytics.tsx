
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileText, Users, TrendingUp } from 'lucide-react';
import { Assessment } from '@/types/assessment';

interface AssessmentAnalyticsProps {
  assessments: Assessment[];
}

const AssessmentAnalytics: React.FC<AssessmentAnalyticsProps> = ({ assessments }) => {
  const totalSubmissions = assessments.reduce((sum, a) => sum + a.submissionsCount, 0);
  const averageScore = Math.round(assessments.reduce((sum, a) => sum + a.averageScore, 0) / assessments.length || 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Assessments</p>
                <p className="text-2xl font-bold">{assessments.length}</p>
              </div>
              <FileText className="h-8 w-8 text-edu-blue" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                <p className="text-2xl font-bold">{totalSubmissions}</p>
              </div>
              <Users className="h-8 w-8 text-edu-blue" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-2xl font-bold">{averageScore}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-edu-blue" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assessment Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assessments.map((assessment) => (
              <div key={assessment.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{assessment.title}</span>
                  <span className="text-sm text-gray-600">{assessment.averageScore}%</span>
                </div>
                <Progress value={assessment.averageScore} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentAnalytics;
