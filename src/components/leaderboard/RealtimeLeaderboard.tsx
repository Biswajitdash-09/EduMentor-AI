
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface LeaderboardUser {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  points: number;
  rank: number;
}

const RealtimeLeaderboard = () => {
  const [topUsers, setTopUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('leaderboard-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_achievements'
        },
        () => {
          fetchLeaderboard();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchLeaderboard = async () => {
    try {
      // First get user achievements
      const { data: achievements, error: achievementsError } = await supabase
        .from('user_achievements')
        .select('user_id, points')
        .order('points', { ascending: false })
        .limit(10);

      if (achievementsError) throw achievementsError;

      if (!achievements || achievements.length === 0) {
        setTopUsers([]);
        setLoading(false);
        return;
      }

      // Get user IDs from achievements
      const userIds = achievements.map(achievement => achievement.user_id);

      // Then get profiles for these users
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, avatar_url')
        .in('id', userIds);

      if (profilesError) throw profilesError;

      // Combine the data
      const leaderboardData = achievements.map((achievement, index) => {
        const profile = profiles?.find(p => p.id === achievement.user_id);
        return {
          id: achievement.user_id,
          first_name: profile?.first_name || 'Unknown',
          last_name: profile?.last_name || 'User',
          avatar_url: profile?.avatar_url,
          points: achievement.points,
          rank: index + 1
        };
      });

      setTopUsers(leaderboardData);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-sm font-bold text-gray-500">#{rank}</span>;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Live Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1 h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Live Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {topUsers.map((user) => (
          <div key={user.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-8 flex justify-center">
                {getRankIcon(user.rank)}
              </div>
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar_url || ''} />
                <AvatarFallback>
                  {user.first_name[0]}{user.last_name[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">
                  {user.first_name} {user.last_name}
                </p>
              </div>
            </div>
            <Badge variant="secondary">
              {user.points} XP
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RealtimeLeaderboard;
