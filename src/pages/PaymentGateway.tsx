
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

interface PaymentPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
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

        let parsedFeatures: string[] = [];

        if (Array.isArray(data.features)) {
          parsedFeatures = data.features.map((f: any) => String(f));
        } else if (typeof data.features === "string") {
          try {
            const parsed = JSON.parse(data.features);
            if (Array.isArray(parsed)) {
              parsedFeatures = parsed.map((f: any) => String(f));
            } else if (parsed && typeof parsed === "object") {
              // Explicitly cast Object.values to any[] before mapping
              parsedFeatures = Array.from(Object.values(parsed as Record<string, any>)).map(f => String(f));
            } else {
              parsedFeatures = [String(parsed)];
            }
          } catch {
            parsedFeatures = [String(data.features)];
          }
        } else if (data.features && typeof data.features === "object") {
          // Explicitly cast Object.values to any[] before mapping
          parsedFeatures = Array.from(Object.values(data.features as Record<string, any>)).map(f => String(f));
        }

        setPaymentPlan({ ...data, features: parsedFeatures });
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
