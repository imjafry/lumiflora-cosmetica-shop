
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingBag, ExternalLink } from "lucide-react";
import { format } from "date-fns";

type Order = {
  id: string;
  created_at: string;
  status: string;
  subtotal: number;
  total: number;
  invoice_url?: string;
  items_count?: number;
};

const OrderHistoryList = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Get orders
        const { data: ordersData, error: ordersError } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (ordersError) throw ordersError;

        // For each order, get the count of items
        const ordersWithItemCount = await Promise.all(
          ordersData.map(async (order) => {
            const { count, error } = await supabase
              .from("order_items")
              .select("*", { count: 'exact', head: true })
              .eq("order_id", order.id);

            if (error) throw error;

            return {
              ...order,
              items_count: count || 0,
            };
          })
        );

        setOrders(ordersWithItemCount);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-500";
      case "processing":
        return "bg-blue-500";
      case "shipped":
        return "bg-purple-500";
      case "delivered":
        return "bg-green-500";
      case "canceled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center my-8">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingBag className="mx-auto h-6 w-6 text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">
          You haven't placed any orders yet.
        </p>
        <Button asChild className="mt-4 rounded-full">
          <Link to="/">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table className="w-full text-sm text-left text-muted-foreground">
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="border-b">
              <TableCell className="font-medium">{order.id.split('-')[0]}</TableCell>
              <TableCell>{format(new Date(order.created_at), 'yyyy-MM-dd')}</TableCell>
              <TableCell>{order.items_count}</TableCell>
              <TableCell>৳{order.total}</TableCell>
              <TableCell>
                <Badge variant="outline" className={`${getStatusColor(order.status)} text-white`}>
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>
                {order.invoice_url ? (
                  <Button size="sm" variant="ghost" asChild>
                    <a href={order.invoice_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-1" /> Invoice
                    </a>
                  </Button>
                ) : (
                  <span className="text-muted-foreground text-xs">No invoice</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderHistoryList;
