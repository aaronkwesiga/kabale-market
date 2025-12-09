import { useState, useRef, useEffect } from "react";
import { Search, ShoppingBag, Store, Tag, X, Loader2 } from "lucide-react";
import { useSearch, SearchResult } from "@/hooks/useSearch";

interface SearchBarProps {
  className?: string;
  onClose?: () => void;
  isMobile?: boolean;
}

const SearchBar = ({ className = "", onClose, isMobile = false }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { results, isLoading, handleResultClick } = useSearch(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (result: SearchResult) => {
    handleResultClick(result);
    setQuery("");
    setIsFocused(false);
    onClose?.();
  };

  const getIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "product":
        return <ShoppingBag className="h-4 w-4 text-primary" />;
      case "vendor":
        return <Store className="h-4 w-4 text-secondary" />;
      case "category":
        return <Tag className="h-4 w-4 text-accent-foreground" />;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-UG", {
      style: "currency",
      currency: "UGX",
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search products, vendors..."
          className="w-full pl-10 pr-10 py-2.5 bg-muted rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors text-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isFocused && query.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-xl z-50 overflow-hidden">
          {isLoading ? (
            <div className="p-4 text-center">
              <Loader2 className="h-5 w-5 animate-spin mx-auto text-primary" />
              <p className="text-sm text-muted-foreground mt-2">Searching...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="max-h-80 overflow-y-auto">
              {results.map((result) => (
                <button
                  key={`${result.type}-${result.id}`}
                  className="w-full flex items-center gap-3 p-3 hover:bg-muted transition-colors text-left"
                  onClick={() => handleSelect(result)}
                >
                  {result.image ? (
                    <img
                      src={result.image}
                      alt={result.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
                      {getIcon(result.type)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{result.name}</p>
                    <p className="text-xs text-muted-foreground capitalize flex items-center gap-1">
                      {getIcon(result.type)}
                      {result.type}
                      {result.price && (
                        <span className="ml-2 text-primary font-medium">
                          {formatPrice(result.price)}
                        </span>
                      )}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center">
              <Search className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                No results found for "{query}"
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
