
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import {
  UserCog,
  Settings,
  BarChart,
  FileText,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";

import AdminUserManagement from "@/components/admin/AdminUserManagement";
import AdminSiteSettings from "@/components/admin/AdminSiteSettings";
import AdminAnalytics from "@/components/admin/AdminAnalytics";
import AdminAuditLogs from "@/components/admin/AdminAuditLogs";

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

const AdminDashboard = () => {
  const { profile, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("user-management");
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
              Admin Dashboard
            </h1>
            <p className="text-gray-500">
              Manage users, site settings, analytics, and audit logs
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Tabs 
            defaultValue="user-management" 
            value={activeTab} 
            onValueChange={handleTabChange}
            className="w-full"
          >
            <div className="flex justify-between items-center mb-6">
              <TabsList className="bg-muted overflow-x-auto max-w-full">
                <TabsTrigger value="user-management" className="flex items-center">
                  <UserCog className="h-4 w-4 mr-2" />
                  <span>User Management</span>
                </TabsTrigger>
                <TabsTrigger value="site-settings" className="flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  <span>Site Settings</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center">
                  <BarChart className="h-4 w-4 mr-2" />
                  <span>Analytics</span>
                </TabsTrigger>
                <TabsTrigger value="audit-logs" className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  <span>Audit Logs</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="transition-all duration-200 ease-in-out">
              <TabsContent value="user-management">
                <AdminUserManagement />
              </TabsContent>
              <TabsContent value="site-settings">
                <AdminSiteSettings />
              </TabsContent>
              <TabsContent value="analytics">
                <AdminAnalytics />
              </TabsContent>
              <TabsContent value="audit-logs">
                <AdminAuditLogs />
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
