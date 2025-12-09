import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/hooks/useCart";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, CreditCard, Truck, CheckCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");
  const [mobileMoneyNumber, setMobileMoneyNumber] = useState("");
  
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    notes: "",
  });

  const deliveryFee = 5000;
  const total = subtotal + deliveryFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!formData.fullName || !formData.phone || !formData.address) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (paymentMethod !== "cash_on_delivery" && !mobileMoneyNumber) {
      toast.error("Please enter your mobile money number");
      return;
    }

    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Group items by vendor
      const itemsByVendor = items.reduce((acc, item) => {
        if (!acc[item.vendor_id]) {
          acc[item.vendor_id] = [];
        }
        acc[item.vendor_id].push(item);
        return acc;
      }, {} as Record<string, typeof items>);

      // Create an order for each vendor
      for (const [vendorId, vendorItems] of Object.entries(itemsByVendor)) {
        const orderTotal = vendorItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ) + (deliveryFee / Object.keys(itemsByVendor).length);

        const { data: order, error: orderError } = await supabase
          .from("orders")
          .insert({
            customer_id: user?.id || null,
            vendor_id: vendorId,
            total_amount: orderTotal,
            delivery_phone: formData.phone,
            delivery_address: formData.address,
            notes: formData.notes || null,
            payment_method: paymentMethod,
            payment_status: paymentMethod === "cash_on_delivery" ? "pending" : "pending",
            status: "pending",
          })
          .select()
          .single();

        if (orderError) throw orderError;

        // Create order items
        const orderItems = vendorItems.map((item) => ({
          order_id: order.id,
          product_id: item.product_id,
          quantity: item.quantity,
          unit_price: item.price,
          total_price: item.price * item.quantity,
        }));

        const { error: itemsError } = await supabase
          .from("order_items")
          .insert(orderItems);

        if (itemsError) throw itemsError;
      }

      // Clear the cart
      await clearCart();

      toast.success("Order placed successfully!");
      navigate("/order-success");
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast.error(error.message || "Failed to place order");
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto text-center p-8">
            <Truck className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-display text-2xl font-bold mb-2">Cart is Empty</h2>
            <p className="text-muted-foreground mb-6">
              Add some products to your cart before checking out.
            </p>
            <Button asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Cart
        </Link>

        <h1 className="font-display text-3xl font-bold text-foreground mb-8">
          Checkout
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Delivery Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact & Delivery */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-bold mb-4">
                    Delivery Information
                  </h2>
                  <div className="grid gap-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+256 7XX XXX XXX"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Delivery Address *</Label>
                      <Textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="e.g., Plot 12, Kabale Town, Near Central Market"
                        rows={3}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Order Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Any special instructions for delivery..."
                        rows={2}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-bold mb-4">
                    Payment Method
                  </h2>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer">
                      <RadioGroupItem value="cash_on_delivery" id="cod" />
                      <Label
                        htmlFor="cod"
                        className="flex-1 cursor-pointer flex items-center gap-3"
                      >
                        <Truck className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Cash on Delivery</p>
                          <p className="text-sm text-muted-foreground">
                            Pay when you receive your order
                          </p>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border-2 border-accent bg-accent/5 rounded-lg hover:bg-accent/10 cursor-pointer">
                      <RadioGroupItem value="mtn_momo" id="mtn" />
                      <Label
                        htmlFor="mtn"
                        className="flex-1 cursor-pointer flex items-center gap-3"
                      >
                        <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-accent-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">MTN Mobile Money</p>
                          <p className="text-sm text-muted-foreground">
                            Pay instantly with MTN MoMo
                          </p>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border-2 border-destructive bg-destructive/5 rounded-lg hover:bg-destructive/10 cursor-pointer">
                      <RadioGroupItem value="airtel_money" id="airtel" />
                      <Label
                        htmlFor="airtel"
                        className="flex-1 cursor-pointer flex items-center gap-3"
                      >
                        <div className="w-10 h-10 bg-destructive rounded-lg flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-destructive-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">Airtel Money</p>
                          <p className="text-sm text-muted-foreground">
                            Pay instantly with Airtel Money
                          </p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  {(paymentMethod === "mtn_momo" || paymentMethod === "airtel_money") && (
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                      <Label htmlFor="mobileNumber" className="mb-2 block">
                        {paymentMethod === "mtn_momo" ? "MTN" : "Airtel"} Mobile Number
                      </Label>
                      <Input
                        id="mobileNumber"
                        type="tel"
                        value={mobileMoneyNumber}
                        onChange={(e) => setMobileMoneyNumber(e.target.value)}
                        placeholder="07XX XXX XXX"
                        required
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        You will receive a payment prompt on this number
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-bold mb-4">
                    Order Summary
                  </h2>

                  <div className="space-y-3 mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Qty: {item.quantity} × UGX {item.price.toLocaleString()}
                          </p>
                        </div>
                        <p className="text-sm font-semibold">
                          UGX {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>UGX {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span>UGX {deliveryFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-display font-bold text-lg pt-2 border-t border-border">
                      <span>Total</span>
                      <span className="text-primary">UGX {total.toLocaleString()}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full mt-6"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        Place Order
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    By placing this order, you agree to our terms and conditions
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
