
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, X, Award, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  // Add scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  // Get appropriate dashboard link based on user type
  const getDashboardLink = () => {
    if (!user || !profile) return "/dashboard";
    
    switch (profile.user_type) {
      case "admin":
        return "/admin";
      case "faculty":
        return "/faculty";
      default:
        return "/student";
    }
  };

  // Animation variants
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <motion.div 
          className="flex items-center space-x-2"
          variants={itemVariants}
        >
          <GraduationCap className="h-8 w-8 text-edu-blue" />
          <Link to="/" className="text-2xl font-bold edu-gradient-text">
            EduMentor AI
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <motion.div variants={itemVariants}>
            <Link to="/" className="text-gray-700 hover:text-edu-blue font-medium transition-colors">
              Home
            </Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link to="/features" className="text-gray-700 hover:text-edu-blue font-medium transition-colors">
              Features
            </Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link to="/about" className="text-gray-700 hover:text-edu-blue font-medium transition-colors">
              About
            </Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link to="/leaderboard" className="text-gray-700 hover:text-edu-blue font-medium transition-colors flex items-center">
              <Award className="h-4 w-4 mr-1" />
              Leaderboard
            </Link>
          </motion.div>
          
          {user ? (
            <>
              <motion.div variants={itemVariants}>
                <Button 
                  variant="outline" 
                  className="mr-2"
                  onClick={() => navigate(getDashboardLink())}
                >
                  Dashboard
                </Button>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Button 
                  className="bg-edu-blue hover:bg-edu-blue-dark"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div variants={itemVariants}>
                <Button 
                  variant="outline" 
                  className="mr-2"
                  onClick={() => navigate("/signin/student")}
                >
                  Sign In
                </Button>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Button 
                  className="bg-edu-blue hover:bg-edu-blue-dark"
                  onClick={() => navigate("/signup/student")}
                >
                  Sign Up
                </Button>
              </motion.div>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <motion.button variants={itemVariants} onClick={toggleMenu} className="text-gray-700">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-white shadow-lg py-4 px-4 absolute top-16 left-0 w-full z-50"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
        >
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
            <Link
              to="/leaderboard"
              className="text-gray-700 hover:text-edu-blue font-medium transition-colors px-4 py-2 flex items-center"
              onClick={toggleMenu}
            >
              <Award className="h-4 w-4 mr-1" />
              Leaderboard
            </Link>
            
            {user ? (
              <>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => {
                    navigate(getDashboardLink());
                    toggleMenu();
                  }}
                >
                  Dashboard
                </Button>
                <Button 
                  className="w-full bg-edu-blue hover:bg-edu-blue-dark"
                  onClick={() => {
                    handleSignOut();
                    toggleMenu();
                  }}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => {
                    navigate("/signin/student");
                    toggleMenu();
                  }}
                >
                  Sign In
                </Button>
                <Button 
                  className="w-full bg-edu-blue hover:bg-edu-blue-dark"
                  onClick={() => {
                    navigate("/signup/student");
                    toggleMenu();
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
