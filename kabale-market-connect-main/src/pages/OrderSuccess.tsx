import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Package, ArrowRight } from "lucide-react";

const OrderSuccess = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <Card className="max-w-lg mx-auto text-center">
          <CardContent className="p-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            
            <h1 className="font-display text-3xl font-bold text-foreground mb-3">
              Order Placed Successfully!
            </h1>
            
            <p className="text-muted-foreground mb-6">
              Thank you for your order. We've received your order and will contact you shortly
              to confirm delivery details.
            </p>

            <div className="bg-muted rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center gap-3 text-muted-foreground">
                <Package className="h-5 w-5" />
                <span>You will receive a call/SMS for delivery coordination</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="outline" className="flex-1">
                <Link to="/products">
                  Continue Shopping
                </Link>
              </Button>
              <Button asChild className="flex-1">
                <Link to="/">
                  Back to Home
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default OrderSuccess;
