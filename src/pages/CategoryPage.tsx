
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, Filter, Star } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

// Categories data for UI presentation
const categories = {
  skincare: {
    name: "Skincare",
    description: "Find the perfect skincare products for your daily routine",
    bannerImage: "https://images.unsplash.com/photo-1612540943771-0f492ce2010f?q=80&w=2000",
    color: "#f2f0e8",
  },
  makeup: {
    name: "Makeup",
    description: "Express your beauty with premium cosmetics",
    bannerImage: "https://images.unsplash.com/photo-1599958714858-a9e63c12a03f?q=80&w=2000",
    color: "#f9d5d3",
  },
  perfume: {
    name: "Fragrance",
    description: "Luxury scents that leave a lasting impression",
    bannerImage: "https://images.unsplash.com/photo-1615368711218-da4bce2fb4c8?q=80&w=2000",
    color: "#e8f0ff",
  },
  haircare: {
    name: "Hair Care",
    description: "Solutions for healthy and beautiful hair",
    bannerImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2000",
    color: "#e0f5e9",
  },
  bodycare: {
    name: "Body Care",
    description: "Nourish and pamper your body with premium products",
    bannerImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2000",
    color: "#f5e8e0",
  },
  accessories: {
    name: "Accessories",
    description: "Complete your beauty routine with essential tools",
    bannerImage: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2000",
    color: "#f0f0f0",
  },
  sale: {
    name: "Sale",
    description: "Special offers and discounted products",
    bannerImage: "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2000",
    color: "#fff0f3",
  },
};

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "priceAsc", label: "Price: Low to High" },
  { value: "priceDesc", label: "Price: High to Low" },
  { value: "rating", label: "Rating" },
];

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("featured");
  
  useEffect(() => {
    async function fetchProducts() {
      if (!categoryId) return;
      
      try {
        setLoading(true);
        
        let query = supabase.from('products').select('*');
        
        // Handle special case for "sale" category
        if (categoryId === "sale") {
          // For demo, we don't have an is_sale column, so let's consider any product with certain criteria
          query = query.or('is_featured.eq.true,is_bestseller.eq.true').limit(12);
        } else {
          // For regular categories
          query = query.eq('category', categoryId);
        }
        
        // Apply sorting
        switch (sortOption) {
          case "priceAsc":
            query = query.order('price', { ascending: true });
            break;
          case "priceDesc":
            query = query.order('price', { ascending: false });
            break;
          case "newest":
            query = query.order('created_at', { ascending: false });
            break;
          default:
            // Default sort - featured products first
            query = query.order('is_featured', { ascending: false });
            break;
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
          original_price: Math.round(product.price * (1 + (Math.random() * 0.5)))
        })) || [];
        
        setProducts(enhancedData);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast({
          title: "Error loading products",
          description: "Please try again later.",
          variant: "destructive",
        });
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProducts();
  }, [categoryId, sortOption]);
  
  // Handle sorting
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };
  
  const category = categoryId && categories[categoryId as keyof typeof categories];
  
  if (!category) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Category Not Found</h2>
        <p className="mb-6">The category you're looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Category Banner */}
      <div className="relative overflow-hidden" style={{ backgroundColor: category.color }}>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url(${category.bannerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center text-sm mb-4">
              <Link to="/" className="hover:text-rose-500 transition-colors">Home</Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="font-medium">{category.name}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-playfair font-medium mb-4">{category.name}</h1>
            <p className="text-gray-600">{category.description}</p>
          </div>
        </div>
      </div>
      
      {/* Products Section */}
      <div className="container mx-auto px-4 py-10">
        {/* Filters and Sorting */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter className="h-4 w-4" /> Filter
            </Button>
            <span className="text-sm text-gray-500">{loading ? 'Loading...' : `${products.length} products found`}</span>
          </div>
          
          <div className="flex items-center">
            <span className="text-sm mr-2">Sort by:</span>
            <select 
              value={sortOption}
              onChange={handleSortChange}
              className="border-none focus:ring-0 text-sm py-1 bg-transparent"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="rounded-xl border bg-card animate-pulse h-[350px]"></div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl mb-2">No products found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters or check out other categories.</p>
            <Button asChild variant="outline">
              <Link to="/">Continue Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CategoryPage;
