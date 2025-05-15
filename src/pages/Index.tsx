
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

// Components
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import FeaturesGrid from "@/components/home/FeaturesGrid";
import ProductCard from "@/components/products/ProductCard";
import FeaturedProducts from "@/components/home/FeaturedProducts";

// Product tab options
const tabOptions = [
  { id: "all", label: "All Products" },
  { id: "new", label: "New Arrivals" },
  { id: "trending", label: "Trending" },
  { id: "sale", label: "On Sale" },
  { id: "bestsellers", label: "Bestsellers" }
];

// Brand logos
const brandLogos = [
  {
    name: "Natural Co",
    logo: "https://placehold.co/120x60?text=Natural+Co",
  },
  {
    name: "Skin Joy",
    logo: "https://placehold.co/120x60?text=Skin+Joy",
  },
  {
    name: "Beauty Plus",
    logo: "https://placehold.co/120x60?text=Beauty+Plus",
  },
  {
    name: "Pure Care",
    logo: "https://placehold.co/120x60?text=Pure+Care",
  },
  {
    name: "D&S",
    logo: "https://placehold.co/120x60?text=D%26S",
  },
  {
    name: "Glamour",
    logo: "https://placehold.co/120x60?text=Glamour",
  }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("all");
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="overflow-x-hidden"
    >
      {/* Hero Section */}
      <HeroSection />
      
      {/* Shop by Category */}
      <CategoriesSection />

      {/* Brand Logos */}
      <div className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {brandLogos.map((brand, index) => (
              <div key={index} className="grayscale hover:grayscale-0 transition-all duration-300">
                <img src={brand.logo} alt={brand.name} className="h-9 w-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <FeaturedProducts />
      
      {/* Promo Banner */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-[#f6f2ea] rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-12 flex flex-col justify-center">
                <div className="max-w-lg">
                  <span className="text-rose-500 font-medium mb-2 inline-block">SAVE TODAY</span>
                  <h3 className="text-4xl font-playfair font-medium mb-4">
                    <span className="text-rose-500">30% </span>
                    <span className="italic font-light">off</span>
                  </h3>
                  <h4 className="text-2xl font-medium mb-4">Spa Beauty Care</h4>
                  <p className="text-gray-600 mb-6">Experience luxury skincare with our premium collection. Limited time offer - treat yourself today!</p>
                  <Button asChild className="rounded-full bg-zinc-900 hover:bg-black text-white">
                    <Link to="/category/skincare" className="px-8">Shop Now</Link>
                  </Button>
                </div>
              </div>
              <div className="relative h-[300px] md:h-auto">
                <img 
                  src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1000"
                  alt="Spa Beauty Care" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
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

      {/* Women's Outlet Banner */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-[#fff5f7] rounded-2xl p-12 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-2xl font-medium mb-2">Women's Outlet</h3>
              <h2 className="text-3xl md:text-4xl font-playfair font-medium mb-6">
                Further reductions. Up to <span className="text-rose-500">70% Off.</span>
              </h2>
              <p className="text-gray-600 mb-8">Find all your favorite beauty brands at unbelievable prices.</p>
              <Button asChild className="rounded-none bg-zinc-900 hover:bg-black text-white">
                <Link to="/category/sale" className="px-8">SHOP THE OUTLET</Link>
              </Button>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute left-0 bottom-0 w-40 h-40">
              <div className="absolute w-full h-full bg-contain bg-no-repeat bg-bottom opacity-30"
                style={{backgroundImage: "url('https://images.unsplash.com/photo-1599958714858-a9e63c12a03f?q=80&w=400')"}}></div>
            </div>
            <div className="absolute right-0 top-0 w-40 h-40">
              <div className="absolute w-full h-full bg-contain bg-no-repeat bg-top opacity-30"
                style={{backgroundImage: "url('https://images.unsplash.com/photo-1608248543803-ba4f8c70ae7b?q=80&w=400')"}}></div>
            </div>
          </div>
        </div>
      </section>

      {/* E-commerce Trust Badges */}
      <FeaturesGrid />
      
      {/* Newsletter Section */}
      <NewsletterSection />
    </motion.div>
  );
};

export default Index;
