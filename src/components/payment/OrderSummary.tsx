
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";

interface OrderSummaryProps {
  paymentPlan: {
    name: string;
    price: number;
    features: string[];
  };
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ paymentPlan }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
        <CardDescription>
          Review your plan details before completing your purchase
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">{paymentPlan.name} Plan</h3>
          <p className="text-2xl font-bold mt-2">${paymentPlan.price.toFixed(2)}</p>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-md font-medium mb-2">What's Included:</h3>
          <ul className="space-y-1">
            {paymentPlan.features?.map((feature, index) => (
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
  );
};

export default OrderSummary;
