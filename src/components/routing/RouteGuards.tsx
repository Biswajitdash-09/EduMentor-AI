
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

// Protected route component
export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
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
export const FacultyRoute = ({ children }: { children: JSX.Element }) => {
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

// Admin only route
export const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { user, profile, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/signin/admin" />;
  }
  
  if (profile?.user_type !== "admin") {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
};
