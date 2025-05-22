
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Download,
  Users,
  BookOpen,
  GraduationCap,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const enrollmentData = [
  { month: 'Jan', count: 65 },
  { month: 'Feb', count: 78 },
  { month: 'Mar', count: 82 },
  { month: 'Apr', count: 95 },
  { month: 'May', count: 110 },
];

const courseCompletionData = [
  { name: 'Introduction to AI', students: 45, completed: 32 },
  { name: 'Data Science Basics', students: 38, completed: 25 },
  { name: 'Machine Learning', students: 30, completed: 18 },
  { name: 'Web Development', students: 28, completed: 22 },
  { name: 'Mobile App Dev', students: 25, completed: 15 },
];

const userActivityData = [
  { day: 'Mon', active: 120 },
  { day: 'Tue', active: 132 },
  { day: 'Wed', active: 145 },
  { day: 'Thu', active: 130 },
  { day: 'Fri', active: 137 },
  { day: 'Sat', active: 78 },
  { day: 'Sun', active: 65 },
];

const AdminAnalytics = () => {
  const [dateRange, setDateRange] = useState("last-30-days");
  
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <BarChart className="mr-2 h-6 w-6" />
            Analytics & Reports
          </h2>
          <p className="text-gray-500">
            View platform metrics and generate reports
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="last-7-days">Last 7 Days</SelectItem>
              <SelectItem value="last-30-days">Last 30 Days</SelectItem>
              <SelectItem value="last-90-days">Last 90 Days</SelectItem>
              <SelectItem value="year-to-date">Year to Date</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="flex items-center">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-gray-500" />
                <span className="text-2xl font-bold">1,245</span>
              </div>
              <div className="flex items-center text-green-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span className="text-sm">+12%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Active Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4 text-gray-500" />
                <span className="text-2xl font-bold">42</span>
              </div>
              <div className="flex items-center text-green-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span className="text-sm">+5%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Course Completion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <GraduationCap className="mr-2 h-4 w-4 text-gray-500" />
                <span className="text-2xl font-bold">67%</span>
              </div>
              <div className="flex items-center text-red-600">
                <ArrowDownRight className="h-4 w-4 mr-1" />
                <span className="text-sm">-2%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Daily Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-gray-500" />
                <span className="text-2xl font-bold">328</span>
              </div>
              <div className="flex items-center text-green-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span className="text-sm">+8%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>New Enrollments</CardTitle>
            <CardDescription>Monthly student enrollment trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#4F46E5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>User Activity</CardTitle>
            <CardDescription>Daily active users this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="active"
                    stroke="#4F46E5"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Course Completion Rates</CardTitle>
          <CardDescription>Students enrolled vs completed by course</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={courseCompletionData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="students" stackId="a" fill="#4F46E5" name="Students Enrolled" />
                <Bar dataKey="completed" stackId="b" fill="#8B5CF6" name="Completed Course" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button className="bg-edu-blue hover:bg-edu-blue-dark">
          <Download className="mr-2 h-4 w-4" /> Download Full Report
        </Button>
      </div>
    </motion.div>
  );
};

export default AdminAnalytics;
