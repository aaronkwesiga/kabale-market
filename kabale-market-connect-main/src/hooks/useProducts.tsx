import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  original_price: number | null;
  stock: number;
  images: string[];
  is_active: boolean;
  category_id: string | null;
  vendor_id: string;
  created_at: string;
  vendor?: {
    id: string;
    business_name: string;
    logo_url: string | null;
    location: string | null;
    is_verified: boolean;
  };
  category?: {
    id: string;
    name: string;
  };
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
}

export const useProducts = (options?: { categoryId?: string; vendorId?: string; limit?: number }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from("products")
        .select(`
          *,
          vendor:vendors (
            id,
            business_name,
            logo_url,
            location,
            is_verified
          ),
          category:categories (
            id,
            name
          )
        `)
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (options?.categoryId) {
        query = query.eq("category_id", options.categoryId);
      }

      if (options?.vendorId) {
        query = query.eq("vendor_id", options.vendorId);
      }

      if (options?.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;

      if (error) throw error;
      setProducts(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [options?.categoryId, options?.vendorId, options?.limit]);

  return { products, isLoading, error, refetch: fetchProducts };
};

export const useProduct = (productId: string | undefined) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("products")
          .select(`
            *,
            vendor:vendors (
              id,
              business_name,
              logo_url,
              location,
              phone,
              is_verified
            ),
            category:categories (
              id,
              name
            )
          `)
          .eq("id", productId)
          .single();

        if (error) throw error;
        setProduct(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, isLoading, error };
};

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase
        .from("categories")
        .select("*")
        .order("name");
      
      setCategories(data || []);
      setIsLoading(false);
    };

    fetchCategories();
  }, []);

  return { categories, isLoading };
};

export const useVendorProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [vendorId, setVendorId] = useState<string | null>(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get vendor id
      const { data: vendor } = await supabase
        .from("vendors")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (!vendor) return;
      setVendorId(vendor.id);

      const { data } = await supabase
        .from("products")
        .select(`
          *,
          category:categories (
            id,
            name
          )
        `)
        .eq("vendor_id", vendor.id)
        .order("created_at", { ascending: false });

      setProducts(data || []);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, isLoading, vendorId, refetch: fetchProducts };
};
