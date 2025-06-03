
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Target, Zap } from 'lucide-react';

interface GamificationPanelProps {
  userPoints: number;
  level: number;
  streak: number;
  badges: string[];
}

const GamificationPanel: React.FC<GamificationPanelProps> = ({
  userPoints,
  level,
  streak,
  badges
}) => {
  const nextLevelPoints = level * 1000;
  const currentLevelProgress = (userPoints % 1000) / 10;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Your Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Level {level}</span>
          <span className="text-sm text-gray-500">{userPoints} / {nextLevelPoints} XP</span>
        </div>
        <Progress value={currentLevelProgress} className="h-2" />
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-orange-500" />
            <span className="text-sm">{streak} day streak</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-blue-500" />
            <span className="text-sm">{badges.length} badges</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {badges.slice(0, 5).map((badge, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {badge}
            </Badge>
          ))}
          {badges.length > 5 && (
            <Badge variant="outline" className="text-xs">
              +{badges.length - 5} more
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GamificationPanel;
