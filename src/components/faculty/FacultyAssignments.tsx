
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ClipboardList, Plus, Calendar, FileUp, Download } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

const assignments = [
  {
    id: "1",
    title: "Introduction to AI Concepts",
    course: "Introduction to AI",
    dueDate: new Date(2025, 5, 30),
    submissionCount: 15,
    totalStudents: 25,
  },
  {
    id: "2",
    title: "Data Analysis Project",
    course: "Data Science Basics",
    dueDate: new Date(2025, 6, 5),
    submissionCount: 8,
    totalStudents: 20,
  },
  {
    id: "3",
    title: "Machine Learning Algorithm Implementation",
    course: "Machine Learning",
    dueDate: new Date(2025, 6, 12),
    submissionCount: 3,
    totalStudents: 18,
  }
];

const FacultyAssignments = () => {
  const [newAssignmentOpen, setNewAssignmentOpen] = useState(false);
  
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Assignments</h2>
        <Dialog open={newAssignmentOpen} onOpenChange={setNewAssignmentOpen}>
          <DialogTrigger asChild>
            <Button className="bg-edu-blue hover:bg-edu-blue-dark">
              <Plus className="mr-2 h-4 w-4" /> Create Assignment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Create New Assignment</DialogTitle>
              <DialogDescription>
                Create a new assignment for your students.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="course" className="text-right">
                  Course
                </Label>
                <select
                  id="course"
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Select a course</option>
                  <option value="intro-ai">Introduction to AI</option>
                  <option value="data-science">Data Science Basics</option>
                  <option value="machine-learning">Machine Learning</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="due-date" className="text-right">
                  Due Date
                </Label>
                <Input
                  id="due-date"
                  type="date"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="instructions" className="text-right">
                  Instructions
                </Label>
                <Textarea
                  id="instructions"
                  className="col-span-3"
                  rows={5}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  Attachment
                </Label>
                <div className="col-span-3">
                  <Button variant="outline" className="w-full">
                    <FileUp className="mr-2 h-4 w-4" /> Upload File
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setNewAssignmentOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setNewAssignmentOpen(false)}>
                Create Assignment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.map((assignment) => (
          <motion.div 
            key={assignment.id} 
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{assignment.title}</CardTitle>
                <CardDescription>{assignment.course}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  Due: {format(assignment.dueDate, "MMMM d, yyyy")}
                </div>
                <div className="bg-gray-100 rounded-md p-3">
                  <p className="text-sm font-medium">Submissions</p>
                  <div className="flex items-center justify-between mt-1">
                    <span>{assignment.submissionCount} / {assignment.totalStudents}</span>
                    <span className="text-sm">{Math.round((assignment.submissionCount / assignment.totalStudents) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-edu-blue h-2 rounded-full" 
                      style={{ width: `${(assignment.submissionCount / assignment.totalStudents) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button className="flex-1">
                    View Submissions
                  </Button>
                  <Button variant="outline" className="flex items-center">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FacultyAssignments;
