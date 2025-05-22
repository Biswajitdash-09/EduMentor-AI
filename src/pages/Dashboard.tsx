
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, ListChecks, MessageSquare, Loader2, Award, Trophy, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import PaymentPlans from "@/components/PaymentPlans";
import { Json } from "@/integrations/supabase/types";

type UserAchievement = {
  points: number;
  completed_courses: number;
  completed_assessments: number;
  badges: string[];
  last_activity: string;
};

type UserStats = {
  rank: number;
  totalUsers: number;
};

const Dashboard = () => {
  const { user, profile, loading } = useAuth();
  const [achievements, setAchievements] = useState<UserAchievement | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loadingAchievements, setLoadingAchievements] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchUserAchievements();
    }
  }, [user]);

  const fetchUserAchievements = async () => {
    if (!user) return;
    
    setLoadingAchievements(true);
    try {
      // Get user achievements
      const { data, error } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', user.id)
        .single();
        
      if (error && error.code !== 'PGRST116') { // PGRST116 means no rows returned
        throw error;
      }
      
      // If no data, create a default record
      if (!data) {
        const defaultAchievement = {
          user_id: user.id,
          points: 0,
          completed_courses: 0,
          completed_assessments: 0,
          badges: [],
          last_activity: new Date().toISOString()
        };
        
        await supabase
          .from('user_achievements')
          .insert(defaultAchievement);
          
        setAchievements(defaultAchievement);
      } else {
        // Convert the badges from Json to string[]
        const parsedBadges: string[] = Array.isArray(data.badges) 
          ? data.badges as string[]
          : typeof data.badges === 'string' 
            ? JSON.parse(data.badges) 
            : [];

        setAchievements({
          points: data.points,
          completed_courses: data.completed_courses,
          completed_assessments: data.completed_assessments,
          badges: parsedBadges,
          last_activity: data.last_activity
        });
      }
      
      // Get user rank
      const { data: allUsers, error: rankError } = await supabase
        .from('user_achievements')
        .select('user_id, points')
        .order('points', { ascending: false });
        
      if (rankError) throw rankError;
      
      if (allUsers) {
        const userRank = allUsers.findIndex(u => u.user_id === user.id) + 1;
        setStats({
          rank: userRank > 0 ? userRank : allUsers.length + 1,
          totalUsers: allUsers.length
        });
      }
    } catch (error) {
      console.error('Error fetching user achievements:', error);
    } finally {
      setLoadingAchievements(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-edu-blue" />
      </div>
    );
  }

  const userType = profile?.user_type || "student";
  
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome, {profile?.first_name || user?.email?.split("@")[0] || "User"}!
            </h1>
            <p className="text-gray-500">
              {userType === "student" 
                ? "Track your learning progress and access all your educational resources." 
                : userType === "faculty"
                ? "Manage your courses and monitor student performance."
                : "Access administrative controls and platform oversight."}
            </p>
          </div>
          
          {achievements && (
            <div className="mt-4 md:mt-0 flex items-center bg-edu-blue/5 p-3 rounded-lg">
              <div className="mr-4">
                <Trophy className="h-10 w-10 text-edu-blue" />
              </div>
              <div>
                <p className="font-medium">Your Points</p>
                <p className="text-2xl font-bold">{achievements.points}</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Main dashboard content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-medium flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-edu-blue" />
                    Courses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {userType === "student" ? (
                    <p className="text-gray-500 mb-2">Access your enrolled courses and learning materials.</p>
                  ) : (
                    <p className="text-gray-500 mb-2">Manage your courses and create new content.</p>
                  )}
                  <Button 
                    className="w-full bg-edu-blue hover:bg-edu-blue-dark"
                    onClick={() => navigate("/courses")}
                  >
                    View Courses
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-medium flex items-center">
                    <ListChecks className="h-5 w-5 mr-2 text-edu-purple" />
                    Assessments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {userType === "student" ? (
                    <p className="text-gray-500 mb-2">Take tests and view your assessment scores.</p>
                  ) : (
                    <p className="text-gray-500 mb-2">Create and grade assessments for your students.</p>
                  )}
                  <Button 
                    className="w-full bg-edu-purple hover:bg-edu-purple-dark"
                    onClick={() => navigate("/assessments")}
                  >
                    View Assessments
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-medium flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-edu-blue-light" />
                    AI Tutor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 mb-2">Get personalized help with your academic questions.</p>
                  <Button 
                    className="w-full bg-edu-blue-light hover:bg-edu-blue-light/90"
                    onClick={() => navigate("/ai-tutor")}
                  >
                    Ask AI Tutor
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* User progress section */}
            <Card>
              <CardHeader>
                <CardTitle>Your Learning Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Course Completion</span>
                    <span className="text-gray-500">
                      {achievements?.completed_courses || 0} completed
                    </span>
                  </div>
                  <Progress value={achievements?.completed_courses ? Math.min(achievements.completed_courses * 10, 100) : 0} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Assessments</span>
                    <span className="text-gray-500">
                      {achievements?.completed_assessments || 0} completed
                    </span>
                  </div>
                  <Progress value={achievements?.completed_assessments ? Math.min(achievements.completed_assessments * 10, 100) : 0} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 flex items-center space-x-4">
                    <div className="bg-edu-blue/10 p-3 rounded-full">
                      <Award className="h-6 w-6 text-edu-blue" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Leaderboard Rank</p>
                      <p className="text-lg font-semibold">
                        {stats ? `#${stats.rank} of ${stats.totalUsers}` : "N/A"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 flex items-center space-x-4">
                    <div className="bg-edu-purple/10 p-3 rounded-full">
                      <Users className="h-6 w-6 text-edu-purple" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Community Status</p>
                      <p className="text-lg font-semibold">
                        {achievements && achievements.points >= 500 ? "Gold Member" : 
                         achievements && achievements.points >= 200 ? "Silver Member" : 
                         "Bronze Member"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* User profile and upcoming activities */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-4 pb-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profile?.avatar_url || ""} />
                    <AvatarFallback className="text-lg">
                      {profile?.first_name && profile?.last_name 
                        ? `${profile.first_name[0]}${profile.last_name[0]}`
                        : user?.email?.substring(0, 2).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="font-medium text-lg">
                      {profile?.first_name && profile?.last_name 
                        ? `${profile.first_name} ${profile.last_name}`
                        : user?.email?.split("@")[0] || "User"}
                    </h3>
                    <p className="text-gray-500">{userType.charAt(0).toUpperCase() + userType.slice(1)}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate("/profile")}
                >
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Upcoming Activities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-edu-blue pl-4 py-1">
                  <p className="font-medium">Assessment Due</p>
                  <p className="text-sm text-gray-500">AI Ethics Quiz - May 24</p>
                </div>
                <div className="border-l-4 border-edu-purple pl-4 py-1">
                  <p className="font-medium">Course Update</p>
                  <p className="text-sm text-gray-500">New Machine Learning content added</p>
                </div>
                <div className="border-l-4 border-edu-blue-light pl-4 py-1">
                  <p className="font-medium">Leaderboard Update</p>
                  <p className="text-sm text-gray-500">Weekly rankings refreshed</p>
                </div>
                <Button
                  variant="link"
                  className="pl-0 text-edu-blue"
                  onClick={() => navigate("/leaderboard")}
                >
                  View Leaderboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Subscription Plans</CardTitle>
            <CardDescription>
              Upgrade your learning experience with our premium plans
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PaymentPlans />
          </CardContent>
        </Card>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
          <ul className="space-y-3">
            <li className="flex">
              <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-edu-blue text-white mr-3">1</span>
              <div>
                <h3 className="font-medium">Explore your courses</h3>
                <p className="text-gray-500">Browse through available courses or view your enrolled ones.</p>
              </div>
            </li>
            <li className="flex">
              <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-edu-purple text-white mr-3">2</span>
              <div>
                <h3 className="font-medium">Complete assessments</h3>
                <p className="text-gray-500">Take quizzes and tests to evaluate your understanding.</p>
              </div>
            </li>
            <li className="flex">
              <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-edu-blue-light text-white mr-3">3</span>
              <div>
                <h3 className="font-medium">Ask the AI tutor</h3>
                <p className="text-gray-500">Get help with difficult concepts and homework questions.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
