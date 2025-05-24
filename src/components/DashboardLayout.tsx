
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  Users,
  BarChart,
  FileText,
  BellRing,
  UserCog,
  Brain,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, profile, signOut } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Define navigation items based on user type
  const getNavItems = () => {
    const studentNavItems = [
      { name: "Dashboard", icon: <Home className="h-5 w-5" />, href: "/student" },
      { name: "Courses", icon: <BookOpen className="h-5 w-5" />, href: "/courses" },
      { name: "Assessments", icon: <ListChecks className="h-5 w-5" />, href: "/assessments" },
      { name: "AI Tutor", icon: <MessageSquare className="h-5 w-5" />, href: "/ai-tutor" },
      { name: "AI Features", icon: <Sparkles className="h-5 w-5" />, href: "/ai-features" },
      { name: "Profile", icon: <User className="h-5 w-5" />, href: "/profile" },
      { name: "Settings", icon: <Settings className="h-5 w-5" />, href: "/settings" },
    ];

    const facultyNavItems = [
      { name: "Dashboard", icon: <Home className="h-5 w-5" />, href: "/faculty" },
      { name: "Courses", icon: <BookOpen className="h-5 w-5" />, href: "/faculty?tab=courses" },
      { name: "Students", icon: <Users className="h-5 w-5" />, href: "/faculty?tab=students" },
      { name: "Assignments", icon: <ListChecks className="h-5 w-5" />, href: "/faculty?tab=assignments" },
      { name: "Announcements", icon: <BellRing className="h-5 w-5" />, href: "/faculty?tab=announcements" },
      { name: "AI Features", icon: <Brain className="h-5 w-5" />, href: "/ai-features" },
      { name: "Risk Analysis", icon: <AlertTriangle className="h-5 w-5" />, href: "/risk-analysis" },
      { name: "Profile", icon: <User className="h-5 w-5" />, href: "/profile" },
      { name: "Settings", icon: <Settings className="h-5 w-5" />, href: "/settings" },
    ];

    const adminNavItems = [
      { name: "Dashboard", icon: <Home className="h-5 w-5" />, href: "/admin" },
      { name: "User Management", icon: <UserCog className="h-5 w-5" />, href: "/admin?tab=user-management" },
      { name: "Site Settings", icon: <Settings className="h-5 w-5" />, href: "/admin?tab=site-settings" },
      { name: "Analytics", icon: <BarChart className="h-5 w-5" />, href: "/admin?tab=analytics" },
      { name: "AI Features", icon: <Brain className="h-5 w-5" />, href: "/ai-features" },
      { name: "Audit Logs", icon: <FileText className="h-5 w-5" />, href: "/admin?tab=audit-logs" },
      { name: "Profile", icon: <User className="h-5 w-5" />, href: "/profile" },
    ];

    switch (userType) {
      case "faculty":
        return facultyNavItems;
      case "admin":
        return adminNavItems;
      default:
        return studentNavItems;
    }
  };

  const navItems = getNavItems();

  // Animation variants
  const sidebarVariants = {
    open: {
      width: "16rem",
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    closed: {
      width: "4.5rem",
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <motion.aside
        initial={false}
        animate={isSidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className={`fixed inset-y-0 left-0 z-10 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${isMobileMenuOpen ? "block lg:hidden" : "hidden lg:block"}`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="h-7 w-7 text-edu-blue" />
              {isSidebarOpen && (
                <span className="text-xl font-bold edu-gradient-text">EduMentor AI</span>
              )}
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
              {navItems.map((item) => {
                const isItemActive = isActive(item.href.split("?")[0]);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-4 py-3 text-gray-700 rounded-lg transition-colors ${
                      isItemActive
                        ? "bg-edu-blue/10 text-edu-blue font-medium"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <span className={isItemActive ? "text-edu-blue" : ""}>{item.icon}</span>
                    {isSidebarOpen && <span className="ml-3">{item.name}</span>}
                  </Link>
                );
              })}
            </nav>

            <div className="px-4 mt-4">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                {isSidebarOpen && "Sign Out"}
              </Button>
            </div>
          </div>
        </div>
      </motion.aside>

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
              <button
                onClick={toggleSidebar}
                className="hidden lg:block text-gray-500 hover:text-gray-900 mr-4"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-semibold text-gray-800">
                {userType.charAt(0).toUpperCase() + userType.slice(1)} Dashboard
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700 hidden md:inline-block">
                  {profile?.first_name
                    ? `${profile.first_name} ${profile.last_name || ""}`
                    : user?.email}
                </span>
                <Avatar className="h-9 w-9 cursor-pointer" onClick={() => navigate('/profile')}>
                  <AvatarImage src={profile?.avatar_url || ""} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
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
