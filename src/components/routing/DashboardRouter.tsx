
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

// Role-based dashboard redirect
export const DashboardRouter = () => {
  const { profile, loading, user } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-edu-blue"></div>
        <span className="ml-2 text-gray-600">Loading...</span>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/signin/student" replace />;
  }
  
  if (!profile) {
    // If no profile but user exists, redirect to student dashboard as default
    return <Navigate to="/student" replace />;
  }
  
  // Route based on user type
  switch (profile.user_type) {
    case "admin":
      return <Navigate to="/admin" replace />;
    case "faculty":
      return <Navigate to="/faculty" replace />;
    case "student":
    default:
      return <Navigate to="/student" replace />;
  }
};
