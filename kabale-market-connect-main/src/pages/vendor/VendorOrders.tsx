import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Eye, Check, Truck, Package } from "lucide-react";
import { useState } from "react";

const orders = [
  {
    id: "ORD-2024-001",
    customer: "Grace Mugisha",
    phone: "+256 700 123 456",
    products: [
      { name: "Fresh Tomatoes - 5kg", quantity: 2, price: 25000 },
      { name: "Avocados - Dozen", quantity: 1, price: 18000 },
    ],
    total: 68000,
    status: "Pending",
    paymentMethod: "MTN MoMo",
    deliveryAddress: "Plot 23, Kikungiri Road, Kabale",
    date: "2024-01-15 10:30 AM",
  },
  {
    id: "ORD-2024-002",
    customer: "John Tumwine",
    phone: "+256 772 456 789",
    products: [{ name: "Organic Honey - 1L", quantity: 2, price: 45000 }],
    total: 90000,
    status: "Processing",
    paymentMethod: "Airtel Money",
    deliveryAddress: "Kabale University, Staff Quarters",
    date: "2024-01-15 09:15 AM",
  },
  {
    id: "ORD-2024-003",
    customer: "Patricia Ainembabazi",
    phone: "+256 701 789 012",
    products: [
      { name: "Coffee Beans - 500g", quantity: 3, price: 28000 },
      { name: "Fresh Cabbage - 3 Heads", quantity: 2, price: 8000 },
    ],
    total: 100000,
    status: "Out for Delivery",
    paymentMethod: "MTN MoMo",
    deliveryAddress: "Katuna Road, Near Shell Petrol Station",
    date: "2024-01-14 04:45 PM",
  },
  {
    id: "ORD-2024-004",
    customer: "Robert Kiiza",
    phone: "+256 789 345 678",
    products: [{ name: "Fresh Matooke - Large Bunch", quantity: 1, price: 15000 }],
    total: 15000,
    status: "Delivered",
    paymentMethod: "MTN MoMo",
    deliveryAddress: "Kabale Town, Central Division",
    date: "2024-01-14 11:20 AM",
  },
  {
    id: "ORD-2024-005",
    customer: "Mary Kyomugisha",
    phone: "+256 700 567 890",
    products: [
      { name: "Fresh Tomatoes - 5kg", quantity: 1, price: 25000 },
      { name: "Organic Honey - 1L", quantity: 1, price: 45000 },
    ],
    total: 70000,
    status: "Delivered",
    paymentMethod: "Airtel Money",
    deliveryAddress: "Rubanda District, Muko Sub-county",
    date: "2024-01-13 02:00 PM",
  },
];

const getStatusConfig = (status: string) => {
  switch (status) {
    case "Pending":
      return { color: "bg-accent text-accent-foreground", icon: Package };
    case "Processing":
      return { color: "bg-primary/20 text-primary", icon: Package };
    case "Out for Delivery":
      return { color: "bg-terracotta-light/20 text-terracotta", icon: Truck };
    case "Delivered":
      return { color: "bg-secondary text-secondary-foreground", icon: Check };
    default:
      return { color: "bg-muted text-muted-foreground", icon: Package };
  }
};

const VendorOrders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState<(typeof orders)[0] | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    All: orders.length,
    Pending: orders.filter((o) => o.status === "Pending").length,
    Processing: orders.filter((o) => o.status === "Processing").length,
    "Out for Delivery": orders.filter((o) => o.status === "Out for Delivery").length,
    Delivered: orders.filter((o) => o.status === "Delivered").length,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground">Manage and track your customer orders</p>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(statusCounts).map(([status, count]) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              statusFilter === status
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            {status} ({count})
          </button>
        ))}
      </div>

      {/* Search & Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search orders by ID or customer name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-muted rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const statusConfig = getStatusConfig(order.status);
          return (
            <Card key={order.id} className="hover:border-primary/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-display font-bold">{order.id}</span>
                      <Badge className={statusConfig.color}>
                        <statusConfig.icon className="h-3 w-3 mr-1" />
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium">{order.customer}</p>
                    <p className="text-xs text-muted-foreground">{order.phone}</p>
                  </div>

                  {/* Products */}
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">Products:</p>
                    <div className="space-y-1">
                      {order.products.slice(0, 2).map((product, idx) => (
                        <p key={idx} className="text-sm">
                          {product.quantity}x {product.name}
                        </p>
                      ))}
                      {order.products.length > 2 && (
                        <p className="text-xs text-muted-foreground">
                          +{order.products.length - 2} more items
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Total & Actions */}
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-display font-bold text-lg text-primary">
                        UGX {order.total.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">{order.paymentMethod}</p>
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-display">Order Details</CardTitle>
              <Badge className={getStatusConfig(selectedOrder.status).color}>
                {selectedOrder.status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Order ID</p>
                  <p className="font-medium">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{selectedOrder.date}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Customer</p>
                <p className="font-medium">{selectedOrder.customer}</p>
                <p className="text-sm text-muted-foreground">{selectedOrder.phone}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Delivery Address</p>
                <p className="font-medium">{selectedOrder.deliveryAddress}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Products</p>
                <div className="space-y-2">
                  {selectedOrder.products.map((product, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center p-2 bg-muted rounded-lg"
                    >
                      <span>
                        {product.quantity}x {product.name}
                      </span>
                      <span className="font-medium">
                        UGX {(product.price * product.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-border">
                <span className="font-display font-bold text-lg">Total</span>
                <span className="font-display font-bold text-xl text-primary">
                  UGX {selectedOrder.total.toLocaleString()}
                </span>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setSelectedOrder(null)}
                >
                  Close
                </Button>
                {selectedOrder.status === "Pending" && (
                  <Button variant="hero" className="flex-1">
                    Confirm Order
                  </Button>
                )}
                {selectedOrder.status === "Processing" && (
                  <Button variant="hero" className="flex-1">
                    Mark as Shipped
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default VendorOrders;
