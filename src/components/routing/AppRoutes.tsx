
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { ProtectedRoute, FacultyRoute, AdminRoute } from "./RouteGuards";
import { DashboardRouter } from "./DashboardRouter";

// Page imports
import Index from "@/pages/Index";
import Features from "@/pages/Features";
import About from "@/pages/About";
import NotFound from "@/pages/NotFound";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Dashboard from "@/pages/Dashboard";
import FacultyDashboard from "@/pages/FacultyDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import AITutor from "@/pages/AITutor";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import Courses from "@/pages/Courses";
import CourseEnrollment from "@/pages/CourseEnrollment";
import Assessments from "@/pages/Assessments";
import RiskAnalysis from "@/pages/RiskAnalysis";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import GuestDashboard from "@/pages/GuestDashboard";
import LeaderboardPage from "@/pages/LeaderboardPage";

export const AppRoutes = () => {
  // Initialize user achievements when user logs in
  const { user } = useAuth();
  
  useEffect(() => {
    const initUserAchievements = async () => {
      if (!user) return;
      
      try {
        // Check if user already has achievements record
        const { data } = await supabase
          .from('user_achievements')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        // If no record, create one
        if (!data) {
          await supabase.from('user_achievements').insert({
            user_id: user.id,
            points: 0,
            completed_courses: 0,
            completed_assessments: 0,
            badges: [],
            last_activity: new Date().toISOString()
          });
        }
      } catch (error) {
        console.error('Error initializing user achievements:', error);
      }
    };
    
    initUserAchievements();
  }, [user]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/features" element={<Features />} />
      <Route path="/about" element={<About />} />
      <Route path="/signin/:userType" element={<SignIn />} />
      <Route path="/signup/:userType" element={<SignUp />} />
      <Route path="/dashboard/guest" element={<GuestDashboard />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      
      {/* Dashboard Router */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardRouter />
        </ProtectedRoute>
      } />
      
      {/* Student Dashboard */}
      <Route path="/student" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      {/* Faculty Dashboard */}
      <Route path="/faculty" element={
        <FacultyRoute>
          <FacultyDashboard />
        </FacultyRoute>
      } />
      
      {/* Admin Dashboard */}
      <Route path="/admin" element={
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      } />
      
      {/* Protected Routes */}
      <Route path="/ai-tutor" element={
        <ProtectedRoute>
          <AITutor />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      } />
      <Route path="/courses" element={
        <ProtectedRoute>
          <Courses />
        </ProtectedRoute>
      } />
      <Route path="/courses/:courseId/enroll" element={
        <ProtectedRoute>
          <CourseEnrollment />
        </ProtectedRoute>
      } />
      <Route path="/assessments" element={
        <ProtectedRoute>
          <Assessments />
        </ProtectedRoute>
      } />
      
      {/* Faculty/Admin Only Routes */}
      <Route path="/risk-analysis" element={
        <FacultyRoute>
          <RiskAnalysis />
        </FacultyRoute>
      } />
      
      {/* Legal Pages */}
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      
      {/* Catch-all route - must be last */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
