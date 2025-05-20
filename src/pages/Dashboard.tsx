
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ListChecks, MessageSquare, Loader2 } from "lucide-react";

const Dashboard = () => {
  const { user, profile, loading } = useAuth();

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
      <div className="space-y-6">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-medium flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-edu-blue" />
                Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              {userType === "student" ? (
                <p className="text-gray-500">Access your enrolled courses and learning materials.</p>
              ) : (
                <p className="text-gray-500">Manage your courses and create new content.</p>
              )}
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
                <p className="text-gray-500">Take tests and view your assessment scores.</p>
              ) : (
                <p className="text-gray-500">Create and grade assessments for your students.</p>
              )}
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
              <p className="text-gray-500">Get personalized help with your academic questions.</p>
            </CardContent>
          </Card>
        </div>

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
