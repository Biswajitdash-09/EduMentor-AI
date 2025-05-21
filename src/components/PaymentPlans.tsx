
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

type PaymentPlan = {
  id: string;
  name: string;
  price: number;
  features: string[];
};

const PaymentPlans = () => {
  const [plans, setPlans] = useState<PaymentPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchPaymentPlans();
  }, []);

  const fetchPaymentPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('payment_plans')
        .select('*')
        .order('price', { ascending: true });
        
      if (error) throw error;
      
      setPlans(data);
    } catch (error) {
      console.error('Error fetching payment plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = (plan: PaymentPlan) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to subscribe to a plan",
        variant: "destructive",
      });
      navigate('/signin/student');
      return;
    }
    
    // For this demo, we'll just navigate to a payment gateway page
    navigate(`/payment-gateway/${plan.id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-edu-blue" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <Card key={plan.id} className={`overflow-hidden flex flex-col ${plan.name === 'Premium' ? 'border-edu-blue border-2' : ''}`}>
          {plan.name === 'Premium' && (
            <div className="bg-edu-blue text-white text-center py-1 text-sm font-medium">
              Most Popular
            </div>
          )}
          <CardHeader className={plan.name === 'Premium' ? 'bg-edu-blue/10' : ''}>
            <CardTitle className="text-2xl">{plan.name}</CardTitle>
            <CardDescription className="flex items-baseline">
              <span className="text-3xl font-bold">${plan.price}</span>
              <span className="ml-1 text-gray-600">/month</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-3 py-4">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => handleSubscribe(plan)} 
              className={`w-full ${plan.name === 'Premium' 
                ? 'bg-edu-blue hover:bg-edu-blue-dark' 
                : plan.name === 'Enterprise' 
                ? 'bg-edu-purple hover:bg-edu-purple-dark' 
                : ''}`}
            >
              Subscribe Now
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PaymentPlans;
