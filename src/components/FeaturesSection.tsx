import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Shield, CreditCard, Headphones } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Same-day delivery within Kabale Municipality. Next-day to neighboring districts.",
  },
  {
    icon: CreditCard,
    title: "Mobile Money",
    description: "Pay securely with MTN MoMo or Airtel Money. No cash needed.",
  },
  {
    icon: Shield,
    title: "Trusted Vendors",
    description: "All vendors are verified members of Kabale Central Market.",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description: "Get help from our local team. We speak your language.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="p-6 text-center border-2 border-transparent hover:border-primary transition-colors animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* CTA Banner */}
        <Card className="bg-forest-gradient p-8 md:p-12 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-secondary-foreground mb-4">
            Start Selling on Kabale Market Today
          </h2>
          <p className="text-secondary-foreground/80 max-w-2xl mx-auto mb-6">
            Join over 500 vendors already growing their business online. Reach customers across Kabale District and beyond.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="accent" size="lg">
              Register as Vendor
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary"
            >
              Learn More
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default FeaturesSection;
