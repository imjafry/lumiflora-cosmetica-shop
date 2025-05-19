import React, { useState, useEffect } from "react";
import ProductCard from "@/components/products/ProductCard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ProductCardSkeleton from "@/components/products/ProductCardSkeleton";

export default function SalePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        // If you have a discount or sale_price field, use it. Otherwise, use is_featured as a placeholder.
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .or('discount.gt.0,is_featured.eq.true')
          .order('created_at', { ascending: false });
        if (error) throw error;
        setProducts(data || []);
      } catch (error: any) {
        toast({
          title: "Error loading products",
          description: error.message || "Failed to load products",
          variant: "destructive",
        });
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const NoProductsMessage = () => (
    <div className="flex flex-col items-center justify-center py-16">
      <h3 className="text-xl font-medium mb-2">No sale products found</h3>
      <p className="text-muted-foreground mb-6">Check back later for sale offers.</p>
      <Button onClick={() => window.location.reload()}>Reload</Button>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-12"
    >
      <h1 className="text-3xl font-semibold mb-6">Sale</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          [...Array(9)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <NoProductsMessage />
        )}
      </div>
    </motion.div>
  );
} 