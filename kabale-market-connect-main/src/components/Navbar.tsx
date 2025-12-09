import { ShoppingCart, Menu, Search, User, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/hooks/useCart";
import SearchBar from "@/components/SearchBar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isVendor, setIsVendor] = useState(false);
  const navigate = useNavigate();
  const { totalItems } = useCart();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      
      if (session?.user) {
        const { data } = await supabase
          .from("vendors")
          .select("id")
          .eq("user_id", session.user.id)
          .maybeSingle();
        setIsVendor(!!data);
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkUser();
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsVendor(false);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-hero-gradient rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-xl">K</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display font-bold text-lg text-foreground leading-tight">
                Kabale Market
              </h1>
              <p className="text-xs text-muted-foreground -mt-0.5">Digital Marketplace</p>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <SearchBar className="w-full" />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>
            
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="text-muted-foreground text-xs">
                    {user.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {isVendor && (
                    <DropdownMenuItem asChild>
                      <Link to="/vendor">Vendor Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}

            <Button variant="forest" size="sm" className="hidden sm:flex" asChild>
              <Link to="/auth?mode=vendor-register">Sell on Market</Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              <div className="mb-2">
                <SearchBar isMobile onClose={() => setIsMenuOpen(false)} />
              </div>
              <Link to="/products" className="px-4 py-2 hover:bg-muted rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                All Products
              </Link>
              <Link to="/products?category=c3aab3f1-84c2-4b77-b84d-08f2ce7557c7" className="px-4 py-2 hover:bg-muted rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                Fresh Produce
              </Link>
              <Link to="/products?category=cd7a01cf-6d05-4ba5-a9f7-76b7587755f6" className="px-4 py-2 hover:bg-muted rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                Groceries
              </Link>
              <Link to="/products?category=ee2e754a-1254-474c-9639-13aea0037a6f" className="px-4 py-2 hover:bg-muted rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                Clothing
              </Link>
              <Link to="/products?category=fea39a62-6741-4116-93d6-42cfb0609910" className="px-4 py-2 hover:bg-muted rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                Household Items
              </Link>
              <Link to="/vendors" className="px-4 py-2 hover:bg-muted rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                Our Vendors
              </Link>
              {user ? (
                <>
                  {isVendor && (
                    <Link to="/vendor" className="px-4 py-2 hover:bg-muted rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                      Vendor Dashboard
                    </Link>
                  )}
                  <button onClick={handleLogout} className="px-4 py-2 hover:bg-muted rounded-lg transition-colors text-left text-destructive">
                    Logout
                  </button>
                </>
              ) : (
                <Button variant="forest" className="mt-2" asChild>
                  <Link to="/auth?mode=vendor-register" onClick={() => setIsMenuOpen(false)}>Become a Vendor</Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Category Bar - Desktop */}
      <div className="hidden md:block bg-muted/50 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 h-10 text-sm">
            <Link to="/products" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              All Products
            </Link>
            <Link to="/products?category=c3aab3f1-84c2-4b77-b84d-08f2ce7557c7" className="text-muted-foreground hover:text-primary transition-colors">
              Fresh Produce
            </Link>
            <Link to="/products?category=cd7a01cf-6d05-4ba5-a9f7-76b7587755f6" className="text-muted-foreground hover:text-primary transition-colors">
              Groceries
            </Link>
            <Link to="/products?category=ee2e754a-1254-474c-9639-13aea0037a6f" className="text-muted-foreground hover:text-primary transition-colors">
              Clothing
            </Link>
            <Link to="/products?category=fea39a62-6741-4116-93d6-42cfb0609910" className="text-muted-foreground hover:text-primary transition-colors">
              Household Items
            </Link>
            <Link to="/vendors" className="text-muted-foreground hover:text-primary transition-colors">
              Our Vendors
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
