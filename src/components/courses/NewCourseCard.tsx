
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, Users, Star } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  enrolledCount: number;
  progress?: number;
  isEnrolled?: boolean;
}

interface NewCourseCardProps {
  course: Course;
  onEnroll: (courseId: string) => void;
  onContinue: (courseId: string) => void;
}

const NewCourseCard: React.FC<NewCourseCardProps> = ({ course, onEnroll, onContinue }) => {
  const difficultyColors = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-yellow-100 text-yellow-800',
    Advanced: 'bg-red-100 text-red-800'
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <Badge className={difficultyColors[course.difficulty]}>
            {course.difficulty}
          </Badge>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-sm text-gray-600">{course.rating}</span>
          </div>
        </div>
        <CardTitle className="text-lg group-hover:text-edu-blue transition-colors">
          {course.title}
        </CardTitle>
        <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{course.instructor}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{course.enrolledCount}</span>
          </div>
        </div>
        
        {course.isEnrolled && course.progress !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        )}
        
        <Button
          className="w-full"
          onClick={() => course.isEnrolled ? onContinue(course.id) : onEnroll(course.id)}
          variant={course.isEnrolled ? "default" : "outline"}
        >
          {course.isEnrolled ? 'Continue Learning' : 'Enroll Now'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default NewCourseCard;
