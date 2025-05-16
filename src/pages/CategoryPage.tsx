
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "@/components/products/ProductCard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Database } from "@/integrations/supabase/types";

// Define valid category types
type CategoryType = Database["public"]["Enums"]["product_category"];

const isCategoryValid = (category: string): category is CategoryType => {
  return ["skincare", "makeup", "perfume", "haircare", "bodycare", "accessories"].includes(category);
};

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0]);
  const [showSaleOnly, setShowSaleOnly] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        
        if (!category) {
          throw new Error("No category specified");
        }
        
        let query = supabase.from('products').select('*');
        
        // Check if it's a valid category enum or handle "sale" as a special case
        if (category === 'sale') {
          // For "sale" category, we'll just get featured products and mark them as on sale
          query = query.eq('is_featured', true);
        } else if (isCategoryValid(category)) {
          // For regular categories, filter by the category
          const validCategory = category as CategoryType;
          query = query.eq('category', validCategory);
        } else {
          throw new Error("Invalid category");
        }
        
        const { data, error } = await query;
        
        if (error) {
          throw error;
        }
        
        // Add sale flag to some products for demo purposes
        const enhancedData = data?.map(product => ({
          ...product,
          is_sale: category === 'sale' ? true : Math.random() > 0.5,
          discount_percent: Math.floor(Math.random() * 40) + 10,
          original_price: Math.round(product.price * (1 + (Math.random() * 0.5)))
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

  // Filter products based on price range and sale status
  const filteredProducts = products.filter(product => {
    const meetsPrice = product.price >= priceRange[0];
    const meetsSale = showSaleOnly ? product.is_sale : true;
    return meetsPrice && meetsSale;
  });

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  const toggleSaleItems = () => {
    setShowSaleOnly(!showSaleOnly);
  };

  const NoProductsMessage = () => (
    <div className="col-span-3 flex flex-col items-center justify-center py-16">
      <h3 className="text-xl font-medium mb-2">No products found</h3>
      <p className="text-muted-foreground mb-6">Try adjusting your filters or check back later.</p>
      <Button onClick={() => {setPriceRange([0]); setShowSaleOnly(false);}}>
        Reset Filters
      </Button>
    </div>
  );

  // Format category name for display
  const formatCategoryName = (categoryName: string) => {
    return categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-12"
    >
      <h1 className="text-3xl font-semibold mb-6 capitalize">{category && formatCategoryName(category)}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters Section */}
        <aside className="col-span-1">
          <div className="bg-white dark:bg-zinc-900 rounded-md shadow-sm p-4">
            <h4 className="text-lg font-semibold mb-4">Filters</h4>
            
            {/* Price Range */}
            <div>
              <h5 className="font-medium mb-2">Price Range</h5>
              <Slider
                defaultValue={[0]}
                value={priceRange}
                max={10000}
                step={500}
                onValueChange={handlePriceChange}
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>৳0</span>
                <span>৳{priceRange[0]}</span>
                <span>৳10,000+</span>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            {/* Sale Items */}
            <div>
              <h5 className="font-medium mb-2">Sale Items</h5>
              <Badge 
                variant={showSaleOnly ? "default" : "secondary"}
                onClick={toggleSaleItems}
                className="cursor-pointer"
              >
                {showSaleOnly ? "Sale items only" : "All items"}
              </Badge>
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
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <NoProductsMessage />
          )}
        </div>
      </div>
    </motion.div>
  );
}
