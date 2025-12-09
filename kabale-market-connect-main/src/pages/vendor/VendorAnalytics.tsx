import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Calendar,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

const monthlyData = [
  { month: "Jul", revenue: 1200000, orders: 45 },
  { month: "Aug", revenue: 1450000, orders: 52 },
  { month: "Sep", revenue: 1380000, orders: 48 },
  { month: "Oct", revenue: 1820000, orders: 67 },
  { month: "Nov", revenue: 2100000, orders: 78 },
  { month: "Dec", revenue: 2450000, orders: 89 },
];

const topProducts = [
  { name: "Fresh Tomatoes - 5kg", revenue: 2225000, percentage: 28 },
  { name: "Organic Honey - 1L", revenue: 2520000, percentage: 32 },
  { name: "Fresh Avocados - Dozen", revenue: 810000, percentage: 10 },
  { name: "Coffee Beans - 500g", revenue: 784000, percentage: 10 },
  { name: "Others", revenue: 1561000, percentage: 20 },
];

const customerStats = [
  { label: "Total Customers", value: 234, change: "+12" },
  { label: "Repeat Customers", value: 89, change: "+8" },
  { label: "New This Month", value: 45, change: "+15" },
  { label: "Avg. Order Value", value: "UGX 47,000", change: "+5%" },
];

const VendorAnalytics = () => {
  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Track your store performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4" />
            Last 6 Months
          </Button>
          <Button variant="outline" size="sm">
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-hero-gradient text-primary-foreground">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-primary-foreground/80">Total Revenue</p>
                <p className="font-display text-3xl font-bold mt-1">
                  UGX 7.9M
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUp className="h-4 w-4" />
                  <span className="text-sm font-medium">+24.5%</span>
                </div>
              </div>
              <DollarSign className="h-10 w-10 text-primary-foreground/50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="font-display text-3xl font-bold mt-1">379</p>
                <div className="flex items-center gap-1 mt-2 text-secondary">
                  <ArrowUp className="h-4 w-4" />
                  <span className="text-sm font-medium">+18.2%</span>
                </div>
              </div>
              <ShoppingCart className="h-10 w-10 text-muted-foreground/50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Products Sold</p>
                <p className="font-display text-3xl font-bold mt-1">1,247</p>
                <div className="flex items-center gap-1 mt-2 text-secondary">
                  <ArrowUp className="h-4 w-4" />
                  <span className="text-sm font-medium">+32.1%</span>
                </div>
              </div>
              <Package className="h-10 w-10 text-muted-foreground/50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Store Views</p>
                <p className="font-display text-3xl font-bold mt-1">8,432</p>
                <div className="flex items-center gap-1 mt-2 text-destructive">
                  <ArrowDown className="h-4 w-4" />
                  <span className="text-sm font-medium">-2.4%</span>
                </div>
              </div>
              <Users className="h-10 w-10 text-muted-foreground/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Revenue Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2">
              {monthlyData.map((data) => (
                <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-primary/20 rounded-t-lg relative overflow-hidden"
                    style={{
                      height: `${(data.revenue / maxRevenue) * 100}%`,
                      minHeight: "20px",
                    }}
                  >
                    <div
                      className="absolute bottom-0 left-0 right-0 bg-hero-gradient rounded-t-lg transition-all duration-300"
                      style={{
                        height: `${(data.revenue / maxRevenue) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{data.month}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 pt-4 border-t border-border">
              <div>
                <p className="text-sm text-muted-foreground">Highest Month</p>
                <p className="font-display font-bold text-primary">
                  December - UGX 2.45M
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Average Monthly</p>
                <p className="font-display font-bold">UGX 1.73M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Revenue by Product</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium truncate max-w-[150px]">
                      {product.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {product.percentage}%
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-hero-gradient rounded-full transition-all duration-500"
                      style={{ width: `${product.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Customer Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {customerStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-2xl md:text-3xl font-bold">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <span className="text-xs text-secondary font-medium">{stat.change}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display">Monthly Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3 font-medium text-sm">Month</th>
                  <th className="text-left p-3 font-medium text-sm">Revenue</th>
                  <th className="text-left p-3 font-medium text-sm">Orders</th>
                  <th className="text-left p-3 font-medium text-sm">Avg. Order Value</th>
                  <th className="text-left p-3 font-medium text-sm">Growth</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((data, index) => {
                  const prevRevenue = index > 0 ? monthlyData[index - 1].revenue : data.revenue;
                  const growth = ((data.revenue - prevRevenue) / prevRevenue) * 100;
                  const avgOrder = Math.round(data.revenue / data.orders);
                  
                  return (
                    <tr key={data.month} className="border-t border-border">
                      <td className="p-3 font-medium">{data.month} 2024</td>
                      <td className="p-3">UGX {data.revenue.toLocaleString()}</td>
                      <td className="p-3">{data.orders}</td>
                      <td className="p-3">UGX {avgOrder.toLocaleString()}</td>
                      <td className="p-3">
                        <span
                          className={`flex items-center gap-1 ${
                            growth >= 0 ? "text-secondary" : "text-destructive"
                          }`}
                        >
                          {growth >= 0 ? (
                            <ArrowUp className="h-3 w-3" />
                          ) : (
                            <ArrowDown className="h-3 w-3" />
                          )}
                          {Math.abs(growth).toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorAnalytics;
