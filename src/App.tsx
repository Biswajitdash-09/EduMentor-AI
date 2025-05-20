
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Features from "./pages/Features";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import AITutor from "./pages/AITutor";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Courses from "./pages/Courses";
import Assessments from "./pages/Assessments";
import RiskAnalysis from "./pages/RiskAnalysis";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/signin/student" />;
  }
  
  return children;
};

// Faculty or Admin only route
const FacultyRoute = ({ children }: { children: JSX.Element }) => {
  const { user, profile, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/signin/faculty" />;
  }
  
  if (profile?.user_type !== "faculty" && profile?.user_type !== "admin") {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
};

const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<Index />} />
    <Route path="/features" element={<Features />} />
    <Route path="/about" element={<About />} />
    <Route path="/signin/:userType" element={<SignIn />} />
    <Route path="/signup/:userType" element={<SignUp />} />
    
    {/* Protected Routes */}
    <Route path="/dashboard" element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    } />
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
