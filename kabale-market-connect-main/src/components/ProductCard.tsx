import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  vendor: string;
  vendor_id?: string;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  isNew?: boolean;
  discount?: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.inStock === false) {
      toast.error("This product is out of stock");
      return;
    }

    setIsAdding(true);
    try {
      await addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        vendor: product.vendor,
        vendor_id: product.vendor_id || "",
      });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="block">
      <Card className="group overflow-hidden">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <Badge variant="accent" className="text-xs">
                NEW
              </Badge>
            )}
            {product.discount && (
              <Badge variant="destructive" className="text-xs">
                -{product.discount}%
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="absolute top-3 right-3 w-8 h-8 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors"
          >
            <Heart
              className={`h-4 w-4 ${isLiked ? "fill-primary text-primary" : "text-muted-foreground"}`}
            />
          </button>

          {/* Quick Add Button */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-foreground/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <Button
              variant="hero"
              size="sm"
              className="w-full"
              onClick={handleAddToCart}
              disabled={product.inStock === false || isAdding}
            >
              <ShoppingCart className="h-4 w-4" />
              {isAdding ? "Adding..." : product.inStock === false ? "Out of Stock" : "Add to Cart"}
            </Button>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-4">
          {/* Vendor */}
          <p className="text-xs text-muted-foreground mb-1">{product.vendor}</p>

          {/* Name */}
          <h3 className="font-display font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          {product.rating !== undefined && (
            <div className="flex items-center gap-1 mb-3">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="text-sm font-medium">{product.rating}</span>
              {product.reviews !== undefined && (
                <span className="text-xs text-muted-foreground">({product.reviews})</span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-lg text-primary">
              UGX {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                UGX {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Stock Status */}
          {product.inStock === false && (
            <p className="text-xs text-destructive mt-2">Out of Stock</p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
