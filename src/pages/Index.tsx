
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Star, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";

// Components
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import FeaturesGrid from "@/components/home/FeaturesGrid";
import ProductCard from "@/components/products/ProductCard";

// Example products data
const featuredProducts = [
  {
    id: "1",
    name: "Hydrating Serum",
    brand: "SkinJoy",
    price: 2490,
    originalPrice: 2990,
    rating: 4.8,
    reviewCount: 156,
    images: ["https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"],
    isNew: true,
    discount: 17,
    category: "skincare",
    is_new: true,
    is_sale: true,
    discount_percent: 17,
    original_price: 2990
  },
  {
    id: "2",
    name: "Matte Lipstick",
    brand: "GlamourCo",
    price: 1790,
    originalPrice: 2290,
    rating: 4.6,
    reviewCount: 98,
    images: ["https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07"],
    isNew: false,
    discount: 22,
    category: "makeup",
    is_sale: true,
    discount_percent: 22,
    original_price: 2290
  },
  {
    id: "3",
    name: "Luxe Perfume",
    brand: "Scent & Co",
    price: 5990,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 42,
    images: ["https://images.unsplash.com/photo-1541643600914-78b084683601"],
    isNew: true,
    discount: null,
    category: "perfumes",
    is_new: true
  },
  {
    id: "4",
    name: "Hair Treatment Oil",
    brand: "NatureGlow",
    price: 1890,
    originalPrice: 2390,
    rating: 4.7,
    reviewCount: 87,
    images: ["https://images.unsplash.com/photo-1534368786749-d48e2f071a34"],
    isNew: false,
    discount: 21,
    category: "haircare",
    is_sale: true,
    discount_percent: 21,
    original_price: 2390
  },
  {
    id: "5",
    name: "Face Moisturizer",
    brand: "SkinJoy",
    price: 1990,
    originalPrice: 2490,
    rating: 4.5,
    reviewCount: 113,
    images: ["https://images.unsplash.com/photo-1570554886111-e80fcca6a029"],
    isNew: false,
    discount: 20,
    category: "skincare",
    is_sale: true,
    discount_percent: 20,
    original_price: 2490
  },
  {
    id: "6",
    name: "BB Cream",
    brand: "GlamourCo",
    price: 2290,
    originalPrice: 2790,
    rating: 4.4,
    reviewCount: 73,
    images: ["https://images.unsplash.com/photo-1627384113972-f4c0392fe5aa"],
    isNew: false,
    discount: 18,
    category: "makeup",
    is_sale: true,
    discount_percent: 18,
    original_price: 2790
  }
];

// Best sellers data
const bestSellers = [
  {
    id: "7",
    name: "Hydrating Facial Mist",
    brand: "SkinJoy",
    price: 1690,
    originalPrice: 1990,
    rating: 4.8,
    reviewCount: 120,
    images: ["https://images.unsplash.com/photo-1624988898779-754745cbca1b"],
    category: "skincare",
    is_bestseller: true,
    is_sale: true,
    discount_percent: 15,
    original_price: 1990
  },
  {
    id: "8",
    name: "Vitamin C Serum",
    brand: "NaturEssence",
    price: 3490,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 95,
    images: ["https://images.unsplash.com/photo-1608248543803-ba4f8c70ae7b"],
    category: "skincare",
    is_bestseller: true
  },
  {
    id: "9",
    name: "Revitalizing Eye Cream",
    brand: "LuxeBeauty",
    price: 2790,
    originalPrice: 3290,
    rating: 4.7,
    reviewCount: 68,
    images: ["https://images.unsplash.com/photo-1599305090598-fe179d501228"],
    category: "skincare",
    is_bestseller: true,
    is_sale: true,
    discount_percent: 15,
    original_price: 3290
  }
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

// Product tab options
const tabOptions = [
  { id: "all", label: "All Products" },
  { id: "new", label: "New Arrivals" },
  { id: "trending", label: "Trending" },
  { id: "sale", label: "On Sale" },
  { id: "bestsellers", label: "Bestsellers" }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("all");
  
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
      <section className="py-16 bg-[#f9f9f9]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-medium mb-2 font-playfair">Featured Products</h2>
            <div className="w-20 h-1 bg-rose-400 mx-auto"></div>
          </div>
          
          {/* Product Tabs */}
          <div className="flex justify-center mb-8 overflow-x-auto">
            <div className="flex space-x-4">
              {tabOptions.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap
                    ${activeTab === tab.id 
                      ? 'text-rose-500 border-b-2 border-rose-500' 
                      : 'text-gray-500 hover:text-rose-500'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="flex justify-center mt-10">
            <Button asChild variant="outline" className="rounded-full border-rose-300 text-rose-500 hover:bg-rose-50">
              <Link to="/products" className="px-8">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>
      
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
                    <Link to="/category/spa" className="px-8">Shop Now</Link>
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
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
                <Link to="/category/outlet" className="px-8">SHOP THE OUTLET</Link>
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
