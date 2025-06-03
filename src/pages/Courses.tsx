
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import BackButton from "@/components/common/BackButton";
import NewCourseCard from "@/components/courses/NewCourseCard";
import CourseProgress from "@/components/courses/CourseProgress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";
import { newCoursesData } from "@/data/newCoursesData";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const navigate = useNavigate();

  const categories = ["All", ...Array.from(new Set(newCoursesData.map(course => course.category)))];
  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredCourses = newCoursesData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All" || course.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const enrolledCourses = filteredCourses.filter(course => course.isEnrolled);
  const availableCourses = filteredCourses.filter(course => !course.isEnrolled);

  const handleCourseEnroll = (courseId: string) => {
    navigate(`/courses/${courseId}/enroll`);
  };

  const handleCourseContinue = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  // Calculate progress data
  const totalEnrolled = newCoursesData.filter(c => c.isEnrolled).length;
  const totalCompleted = newCoursesData.filter(c => c.isEnrolled && (c.progress || 0) >= 100).length;
  const averageProgress = totalEnrolled > 0 
    ? Math.round(newCoursesData.filter(c => c.isEnrolled).reduce((sum, c) => sum + (c.progress || 0), 0) / totalEnrolled)
    : 0;
  const totalHours = totalEnrolled * 6; // Mock calculation

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <BackButton />
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
            <p className="text-gray-500">Discover and enroll in courses to expand your knowledge</p>
          </div>
        </div>

        {/* Progress Overview */}
        <CourseProgress 
          totalCourses={totalEnrolled}
          completedCourses={totalCompleted}
          averageProgress={averageProgress}
          totalHours={totalHours}
        />

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <div className="flex gap-1 flex-wrap">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-1 flex-wrap">
                  {difficulties.map((difficulty) => (
                    <Badge
                      key={difficulty}
                      variant={selectedDifficulty === difficulty ? "secondary" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedDifficulty(difficulty)}
                    >
                      {difficulty}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enrolled Courses */}
        {enrolledCourses.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Your Enrolled Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => (
                  <NewCourseCard
                    key={course.id}
                    course={course}
                    onEnroll={handleCourseEnroll}
                    onContinue={handleCourseContinue}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Available Courses */}
        <Card>
          <CardHeader>
            <CardTitle>Available Courses</CardTitle>
          </CardHeader>
          <CardContent>
            {availableCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableCourses.map((course) => (
                  <NewCourseCard
                    key={course.id}
                    course={course}
                    onEnroll={handleCourseEnroll}
                    onContinue={handleCourseContinue}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No courses found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                    setSelectedDifficulty("All");
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Courses;
