
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import BackButton from "@/components/common/BackButton";
import AssignmentCard from "@/components/assignments/AssignmentCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, TrendingUp, CheckCircle, Clock } from "lucide-react";
import { assignmentsData } from "@/data/newCoursesData";
import { useNavigate } from "react-router-dom";

const Assessments = () => {
  const navigate = useNavigate();

  const handleAssignmentStart = (assignmentId: string) => {
    navigate(`/assignments/${assignmentId}`);
  };

  const handleAssignmentView = (assignmentId: string) => {
    navigate(`/assignments/${assignmentId}/results`);
  };

  const pendingAssignments = assignmentsData.filter(a => a.status === 'pending');
  const submittedAssignments = assignmentsData.filter(a => a.status === 'submitted');
  const gradedAssignments = assignmentsData.filter(a => a.status === 'graded');
  const overdueAssignments = assignmentsData.filter(a => a.status === 'overdue');

  const totalPoints = gradedAssignments.reduce((sum, a) => sum + a.points, 0);
  const earnedPoints = gradedAssignments.reduce((sum, a) => sum + (a.earnedPoints || 0), 0);
  const averageScore = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <BackButton />
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Assessments</h1>
            <p className="text-gray-500">Track your assignments and test your knowledge</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-orange-600">{pendingAssignments.length}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{gradedAssignments.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Score</p>
                  <p className="text-2xl font-bold text-blue-600">{averageScore}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Week</p>
                  <p className="text-2xl font-bold text-purple-600">3</p>
                </div>
                <CalendarDays className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assignments Tabs */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pending" className="relative">
              Pending
              {pendingAssignments.length > 0 && (
                <Badge variant="destructive" className="ml-2 text-xs">
                  {pendingAssignments.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="submitted">
              Submitted
              {submittedAssignments.length > 0 && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {submittedAssignments.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="graded">
              Graded
              {gradedAssignments.length > 0 && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {gradedAssignments.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="overdue">
              Overdue
              {overdueAssignments.length > 0 && (
                <Badge variant="destructive" className="ml-2 text-xs">
                  {overdueAssignments.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Assignments</CardTitle>
              </CardHeader>
              <CardContent>
                {pendingAssignments.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pendingAssignments.map((assignment) => (
                      <AssignmentCard
                        key={assignment.id}
                        assignment={assignment}
                        onStart={handleAssignmentStart}
                        onView={handleAssignmentView}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No pending assignments at the moment.</p>
                    <p className="text-sm text-gray-400 mt-2">Great job staying on top of your work!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="submitted">
            <Card>
              <CardHeader>
                <CardTitle>Submitted Assignments</CardTitle>
              </CardHeader>
              <CardContent>
                {submittedAssignments.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {submittedAssignments.map((assignment) => (
                      <AssignmentCard
                        key={assignment.id}
                        assignment={assignment}
                        onStart={handleAssignmentStart}
                        onView={handleAssignmentView}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No submitted assignments awaiting grading.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="graded">
            <Card>
              <CardHeader>
                <CardTitle>Graded Assignments</CardTitle>
              </CardHeader>
              <CardContent>
                {gradedAssignments.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {gradedAssignments.map((assignment) => (
                      <AssignmentCard
                        key={assignment.id}
                        assignment={assignment}
                        onStart={handleAssignmentStart}
                        onView={handleAssignmentView}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No graded assignments yet.</p>
                    <p className="text-sm text-gray-400 mt-2">Complete some assignments to see your grades here.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="overdue">
            <Card>
              <CardHeader>
                <CardTitle>Overdue Assignments</CardTitle>
              </CardHeader>
              <CardContent>
                {overdueAssignments.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {overdueAssignments.map((assignment) => (
                      <AssignmentCard
                        key={assignment.id}
                        assignment={assignment}
                        onStart={handleAssignmentStart}
                        onView={handleAssignmentView}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No overdue assignments.</p>
                    <p className="text-sm text-gray-400 mt-2">Keep up the great work!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Assessments;
