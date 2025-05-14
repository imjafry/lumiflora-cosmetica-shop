
import React from "react";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import NewsletterSection from "@/components/home/NewsletterSection";
import FeaturesGrid from "@/components/home/FeaturesGrid";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight, Clock } from "lucide-react";

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="overflow-x-hidden"
    >
      {/* Large Sale Banner - (shows on desktop) */}
      <div className="hidden md:block py-4 bg-pink-50 dark:bg-pink-950/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-pink-500" />
              <p className="font-medium text-sm">Flash Sale Ends In: <span className="text-pink-500">23h 45m 12s</span></p>
            </div>
            <Button asChild variant="link" size="sm" className="text-pink-500">
              <Link to="/category/sale" className="flex items-center gap-1">
                View all deals <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <HeroSection />
      
      {/* Shop by Category */}
      <CategoriesSection />

      {/* Trending/Popular/Featured Products */}
      <div className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Best Selling Products</h2>
            <p className="text-muted-foreground">Our most popular products based on sales</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <Link 
                key={i}
                to="/products/1" 
                className="bg-background rounded-lg border group relative overflow-hidden"
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9" 
                    alt="Popular product" 
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium truncate">Popular Beauty Product</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-sm">৳1,250</span>
                    <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full">
                      <ShoppingBag className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                  -25%
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Collections */}
      <FeaturedProducts />
      
      {/* E-commerce Trust Badges */}
      <FeaturesGrid />
      
      {/* Recent Blog Posts or Beauty Tips (optional) */}
      <div className="py-16 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Beauty Tips & Trends</h2>
            <p className="text-muted-foreground">Discover the latest beauty trends and tips from our experts</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Link 
                key={i}
                to="/blog/skincare-tips" 
                className="group"
              >
                <div className="rounded-xl overflow-hidden">
                  <div className="aspect-[3/2] overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/photo-${1600000000000 + i * 100}`} 
                      alt="Beauty blog post" 
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-xs text-pink-500 font-medium uppercase">Skincare</span>
                  <h3 className="font-medium mt-1 group-hover:text-primary transition-colors">
                    How to build the perfect skincare routine
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Learn how to create an effective skincare routine that works for your specific skin type and concerns.
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <NewsletterSection />
    </motion.div>
  );
};

export default Index;
