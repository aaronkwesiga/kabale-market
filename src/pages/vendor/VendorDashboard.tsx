import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  Package,
  ShoppingCart,
  DollarSign,
  Users,
  ArrowRight,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";
import marketExterior from "@/assets/market-exterior.jpg";
import marketEntrance from "@/assets/market-entrance.jpg";

const stats = [
  {
    title: "Total Revenue",
    value: "UGX 2,450,000",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Total Orders",
    value: "156",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    title: "Active Products",
    value: "48",
    change: "+3",
    trend: "up",
    icon: Package,
  },
  {
    title: "Store Views",
    value: "1,234",
    change: "-2.4%",
    trend: "down",
    icon: Users,
  },
];

const recentOrders = [
  {
    id: "ORD-001",
    customer: "Grace Mugisha",
    product: "Fresh Tomatoes - 5kg",
    amount: 25000,
    status: "Pending",
    time: "2 mins ago",
  },
  {
    id: "ORD-002",
    customer: "John Tumwine",
    product: "Organic Honey - 1L",
    amount: 45000,
    status: "Processing",
    time: "15 mins ago",
  },
  {
    id: "ORD-003",
    customer: "Patricia Ainembabazi",
    product: "Avocados - Dozen",
    amount: 18000,
    status: "Delivered",
    time: "1 hour ago",
  },
  {
    id: "ORD-004",
    customer: "Robert Kiiza",
    product: "Coffee Beans - 500g",
    amount: 28000,
    status: "Delivered",
    time: "3 hours ago",
  },
];

const topProducts = [
  { name: "Fresh Tomatoes - 5kg", sales: 89, revenue: 2225000 },
  { name: "Organic Honey - 1L", sales: 56, revenue: 2520000 },
  { name: "Fresh Avocados - Dozen", sales: 45, revenue: 810000 },
  { name: "Matooke Bunch - Large", sales: 34, revenue: 510000 },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "bg-accent text-accent-foreground";
    case "Processing":
      return "bg-primary/20 text-primary";
    case "Delivered":
      return "bg-secondary text-secondary-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const VendorDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold">
            Welcome back, Sarah! 👋
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your store today.
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/vendor/analytics">
            <Button variant="outline">
              <Eye className="h-4 w-4" />
              View Analytics
            </Button>
          </Link>
          <Link to="/vendor/products">
            <Button variant="hero">
              <Package className="h-4 w-4" />
              Manage Products
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="font-display text-2xl font-bold mt-1">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-secondary" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-destructive" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        stat.trend === "up" ? "text-secondary" : "text-destructive"
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-xs text-muted-foreground">vs last month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Market Images Banner */}
      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="relative h-48 md:h-64">
            <img
              src={marketEntrance}
              alt="Kabale Central Market Entrance"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
            <div className="absolute bottom-4 left-4 text-background">
              <p className="font-display font-bold text-lg">Kabale Central Market</p>
              <p className="text-sm text-background/80">Your store location</p>
            </div>
          </div>
          <div className="relative h-48 md:h-64">
            <img
              src={marketExterior}
              alt="Kabale Central Market Exterior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
            <div className="absolute bottom-4 left-4 text-background">
              <p className="font-display font-bold text-lg">Stall 23, Ground Floor</p>
              <p className="text-sm text-background/80">Fresh Produce Section</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Recent Orders & Top Products */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display">Recent Orders</CardTitle>
            <Link to="/vendor/orders">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{order.customer}</p>
                      <Badge className={getStatusColor(order.status)} variant="outline">
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 truncate">
                      {order.product}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">
                      UGX {order.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">{order.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display">Top Products</CardTitle>
            <Link to="/vendor/products">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={product.name}
                  className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg"
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {product.sales} sales
                    </p>
                  </div>
                  <p className="font-semibold text-sm text-primary">
                    UGX {product.revenue.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorDashboard;
