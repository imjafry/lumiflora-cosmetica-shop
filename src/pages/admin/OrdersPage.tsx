import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Eye, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Database } from "@/integrations/supabase/types";
import { DataTable } from "@/components/ui/data-table";

type OrderType = Database["public"]["Tables"]["orders"]["Row"];

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalOrders, setTotalOrders] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  useEffect(() => {
    fetchOrders(currentPage)
  }, [currentPage])

  const fetchOrders = async (page: number) => {
    try {
      setLoading(true);
      const offset = (page - 1) * pageSize
      const { data, error, count } = await supabase
        .from('orders')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(offset, offset + pageSize - 1)

      if (error) throw error;
      setOrders(data || [])
      setTotalOrders(count || 0)
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Error loading orders",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => 
    order.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800">{status}</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">{status}</Badge>;
      case 'shipped':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800">{status}</Badge>;
      case 'delivered':
        return <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">{status}</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const columns = [
    {
      header: "Order ID",
      accessorKey: "id" as const,
      cell: (value: string) => (
        <span className="font-mono text-xs">{value.substring(0, 8)}...</span>
      ),
    },
    {
      header: "Customer",
      accessorKey: "full_name" as const,
      cell: (value: string, row: OrderType) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground">{row.email}</div>
        </div>
      ),
    },
    {
      header: "Date",
      accessorKey: "created_at" as const,
      cell: (value: string) => formatDate(value),
    },
    {
      header: "Amount",
      accessorKey: "total" as const,
      cell: (value: number) => formatCurrency(value),
    },
    {
      header: "Status",
      accessorKey: "status" as const,
      cell: (value: string) => getStatusBadge(value),
    },
    {
      header: "Actions",
      accessorKey: "id" as const,
      cell: (value: string) => (
        <div className="text-right">
          <Button variant="ghost" size="icon" asChild>
            <Link to={`/admin/orders/${value}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">Orders</h1>
      </div>

      <div className="bg-background rounded-lg border mb-8">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-medium">All Orders ({orders.length})</h2>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email or order ID..."
              className="pl-8 w-full md:w-64"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="p-8 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : filteredOrders.length > 0 ? (
          <DataTable
            data={orders}
            columns={columns}
            totalItems={totalOrders}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            pageSize={pageSize}
          />
        ) : (
          <div className="p-8 text-center">
            <p className="text-muted-foreground mb-4">No orders found matching your search.</p>
            {searchTerm && (
              <Button variant="outline" onClick={() => setSearchTerm("")}>
                Clear Search
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
