
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Leaderboard from "@/components/Leaderboard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Target, User, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import VisitorCounter from "@/components/VisitorCounter";

type UserAchievement = {
  points: number;
  completed_courses: number;
  completed_assessments: number;
  badges: string[];
}

const LeaderboardPage = () => {
  const { user } = useAuth();
  const [userStats, setUserStats] = useState<UserAchievement>({
    points: 0,
    completed_courses: 0,
    completed_assessments: 0,
    badges: []
  });

  useEffect(() => {
    if (user) {
      fetchUserStats();
    }
  }, [user]);

  const fetchUserStats = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', user.id)
        .single();
        
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user stats:', error);
        return;
      }
      
      if (data) {
        // Parse badges from JSON if needed
        const badges = Array.isArray(data.badges) ? data.badges : JSON.parse(data.badges as string);
        setUserStats({
          points: data.points,
          completed_courses: data.completed_courses,
          completed_assessments: data.completed_assessments,
          badges: badges
        });
      }
    } catch (error) {
      console.error('Error processing user stats:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Leaderboard & Achievements</h1>
          <VisitorCounter />
        </div>
        <p className="text-gray-500 mb-8">
          Compare your progress with other students and earn badges as you learn.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 text-edu-blue mr-2" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-edu-blue/10 flex items-center justify-center mr-3">
                        <Medal className="h-5 w-5 text-edu-blue" />
                      </div>
                      <div>
                        <div className="font-medium">Course Completion</div>
                        <div className="text-sm text-gray-500">Complete your first course</div>
                      </div>
                    </div>
                    <Badge variant="outline" className={`${userStats.completed_courses > 0 ? 'bg-green-100' : 'bg-gray-100'}`}>
                      {userStats.completed_courses > 0 ? 'Completed' : '0/1'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-edu-blue/10 flex items-center justify-center mr-3">
                        <Target className="h-5 w-5 text-edu-blue" />
                      </div>
                      <div>
                        <div className="font-medium">Perfect Score</div>
                        <div className="text-sm text-gray-500">Score 100% on an assessment</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-gray-100">
                      0/1
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-edu-blue/10 flex items-center justify-center mr-3">
                        <Users className="h-5 w-5 text-edu-blue" />
                      </div>
                      <div>
                        <div className="font-medium">Community Contributor</div>
                        <div className="text-sm text-gray-500">Help other students</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-gray-100">
                      0/1
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 text-edu-purple mr-2" />
                  Your Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Points earned:</span>
                    <span className="font-medium">{userStats.points} pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Courses completed:</span>
                    <span className="font-medium">{userStats.completed_courses}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Assessments taken:</span>
                    <span className="font-medium">{userStats.completed_assessments}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Current rank:</span>
                    <span className="font-medium">
                      {userStats.points >= 500 ? 'Expert' : 
                       userStats.points >= 250 ? 'Advanced' :
                       userStats.points >= 100 ? 'Intermediate' : 'Beginner'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Leaderboard />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LeaderboardPage;
