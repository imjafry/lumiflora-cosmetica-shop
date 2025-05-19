import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency } from "@/lib/utils";
import type { Database } from "@/integrations/supabase/types";

type Order = Database["public"]["Tables"]["orders"]["Row"];
type Product = Database["public"]["Tables"]["products"]["Row"];

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    orders: 0,
    customers: 0,
    products: 0,
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    
    // Set up real-time subscription for orders
    const ordersSubscription = supabase
      .channel('orders_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
        fetchDashboardData();
      })
      .subscribe();

    return () => {
      ordersSubscription.unsubscribe();
    };
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch total sales and orders count
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('total, status');

      if (ordersError) throw ordersError;

      // Fetch products count
      const { count: productsCount, error: productsError } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

      if (productsError) throw productsError;

      // Fetch unique customers count
      const { count: customersCount, error: customersError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      if (customersError) throw customersError;

      // Calculate total sales
      const totalSales = ordersData.reduce((sum, order) => sum + order.total, 0);

      // Fetch recent orders
      const { data: recentOrdersData, error: recentOrdersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (recentOrdersError) throw recentOrdersError;

      setStats({
        totalSales,
        orders: ordersData.length,
        customers: customersCount || 0,
        products: productsCount || 0,
      });
      setRecentOrders(recentOrdersData || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Sales", value: formatCurrency(stats.totalSales) },
          { title: "Orders", value: stats.orders.toString() },
          { title: "Customers", value: stats.customers.toString() },
          { title: "Products", value: stats.products.toString() },
        ].map((stat, index) => (
          <div key={index} className="bg-background rounded-lg border p-6">
            <h3 className="text-muted-foreground font-medium">{stat.title}</h3>
            <div className="flex items-end mt-2 justify-between">
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Recent Orders */}
      <div className="bg-background rounded-lg border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
        </div>
        <div className="divide-y">
          {loading ? (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">Loading orders...</p>
            </div>
          ) : recentOrders.length > 0 ? (
            <div className="divide-y">
              {recentOrders.map((order) => (
                <div key={order.id} className="p-4 hover:bg-muted/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{order.full_name}</p>
                      <p className="text-sm text-muted-foreground">{order.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(order.total)}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.created_at || '').toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                        order.status === 'canceled' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No orders found.</p>
            </div>
          )}
          <div className="p-4 border-t">
            <Button variant="outline" className="w-full">
              <Link to="/admin/orders">View All Orders</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
