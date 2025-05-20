
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ListChecks, MessageSquare, UserPlus, AlertTriangle } from "lucide-react";

const GuestDashboard = () => {
  const navigate = useNavigate();
  const [guestId, setGuestId] = useState<string>("");

  useEffect(() => {
    // Generate a temporary guest ID and store in localStorage
    const storedGuestId = localStorage.getItem('guestId');
    if (!storedGuestId) {
      const newGuestId = `guest_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('guestId', newGuestId);
      setGuestId(newGuestId);
    } else {
      setGuestId(storedGuestId);
    }
  }, []);

  const handleSignUp = () => {
    navigate('/signup/student');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm z-10">
        <div className="container mx-auto flex items-center justify-between p-4">
          <h1 className="text-xl font-semibold text-gray-800">
            Guest Mode
          </h1>
          <div className="flex items-center">
            <Button 
              onClick={handleSignUp}
              className="bg-edu-blue hover:bg-edu-blue-dark"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Sign Up
            </Button>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  You're browsing in guest mode. Your progress and settings will not be saved after you close the browser.
                  <Button 
                    variant="link"
                    className="p-0 h-auto text-yellow-700 underline ml-1"
                    onClick={handleSignUp}
                  >
                    Sign up for free
                  </Button> to access all features.
                </p>
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-tight mb-6">
            Welcome to EduMentor AI!
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-medium flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-edu-blue" />
                  Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Explore available courses and learning materials.</p>
                <Button 
                  variant="link" 
                  className="p-0 mt-2 h-auto text-edu-blue"
                  onClick={() => navigate("/signin/student")}
                >
                  Sign in to access courses
                </Button>
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
                <p className="text-gray-500">Preview available assessments and quizzes.</p>
                <Button 
                  variant="link" 
                  className="p-0 mt-2 h-auto text-edu-purple"
                  onClick={() => navigate("/signin/student")}
                >
                  Sign in to take assessments
                </Button>
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
                <p className="text-gray-500">Try a limited version of our AI tutoring system.</p>
                <Button 
                  variant="link" 
                  className="p-0 mt-2 h-auto text-edu-blue-light"
                  onClick={() => navigate("/signin/student")}
                >
                  Sign in for full access
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
            <h2 className="text-2xl font-semibold mb-4">Why Create an Account?</h2>
            <ul className="space-y-3">
              <li className="flex">
                <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-edu-blue text-white mr-3">1</span>
                <div>
                  <h3 className="font-medium">Track your learning progress</h3>
                  <p className="text-gray-500">Save your course progress and assessment scores.</p>
                </div>
              </li>
              <li className="flex">
                <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-edu-purple text-white mr-3">2</span>
                <div>
                  <h3 className="font-medium">Personalized recommendations</h3>
                  <p className="text-gray-500">Get course and content recommendations based on your interests.</p>
                </div>
              </li>
              <li className="flex">
                <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-edu-blue-light text-white mr-3">3</span>
                <div>
                  <h3 className="font-medium">Unlimited AI tutoring</h3>
                  <p className="text-gray-500">Get unlimited help with difficult concepts and homework questions.</p>
                </div>
              </li>
            </ul>
            
            <div className="mt-6 flex justify-center">
              <Button 
                onClick={handleSignUp}
                className="bg-edu-blue hover:bg-edu-blue-dark"
              >
                Create Free Account
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GuestDashboard;
