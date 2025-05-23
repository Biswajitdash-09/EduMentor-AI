import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
const HeroBanner = () => {
  const navigate = useNavigate();
  return <div className="bg-gradient-to-br from-edu-blue to-edu-blue-light text-white py-20 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Transform Learning with <span className="text-yellow-300">AI-Powered</span> Education
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-xl">
              EduMentor AI combines personalized tutoring, automated assessments, and early risk detection to create a comprehensive learning platform for students and educators.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-white text-edu-blue hover:bg-gray-100" onClick={() => navigate("/signup/student")}>
                Sign Up Free
              </Button>
              <Button variant="outline" onClick={() => navigate("/dashboard/guest")} className="border-white text-inherit bg-lime-950 hover:bg-lime-800">Continue as a Guest</Button>
            </div>
          </div>
          <div className="hidden lg:flex justify-end">
            <img alt="AI Education Platform" className="max-w-full h-auto" style={{
            maxHeight: '400px'
          }} src="/lovable-uploads/94bc6fe6-11a0-40a6-80aa-f3cf03f2df9b.png" />
          </div>
        </div>
      </div>
    </div>;
};
export default HeroBanner;