
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

// Role-based dashboard redirect
export const DashboardRouter = () => {
  const { profile, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!profile) {
    return <Navigate to="/signin/student" />;
  }
  
  if (profile.user_type === "admin") {
    return <Navigate to="/admin" />;
  } else if (profile.user_type === "faculty") {
    return <Navigate to="/faculty" />;
  } else {
    return <Navigate to="/student" />;
  }
};
