import { Card } from "@/components/ui/card";
import { Apple, Shirt, Home, ShoppingBasket, Hammer, Leaf, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCategories } from "@/hooks/useProducts";

const categoryIcons: Record<string, any> = {
  "Fresh Produce": Apple,
  "Groceries": ShoppingBasket,
  "Clothing": Shirt,
  "Household Items": Home,
  "Tools & Hardware": Hammer,
  "Farm Inputs": Leaf,
};

const categoryColors: Record<string, string> = {
  "Fresh Produce": "bg-secondary",
  "Groceries": "bg-primary",
  "Clothing": "bg-accent",
  "Household Items": "bg-forest",
  "Tools & Hardware": "bg-terracotta",
  "Farm Inputs": "bg-secondary",
};

const CategoriesSection = () => {
  const { categories, isLoading } = useCategories();

  if (isLoading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-48">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of products from trusted vendors at Kabale Central Market
          </p>
        </div>

        {/* Categories Grid */}
        {categories.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No categories available yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => {
              const Icon = categoryIcons[category.name] || ShoppingBasket;
              const color = categoryColors[category.name] || "bg-primary";
              
              return (
                <Link
                  key={category.id}
                  to={`/products?category=${category.id}`}
                  className="group animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card className="p-6 text-center hover:border-primary cursor-pointer group-hover:-translate-y-1 transition-all duration-300">
                    <div
                      className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-1">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    )}
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoriesSection;
