
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/products/ProductCard";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function BestSellersSection() {
  const [bestSellers, setBestSellers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchBestSellers() {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_bestseller', true)
          .limit(3);
        
        if (error) {
          throw error;
        }
        
        // Add sale flag to some products for demo purposes
        const enhancedData = data?.map(product => ({
          ...product,
          is_sale: Math.random() > 0.5,
          discount_percent: Math.floor(Math.random() * 40) + 10, // 10-50% discount
          original_price: Math.round(product.price * (1 + (Math.random() * 0.5)))
        })) || [];
        
        setBestSellers(enhancedData);
      } catch (error) {
        console.error('Error fetching bestsellers:', error);
        toast({
          title: "Error loading bestsellers",
          description: "Please try again later.",
          variant: "destructive",
        });
        setBestSellers([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchBestSellers();
  }, []);

  return (
    <section className="py-16 bg-[#f9f9f9]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-medium mb-2 font-playfair">Best Sellers</h2>
          <div className="w-20 h-1 bg-rose-400 mx-auto"></div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-xl border bg-card animate-pulse h-[350px]"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
