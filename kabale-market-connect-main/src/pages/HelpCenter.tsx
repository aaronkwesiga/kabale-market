import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Search, 
  ShoppingBag, 
  Truck, 
  CreditCard, 
  Store, 
  UserCircle,
  MessageCircle,
  Phone,
  Mail
} from "lucide-react";

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      icon: ShoppingBag,
      title: "Shopping",
      description: "How to browse, add to cart, and place orders"
    },
    {
      icon: Truck,
      title: "Delivery",
      description: "Shipping times, tracking, and delivery areas"
    },
    {
      icon: CreditCard,
      title: "Payments",
      description: "Mobile money, payment methods, and refunds"
    },
    {
      icon: Store,
      title: "For Vendors",
      description: "Selling, managing products, and payouts"
    },
    {
      icon: UserCircle,
      title: "Account",
      description: "Registration, login, and profile settings"
    }
  ];

  const faqs = [
    {
      category: "shopping",
      question: "How do I place an order?",
      answer: "Browse our products, add items to your cart, and proceed to checkout. You'll need to provide your delivery address and choose a payment method. Once confirmed, your order will be processed and you'll receive updates via SMS."
    },
    {
      category: "shopping",
      question: "Can I cancel my order?",
      answer: "Yes, you can cancel your order within 30 minutes of placing it. After that, please contact our customer support for assistance. Once an order is shipped, it cannot be cancelled."
    },
    {
      category: "delivery",
      question: "What areas do you deliver to?",
      answer: "We currently deliver within Kabale Municipality and surrounding areas including Rukiga, Kisoro, and Ntungamo districts. Delivery fees vary based on distance from Kabale Central Market."
    },
    {
      category: "delivery",
      question: "How long does delivery take?",
      answer: "Same-day delivery is available for orders placed before 2:00 PM within Kabale town. For other areas, delivery typically takes 1-3 business days depending on location."
    },
    {
      category: "payments",
      question: "What payment methods do you accept?",
      answer: "We accept MTN Mobile Money, Airtel Money, and Cash on Delivery. Mobile money payments are instant and secure. For Cash on Delivery, please have the exact amount ready."
    },
    {
      category: "payments",
      question: "How do refunds work?",
      answer: "Refunds are processed within 3-5 business days for eligible returns. The amount will be credited to your mobile money account or original payment method. Contact support for refund requests."
    },
    {
      category: "vendors",
      question: "How do I become a vendor?",
      answer: "Click 'Become a Vendor' and fill out the registration form with your business details. Our team will review your application within 24-48 hours. Once approved, you can start listing your products."
    },
    {
      category: "vendors",
      question: "What are the vendor fees?",
      answer: "We charge a small commission (5-10%) on each sale. There's also an optional monthly subscription for premium features like promoted listings. No upfront registration fees for basic accounts."
    },
    {
      category: "account",
      question: "How do I reset my password?",
      answer: "Go to the login page and click 'Forgot Password'. Enter your email address and we'll send you a link to reset your password. The link expires after 24 hours."
    },
    {
      category: "account",
      question: "How do I update my delivery address?",
      answer: "Log into your account, go to Profile Settings, and update your address. You can also add multiple addresses and choose which one to use during checkout."
    }
  ];

  const filteredFaqs = searchQuery
    ? faqs.filter(
        faq =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl font-bold text-foreground mb-4">Help Center</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Find answers to your questions and get the support you need.
            </p>
            
            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for help..."
                className="pl-12 py-6 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Quick Categories */}
          {!searchQuery && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
              {categories.map((category) => (
                <Card key={category.title} className="border-none shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <category.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground mb-1">{category.title}</h3>
                    <p className="text-xs text-muted-foreground">{category.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* FAQs */}
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              {searchQuery ? `Search Results (${filteredFaqs.length})` : "Frequently Asked Questions"}
            </h2>
            
            {filteredFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border rounded-lg px-6 shadow-sm"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="font-medium text-foreground">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <Card className="border-none shadow-md">
                <CardContent className="p-8 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No results found for "{searchQuery}". Try a different search term.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Contact Support */}
          <div className="mt-16">
            <Card className="border-none shadow-lg bg-muted">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                    Still Need Help?
                  </h2>
                  <p className="text-muted-foreground">
                    Our support team is ready to assist you
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-none">
                    <CardContent className="p-6 text-center">
                      <MessageCircle className="h-10 w-10 text-primary mx-auto mb-4" />
                      <h3 className="font-semibold text-foreground mb-2">Live Chat</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Chat with our support team in real-time
                      </p>
                      <Button variant="outline" size="sm">Start Chat</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-none">
                    <CardContent className="p-6 text-center">
                      <Phone className="h-10 w-10 text-secondary mx-auto mb-4" />
                      <h3 className="font-semibold text-foreground mb-2">Call Us</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Mon-Sat, 7:00 AM - 7:00 PM
                      </p>
                      <Button variant="outline" size="sm" asChild>
                        <a href="tel:+256700000000">+256 700 000 000</a>
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-none">
                    <CardContent className="p-6 text-center">
                      <Mail className="h-10 w-10 text-accent-foreground mx-auto mb-4" />
                      <h3 className="font-semibold text-foreground mb-2">Email Support</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        We respond within 24 hours
                      </p>
                      <Button variant="outline" size="sm" asChild>
                        <Link to="/contact">Send Email</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HelpCenter;
