import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, Store } from "lucide-react";
import heroImage from "@/assets/hero-market.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Kabale Central Market - Vibrant African marketplace"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            Kabale's First Digital Marketplace
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-6 leading-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Shop Local,{" "}
            <span className="text-gradient">Support Local</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-background/80 mb-8 max-w-xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Discover fresh produce, clothing, household items, and more from trusted vendors at Kabale Central Market. Pay easily with MTN MoMo or Airtel Money.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="xl">
              <ShoppingBag className="h-5 w-5" />
              Start Shopping
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="xl" className="border-background/30 text-background hover:bg-background hover:text-foreground">
              <Store className="h-5 w-5" />
              Become a Vendor
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-background/20 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div>
              <p className="font-display text-3xl md:text-4xl font-bold text-accent">500+</p>
              <p className="text-sm text-background/70">Active Vendors</p>
            </div>
            <div>
              <p className="font-display text-3xl md:text-4xl font-bold text-accent">10K+</p>
              <p className="text-sm text-background/70">Products Listed</p>
            </div>
            <div>
              <p className="font-display text-3xl md:text-4xl font-bold text-accent">5K+</p>
              <p className="text-sm text-background/70">Happy Customers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
