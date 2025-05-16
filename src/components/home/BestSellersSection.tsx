
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/products/ProductCard";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
    <section className="py-16 bg-[#f9f9f9] dark:bg-zinc-900/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-medium mb-2 font-playfair">Best Sellers</h2>
            <div className="w-20 h-1 bg-rose-400 mx-auto md:mx-0"></div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 md:mt-0"
          >
            <Link to="/category/skincare" className="text-primary hover:underline flex items-center">
              View all best sellers
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </motion.div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-xl border bg-card animate-pulse h-[350px]"></div>
            ))}
          </div>
        ) : bestSellers.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6" 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {bestSellers.map((product) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
              >
                <ProductCard key={product.id} product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">No bestsellers found.</p>
            <Button asChild variant="outline">
              <Link to="/category/skincare">
                Browse all products
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
