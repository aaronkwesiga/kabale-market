import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, CheckCircle, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Vendors = () => {
  const { data: vendors, isLoading } = useQuery({
    queryKey: ["vendors"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vendors")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Our Trusted Vendors
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover verified vendors from Kabale Central Market offering fresh produce, 
            quality goods, and authentic local products.
          </p>
        </div>

        {/* Become a Vendor CTA */}
        <Card className="mb-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-1">
                Want to sell on Kabale Market?
              </h2>
              <p className="text-muted-foreground">
                Join hundreds of vendors and reach customers across Western Uganda.
              </p>
            </div>
            <Button asChild size="lg" className="whitespace-nowrap">
              <Link to="/auth?mode=vendor-register">Become a Vendor</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Vendors Grid */}
        {isLoading ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-16 w-16 bg-muted rounded-full mb-4" />
                  <div className="h-5 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : vendors && vendors.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {vendors.map((vendor) => (
              <Card 
                key={vendor.id} 
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      {vendor.logo_url ? (
                        <img 
                          src={vendor.logo_url} 
                          alt={vendor.business_name}
                          className="h-16 w-16 rounded-full object-cover"
                        />
                      ) : (
                        <Store className="h-8 w-8 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground truncate">
                          {vendor.business_name}
                        </h3>
                        {vendor.is_verified && (
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        )}
                      </div>
                      {vendor.location && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {vendor.location}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {vendor.description && (
                    <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
                      {vendor.description}
                    </p>
                  )}
                  
                  <div className="mt-4 flex items-center justify-between">
                    {vendor.is_verified ? (
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Verified Vendor
                      </Badge>
                    ) : (
                      <Badge variant="outline">New Vendor</Badge>
                    )}
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/products?vendor=${vendor.id}`}>View Products</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <Store className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No vendors yet
              </h3>
              <p className="text-muted-foreground mb-4">
                Be the first to join our marketplace!
              </p>
              <Button asChild>
                <Link to="/auth?mode=vendor-register">Become a Vendor</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Vendors;
