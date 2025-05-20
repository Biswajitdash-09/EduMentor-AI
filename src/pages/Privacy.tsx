
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 edu-gradient-text">Privacy Policy</h1>
          
          <div className="prose prose-lg">
            <p className="mb-4">
              Last Updated: May 20, 2025
            </p>
            
            <p className="mb-6">
              This Privacy Policy describes how EduMentor AI ("we", "our", or "us") collects, uses, and shares your 
              personal information when you use our website and services.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">Information We Collect</h2>
            <p className="mb-4">
              We collect information you provide directly to us when you:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Create an account</li>
              <li>Use our AI tutoring services</li>
              <li>Complete assessments</li>
              <li>Participate in courses</li>
              <li>Contact our support team</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">How We Use Your Information</h2>
            <p className="mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Provide, maintain, and improve our services</li>
              <li>Personalize your learning experience</li>
              <li>Generate performance analytics and risk assessments</li>
              <li>Communicate with you about our services</li>
              <li>Respond to your inquiries and support requests</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">Data Security</h2>
            <p className="mb-6">
              We implement appropriate technical and organizational measures to protect your personal information 
              against unauthorized or unlawful processing, accidental loss, destruction, or damage.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">Data Retention</h2>
            <p className="mb-6">
              We retain your personal information for as long as necessary to fulfill the purposes for which we 
              collected it, including for the purposes of satisfying any legal, accounting, or reporting requirements.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">Your Rights</h2>
            <p className="mb-4">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of your information</li>
              <li>Restriction of processing</li>
              <li>Data portability</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">Changes to This Policy</h2>
            <p className="mb-6">
              We may update this Privacy Policy from time to time to reflect changes to our practices or for other 
              operational, legal, or regulatory reasons. We will notify you of any material changes by posting the 
              updated Privacy Policy on our website.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4">Contact Us</h2>
            <p className="mb-6">
              If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
              <br /><br />
              <strong>Email:</strong> privacy@edumentorai.com
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
