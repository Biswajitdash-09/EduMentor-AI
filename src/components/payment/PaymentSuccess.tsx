
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface PaymentSuccessProps {
  paymentPlan: {
    name: string;
    price: number;
  };
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ paymentPlan }) => {
  const navigate = useNavigate();

  return (
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
  );
};

export default PaymentSuccess;
