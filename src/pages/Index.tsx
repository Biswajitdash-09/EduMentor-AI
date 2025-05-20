
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import FeatureSection from "@/components/FeatureSection";
import AuthOptions from "@/components/AuthOptions";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
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
