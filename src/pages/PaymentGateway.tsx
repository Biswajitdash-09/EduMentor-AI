
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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

const PaymentGateway = () => {
  const { planId } = useParams<{ planId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [paymentPlan, setPaymentPlan] = useState<PaymentPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);

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
          
        if (error) throw error;
        
        if (data) {
          // Initialize features as an empty string array with proper typing
          const parsedFeatures: string[] = [];
          
          // Handle features based on its format
          if (Array.isArray(data.features)) {
            // If features is already an array, convert each element to string
            data.features.forEach((feature: any) => {
              parsedFeatures.push(String(feature));
            });
          } else if (typeof data.features === 'string') {
            // If features is a JSON string
            try {
              const parsed = JSON.parse(data.features);
              if (Array.isArray(parsed)) {
                parsed.forEach((feature: any) => {
                  parsedFeatures.push(String(feature));
                });
              } else if (parsed && typeof parsed === 'object') {
                Object.values(parsed).forEach((feature: any) => {
                  parsedFeatures.push(String(feature));
                });
              } else {
                parsedFeatures.push(String(parsed));
              }
            } catch (e) {
              console.error("Error parsing features string:", e);
              parsedFeatures.push(String(data.features));
            }
          } else if (data.features && typeof data.features === 'object') {
            // If features is an object
            Object.values(data.features as Record<string, any>).forEach((feature: any) => {
              parsedFeatures.push(String(feature));
            });
          }
              
          setPaymentPlan({
            ...data,
            features: parsedFeatures
          } as PaymentPlan);
        }
      } catch (error: any) {
        console.error("Error fetching plan details:", error.message);
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

  const handlePaymentSubmit = async (formData: PaymentFormData) => {
    if (!user || !paymentPlan) return;
    
    setProcessing(true);
    try {
      // Simulate payment processing delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Record payment in the database
      const { error } = await supabase
        .from("user_payments")
        .insert({
          user_id: user.id,
          plan_id: paymentPlan.id,
          amount: paymentPlan.price,
          payment_status: "completed",
        });
        
      if (error) throw error;
      
      // Update user achievements to add points
      await supabase.rpc('increment_user_points', {
        user_id_param: user.id,
        points_to_add: 50
      });
      
      setCompleted(true);
      toast({
        title: "Payment Successful",
        description: `You've successfully subscribed to the ${paymentPlan.name} plan.`,
      });
    } catch (error: any) {
      console.error("Payment error:", error.message);
      toast({
        title: "Payment Failed",
        description: "There was an issue processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-12">
          <LoaderCircle className="h-8 w-8 animate-spin text-edu-blue" />
        </div>
      </DashboardLayout>
    );
  }

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
                  Complete your subscription to the {paymentPlan?.name} plan
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
