
import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="h-6 w-6 text-edu-blue" />
              <span className="text-xl font-bold edu-gradient-text">EduMentor AI</span>
            </div>
            <p className="text-gray-600 mb-4">
              Transforming education with personalized AI tutoring, automated assessments, and predictive analytics.
            </p>
          </div>

          <div className="md:col-span-1">
            <h4 className="font-semibold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-edu-blue transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-600 hover:text-edu-blue transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-edu-blue transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="font-semibold text-gray-800 mb-4">Access</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/signin/student" className="text-gray-600 hover:text-edu-blue transition-colors">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link to="/signin/faculty" className="text-gray-600 hover:text-edu-blue transition-colors">
                  Faculty Portal
                </Link>
              </li>
              <li>
                <Link to="/signin/admin" className="text-gray-600 hover:text-edu-blue transition-colors">
                  Admin Console
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="font-semibold text-gray-800 mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-edu-blue transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-edu-blue transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} EduMentor AI. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Created with ❤️ by team Pixel Pirates
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
