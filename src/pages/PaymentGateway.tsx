
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import PaymentForm, { PaymentFormData } from "@/components/payment/PaymentForm";
import OrderSummary from "@/components/payment/OrderSummary";
import PaymentSuccess from "@/components/payment/PaymentSuccess";

// Define interfaces for better type safety
interface PaymentPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
}

// Raw response type from Supabase
interface RawPaymentPlan {
  id: string;
  name: string;
  price: number;
  features: any; // Can be string, array, or object
}

/**
 * Helper function to convert any feature format to string array
 */
function parseFeatures(featuresData: any): string[] {
  // If it's already an array, convert all items to strings
  if (Array.isArray(featuresData)) {
    return featuresData.map(item => String(item));
  }
  
  // If it's a string, try to parse it as JSON
  if (typeof featuresData === "string") {
    try {
      const parsed = JSON.parse(featuresData);
      // Recursively parse the result
      return parseFeatures(parsed);
    } catch {
      // If parsing fails, treat it as a single string feature
      return [String(featuresData)];
    }
  }
  
  // If it's an object, convert all values to strings
  if (featuresData && typeof featuresData === "object") {
    return Object.values(featuresData).map(item => String(item));
  }
  
  // Fallback: convert to string and return as single item array
  return [String(featuresData || "")];
}

const PaymentGateway: React.FC = () => {
  const { planId } = useParams<{ planId?: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [paymentPlan, setPaymentPlan] = useState<PaymentPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Fetch plan details from Supabase
  useEffect(() => {
    const fetchPlanDetails = async () => {
      if (!planId) return;

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("payment_plans")
          .select("*")
          .eq("id", planId)
          .single();

        if (error || !data) throw error || new Error("No plan data found");
        
        // Use our helper function to parse features consistently
        const parsedFeatures = parseFeatures(data.features);
        
        setPaymentPlan({ 
          id: data.id, 
          name: data.name, 
          price: data.price, 
          features: parsedFeatures 
        });
      } catch (error: any) {
        console.error("Error fetching plan details:", error);
        toast({
          title: "Error",
          description: "Failed to load plan details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPlanDetails();
  }, [planId, toast]);

  // Handle payment form submission
  const handlePaymentSubmit = async (formData: PaymentFormData) => {
    if (!user || !paymentPlan) return;

    setProcessing(true);
    try {
      // Simulate delay
      await new Promise((res) => setTimeout(res, 2000));

      const { error } = await supabase.from("user_payments").insert({
        user_id: user.id,
        plan_id: paymentPlan.id,
        amount: paymentPlan.price,
        payment_status: "completed",
      });

      if (error) throw error;

      await supabase.rpc("increment_user_points", {
        user_id_param: user.id,
        points_to_add: 50,
      });

      setCompleted(true);
      toast({
        title: "Payment Successful",
        description: `You've successfully subscribed to the ${paymentPlan.name} plan.`,
      });
    } catch (error: any) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Failed",
        description: "There was an issue processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  // Render loading spinner
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-12">
          <LoaderCircle className="h-8 w-8 animate-spin text-edu-blue" />
        </div>
      </DashboardLayout>
    );
  }

  // Render error if plan not found
  if (!paymentPlan) {
    return (
      <DashboardLayout>
        <Card>
          <CardHeader>
            <CardTitle>Plan Not Found</CardTitle>
            <CardDescription>
              The selected plan could not be found. Please try again.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => navigate("/dashboard")}>Return to Dashboard</Button>
          </CardFooter>
        </Card>
      </DashboardLayout>
    );
  }

  // Main content
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {completed ? (
          <PaymentSuccess paymentPlan={paymentPlan} />
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>
                  Complete your subscription to the {paymentPlan.name} plan.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PaymentForm
                  paymentPlan={paymentPlan}
                  processing={processing}
                  onSubmit={handlePaymentSubmit}
                />
              </CardContent>
            </Card>
            <OrderSummary paymentPlan={paymentPlan} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PaymentGateway;
