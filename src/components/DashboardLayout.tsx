
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  GraduationCap,
  LogOut,
  Menu,
  X,
  Home,
  BookOpen,
  ListChecks,
  AlertTriangle,
  MessageSquare,
  Settings,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, profile, signOut } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const userType = profile?.user_type || "student";
  const initials = profile?.first_name && profile?.last_name
    ? `${profile.first_name[0]}${profile.last_name[0]}`
    : user?.email?.substring(0, 2).toUpperCase() || "U";

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const navItems = [
    { name: "Dashboard", icon: <Home className="h-5 w-5" />, href: "/dashboard" },
    { name: "Courses", icon: <BookOpen className="h-5 w-5" />, href: "/courses" },
    { name: "Assessments", icon: <ListChecks className="h-5 w-5" />, href: "/assessments" },
    { name: "AI Tutor", icon: <MessageSquare className="h-5 w-5" />, href: "/ai-tutor" },
    { name: "Risk Analysis", icon: <AlertTriangle className="h-5 w-5" />, href: "/risk-analysis" },
    { name: "Profile", icon: <User className="h-5 w-5" />, href: "/profile" },
    { name: "Settings", icon: <Settings className="h-5 w-5" />, href: "/settings" },
  ];
  
  // Filter out Risk Analysis for students
  const filteredNavItems = userType === "student" 
    ? navItems.filter(item => item.name !== "Risk Analysis") 
    : navItems;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-10 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${isMobileMenuOpen ? "block lg:hidden" : "hidden lg:block"}`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="h-7 w-7 text-edu-blue" />
              <span className="text-xl font-bold edu-gradient-text">EduMentor AI</span>
            </Link>
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden text-gray-500 hover:text-gray-900"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex flex-col justify-between h-full overflow-y-auto pb-4">
            <nav className="mt-6 px-4 space-y-1">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              ))}
            </nav>

            <div className="px-4">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navbar */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden text-gray-500 hover:text-gray-900 mr-4"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-semibold text-gray-800">
                {userType.charAt(0).toUpperCase() + userType.slice(1)} Dashboard
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* User profile dropdown would go here */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700 hidden md:inline-block">
                  {profile?.first_name
                    ? `${profile.first_name} ${profile.last_name}`
                    : user?.email}
                </span>
                <Avatar className="h-9 w-9">
                  <AvatarImage src={profile?.avatar_url || ""} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">{children}</main>
      </div>

      {/* Overlay for mobile sidebar */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-0 bg-gray-600 bg-opacity-50 lg:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;
