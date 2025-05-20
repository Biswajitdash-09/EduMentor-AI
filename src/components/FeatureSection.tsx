
import { BookUser, CalendarCheck, GraduationCap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FeatureSection = () => {
  const features = [
    {
      title: "Personalized AI Tutors",
      description: "Design intelligent tutors for real-time doubt solving and adaptive learning.",
      icon: GraduationCap,
      color: "from-edu-blue to-edu-blue-light"
    },
    {
      title: "Automated Assessment Tools",
      description: "Build systems for generating and grading tests automatically.",
      icon: BookUser,
      color: "from-edu-blue-light to-edu-purple"
    },
    {
      title: "Student Risk Prediction",
      description: "Use AI to identify at-risk students and recommend timely interventions.",
      icon: CalendarCheck,
      color: "from-edu-purple to-edu-purple-light"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 edu-gradient-text">
            Transforming Education with AI
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform combines cutting-edge AI technology with educational expertise to create a comprehensive learning experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 card-shadow hover-scale">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-r ${feature.color}`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                <CardDescription className="text-gray-600">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  {index === 0 && (
                    <>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-edu-blue mr-2"></span>
                        <span>24/7 accessible AI-powered tutoring</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-edu-blue mr-2"></span>
                        <span>Personalized learning paths</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-edu-blue mr-2"></span>
                        <span>Subject expertise across disciplines</span>
                      </li>
                    </>
                  )}
                  {index === 1 && (
                    <>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-edu-purple mr-2"></span>
                        <span>Auto-generated quizzes and tests</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-edu-purple mr-2"></span>
                        <span>Instant grading and feedback</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-edu-purple mr-2"></span>
                        <span>Detailed performance analytics</span>
                      </li>
                    </>
                  )}
                  {index === 2 && (
                    <>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-edu-purple-light mr-2"></span>
                        <span>Early intervention recommendations</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-edu-purple-light mr-2"></span>
                        <span>Attendance and performance tracking</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-edu-purple-light mr-2"></span>
                        <span>Personalized success strategies</span>
                      </li>
                    </>
                  )}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
