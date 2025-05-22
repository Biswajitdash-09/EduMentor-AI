
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CreditCard, Smartphone, Banknote, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

type PaymentPlan = {
  id: string;
  name: string;
  price: number;
  features: string[];
};

const PaymentGateway = () => {
  const { planId } = useParams<{ planId: string }>();
  const [plan, setPlan] = useState<PaymentPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to access this page",
        variant: "destructive",
      });
      navigate('/signin/student');
      return;
    }

    fetchPlanDetails();
  }, [planId, user]);

  const fetchPlanDetails = async () => {
    if (!planId) return;
    
    try {
      const { data, error } = await supabase
        .from('payment_plans')
        .select('*')
        .eq('id', planId)
        .single();
        
      if (error) throw error;
      
      // Convert features from JSON to string array
      setPlan({
        ...data,
        features: Array.isArray(data.features) ? data.features : JSON.parse(data.features as string)
      });
    } catch (error) {
      console.error('Error fetching plan details:', error);
      toast({
        title: "Error",
        description: "Could not load plan details",
        variant: "destructive",
      });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!selectedMethod) {
      toast({
        title: "Payment method required",
        description: "Please select a payment method",
      });
      return;
    }
    
    if (!user || !plan) return;
    
    setProcessingPayment(true);
    
    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Record payment in database
      await supabase.from('user_payments').insert({
        user_id: user.id,
        plan_id: plan.id,
        amount: plan.price,
        payment_status: 'completed'
      });
      
      // Update user achievements with points
      const { data } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (data) {
        // Update existing record
        await supabase
          .from('user_achievements')
          .update({ points: data.points + 100 })
          .eq('user_id', user.id);
      } else {
        // Create new record
        await supabase
          .from('user_achievements')
          .insert({
            user_id: user.id,
            points: 100
          });
      }
      
      toast({
        title: "Payment Successful",
        description: `You are now subscribed to the ${plan.name} plan`,
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Error processing payment:', error);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment",
        variant: "destructive",
      });
    } finally {
      setProcessingPayment(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-edu-blue" />
        </div>
      </DashboardLayout>
    );
  }

  if (!plan) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">Plan not found</h2>
          <p className="text-gray-500 mt-2">The selected plan could not be found</p>
          <Button className="mt-4" onClick={() => navigate('/')}>
            Return Home
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const paymentMethods = [
    {
      id: 'credit-card',
      name: 'Credit Card',
      icon: <CreditCard className="h-5 w-5" />,
      description: 'Pay with Visa, Mastercard, or American Express'
    },
    {
      id: 'mobile',
      name: 'Mobile Payment',
      icon: <Smartphone className="h-5 w-5" />,
      description: 'Pay with Apple Pay or Google Pay'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: <Banknote className="h-5 w-5" />,
      description: 'Pay directly from your bank account'
    }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Complete Your Payment</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Select your preferred payment method</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods.map((method) => (
                  <div 
                    key={method.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedMethod === method.id 
                        ? 'border-edu-blue bg-edu-blue/5' 
                        : 'hover:border-gray-400'
                    }`}
                    onClick={() => setSelectedMethod(method.id)}
                  >
                    <div className="flex items-center">
                      <div className={`mr-3 p-2 rounded-full ${
                        selectedMethod === method.id ? 'bg-edu-blue text-white' : 'bg-gray-100'
                      }`}>
                        {method.icon}
                      </div>
                      <div>
                        <div className="font-medium">{method.name}</div>
                        <div className="text-sm text-gray-500">{method.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-edu-blue hover:bg-edu-blue-dark"
                  disabled={!selectedMethod || processingPayment}
                  onClick={handlePayment}
                >
                  {processingPayment ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Pay $${plan.price}`
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">{plan.name} Plan</span>
                  <span>${plan.price}/month</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-medium">
                  <span>Total</span>
                  <span>${plan.price}</span>
                </div>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                <p>You will be charged ${plan.price} today and then on a monthly basis.</p>
              </CardFooter>
            </Card>
            
            <div className="mt-4 text-sm text-gray-500">
              <p className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Secure payment
              </p>
              <p className="flex items-center mt-1">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PaymentGateway;
