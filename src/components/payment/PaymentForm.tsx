
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { LoaderCircle, CreditCard } from "lucide-react";

interface PaymentFormProps {
  paymentPlan: {
    name: string;
    price: number;
  };
  processing: boolean;
  onSubmit: (formData: PaymentFormData) => void;
}

export interface PaymentFormData {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvc: string;
  paymentMethod: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ 
  paymentPlan, 
  processing, 
  onSubmit 
}) => {
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvc: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      paymentMethod,
    });
  };

  return (
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
  );
};

export default PaymentForm;
