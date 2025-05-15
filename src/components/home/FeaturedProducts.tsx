import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../products/ProductCard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("featured");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        
        let query;
        if (activeTab === "featured") {
          query = supabase.from('products').select('*').eq('is_featured', true).limit(8);
        } else if (activeTab === "bestsellers") {
          query = supabase.from('products').select('*').eq('is_bestseller', true).limit(8);
        } else if (activeTab === "new") {
          query = supabase.from('products').select('*').eq('is_new', true).limit(8);
        }
        
        const { data, error } = await query;
        
        if (error) {
          throw error;
        }
        
        // Add sale flag to some products for demo purposes
        const enhancedData = data?.map(product => ({
          ...product,
          is_sale: Math.random() > 0.5,
          discount_percent: Math.floor(Math.random() * 40) + 10, // 10-50% discount
          original_price: product.is_sale ? Math.round(product.price * (1 + (Math.random() * 0.5))) : null
        })) || [];
        
        setProducts(enhancedData);
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
    }
    
    fetchProducts();
  }, [activeTab]);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="text-3xl font-bold">Shop Our Collections</h2>
            <p className="text-muted-foreground mt-2">Handpicked beauty products for every need</p>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 md:mt-0"
          >
            <Link to="/products" className="text-primary hover:underline flex items-center">
              View all products
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        <Tabs 
          defaultValue="featured" 
          className="w-full"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <div className="flex justify-center mb-8">
            <TabsList className="bg-background/50 dark:bg-muted/20 backdrop-blur-sm">
              <TabsTrigger value="featured" className="px-8">Featured</TabsTrigger>
              <TabsTrigger value="bestsellers" className="px-8">Bestsellers</TabsTrigger>
              <TabsTrigger value="new" className="px-8">New Arrivals</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="featured" className="mt-0">
            {renderProductGrid(products, loading)}
          </TabsContent>
          
          <TabsContent value="bestsellers" className="mt-0">
            {renderProductGrid(products, loading)}
          </TabsContent>
          
          <TabsContent value="new" className="mt-0">
            {renderProductGrid(products, loading)}
          </TabsContent>
        </Tabs>

        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg" className="rounded-full px-8">
            <Link to="/products">
              Browse all products
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function renderProductGrid(products: any[], loading: boolean) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="rounded-xl border bg-card animate-pulse h-[350px]"></div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No products found.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
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
      {products.map((product) => (
        <motion.div
          key={product.id}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
          }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}

// Mock data for fallback
const mockProducts = [
  {
    id: "1",
    name: "Hydrating Serum with Hyaluronic Acid",
    brand: "SkinJoy",
    price: 2490,
    rating: 4.8,
    reviewCount: 156,
    images: ["https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"],
    category: "skincare",
    is_new: true,
    is_bestseller: true,
    is_featured: true,
  },
  {
    id: "2",
    name: "Long-lasting Matte Lipstick",
    brand: "GlamourCo",
    price: 1790,
    rating: 4.6,
    reviewCount: 98,
    images: ["https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07"],
    category: "makeup",
    is_new: false,
    is_bestseller: true,
    is_featured: true,
  },
  {
    id: "3",
    name: "Luxury Rose Eau de Parfum",
    brand: "LuxScent",
    price: 5990,
    rating: 4.9,
    reviewCount: 72,
    images: ["https://images.unsplash.com/photo-1501854140801-50d01698950b"],
    category: "perfume",
    is_new: true,
    is_bestseller: false,
    is_featured: true,
  },
  {
    id: "4",
    name: "Gentle Cleansing Foam",
    brand: "SkinJoy",
    price: 1290,
    rating: 4.7,
    reviewCount: 124,
    images: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb"],
    category: "skincare",
    is_new: false,
    is_bestseller: false,
    is_featured: true,
  },
  {
    id: "5",
    name: "Vitamin C Brightening Cream",
    brand: "GlowSkin",
    price: 3290,
    rating: 4.5,
    reviewCount: 89,
    images: ["https://images.unsplash.com/photo-1556228578-8c89e6adf883"],
    category: "skincare",
    is_new: true,
    is_bestseller: true,
    is_featured: true,
  },
  {
    id: "6",
    name: "24-Hour Waterproof Eyeliner",
    brand: "MakeupPro",
    price: 950,
    rating: 4.3,
    reviewCount: 112,
    images: ["https://images.unsplash.com/photo-1512496015851-a90fb38ba796"],
    category: "makeup",
    is_new: false,
    is_bestseller: true,
    is_featured: true,
  },
  {
    id: "7",
    name: "Keratin Hair Treatment Oil",
    brand: "HairLuxe",
    price: 1890,
    rating: 4.6,
    reviewCount: 76,
    images: ["https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388"],
    category: "haircare",
    is_new: true,
    is_bestseller: false,
    is_featured: true,
  },
  {
    id: "8",
    name: "Collagen Peptide Face Mask",
    brand: "SkinJoy",
    price: 590,
    rating: 4.8,
    reviewCount: 203,
    images: ["https://images.unsplash.com/photo-1570194065650-d99fb4bedf15"],
    category: "skincare",
    is_new: false,
    is_bestseller: true,
    is_featured: true,
  }
];
