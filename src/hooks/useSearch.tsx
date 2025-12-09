import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export interface SearchResult {
  id: string;
  name: string;
  type: "product" | "vendor" | "category";
  image?: string;
  price?: number;
  description?: string;
}

export const useSearch = (query: string) => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const searchData = async () => {
      if (!query || query.length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const searchTerm = `%${query}%`;

        // Search products
        const { data: products } = await supabase
          .from("products")
          .select("id, name, images, price, description")
          .eq("is_active", true)
          .ilike("name", searchTerm)
          .limit(5);

        // Search vendors
        const { data: vendors } = await supabase
          .from("vendors")
          .select("id, business_name, logo_url, description")
          .ilike("business_name", searchTerm)
          .limit(3);

        // Search categories
        const { data: categories } = await supabase
          .from("categories")
          .select("id, name, image_url, description")
          .ilike("name", searchTerm)
          .limit(3);

        const searchResults: SearchResult[] = [];

        // Add products
        products?.forEach((product) => {
          searchResults.push({
            id: product.id,
            name: product.name,
            type: "product",
            image: product.images?.[0],
            price: product.price,
            description: product.description
          });
        });

        // Add vendors
        vendors?.forEach((vendor) => {
          searchResults.push({
            id: vendor.id,
            name: vendor.business_name,
            type: "vendor",
            image: vendor.logo_url || undefined,
            description: vendor.description
          });
        });

        // Add categories
        categories?.forEach((category) => {
          searchResults.push({
            id: category.id,
            name: category.name,
            type: "category",
            image: category.image_url || undefined,
            description: category.description
          });
        });

        setResults(searchResults);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchData, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleResultClick = (result: SearchResult) => {
    switch (result.type) {
      case "product":
        navigate(`/product/${result.id}`);
        break;
      case "vendor":
        navigate(`/vendors`);
        break;
      case "category":
        navigate(`/products?category=${result.id}`);
        break;
    }
  };

  return { results, isLoading, handleResultClick };
};
