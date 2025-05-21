
import React, { useState, useEffect } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Medal, Star, Award, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type LeaderboardUser = {
  user_id: string;
  points: number;
  completed_courses: number;
  completed_assessments: number;
  badges: string[];
  rank?: number;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
}

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [rankType, setRankType] = useState<"points" | "courses" | "assessments">("points");
  const { user } = useAuth();
  
  useEffect(() => {
    fetchLeaderboardData();
  }, [rankType]);
  
  const fetchLeaderboardData = async () => {
    setLoading(true);
    try {
      // Get achievements data
      const { data: achievementsData, error: achievementsError } = await supabase
        .from('user_achievements')
        .select('*')
        .order(rankType, { ascending: false })
        .limit(50);
        
      if (achievementsError) throw achievementsError;
      
      // Get profiles data for names and avatars
      const userIds = achievementsData.map(item => item.user_id);
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, avatar_url')
        .in('id', userIds);
        
      if (profilesError) throw profilesError;
      
      // Combine data and add rank
      const combinedData = achievementsData.map((achievement, index) => {
        const profile = profilesData.find(p => p.id === achievement.user_id);
        return {
          ...achievement,
          rank: index + 1,
          first_name: profile?.first_name || 'Anonymous',
          last_name: profile?.last_name || 'User',
          avatar_url: profile?.avatar_url
        };
      });
      
      setLeaderboardData(combinedData);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const getUserRankClass = (userId: string) => {
    return userId === user?.id ? 'bg-edu-blue/10 border-l-4 border-edu-blue' : '';
  };
  
  const getBadgeIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Award className="h-5 w-5 text-amber-700" />;
    return <Star className="h-5 w-5 text-edu-blue" />;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Leaderboard</span>
          <Tabs value={rankType} onValueChange={(value) => setRankType(value as "points" | "courses" | "assessments")}>
            <TabsList>
              <TabsTrigger value="points">Points</TabsTrigger>
              <TabsTrigger value="completed_courses">Courses</TabsTrigger>
              <TabsTrigger value="completed_assessments">Assessments</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-edu-blue" />
          </div>
        ) : leaderboardData.length > 0 ? (
          <div className="space-y-2">
            {leaderboardData.map((item) => (
              <div 
                key={item.user_id} 
                className={`flex items-center justify-between p-2 rounded-md ${getUserRankClass(item.user_id)}`}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-edu-blue/10">
                    {getBadgeIcon(item.rank || 0)}
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={item.avatar_url || ''} />
                    <AvatarFallback>
                      {`${item.first_name?.charAt(0) || ''}${item.last_name?.charAt(0) || ''}`}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">
                    {item.first_name} {item.last_name}
                    {item.user_id === user?.id && " (You)"}
                  </span>
                </div>
                <div className="flex items-center">
                  <Badge variant="secondary" className="mr-2">
                    Rank #{item.rank}
                  </Badge>
                  <span className="font-bold">
                    {rankType === "points" ? `${item.points} pts` : 
                     rankType === "completed_courses" ? `${item.completed_courses} courses` : 
                     `${item.completed_assessments} assessments`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No data available. Start learning to appear on the leaderboard!
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
