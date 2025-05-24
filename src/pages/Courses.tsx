
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, Play, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/DashboardLayout';
import VideoEmbed from '@/components/VideoEmbed';
import { Course, coursesData, getCourseById } from '@/data/coursesData';

// Import the new components
import CourseCard from '@/components/courses/CourseCard';
import VideoLectureCard from '@/components/courses/VideoLectureCard';
import CourseProgress from '@/components/courses/CourseProgress';
import CourseSearch from '@/components/courses/CourseSearch';

const Courses = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const userType = profile?.user_type || 'student';

  // Initialize with sample enrolled courses
  useEffect(() => {
    if (userType === 'student') {
      const sampleEnrolled = [
        coursesData.machinelearning101,
        coursesData.calculusBasics,
        coursesData.worldHistory
      ].map(course => ({ ...course, progress: Math.floor(Math.random() * 100) }));
      setEnrolledCourses(sampleEnrolled);
    }
  }, [userType]);

  const enrollInCourse = async (courseId: string) => {
    if (!user) {
      navigate('/signin/student');
      return;
    }

    try {
      // Check if already enrolled
      const isAlreadyEnrolled = enrolledCourses.some(course => course.id === courseId);
      if (isAlreadyEnrolled) {
        toast({
          title: "Already Enrolled",
          description: "You are already enrolled in this course.",
          variant: "destructive"
        });
        return;
      }

      const courseToAdd = getCourseById(courseId);
      if (courseToAdd) {
        setEnrolledCourses(prev => [...prev, { ...courseToAdd, progress: 0 }]);
        toast({
          title: "Enrollment Successful",
          description: `You have been enrolled in ${courseToAdd.title}`,
        });
      }
    } catch (error) {
      console.error('Enrollment error:', error);
      toast({
        title: "Enrollment Failed",
        description: "There was an error enrolling in the course. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleViewCourse = (courseId: string) => {
    const course = enrolledCourses.find(c => c.id === courseId);
    if (course) {
      setSelectedCourse(course);
    }
  };

  const handlePlayVideo = (videoId: string) => {
    setCurrentVideoId(videoId);
  };

  // Get all available courses
  const allCourses = Object.values(coursesData);
  
  // Filter available courses (not enrolled)
  const availableCourses = allCourses.filter(
    course => !enrolledCourses.some(enrolled => enrolled.id === course.id)
  );

  // Filter courses based on search and filters
  const filteredCourses = availableCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           course.title.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || 
                             course.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  // Calculate progress statistics
  const completedCourses = enrolledCourses.filter(course => course.progress === 100).length;
  const averageProgress = enrolledCourses.length > 0 
    ? Math.round(enrolledCourses.reduce((sum, course) => sum + (course.progress || 0), 0) / enrolledCourses.length)
    : 0;
  const totalStudyHours = enrolledCourses.length * 25; // Approximate hours

  if (userType === 'student') {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">My Courses</h1>
              <p className="text-gray-600">Continue learning and explore new courses</p>
            </div>
          </div>

          <CourseProgress
            totalCourses={enrolledCourses.length}
            completedCourses={completedCourses}
            averageProgress={averageProgress}
            totalHours={totalStudyHours}
          />

          <Tabs defaultValue="enrolled" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="enrolled">My Courses ({enrolledCourses.length})</TabsTrigger>
              <TabsTrigger value="browse">Browse Courses</TabsTrigger>
            </TabsList>

            <TabsContent value="enrolled" className="space-y-6">
              {enrolledCourses.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Enrolled Courses</h3>
                    <p className="text-gray-600 mb-4">Start your learning journey by enrolling in a course.</p>
                    <Button onClick={() => setSelectedCategory('browse')}>
                      Browse Courses
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {enrolledCourses.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      onViewCourse={handleViewCourse}
                      isEnrolled={true}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="browse" className="space-y-6">
              <CourseSearch
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedDifficulty={selectedDifficulty}
                onDifficultyChange={setSelectedDifficulty}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onEnroll={enrollInCourse}
                    isEnrolled={false}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Course Detail Modal */}
          {selectedCourse && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>{selectedCourse.title}</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedCourse(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[60vh]">
                    <div className="space-y-4">
                      <p className="text-gray-600">{selectedCourse.description}</p>
                      
                      {selectedCourse.videoLectures && (
                        <div>
                          <h3 className="font-semibold mb-3">Video Lectures</h3>
                          <div className="space-y-3">
                            {selectedCourse.videoLectures.map((lecture) => (
                              <VideoLectureCard
                                key={lecture.id}
                                lecture={lecture}
                                onPlay={handlePlayVideo}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Video Player Modal */}
          {currentVideoId && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
              <div className="w-full max-w-4xl">
                <div className="flex justify-end mb-4">
                  <Button variant="ghost" size="sm" onClick={() => setCurrentVideoId(null)}>
                    <X className="h-4 w-4 text-white" />
                  </Button>
                </div>
                <VideoEmbed videoId={currentVideoId} />
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    );
  }

  // Faculty/Admin view
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Course Management</h1>
            <p className="text-gray-600">Manage and create courses for students</p>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Course Overview</TabsTrigger>
            <TabsTrigger value="manage">Manage Courses</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="manage">
            <Card>
              <CardHeader>
                <CardTitle>Course Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p>This section is under development and will allow faculty and admins to create and manage courses.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Courses;
