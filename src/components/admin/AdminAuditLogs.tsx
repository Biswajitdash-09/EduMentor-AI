
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Search,
  Download,
  Calendar,
  Filter,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const auditLogs = [
  {
    id: 1,
    timestamp: "2025-05-22 09:34:21",
    userId: "user_01",
    userName: "John Doe",
    eventType: "user.login",
    status: "success",
    ipAddress: "192.168.1.1",
    details: { browser: "Chrome 98.0.4758", os: "Windows 11", location: "New York, US" }
  },
  {
    id: 2,
    timestamp: "2025-05-22 08:15:42",
    userId: "user_03",
    userName: "Emma Wilson",
    eventType: "course.created",
    status: "success",
    ipAddress: "192.168.1.5",
    details: { courseId: "course_27", courseName: "Introduction to AI" }
  },
  {
    id: 3,
    timestamp: "2025-05-22 07:55:18",
    userId: "user_05",
    userName: "Robert Johnson",
    eventType: "user.logout",
    status: "success",
    ipAddress: "192.168.2.12",
    details: { browser: "Firefox 97.0", os: "macOS 12.3", location: "California, US" }
  },
  {
    id: 4,
    timestamp: "2025-05-21 16:42:33",
    userId: "user_12",
    userName: "Sarah Brown",
    eventType: "user.password_reset",
    status: "success",
    ipAddress: "192.168.5.8",
    details: { requestedAt: "2025-05-21 16:40:21" }
  },
  {
    id: 5,
    timestamp: "2025-05-21 14:25:07",
    userId: "user_08",
    userName: "Michael Chen",
    eventType: "assignment.submitted",
    status: "success",
    ipAddress: "192.168.3.45",
    details: { assignmentId: "assign_123", courseId: "course_15", courseName: "Data Science" }
  },
  {
    id: 6,
    timestamp: "2025-05-21 11:18:51",
    userId: "user_04",
    userName: "David Wilson",
    eventType: "user.login",
    status: "failed",
    ipAddress: "203.145.87.29",
    details: { reason: "Invalid password", attempts: 2, browser: "Chrome", location: "Unknown" }
  },
  {
    id: 7,
    timestamp: "2025-05-21 10:05:32",
    userId: "user_01",
    userName: "John Doe",
    eventType: "user.role_changed",
    status: "success",
    ipAddress: "192.168.1.1",
    details: { oldRole: "student", newRole: "faculty", changedBy: "user_admin_01" }
  },
];

function getEventTypeBadgeColor(eventType: string) {
  if (eventType.startsWith("user.login") || eventType.startsWith("user.logout")) {
    return "bg-blue-100 text-blue-800";
  } else if (eventType.startsWith("user.") || eventType.includes("user")) {
    return "bg-purple-100 text-purple-800";
  } else if (eventType.startsWith("course.") || eventType.includes("course")) {
    return "bg-green-100 text-green-800";
  } else if (eventType.startsWith("assignment.") || eventType.includes("assignment")) {
    return "bg-amber-100 text-amber-800";
  } else {
    return "bg-gray-100 text-gray-800";
  }
}

function getStatusBadgeColor(status: string) {
  return status === "success" 
    ? "bg-green-100 text-green-800"
    : "bg-red-100 text-red-800";
}

const AdminAuditLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedLog, setExpandedLog] = useState<number | null>(null);
  const [eventTypeFilter, setEventTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = 
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.eventType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ipAddress.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesEventType = eventTypeFilter === "all" || log.eventType.startsWith(eventTypeFilter);
    const matchesStatus = statusFilter === "all" || log.status === statusFilter;
    
    return matchesSearch && matchesEventType && matchesStatus;
  });
  
  const toggleExpand = (id: number) => {
    setExpandedLog(expandedLog === id ? null : id);
  };
  
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <FileText className="mr-2 h-6 w-6" />
            Audit Logs
          </CardTitle>
          <CardDescription>
            Track user actions and system events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search and filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search logs by user or action..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <Input
                    type="date"
                    className="w-[160px]"
                  />
                </div>
                
                <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Event Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="user.">User Events</SelectItem>
                    <SelectItem value="course.">Course Events</SelectItem>
                    <SelectItem value="assignment.">Assignment Events</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  More Filters
                </Button>
              </div>
            </div>
            
            {/* Logs table */}
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px]">Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Event Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead className="text-right">Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.length > 0 ? (
                    filteredLogs.map((log) => (
                      <React.Fragment key={log.id}>
                        <TableRow>
                          <TableCell className="font-mono text-sm">
                            {log.timestamp}
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{log.userName}</div>
                              <div className="text-xs text-gray-500">{log.userId}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getEventTypeBadgeColor(log.eventType)}>
                              {log.eventType}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusBadgeColor(log.status)}>
                              {log.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-mono text-sm">
                            {log.ipAddress}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleExpand(log.id)}
                            >
                              {expandedLog === log.id ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                          </TableCell>
                        </TableRow>
                        
                        {expandedLog === log.id && (
                          <TableRow>
                            <TableCell colSpan={6} className="bg-gray-50">
                              <div className="p-2 text-sm">
                                <h4 className="font-medium mb-1">Event Details</h4>
                                <pre className="bg-gray-100 p-2 rounded overflow-x-auto text-xs">
                                  {JSON.stringify(log.details, null, 2)}
                                </pre>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No audit logs found matching your criteria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            <div className="flex justify-between items-center pt-2">
              <p className="text-sm text-gray-500">
                Showing {filteredLogs.length} of {auditLogs.length} logs
              </p>
              
              <Button variant="outline" className="flex items-center">
                <Download className="mr-2 h-4 w-4" />
                Export Logs
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminAuditLogs;
