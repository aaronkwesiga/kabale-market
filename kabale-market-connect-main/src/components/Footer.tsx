import { MapPin, Phone, Mail, Facebook, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-hero-gradient rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-xl">K</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-lg">Kabale Market</h3>
                <p className="text-xs text-background/60">Digital Marketplace</p>
              </div>
            </div>
            <p className="text-background/70 text-sm mb-4">
              Connecting Kabale Central Market vendors with customers across Western Uganda. Shop local, support local.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products" className="text-background/70 hover:text-primary transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/vendors" className="text-background/70 hover:text-primary transition-colors">
                  Our Vendors
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-background/70 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-background/70 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* For Vendors */}
          <div>
            <h4 className="font-display font-semibold mb-4">For Vendors</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/auth?mode=vendor-register" className="text-background/70 hover:text-primary transition-colors">
                  Become a Vendor
                </Link>
              </li>
              <li>
                <Link to="/auth?mode=login" className="text-background/70 hover:text-primary transition-colors">
                  Vendor Login
                </Link>
              </li>
              <li>
                <Link to="/vendors" className="text-background/70 hover:text-primary transition-colors">
                  Browse Vendors
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-background/70 hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span className="text-background/70">
                  Kabale Central Market,<br />
                  Kabale Municipality,<br />
                  Western Uganda
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span className="text-background/70">+256 700 000 000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span className="text-background/70">info@kabalemarket.ug</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Payment Methods & Copyright */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-background/60">We Accept:</span>
              <div className="flex items-center gap-2">
                <div className="bg-accent text-accent-foreground px-3 py-1 rounded text-xs font-bold">
                  MTN MoMo
                </div>
                <div className="bg-destructive text-destructive-foreground px-3 py-1 rounded text-xs font-bold">
                  Airtel Money
                </div>
              </div>
            </div>
            <p className="text-sm text-background/60">
              © 2024 Kabale Central Market. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
