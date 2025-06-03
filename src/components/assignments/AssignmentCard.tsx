
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: 'pending' | 'submitted' | 'graded' | 'overdue';
  points: number;
  earnedPoints?: number;
  course: string;
}

interface AssignmentCardProps {
  assignment: Assignment;
  onStart: (assignmentId: string) => void;
  onView: (assignmentId: string) => void;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({ assignment, onStart, onView }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'graded':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
      case 'graded':
        return <CheckCircle className="h-4 w-4" />;
      case 'overdue':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const isOverdue = assignment.dueDate < new Date() && assignment.status === 'pending';

  return (
    <Card className={`transition-all duration-300 hover:shadow-md ${isOverdue ? 'border-red-200' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <Badge className={getStatusColor(assignment.status)}>
            <div className="flex items-center gap-1">
              {getStatusIcon(assignment.status)}
              {assignment.status}
            </div>
          </Badge>
          <span className="text-sm text-gray-500">{assignment.points} pts</span>
        </div>
        <CardTitle className="text-lg">{assignment.title}</CardTitle>
        <p className="text-sm text-gray-600">{assignment.course}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-gray-700 line-clamp-2">{assignment.description}</p>
        
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>Due {formatDistanceToNow(assignment.dueDate, { addSuffix: true })}</span>
        </div>
        
        {assignment.status === 'graded' && assignment.earnedPoints !== undefined && (
          <div className="text-sm">
            <span className="font-medium">Score: </span>
            <span className={assignment.earnedPoints >= assignment.points * 0.8 ? 'text-green-600' : 'text-yellow-600'}>
              {assignment.earnedPoints}/{assignment.points}
            </span>
          </div>
        )}
        
        <Button
          className="w-full"
          onClick={() => assignment.status === 'pending' ? onStart(assignment.id) : onView(assignment.id)}
          variant={assignment.status === 'pending' ? 'default' : 'outline'}
        >
          {assignment.status === 'pending' ? 'Start Assignment' : 'View Details'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AssignmentCard;
