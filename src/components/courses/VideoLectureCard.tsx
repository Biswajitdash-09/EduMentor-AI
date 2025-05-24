
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Clock, CheckCircle } from 'lucide-react';
import { VideoLecture } from '@/data/coursesData';

interface VideoLectureCardProps {
  lecture: VideoLecture;
  onPlay: (videoId: string) => void;
  isCompleted?: boolean;
}

const VideoLectureCard: React.FC<VideoLectureCardProps> = ({ 
  lecture, 
  onPlay, 
  isCompleted = false 
}) => {
  return (
    <Card className="group hover:shadow-md transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="w-20 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
              <Play className="h-6 w-6 text-gray-600" />
            </div>
            {isCompleted && (
              <div className="absolute -top-2 -right-2">
                <CheckCircle className="h-5 w-5 text-green-500 bg-white rounded-full" />
              </div>
            )}
          </div>
          
          <div className="flex-1 space-y-2">
            <h4 className="font-medium text-sm group-hover:text-edu-blue transition-colors">
              {lecture.title}
            </h4>
            <p className="text-xs text-gray-600 line-clamp-2">
              {lecture.description}
            </p>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                <Clock className="h-3 w-3 mr-1" />
                {lecture.duration}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {lecture.difficulty}
              </Badge>
            </div>
          </div>
          
          <Button
            size="sm"
            onClick={() => onPlay(lecture.videoId)}
            className="bg-edu-blue hover:bg-edu-blue-dark"
          >
            <Play className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoLectureCard;
