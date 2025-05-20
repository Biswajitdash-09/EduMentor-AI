
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import FeatureSection from "@/components/FeatureSection";
import AuthOptions from "@/components/AuthOptions";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const Index = () => {
  const { user, loading } = useAuth();

  // Redirect to dashboard if already logged in
  if (user && !loading) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroBanner />
      <FeatureSection />
      <AuthOptions />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
