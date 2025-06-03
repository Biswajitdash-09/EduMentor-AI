
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-edu-blue"></div>
    <span className="ml-2 text-gray-600">Loading...</span>
  </div>
);

// Protected route component
export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!user) {
    return <Navigate to="/signin/student" replace />;
  }
  
  return children;
};

// Faculty or Admin only route
export const FacultyRoute = ({ children }: { children: JSX.Element }) => {
  const { user, profile, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!user) {
    return <Navigate to="/signin/faculty" replace />;
  }
  
  if (!profile || (profile.user_type !== "faculty" && profile.user_type !== "admin")) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

// Admin only route
export const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { user, profile, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!user) {
    return <Navigate to="/signin/admin" replace />;
  }
  
  if (!profile || profile.user_type !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};
