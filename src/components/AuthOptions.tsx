
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { BookUser, GraduationCap, Users } from "lucide-react";
import { Link } from "react-router-dom";

const AuthOptions = () => {
  return (
    <div className="py-12 container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2 edu-gradient-text">
          Choose How to Access EduMentor AI
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select the option that best fits your needs. Sign in for personalized experience or continue as a guest.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <Card className="border-0 card-shadow hover-scale">
          <CardHeader className="pb-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-r from-edu-blue to-edu-blue-light">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <CardTitle>Sign in as Student</CardTitle>
            <CardDescription>Access your personalized dashboard and learning path</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-edu-blue mr-2"></span>
                <span>Track your learning progress</span>
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-edu-blue mr-2"></span>
                <span>Save your tutoring history</span>
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-edu-blue mr-2"></span>
                <span>View personalized risk assessments</span>
              </li>
            </ul>
            <Button asChild className="w-full bg-edu-blue hover:bg-edu-blue-dark">
              <Link to="/signin/student">Continue as Student</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 card-shadow hover-scale">
          <CardHeader className="pb-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-r from-edu-blue-light to-edu-purple">
              <Users className="h-6 w-6 text-white" />
            </div>
            <CardTitle>Sign in as Faculty</CardTitle>
            <CardDescription>Manage classes and track student performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-edu-purple mr-2"></span>
                <span>Create assessments and assignments</span>
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-edu-purple mr-2"></span>
                <span>Monitor class performance</span>
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-edu-purple mr-2"></span>
                <span>View student risk predictions</span>
              </li>
            </ul>
            <Button asChild className="w-full bg-edu-purple hover:bg-edu-purple-light">
              <Link to="/signin/faculty">Continue as Faculty</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 card-shadow hover-scale">
          <CardHeader className="pb-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-r from-edu-purple to-edu-purple-light">
              <BookUser className="h-6 w-6 text-white" />
            </div>
            <CardTitle>Continue as Guest</CardTitle>
            <CardDescription>Access features without creating an account</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-edu-purple-light mr-2"></span>
                <span>Try AI tutoring features</span>
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-edu-purple-light mr-2"></span>
                <span>Access sample assessments</span>
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-edu-purple-light mr-2"></span>
                <span>Explore the platform capabilities</span>
              </li>
            </ul>
            <Button asChild variant="outline" className="w-full border-edu-purple-light text-edu-purple hover:bg-edu-purple/10">
              <Link to="/dashboard/guest">Continue as Guest</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-500 text-sm">
          Administrator access? <Link to="/signin/admin" className="text-edu-blue hover:underline">Sign in to admin dashboard</Link>
        </p>
      </div>
    </div>
  );
};

export default AuthOptions;
