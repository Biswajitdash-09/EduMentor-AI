
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookUser, GraduationCap, AlertTriangle } from "lucide-react";

const Features = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 edu-gradient-text">
                Advanced AI Features for Education
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                EduMentor AI combines cutting-edge artificial intelligence with educational expertise to transform the learning experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
              {/* Feature 1 */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-r from-edu-blue to-edu-blue-light">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Personalized AI Tutors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Get 24/7 access to AI tutors that adapt to your learning style and pace.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Real-time Doubt Solving</h3>
                      <p className="text-sm text-gray-600">
                        Ask questions at any time and receive immediate, accurate responses tailored to your skill level.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Subject-wise Support</h3>
                      <p className="text-sm text-gray-600">
                        Access in-depth knowledge across mathematics, sciences, humanities, and more from specialized AI tutors.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Personalized Explanations</h3>
                      <p className="text-sm text-gray-600">
                        Receive explanations in the learning style that works best for you, with adaptive difficulty based on your progress.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Feature 2 */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-r from-edu-blue-light to-edu-purple">
                    <BookUser className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Automated Assessments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Intelligent test generation and instant grading systems to monitor and accelerate learning.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Auto-Generated Quizzes</h3>
                      <p className="text-sm text-gray-600">
                        AI creates unique, relevant questions that adapt to individual learning needs and course material.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Instant Grading & Feedback</h3>
                      <p className="text-sm text-gray-600">
                        Receive scores immediately with personalized explanations for correct answers and areas for improvement.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Detailed Analytics</h3>
                      <p className="text-sm text-gray-600">
                        Track performance over time with comprehensive reports highlighting strengths and knowledge gaps.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Feature 3 */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-r from-edu-purple to-edu-purple-light">
                    <AlertTriangle className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Risk Prediction</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Early intervention system using AI to identify and support at-risk students before academic issues arise.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Early Warning System</h3>
                      <p className="text-sm text-gray-600">
                        Predictive analytics monitor engagement patterns, assessment results, and learning behaviors to flag potential issues.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Personalized Success Strategies</h3>
                      <p className="text-sm text-gray-600">
                        Receive tailored recommendations and interventions designed to address specific challenges you're facing.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Progress Tracking</h3>
                      <p className="text-sm text-gray-600">
                        Monitor improvement over time and see the impact of interventions on academic performance and engagement.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">How Our AI Technology Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-edu-blue flex items-center justify-center mb-4 text-white font-bold text-xl">1</div>
                <h3 className="text-xl font-semibold mb-2">Data Collection</h3>
                <p className="text-gray-600">Our system securely analyzes learning patterns, assessment results, and engagement metrics.</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-edu-purple flex items-center justify-center mb-4 text-white font-bold text-xl">2</div>
                <h3 className="text-xl font-semibold mb-2">AI Processing</h3>
                <p className="text-gray-600">Advanced machine learning models interpret the data to create personalized learning insights.</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-edu-blue-light flex items-center justify-center mb-4 text-white font-bold text-xl">3</div>
                <h3 className="text-xl font-semibold mb-2">Adaptive Response</h3>
                <p className="text-gray-600">The system delivers customized content, support, and interventions based on individual needs.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Features;
