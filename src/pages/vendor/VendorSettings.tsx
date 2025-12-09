import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Store, Save } from "lucide-react";

const VendorSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [vendorData, setVendorData] = useState({
    business_name: "",
    description: "",
    location: "",
    phone: "",
  });

  useEffect(() => {
    const fetchVendorData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("vendors")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (data) {
        setVendorData({
          business_name: data.business_name || "",
          description: data.description || "",
          location: data.location || "",
          phone: data.phone || "",
        });
      }
    };

    fetchVendorData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("vendors")
        .update(vendorData)
        .eq("user_id", user.id);

      if (error) throw error;

      toast.success("Settings saved successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to save settings");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Store Settings</h1>
        <p className="text-muted-foreground">Manage your store profile and settings</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Store className="h-5 w-5 text-primary" />
            <CardTitle>Store Profile</CardTitle>
          </div>
          <CardDescription>
            Update your store information visible to customers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="business_name">Business Name</Label>
              <Input
                id="business_name"
                value={vendorData.business_name}
                onChange={(e) => setVendorData({ ...vendorData, business_name: e.target.value })}
                placeholder="Your store name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={vendorData.phone}
                onChange={(e) => setVendorData({ ...vendorData, phone: e.target.value })}
                placeholder="+256 7XX XXX XXX"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={vendorData.location}
                onChange={(e) => setVendorData({ ...vendorData, location: e.target.value })}
                placeholder="e.g., Kabale Central Market, Stall 24"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">About Your Store</Label>
              <Textarea
                id="description"
                value={vendorData.description}
                onChange={(e) => setVendorData({ ...vendorData, description: e.target.value })}
                placeholder="Tell customers about your products and services..."
                rows={4}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorSettings;
