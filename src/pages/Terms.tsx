
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 edu-gradient-text">Terms of Service</h1>
          
          <div className="prose prose-lg">
            <p className="mb-4">
              Last Updated: May 20, 2025
            </p>
            
            <p className="mb-6">
              These Terms of Service ("Terms") govern your access to and use of EduMentor AI's website and services.
              By accessing or using our services, you agree to be bound by these Terms.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">1. Account Registration</h2>
            <p className="mb-6">
              To access certain features of our service, you must register for an account. When you register, you agree 
              to provide accurate and complete information. You are solely responsible for maintaining the confidentiality 
              of your account credentials and for all activities that occur under your account.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">2. User Conduct</h2>
            <p className="mb-4">
              You agree not to:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Use our services for any illegal purpose</li>
              <li>Attempt to access other users' accounts</li>
              <li>Interfere with or disrupt the integrity of our services</li>
              <li>Share your account credentials with others</li>
              <li>Use our AI tutoring services to generate harmful content</li>
              <li>Attempt to circumvent any security measures</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">3. Intellectual Property</h2>
            <p className="mb-6">
              The content, features, and functionality of our services are owned by EduMentor AI and are protected 
              by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, 
              sell, or lease any part of our services without our express permission.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">4. AI-Generated Content</h2>
            <p className="mb-6">
              Our AI tutoring service generates content in response to your queries. While we strive to provide accurate 
              and helpful information, we do not guarantee the accuracy, completeness, or reliability of AI-generated 
              content. You should verify important information through additional sources.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">5. Data Privacy</h2>
            <p className="mb-6">
              Your use of our services is also governed by our Privacy Policy, which describes how we collect, use, 
              and share your information.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">6. Subscription and Payment</h2>
            <p className="mb-6">
              Certain features of our services may require a paid subscription. Payment terms will be disclosed at 
              the time of purchase. We reserve the right to change our pricing at any time, with notice to subscribers.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">7. Termination</h2>
            <p className="mb-6">
              We may terminate or suspend your account and access to our services at our sole discretion, without 
              notice or liability, for any reason, including if you violate these Terms.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">8. Limitation of Liability</h2>
            <p className="mb-6">
              To the maximum extent permitted by law, EduMentor AI shall not be liable for any indirect, incidental, 
              special, consequential, or punitive damages, arising out of or relating to your use of our services.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">9. Changes to Terms</h2>
            <p className="mb-6">
              We may revise these Terms from time to time. The most current version will always be posted on our 
              website. By continuing to use our services after revisions become effective, you agree to be bound 
              by the revised Terms.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">10. Contact Us</h2>
            <p className="mb-6">
              If you have any questions about these Terms, please contact us at:
              <br /><br />
              <strong>Email:</strong> legal@edumentorai.com
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
