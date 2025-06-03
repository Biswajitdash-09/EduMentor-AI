
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Target, BookOpen, Award } from 'lucide-react';

interface ProgressData {
  overallProgress: number;
  coursesCompleted: number;
  totalCourses: number;
  assignmentsCompleted: number;
  totalAssignments: number;
  averageScore: number;
  weeklyGoal: number;
  weeklyProgress: number;
}

interface ProgressTrackerProps {
  data: ProgressData;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ data }) => {
  const courseProgress = (data.coursesCompleted / data.totalCourses) * 100;
  const assignmentProgress = (data.assignmentsCompleted / data.totalAssignments) * 100;
  const goalProgress = (data.weeklyProgress / data.weeklyGoal) * 100;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-edu-blue" />
            Learning Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Overall Progress</span>
              <Badge variant="secondary">{data.overallProgress}%</Badge>
            </div>
            <Progress value={data.overallProgress} className="h-3" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  Courses
                </span>
                <span className="text-sm text-gray-500">
                  {data.coursesCompleted}/{data.totalCourses}
                </span>
              </div>
              <Progress value={courseProgress} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium flex items-center gap-1">
                  <Target className="h-4 w-4" />
                  Assignments
                </span>
                <span className="text-sm text-gray-500">
                  {data.assignmentsCompleted}/{data.totalAssignments}
                </span>
              </div>
              <Progress value={assignmentProgress} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-green-500" />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {data.averageScore}%
              </div>
              <div className="text-sm text-green-700">Average Score</div>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(goalProgress)}%
              </div>
              <div className="text-sm text-blue-700">Weekly Goal</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">This Week's Activity</span>
              <span className="text-sm text-gray-500">
                {data.weeklyProgress}h / {data.weeklyGoal}h
              </span>
            </div>
            <Progress value={goalProgress} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressTracker;
