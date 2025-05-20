
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-edu-blue" />
          <Link to="/" className="text-2xl font-bold edu-gradient-text">
            EduMentor AI
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-edu-blue font-medium transition-colors">
            Home
          </Link>
          <Link to="/features" className="text-gray-700 hover:text-edu-blue font-medium transition-colors">
            Features
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-edu-blue font-medium transition-colors">
            About
          </Link>
          <Button variant="outline" className="mr-2">
            Sign In
          </Button>
          <Button className="bg-edu-blue hover:bg-edu-blue-dark">
            Sign Up
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4 px-4 absolute top-16 left-0 w-full z-50 animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-edu-blue font-medium transition-colors px-4 py-2"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              to="/features" 
              className="text-gray-700 hover:text-edu-blue font-medium transition-colors px-4 py-2"
              onClick={toggleMenu}
            >
              Features
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-edu-blue font-medium transition-colors px-4 py-2"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Button variant="outline" className="w-full" onClick={toggleMenu}>
              Sign In
            </Button>
            <Button className="w-full bg-edu-blue hover:bg-edu-blue-dark" onClick={toggleMenu}>
              Sign Up
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
