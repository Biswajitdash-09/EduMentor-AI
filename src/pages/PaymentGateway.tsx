
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LoaderCircle, CreditCard, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [completed, setCompleted] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvc: "",
  });

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
          // Parse features properly based on the data type
          let parsedFeatures: string[] = [];
          
          if (Array.isArray(data.features)) {
            // If features is already an array
            parsedFeatures = data.features.map((feature: any) => String(feature));
          } else if (typeof data.features === 'string') {
            // If features is a JSON string
            try {
              const parsed = JSON.parse(data.features);
              if (Array.isArray(parsed)) {
                parsedFeatures = parsed.map((feature: any) => String(feature));
              } else if (parsed && typeof parsed === 'object') {
                parsedFeatures = Object.values(parsed).map((item: any) => String(item));
              } else {
                parsedFeatures = [String(parsed)];
              }
            } catch (e) {
              console.error("Error parsing features string:", e);
              parsedFeatures = [String(data.features)];
            }
          } else if (data.features && typeof data.features === 'object') {
            // If features is an object
            // Explicitly type the object values as any before mapping to string
            const featureValues: any[] = Object.values(data.features as Record<string, any>);
            parsedFeatures = featureValues.map(item => String(item));
          }
              
          setPaymentPlan({
            ...data,
            features: parsedFeatures
          });
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
          <Card className="border-green-500">
            <CardHeader className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Payment Successful!</CardTitle>
              <CardDescription>
                Thank you for your purchase. Your subscription is now active.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Order Summary</h3>
                    <div className="mt-2 text-sm text-green-700">
                      <ul className="list-disc space-y-1 pl-5">
                        <li>Plan: {paymentPlan?.name}</li>
                        <li>Amount: ${paymentPlan?.price.toFixed(2)}</li>
                        <li>Status: Completed</li>
                        <li>Bonus Points: +50</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button 
                className="bg-edu-blue hover:bg-edu-blue-dark"
                onClick={() => navigate("/dashboard")}
              >
                Return to Dashboard
              </Button>
            </CardFooter>
          </Card>
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
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">Payment Method</h3>
                      <RadioGroup
                        defaultValue="credit_card"
                        value={paymentMethod}
                        onValueChange={setPaymentMethod}
                        className="mt-2 space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="credit_card" id="credit_card" />
                          <Label htmlFor="credit_card" className="flex items-center">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Credit or Debit Card
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <Separator />
                    
                    {paymentMethod === "credit_card" && (
                      <div className="space-y-4">
                        <div className="grid gap-2">
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input
                            id="cardName"
                            name="cardName"
                            placeholder="John Smith"
                            required
                            value={formData.cardName}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="4242 4242 4242 4242"
                            required
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input
                              id="expiryDate"
                              name="expiryDate"
                              placeholder="MM/YY"
                              required
                              value={formData.expiryDate}
                              onChange={handleInputChange}
                            />
                          </div>
                          
                          <div className="grid gap-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input
                              id="cvc"
                              name="cvc"
                              placeholder="123"
                              required
                              value={formData.cvc}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-edu-blue hover:bg-edu-blue-dark"
                    disabled={processing}
                  >
                    {processing ? (
                      <>
                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Pay $${paymentPlan?.price.toFixed(2)}`
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>
                  Review your plan details before completing your purchase
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">{paymentPlan?.name} Plan</h3>
                  <p className="text-2xl font-bold mt-2">${paymentPlan?.price.toFixed(2)}</p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-md font-medium mb-2">What's Included:</h3>
                  <ul className="space-y-1">
                    {paymentPlan?.features?.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Separator />
                
                <Alert>
                  <AlertTitle>Secure Transaction</AlertTitle>
                  <AlertDescription>
                    Your payment information is encrypted and secure. We never store your full card details.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PaymentGateway;
