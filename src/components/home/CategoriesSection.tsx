import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type CategoryType = Database["public"]["Enums"]["product_category"];

// Default fallback category data
const defaultCategories = [
  {
    id: "skincare",
    name: "Natural Beauty Collection",
    description: "Discover our premium skincare essentials",
    image: "https://images.unsplash.com/photo-1612540943771-0f492ce2010f?q=80&w=600",
    color: "bg-[#f2f0e8]",
    productCount: 124,
    tag: "NEW COLLECTION",
  },
  {
    id: "makeup",
    name: "10% OFF Body Butter",
    description: "Limited time promotion on select items",
    image: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=600",
    color: "bg-[#f9d5d3]",
    productCount: 98,
    tag: "SPECIAL OFFER",
  },
];

// Category display settings - customize how each category appears on the home page
const categoryDisplaySettings = {
  skincare: {
    name: "Natural Beauty Collection",
    description: "Discover our premium skincare essentials",
    image: "https://images.unsplash.com/photo-1612540943771-0f492ce2010f?q=80&w=600",
    color: "bg-[#f2f0e8]",
    tag: "NEW COLLECTION",
  },
  makeup: {
    name: "10% OFF Body Butter",
    description: "Limited time promotion on select items",
    image: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=600",
    color: "bg-[#f9d5d3]",
    tag: "SPECIAL OFFER",
  },
  perfume: {
    name: "Luxury Fragrances",
    description: "Discover your signature scent",
    image: "https://images.unsplash.com/photo-1588514727390-91fd5ebaef81?q=80&w=600",
    color: "bg-[#e5e7eb]",
    tag: "TRENDING",
  },
  haircare: {
    name: "Hair Care Collection",
    description: "Salon-quality products for all hair types",
    image: "https://images.unsplash.com/photo-1599751449128-eb7249c3d6b1?q=80&w=600",
    color: "bg-[#dbeafe]",
    tag: "BESTSELLERS",
  },
  bodycare: {
    name: "Body Care Essentials",
    description: "Nourish and pamper your skin",
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf15?q=80&w=600",
    color: "bg-[#f3e8ff]",
    tag: "MOST LOVED",
  },
  accessories: {
    name: "Beauty Accessories",
    description: "Complete your beauty routine",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600",
    color: "bg-[#fef3c7]",
    tag: "NEW ARRIVALS",
  },
};

export default function CategoriesSection() {
  const [categories, setCategories] = useState<any[]>(defaultCategories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        
        // Get unique categories from products
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('category, id');
        
        if (productsError) throw productsError;
        
        // Get unique categories and count products in each
        const categoryCounts = productsData.reduce((acc, product) => {
          const category = product.category as CategoryType;
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {} as Record<CategoryType, number>);
        
        // Get categories with the most products
        const topCategories = Object.entries(categoryCounts)
          .sort(([, countA], [, countB]) => countB - countA)
          .slice(0, 2)
          .map(([category, count]) => {
            const settings = categoryDisplaySettings[category as CategoryType] || {
              name: `${category.charAt(0).toUpperCase()}${category.slice(1)} Collection`,
              description: `Explore our ${category} collection`,
              image: "https://images.unsplash.com/photo-1612540943771-0f492ce2010f?q=80&w=600",
              color: "bg-[#f2f0e8]",
              tag: "COLLECTION",
            };
            
            return {
              id: category,
              ...settings,
              productCount: count,
            };
          });
        
        // If we have categories, use them; otherwise, fall back to default
        if (topCategories.length > 0) {
          setCategories(topCategories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Keep default categories on error
      } finally {
        setLoading(false);
      }
    }
    
    fetchCategories();
  }, []);

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            // Loading skeleton
            [...Array(2)].map((_, index) => (
              <div key={index} className="h-[240px] rounded-xl animate-pulse bg-gray-200 dark:bg-gray-800"></div>
            ))
          ) : (
            // Actual categories
            categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link to={`/category/${category.id}`}>
                  <div className={`${category.color} rounded-xl p-8 h-[240px] relative overflow-hidden`}>
                    <div className="absolute top-8 left-8 z-10">
                      <span className="text-xs font-semibold tracking-wider text-rose-500">{category.tag}</span>
                      <h3 className="text-2xl font-medium my-2">{category.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                      <span className="flex items-center text-sm font-medium text-gray-800 hover:text-rose-500 transition-colors">
                        Shop Now <ArrowRight className="h-3.5 w-3.5 ml-1" />
                      </span>
                    </div>
                    
                    <img
                      src={category.image}
                      alt={category.name}
                      className="absolute right-0 bottom-0 h-full object-contain object-right-bottom"
                    />
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
