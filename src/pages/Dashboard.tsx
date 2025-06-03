
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import BackButton from "@/components/common/BackButton";
import GamificationPanel from "@/components/gamification/GamificationPanel";
import RealtimeLeaderboard from "@/components/leaderboard/RealtimeLeaderboard";
import NewCourseCard from "@/components/courses/NewCourseCard";
import AssignmentCard from "@/components/assignments/AssignmentCard";
import ProgressTracker from "@/components/progress/ProgressTracker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, ListChecks, MessageSquare, Loader2, Trophy, Users, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { newCoursesData, assignmentsData } from "@/data/newCoursesData";
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
        
      if (error && error.code !== 'PGRST116') {
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

  const handleCourseEnroll = (courseId: string) => {
    navigate(`/courses/${courseId}/enroll`);
  };

  const handleCourseContinue = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  const handleAssignmentStart = (assignmentId: string) => {
    navigate(`/assignments/${assignmentId}`);
  };

  const handleAssignmentView = (assignmentId: string) => {
    navigate(`/assignments/${assignmentId}/results`);
  };

  if (loading || loadingAchievements) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-edu-blue" />
        </div>
      </DashboardLayout>
    );
  }

  if (!user || !profile) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Authentication Required</CardTitle>
              <CardDescription>Please sign in to access your dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate('/signin/student')} className="w-full">
                Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  const userType = profile?.user_type || "student";
  const userLevel = achievements ? Math.floor(achievements.points / 1000) + 1 : 1;
  const userStreak = 7; // Mock data
  
  // Mock progress data
  const progressData = {
    overallProgress: 65,
    coursesCompleted: 2,
    totalCourses: 6,
    assignmentsCompleted: 3,
    totalAssignments: 5,
    averageScore: 87,
    weeklyGoal: 10,
    weeklyProgress: 7.5
  };

  const enrolledCourses = newCoursesData.filter(course => course.isEnrolled);
  const availableCourses = newCoursesData.filter(course => !course.isEnrolled).slice(0, 3);
  const recentAssignments = assignmentsData.slice(0, 3);
  
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <BackButton />
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back, {profile?.first_name || user?.email?.split("@")[0] || "User"}! 🎉
            </h1>
            <p className="text-gray-500">
              {userType === "student" 
                ? "Ready to continue your learning journey?" 
                : userType === "faculty"
                ? "Manage your courses and monitor student performance."
                : "Access administrative controls and platform oversight."}
            </p>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Tracker */}
            <ProgressTracker data={progressData} />
            
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/courses")}>
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-8 w-8 mx-auto mb-3 text-edu-blue" />
                  <h3 className="font-semibold">Courses</h3>
                  <p className="text-sm text-gray-600">Continue learning</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/assessments")}>
                <CardContent className="p-6 text-center">
                  <ListChecks className="h-8 w-8 mx-auto mb-3 text-edu-purple" />
                  <h3 className="font-semibold">Assessments</h3>
                  <p className="text-sm text-gray-600">Test your knowledge</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/ai-tutor")}>
                <CardContent className="p-6 text-center">
                  <MessageSquare className="h-8 w-8 mx-auto mb-3 text-edu-blue-light" />
                  <h3 className="font-semibold">AI Tutor</h3>
                  <p className="text-sm text-gray-600">Get help instantly</p>
                </CardContent>
              </Card>
            </div>

            {/* Enrolled Courses */}
            {enrolledCourses.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Continue Learning</CardTitle>
                  <CardDescription>Pick up where you left off</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {enrolledCourses.map((course) => (
                      <NewCourseCard
                        key={course.id}
                        course={course}
                        onEnroll={handleCourseEnroll}
                        onContinue={handleCourseContinue}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Assignments */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Assignments</CardTitle>
                <CardDescription>Stay on top of your deadlines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recentAssignments.map((assignment) => (
                    <AssignmentCard
                      key={assignment.id}
                      assignment={assignment}
                      onStart={handleAssignmentStart}
                      onView={handleAssignmentView}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Available Courses */}
            <Card>
              <CardHeader>
                <CardTitle>Explore New Courses</CardTitle>
                <CardDescription>Expand your knowledge with these courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableCourses.map((course) => (
                    <NewCourseCard
                      key={course.id}
                      course={course}
                      onEnroll={handleCourseEnroll}
                      onContinue={handleCourseContinue}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Gamification Panel */}
            {achievements && (
              <GamificationPanel
                userPoints={achievements.points}
                level={userLevel}
                streak={userStreak}
                badges={achievements.badges}
              />
            )}
            
            {/* Realtime Leaderboard */}
            <RealtimeLeaderboard />
            
            {/* User Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={profile?.avatar_url || ""} />
                    <AvatarFallback className="text-lg">
                      {profile?.first_name && profile?.last_name 
                        ? `${profile.first_name[0]}${profile.last_name[0]}`
                        : user?.email?.substring(0, 2).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="font-medium">
                      {profile?.first_name && profile?.last_name 
                        ? `${profile.first_name} ${profile.last_name}`
                        : user?.email?.split("@")[0] || "User"}
                    </h3>
                    <p className="text-sm text-gray-500">{userType.charAt(0).toUpperCase() + userType.slice(1)}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate("/profile")}
                  >
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
