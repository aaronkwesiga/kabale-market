import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface CartItem {
  id: string;
  product_id: string;
  name: string;
  price: number;
  image: string;
  vendor: string;
  vendor_id: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isLoading: boolean;
  addToCart: (product: {
    id: string;
    name: string;
    price: number;
    image: string;
    vendor: string;
    vendor_id: string;
  }) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // Load cart from local storage or database
  useEffect(() => {
    const loadCart = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUserId(session.user.id);
        // Load from database for authenticated users
        const { data, error } = await supabase
          .from("cart_items")
          .select(`
            id,
            quantity,
            product_id,
            products (
              id,
              name,
              price,
              images,
              vendor_id,
              vendors (
                business_name
              )
            )
          `)
          .eq("user_id", session.user.id);

        if (!error && data) {
          const cartItems: CartItem[] = data.map((item: any) => ({
            id: item.id,
            product_id: item.product_id,
            name: item.products.name,
            price: item.products.price,
            image: item.products.images?.[0] || "",
            vendor: item.products.vendors?.business_name || "Unknown Vendor",
            vendor_id: item.products.vendor_id,
            quantity: item.quantity,
          }));
          setItems(cartItems);
        }
      } else {
        // Load from local storage for guests
        const localCart = localStorage.getItem("kabale_cart");
        if (localCart) {
          setItems(JSON.parse(localCart));
        }
      }
      setIsLoading(false);
    };

    loadCart();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      loadCart();
    });

    return () => subscription.unsubscribe();
  }, []);

  // Save to local storage when cart changes (for guests)
  useEffect(() => {
    if (!userId && !isLoading) {
      localStorage.setItem("kabale_cart", JSON.stringify(items));
    }
  }, [items, userId, isLoading]);

  const addToCart = async (product: {
    id: string;
    name: string;
    price: number;
    image: string;
    vendor: string;
    vendor_id: string;
  }) => {
    const existingItem = items.find((item) => item.product_id === product.id);

    if (userId) {
      // Authenticated user - save to database
      if (existingItem) {
        const { error } = await supabase
          .from("cart_items")
          .update({ quantity: existingItem.quantity + 1 })
          .eq("id", existingItem.id);

        if (error) {
          toast.error("Failed to update cart");
          return;
        }
      } else {
        const { error } = await supabase.from("cart_items").insert({
          user_id: userId,
          product_id: product.id,
          quantity: 1,
        });

        if (error) {
          toast.error("Failed to add to cart");
          return;
        }
      }

      // Reload cart from database
      const { data } = await supabase
        .from("cart_items")
        .select(`
          id,
          quantity,
          product_id,
          products (
            id,
            name,
            price,
            images,
            vendor_id,
            vendors (
              business_name
            )
          )
        `)
        .eq("user_id", userId);

      if (data) {
        const cartItems: CartItem[] = data.map((item: any) => ({
          id: item.id,
          product_id: item.product_id,
          name: item.products.name,
          price: item.products.price,
          image: item.products.images?.[0] || "",
          vendor: item.products.vendors?.business_name || "Unknown Vendor",
          vendor_id: item.products.vendor_id,
          quantity: item.quantity,
        }));
        setItems(cartItems);
      }
    } else {
      // Guest user - save to local state
      if (existingItem) {
        setItems((prev) =>
          prev.map((item) =>
            item.product_id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        setItems((prev) => [
          ...prev,
          {
            id: `local_${Date.now()}`,
            product_id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            vendor: product.vendor,
            vendor_id: product.vendor_id,
            quantity: 1,
          },
        ]);
      }
    }

    toast.success("Added to cart!");
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) {
      await removeFromCart(productId);
      return;
    }

    if (userId) {
      const item = items.find((i) => i.product_id === productId);
      if (item) {
        const { error } = await supabase
          .from("cart_items")
          .update({ quantity })
          .eq("id", item.id);

        if (error) {
          toast.error("Failed to update quantity");
          return;
        }
      }
    }

    setItems((prev) =>
      prev.map((item) =>
        item.product_id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = async (productId: string) => {
    if (userId) {
      const item = items.find((i) => i.product_id === productId);
      if (item) {
        const { error } = await supabase
          .from("cart_items")
          .delete()
          .eq("id", item.id);

        if (error) {
          toast.error("Failed to remove item");
          return;
        }
      }
    }

    setItems((prev) => prev.filter((item) => item.product_id !== productId));
    toast.success("Removed from cart");
  };

  const clearCart = async () => {
    if (userId) {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", userId);

      if (error) {
        toast.error("Failed to clear cart");
        return;
      }
    }

    setItems([]);
    localStorage.removeItem("kabale_cart");
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isLoading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
