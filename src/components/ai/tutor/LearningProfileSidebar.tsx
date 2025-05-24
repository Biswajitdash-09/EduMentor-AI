
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Target, BookOpen } from 'lucide-react';

interface LearningProfile {
  style: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  pace: 'fast' | 'medium' | 'slow';
  strengths: string[];
  weaknesses: string[];
  interests: string[];
}

interface LearningProfileSidebarProps {
  learningProfile: LearningProfile;
}

const LearningProfileSidebar: React.FC<LearningProfileSidebarProps> = ({ learningProfile }) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Learning Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-xs font-medium text-gray-600">Learning Style</p>
            <Badge variant="secondary">{learningProfile.style}</Badge>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-600">Pace</p>
            <Badge variant="outline">{learningProfile.pace}</Badge>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-600">Strengths</p>
            <div className="space-y-1">
              {learningProfile.strengths.map((strength, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {strength}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" size="sm" className="w-full text-xs">
            <Lightbulb className="h-3 w-3 mr-1" />
            Get Study Tips
          </Button>
          <Button variant="outline" size="sm" className="w-full text-xs">
            <Target className="h-3 w-3 mr-1" />
            Practice Quiz
          </Button>
          <Button variant="outline" size="sm" className="w-full text-xs">
            <BookOpen className="h-3 w-3 mr-1" />
            Explain Concept
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningProfileSidebar;
