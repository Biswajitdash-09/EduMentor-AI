
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Users,
  ClipboardList,
  BellRing,
  PlusCircle,
  Search,
  FilterX,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";

import FacultyCourses from "@/components/faculty/FacultyCourses";
import FacultyStudents from "@/components/faculty/FacultyStudents";
import FacultyAssignments from "@/components/faculty/FacultyAssignments";
import FacultyAnnouncements from "@/components/faculty/FacultyAnnouncements";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

const FacultyDashboard = () => {
  const { profile, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("courses");
  const { toast } = useToast();
  const navigate = useNavigate();

  if (authLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="h-12 w-12 animate-spin text-edu-blue" />
        </div>
      </DashboardLayout>
    );
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <DashboardLayout>
      <motion.div 
        className="space-y-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Faculty Dashboard
            </h1>
            <p className="text-gray-500">
              Manage your courses, students, assignments, and announcements
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Tabs 
            defaultValue="courses" 
            value={activeTab} 
            onValueChange={handleTabChange}
            className="w-full"
          >
            <div className="flex justify-between items-center mb-6">
              <TabsList className="bg-muted overflow-x-auto max-w-full">
                <TabsTrigger value="courses" className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  <span>Courses</span>
                </TabsTrigger>
                <TabsTrigger value="students" className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  <span>Students</span>
                </TabsTrigger>
                <TabsTrigger value="assignments" className="flex items-center">
                  <ClipboardList className="h-4 w-4 mr-2" />
                  <span>Assignments</span>
                </TabsTrigger>
                <TabsTrigger value="announcements" className="flex items-center">
                  <BellRing className="h-4 w-4 mr-2" />
                  <span>Announcements</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="transition-all duration-200 ease-in-out">
              <TabsContent value="courses">
                <FacultyCourses />
              </TabsContent>
              <TabsContent value="students">
                <FacultyStudents />
              </TabsContent>
              <TabsContent value="assignments">
                <FacultyAssignments />
              </TabsContent>
              <TabsContent value="announcements">
                <FacultyAnnouncements />
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default FacultyDashboard;
