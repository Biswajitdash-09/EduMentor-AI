
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Leaderboard from "@/components/Leaderboard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Target, User, Users } from "lucide-react";

const LeaderboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-2">Leaderboard & Achievements</h1>
        <p className="text-gray-500 mb-8">
          Compare your progress with other students and earn badges as you learn.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 text-edu-blue mr-2" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-edu-blue/10 flex items-center justify-center mr-3">
                        <Medal className="h-5 w-5 text-edu-blue" />
                      </div>
                      <div>
                        <div className="font-medium">Course Completion</div>
                        <div className="text-sm text-gray-500">Complete your first course</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-gray-100">
                      0/1
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-edu-blue/10 flex items-center justify-center mr-3">
                        <Target className="h-5 w-5 text-edu-blue" />
                      </div>
                      <div>
                        <div className="font-medium">Perfect Score</div>
                        <div className="text-sm text-gray-500">Score 100% on an assessment</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-gray-100">
                      0/1
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-edu-blue/10 flex items-center justify-center mr-3">
                        <Users className="h-5 w-5 text-edu-blue" />
                      </div>
                      <div>
                        <div className="font-medium">Community Contributor</div>
                        <div className="text-sm text-gray-500">Help other students</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-gray-100">
                      0/1
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 text-edu-purple mr-2" />
                  Your Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Points earned:</span>
                    <span className="font-medium">0 pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Courses completed:</span>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Assessments taken:</span>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Current rank:</span>
                    <span className="font-medium">Beginner</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Leaderboard />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LeaderboardPage;
