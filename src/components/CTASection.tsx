
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-edu-bg-gradient-start to-edu-bg-gradient-end text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Transform Your Learning Experience?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Join thousands of students and educators already using EduMentor AI to enhance their learning journey.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-white text-edu-blue hover:bg-gray-100 hover-scale">
            <Link to="/signup">Create Free Account</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 hover-scale">
            <Link to="/dashboard/guest">Try Demo</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
