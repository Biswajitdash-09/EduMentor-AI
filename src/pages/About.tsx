
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GraduationCap } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 edu-gradient-text">
                About EduMentor AI
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Revolutionizing education through artificial intelligence and personalized learning experiences.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-50 p-8 rounded-xl mb-10">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <GraduationCap className="mr-2 text-edu-blue" /> Our Vision
                </h2>
                <p className="text-gray-700 mb-4">
                  At EduMentor AI, we envision a world where quality education is accessible to everyone, everywhere. 
                  We believe that every student deserves personalized support that adapts to their unique learning style, 
                  pace, and needs.
                </p>
                <p className="text-gray-700">
                  Our platform harnesses the power of artificial intelligence to create a learning environment that 
                  understands each student's strengths and challenges, providing targeted support exactly when and 
                  where it's needed most.
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-xl mb-10">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <GraduationCap className="mr-2 text-edu-purple" /> Our Mission
                </h2>
                <p className="text-gray-700 mb-4">
                  Our mission is to transform educational outcomes by creating intelligent tools that empower both 
                  students and educators. We aim to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li>Provide 24/7 personalized academic support through AI tutoring</li>
                  <li>Streamline assessment creation and grading to save educators' time</li>
                  <li>Identify at-risk students early and recommend effective interventions</li>
                  <li>Bridge educational gaps through technology that scales</li>
                  <li>Make quality education more accessible and equitable for all</li>
                </ul>
                <p className="text-gray-700">
                  Through these efforts, we're working to create a future where every student has the opportunity 
                  to reach their full potential.
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-xl mb-10">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <GraduationCap className="mr-2 text-edu-blue-light" /> AI in Education
                </h2>
                <p className="text-gray-700 mb-4">
                  The integration of artificial intelligence in education represents a paradigm shift in how we approach 
                  teaching and learning. AI enables:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div className="border border-gray-200 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Personalization at Scale</h3>
                    <p className="text-gray-600 text-sm">
                      Creating individualized learning experiences that would be impossible to deliver manually to large numbers of students.
                    </p>
                  </div>
                  <div className="border border-gray-200 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Data-Driven Insights</h3>
                    <p className="text-gray-600 text-sm">
                      Analyzing patterns across vast amounts of educational data to identify effective strategies and interventions.
                    </p>
                  </div>
                  <div className="border border-gray-200 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Continuous Adaptation</h3>
                    <p className="text-gray-600 text-sm">
                      Learning systems that evolve based on student interactions and outcomes, becoming more effective over time.
                    </p>
                  </div>
                  <div className="border border-gray-200 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Accessibility</h3>
                    <p className="text-gray-600 text-sm">
                      Breaking down barriers to education through technology that can reach students anywhere, anytime.
                    </p>
                  </div>
                </div>
                <p className="text-gray-700">
                  At EduMentor AI, we're at the forefront of this educational transformation, thoughtfully integrating AI 
                  in ways that enhance human connection rather than replace it.
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-xl">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <GraduationCap className="mr-2 text-edu-purple-light" /> Our Team
                </h2>
                <p className="text-gray-700 mb-6">
                  EduMentor AI was founded by a team of educators, technologists, and AI specialists who share a passion 
                  for improving education through innovation. Our diverse backgrounds span K-12 teaching, university research, 
                  machine learning, and educational psychology, giving us a holistic understanding of the challenges and 
                  opportunities in modern education.
                </p>
                <p className="text-gray-700">
                  We are committed to responsible AI development, ensuring that our tools enhance the educational experience 
                  while maintaining the highest standards of privacy, security, and ethical use of technology in learning environments.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
