import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "@/components/products/ProductCard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

// Define valid category types
type CategoryType = "skincare" | "makeup" | "perfume" | "haircare" | "bodycare" | "accessories";

const isCategoryValid = (category: string): category is CategoryType => {
  return ["skincare", "makeup", "perfume", "haircare", "bodycare", "accessories"].includes(category);
};

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        
        if (!category || !isCategoryValid(category)) {
          throw new Error("Invalid category");
        }
        
        const validCategory = category as CategoryType;
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('category', validCategory);
        
        if (error) {
          throw error;
        }
        
        // Add sale flag to some products for demo purposes
        const enhancedData = data?.map(product => ({
          ...product,
          is_sale: Math.random() > 0.5,
          discount_percent: Math.floor(Math.random() * 40) + 10,
          original_price: product.price * (1 + (Math.random() * 0.5))
        })) || [];
        
        setProducts(enhancedData);
      } catch (error: any) {
        console.error('Error fetching products:', error);
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
  }, [category]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-12"
    >
      <h1 className="text-3xl font-semibold mb-6 capitalize">{category}</h1>
      
      <div className="grid grid-cols-4 gap-8">
        {/* Filters Section */}
        <aside className="col-span-1">
          <div className="bg-white rounded-md shadow-sm p-4">
            <h4 className="text-lg font-semibold mb-4">Filters</h4>
            
            {/* Price Range */}
            <div>
              <h5 className="font-medium mb-2">Price Range</h5>
              <Slider
                defaultValue={[25]}
                max={100}
                step={1}
                onValueChange={(value) => console.log(value)}
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>$0</span>
                <span>$100+</span>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            {/* Sale Items */}
            <div>
              <h5 className="font-medium mb-2">Sale Items</h5>
              <Badge variant="secondary">Up to 50% off</Badge>
            </div>
          </div>
        </aside>
        
        {/* Product Grid */}
        <div className="col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="rounded-xl border bg-card animate-pulse h-[350px]"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
