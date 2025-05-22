
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  BellRing, 
  Plus, 
  Calendar as CalendarIcon, 
  Clock, 
  FileImage, 
  Trash,
  ExternalLink,
  Calendar as CalendarLucide
} from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

const announcements = [
  {
    id: "1",
    title: "Course Material Update",
    content: "New course materials have been uploaded for Introduction to AI. Please review before the next class session.",
    publishedDate: new Date(2025, 5, 20),
    course: "Introduction to AI",
  },
  {
    id: "2",
    title: "Guest Lecture Next Week",
    content: "We will have a guest lecturer from Google AI joining us next week to discuss recent advances in natural language processing.",
    publishedDate: new Date(2025, 5, 18),
    course: "Machine Learning",
  },
  {
    id: "3",
    title: "Assignment Deadline Extended",
    content: "The deadline for the Data Analysis Project has been extended by one week due to technical difficulties with the submission system.",
    publishedDate: new Date(2025, 5, 15),
    course: "Data Science Basics",
  },
];

const FacultyAnnouncements = () => {
  const [newAnnouncementOpen, setNewAnnouncementOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Announcements</h2>
        <Dialog open={newAnnouncementOpen} onOpenChange={setNewAnnouncementOpen}>
          <DialogTrigger asChild>
            <Button className="bg-edu-blue hover:bg-edu-blue-dark">
              <Plus className="mr-2 h-4 w-4" /> Create Announcement
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Create New Announcement</DialogTitle>
              <DialogDescription>
                Create an announcement to share with your students.
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
                  placeholder="Announcement title"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="course" className="text-right">
                  Course
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="intro-ai">Introduction to AI</SelectItem>
                    <SelectItem value="data-science">Data Science Basics</SelectItem>
                    <SelectItem value="machine-learning">Machine Learning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  Publish Date
                </Label>
                <div className="col-span-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="content" className="text-right pt-2">
                  Content
                </Label>
                <Textarea
                  id="content"
                  className="col-span-3"
                  rows={6}
                  placeholder="Write your announcement content here..."
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  Attachments
                </Label>
                <div className="col-span-3">
                  <Button type="button" variant="outline" className="w-full">
                    <FileImage className="mr-2 h-4 w-4" /> Upload Media
                  </Button>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setNewAnnouncementOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setNewAnnouncementOpen(false)}>
                Publish Announcement
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <motion.div 
            key={announcement.id} 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{announcement.title}</CardTitle>
                    <CardDescription>{announcement.course}</CardDescription>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <CalendarLucide className="h-3 w-3 mr-1" />
                    {format(announcement.publishedDate, "MMM d, yyyy")}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{announcement.content}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <ExternalLink className="mr-2 h-3 w-3" /> View Details
                </Button>
                <Button variant="ghost" size="sm" className="text-red-600">
                  <Trash className="mr-2 h-3 w-3" /> Delete
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FacultyAnnouncements;
