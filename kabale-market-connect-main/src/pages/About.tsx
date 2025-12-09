import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, ShoppingBag, MapPin, Heart, Target, Eye } from "lucide-react";
import heroMarket from "@/assets/hero-market.jpg";
import marketEntrance from "@/assets/market-entrance.jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[400px] overflow-hidden">
          <img 
            src={heroMarket} 
            alt="Kabale Central Market" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-foreground/40" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-background mb-4">
                About Kabale Market
              </h1>
              <p className="text-background/90 text-lg max-w-xl">
                Empowering local vendors and connecting communities through digital commerce in Western Uganda.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Kabale Central Market has been the heart of commerce in southwestern Uganda for decades. 
                Local vendors have built their livelihoods here, serving the community with fresh produce, 
                quality goods, and warm hospitality.
              </p>
              <p className="text-muted-foreground mb-4">
                In 2024, we launched Kabale Market Digital – an online platform that brings the vibrant 
                marketplace experience to your fingertips. Our mission is to help local traders reach 
                more customers while making it easier for you to shop from trusted vendors.
              </p>
              <p className="text-muted-foreground">
                We believe in supporting local businesses, preserving traditional commerce, and embracing 
                technology to create opportunities for growth in our community.
              </p>
            </div>
            <div className="relative">
              <img 
                src={marketEntrance} 
                alt="Market entrance" 
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl">
                <p className="font-display text-4xl font-bold">50+</p>
                <p className="text-sm">Years of Service</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-none shadow-lg">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <Target className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-4">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To empower Kabale Central Market vendors with affordable digital tools that expand 
                    their customer reach, improve inventory management, and increase their income while 
                    preserving the authentic marketplace experience our community loves.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-lg">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-6">
                    <Eye className="h-7 w-7 text-secondary" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-4">Our Vision</h3>
                  <p className="text-muted-foreground">
                    To become the leading digital marketplace platform in Western Uganda, connecting 
                    local vendors with customers across the region and beyond, while promoting sustainable 
                    economic growth and digital inclusion for all.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Our Impact</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connecting vendors and customers across Kabale District and beyond.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="text-center border-none bg-primary/5">
              <CardContent className="p-6">
                <Users className="h-8 w-8 text-primary mx-auto mb-3" />
                <p className="font-display text-3xl font-bold text-foreground">100+</p>
                <p className="text-sm text-muted-foreground">Active Vendors</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-none bg-secondary/5">
              <CardContent className="p-6">
                <ShoppingBag className="h-8 w-8 text-secondary mx-auto mb-3" />
                <p className="font-display text-3xl font-bold text-foreground">500+</p>
                <p className="text-sm text-muted-foreground">Products Listed</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-none bg-accent/20">
              <CardContent className="p-6">
                <MapPin className="h-8 w-8 text-accent-foreground mx-auto mb-3" />
                <p className="font-display text-3xl font-bold text-foreground">5</p>
                <p className="text-sm text-muted-foreground">Districts Served</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-none bg-primary/5">
              <CardContent className="p-6">
                <Heart className="h-8 w-8 text-primary mx-auto mb-3" />
                <p className="font-display text-3xl font-bold text-foreground">1000+</p>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-hero-gradient">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">
              Join Our Community
            </h2>
            <p className="text-primary-foreground/90 mb-8 max-w-xl mx-auto">
              Whether you're a vendor looking to grow your business or a customer seeking quality local products, 
              Kabale Market is here for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/products">Start Shopping</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/auth?mode=vendor-register">Become a Vendor</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
