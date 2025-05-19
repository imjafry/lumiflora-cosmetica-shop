import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash, Plus, Eye, Search, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { Database } from "@/integrations/supabase/types";
import { DataTable } from "@/components/ui/data-table";
import sampleImage from "@/assets/images/no-image.png";

type ProductType = Database["public"]["Tables"]["products"]["Row"];

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalProducts, setTotalProducts] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  useEffect(() => {
    fetchProducts(currentPage)
  }, [currentPage])

  const fetchProducts = async (page: number) => {
    try {
      setLoading(true);
      const offset = (page - 1) * pageSize
      const { data, error, count } = await supabase
        .from('products')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(offset, offset + pageSize - 1)

      if (error) throw error;
      setProducts(data || [])
      setTotalProducts(count || 0)
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error loading products",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Product deleted",
        description: "The product has been successfully deleted.",
      });

      // Refresh products list
      fetchProducts(currentPage);
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error deleting product",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const columns = [
    {
      header: "Image",
      accessorKey: "images" as const,
      cell: (value: string[]) => (
        <img
          src={value[0]}
          alt="Product"
          className="h-12 w-12 object-cover rounded-md"
          onError={(e) => {
            e.currentTarget.src = sampleImage;
          }}
        />
      ),
    },
    {
      header: "Name",
      accessorKey: "name" as const,
      cell: (value: string, row: ProductType) => (
        <div>
          <p className="font-medium">{value}</p>
          <p className="text-sm text-muted-foreground">{row.brand}</p>
        </div>
      ),
    },
    {
      header: "Category",
      accessorKey: "category" as const,
      cell: (value: string) => (
        <span className="capitalize">{value}</span>
      ),
    },
    {
      header: "Price",
      accessorKey: "price" as const,
      cell: (value: number) => formatCurrency(value),
    },
    {
      header: "Stock",
      accessorKey: "stock" as const,
      cell: (value: number) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
            ${value > 10
              ? "bg-green-100 text-green-800"
              : value > 0
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
        >
          {value > 0 ? `${value} in stock` : "Out of stock"}
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "is_featured" as const,
      cell: (value: boolean | null, row: ProductType) => (
        <div className="space-y-1">
          {value && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Featured
            </span>
          )}
          {row.is_bestseller && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              Bestseller
            </span>
          )}
          {row.is_new && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              New
            </span>
          )}
        </div>
      ),
    },
    {
      header: "Actions",
      accessorKey: "id" as const,
      cell: (value: string) => (
        <div className="flex justify-end space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to={`/admin/products/${value}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to={`/admin/products/${value}/edit`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => handleDelete(value)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">Products</h1>
        <Button asChild>
          <Link to="/admin/products/new">
            <Plus className="w-4 h-4 mr-2" /> Add Product
          </Link>
        </Button>
      </div>

      <div className="bg-background rounded-lg border mb-8">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-medium">All Products ({totalProducts})</h2>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
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
        ) : filteredProducts.length > 0 ? (
          <DataTable
            data={products}
            columns={columns}
            totalItems={totalProducts}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            pageSize={pageSize}
          />
        ) : (
          <div className="p-8 text-center">
            <p className="text-muted-foreground mb-4">No products found matching your search.</p>
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
