import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Eye, Search, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Database } from "@/integrations/supabase/types";
import { DataTable } from "@/components/ui/data-table";

type ProfileType = Database["public"]["Tables"]["profiles"]["Row"];

export default function CustomersPage() {
  const [customers, setCustomers] = useState<ProfileType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderCounts, setOrderCounts] = useState<Record<string, number>>({});
  const [totalCustomers, setTotalCustomers] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  useEffect(() => {
    fetchCustomers(currentPage);
    fetchOrderCounts();
  }, [currentPage]);

  const fetchCustomers = async (page: number) => {
    try {
      setLoading(true);
      const offset = (page - 1) * pageSize
      const { data, error, count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(offset, offset + pageSize - 1)

      if (error) throw error;
      setCustomers(data || [])
      setTotalCustomers(count || 0)
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast({
        title: "Error loading customers",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderCounts = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('user_id');

      if (error) throw error;

      const counts: Record<string, number> = {};
      data?.forEach(item => {
        if (item.user_id) {
          counts[item.user_id] = (counts[item.user_id] || 0) + 1;
        }
      });

      setOrderCounts(counts);
    } catch (error) {
      console.error('Error fetching order counts:', error);
    }
  };

  const filteredCustomers = customers.filter(customer => 
    (customer.full_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const columns = [
    {
      header: "Customer",
      accessorKey: "full_name" as const,
      cell: (value: string | null) => (
        <div className="font-medium">{value || 'No Name'}</div>
      ),
    },
    {
      header: "Email",
      accessorKey: "email" as const,
    },
    {
      header: "Joined",
      accessorKey: "created_at" as const,
      cell: (value: string | null) => formatDate(value),
    },
    {
      header: "Orders",
      accessorKey: "id" as const,
      cell: (value: string) => (
        <Badge variant="outline">
          {orderCounts[value] || 0} orders
        </Badge>
      ),
    },
    {
      header: "Actions",
      accessorKey: "id" as const,
      cell: (value: string, row: ProfileType) => (
        <div className="flex justify-end space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to={`/admin/customers/${value}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon">
            <a href={`mailto:${row.email}`}>
              <Mail className="h-4 w-4" />
            </a>
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">Customers</h1>
      </div>

      <div className="bg-background rounded-lg border mb-8">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-medium">All Customers ({customers.length})</h2>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
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
        ) : filteredCustomers.length > 0 ? (
          <DataTable
            data={customers}
            columns={columns}
            totalItems={totalCustomers}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            pageSize={pageSize}
          />
        ) : (
          <div className="p-8 text-center">
            <p className="text-muted-foreground mb-4">No customers found matching your search.</p>
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
