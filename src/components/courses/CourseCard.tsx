
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Users, Clock, BookOpen } from 'lucide-react';
import { Course } from '@/data/coursesData';

interface CourseCardProps {
  course: Course;
  onEnroll?: (courseId: string) => void;
  onViewCourse?: (courseId: string) => void;
  isEnrolled?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  onEnroll, 
  onViewCourse, 
  isEnrolled = false 
}) => {
  const IconComponent = course.icon;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
      <CardContent className="p-6">
        <div className={`w-full h-32 bg-gradient-to-r ${course.color} rounded-lg mb-4 flex items-center justify-center`}>
          <IconComponent className="h-12 w-12 text-white" />
        </div>
        
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg group-hover:text-edu-blue transition-colors">
              {course.title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2">{course.description}</p>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-1" />
            <span>{course.instructor}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              <BookOpen className="h-3 w-3 mr-1" />
              {course.modules} modules
            </Badge>
            {course.videoLectures && (
              <Badge variant="outline" className="text-xs">
                <Play className="h-3 w-3 mr-1" />
                {course.videoLectures.length} videos
              </Badge>
            )}
          </div>
          
          {isEnrolled && course.progress !== undefined && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>
          )}
          
          <div className="flex gap-2 pt-2">
            {isEnrolled ? (
              <Button 
                onClick={() => onViewCourse?.(course.id)}
                className="w-full bg-edu-blue hover:bg-edu-blue-dark"
              >
                Continue Learning
              </Button>
            ) : (
              <Button 
                onClick={() => onEnroll?.(course.id)}
                className="w-full bg-edu-blue hover:bg-edu-blue-dark"
              >
                Enroll Now
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
