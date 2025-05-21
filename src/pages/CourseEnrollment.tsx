
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample course data lookup
const courseTitles: Record<string, string> = {
  "1": "Introduction to Machine Learning",
  "2": "Advanced Calculus",
  "3": "World History: Modern Era",
  "4": "Introduction to Computer Science",
  "5": "Organic Chemistry",
  "6": "Business Economics",
};

const CourseEnrollment = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  
  const courseTitle = courseTitles[courseId as string] || "This Course";

  const handleEnroll = async () => {
    setIsEnrolling(true);
    
    // Simulate enrollment process
    setTimeout(() => {
      setIsEnrolling(false);
      setEnrolled(true);
      
      toast({
        title: "Enrollment Successful",
        description: `You have been enrolled in ${courseTitle}`,
      });
      
      // After showing success for a moment, redirect
      setTimeout(() => {
        navigate("/courses");
      }, 2000);
    }, 1500);
  };
  
  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Enroll in Course</CardTitle>
            <CardDescription>
              You're about to enroll in {courseTitle}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-t border-b py-4 my-4">
              <h3 className="font-medium mb-2">Course Details:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Full access to all course materials</li>
                <li>Video lectures with expert instructors</li>
                <li>Interactive quizzes and assignments</li>
                <li>Certificate upon completion</li>
                <li>Access to discussion forums</li>
              </ul>
            </div>
            
            {enrolled && (
              <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <div>
                  <h4 className="font-medium text-green-800">Enrollment Successful!</h4>
                  <p className="text-green-700 text-sm">Redirecting you to courses...</p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => navigate("/courses")}
              disabled={isEnrolling || enrolled}
            >
              Cancel
            </Button>
            <Button 
              className="bg-edu-blue hover:bg-edu-blue-dark"
              onClick={handleEnroll}
              disabled={isEnrolling || enrolled}
            >
              {isEnrolling ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enrolling...
                </>
              ) : (
                "Confirm Enrollment"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CourseEnrollment;
