
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const HeroBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-edu-bg-gradient-start to-edu-bg-gradient-end py-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in">
              Transform Learning with AI-Powered Education
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Personalized tutoring, automated assessments, and student success predictions—all powered by advanced AI.
            </p>
            <div className="space-x-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <Button asChild size="lg" className="bg-white text-edu-blue hover:bg-gray-100 hover-scale">
                <Link to="/dashboard/guest">Continue as Guest</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10 hover-scale">
                <Link to="/signin">Get Started</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative bg-white p-6 rounded-lg shadow-xl max-w-md">
              <div className="bg-edu-purple/10 p-4 rounded-lg mb-4 flex items-center">
                <GraduationCap className="w-8 h-8 mr-4 text-edu-purple" />
                <div>
                  <h3 className="font-semibold text-gray-800">AI Tutor</h3>
                  <p className="text-sm text-gray-600">Ready to help with any question</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <p className="text-sm">How do I solve quadratic equations?</p>
                </div>
                <div className="bg-edu-blue/10 p-3 rounded-lg">
                  <p className="text-sm">To solve a quadratic equation (ax² + bx + c = 0), you can use:</p>
                  <p className="text-sm mt-2">1. The quadratic formula: x = (-b ± √(b² - 4ac)) / 2a</p>
                  <p className="text-sm mt-2">2. Factoring: If you can write ax² + bx + c = (px + q)(rx + s)</p>
                  <p className="text-sm mt-2">Let me show you a step-by-step example...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
