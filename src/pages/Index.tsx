
import React from "react";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import FeaturesGrid from "@/components/home/FeaturesGrid";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight, Clock, Star, Heart } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";

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
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    isNew: true,
    discount: 17,
    category: "skincare"
  },
  {
    id: "2",
    name: "Matte Lipstick",
    brand: "GlamourCo",
    price: 1790,
    originalPrice: 2290,
    rating: 4.6,
    reviewCount: 98,
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    isNew: false,
    discount: 22,
    category: "makeup"
  },
  {
    id: "3",
    name: "Luxe Perfume",
    brand: "Scent & Co",
    price: 5990,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 42,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601",
    isNew: true,
    discount: null,
    category: "perfumes"
  },
  {
    id: "4",
    name: "Hair Treatment Oil",
    brand: "NatureGlow",
    price: 1890,
    originalPrice: 2390,
    rating: 4.7,
    reviewCount: 87,
    image: "https://images.unsplash.com/photo-1534368786749-d48e2f071a34",
    isNew: false,
    discount: 21,
    category: "haircare"
  },
  {
    id: "5",
    name: "Face Moisturizer",
    brand: "SkinJoy",
    price: 1990,
    originalPrice: 2490,
    rating: 4.5,
    reviewCount: 113,
    image: "https://images.unsplash.com/photo-1570554886111-e80fcca6a029",
    isNew: false,
    discount: 20,
    category: "skincare"
  },
  {
    id: "6",
    name: "BB Cream",
    brand: "GlamourCo",
    price: 2290,
    originalPrice: 2790,
    rating: 4.4,
    reviewCount: 73,
    image: "https://images.unsplash.com/photo-1627384113972-f4c0392fe5aa",
    isNew: false,
    discount: 18,
    category: "makeup"
  }
];

// Product Card Component
const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = React.useState(false);
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      brand: product.brand,
      originalPrice: product.originalPrice
    });
  };
  
  return (
    <Link 
      to={`/products/${product.id}`} 
      className="block group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="border-none overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full">
        <div className="relative">
          <AspectRatio ratio={3/4} className="bg-[#f8f8f8] dark:bg-zinc-900">
            <img 
              src={product.image} 
              alt={product.name} 
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
            />
          </AspectRatio>
          
          {/* Overlay with actions */}
          <div 
            className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex gap-2">
              <Button 
                size="icon"
                variant="secondary"
                className="rounded-full h-9 w-9 bg-white hover:bg-white/90 text-black"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <Heart className="h-4 w-4" />
              </Button>
              
              <Button 
                size="icon"
                variant="secondary"
                className="rounded-full h-9 w-9 bg-white hover:bg-white/90 text-black"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <Badge className="bg-blue-500 hover:bg-blue-600 rounded-md">New</Badge>
            )}
            {product.discount && (
              <Badge className="bg-red-500 hover:bg-red-600 rounded-md">-{product.discount}%</Badge>
            )}
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground">{product.brand}</div>
          <h3 className="font-medium text-base mt-1 group-hover:text-orange-500 transition-colors">{product.name}</h3>
          
          {/* Rating */}
          <div className="flex items-center mt-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i}
                  className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) 
                    ? "fill-amber-400 text-amber-400" 
                    : "fill-gray-200 text-gray-200"}`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground ml-1">({product.reviewCount})</span>
          </div>
          
          {/* Price */}
          <div className="flex items-center gap-2 mt-3">
            <span className="font-bold">৳{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">৳{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-3 rounded-full hover:bg-orange-500 hover:text-white transition-colors border-orange-500 text-orange-500"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="overflow-x-hidden"
    >
      {/* Sale Banner */}
      <div className="py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-center">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <Clock className="h-4 w-4 mr-2" />
            <p className="font-medium text-sm">Flash Sale Ends In: <span className="font-bold">23h 45m 12s</span> - Get up to 50% OFF!</p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <HeroSection />
      
      {/* Shop by Category */}
      <CategoriesSection />

      {/* Best Selling Products */}
      <section className="py-16 bg-[#f8f8f8] dark:bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Best Selling Products</h2>
              <p className="text-muted-foreground">Our most popular products based on sales</p>
            </div>
            <Link to="/products" className="hidden md:flex items-center mt-4 md:mt-0 text-orange-500 font-medium hover:text-orange-600 transition-colors">
              View all products <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="flex justify-center mt-8 md:hidden">
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* New Collection Banner */}
      <section className="py-16 bg-white dark:bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#f8e9d6] dark:bg-amber-900/20 rounded-2xl p-8 relative overflow-hidden">
              <div className="relative z-10">
                <Badge className="bg-orange-500 hover:bg-orange-600 mb-4">NEW ARRIVAL</Badge>
                <h3 className="text-2xl font-bold mb-2">Summer Collection</h3>
                <p className="mb-6 text-muted-foreground max-w-xs">Discover our new summer skincare essentials for a radiant glow</p>
                <Button asChild className="rounded-full bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black">
                  <Link to="/category/summer">
                    Shop Collection
                  </Link>
                </Button>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1608248597279-f99d160bfcbc" 
                alt="Summer collection" 
                className="absolute right-0 bottom-0 h-5/6 object-cover object-right"
              />
            </div>
            
            <div className="bg-[#e8f0ff] dark:bg-indigo-900/20 rounded-2xl p-8 relative overflow-hidden">
              <div className="relative z-10">
                <Badge className="bg-pink-500 hover:bg-pink-600 mb-4">TRENDING</Badge>
                <h3 className="text-2xl font-bold mb-2">Luxury Fragrances</h3>
                <p className="mb-6 text-muted-foreground max-w-xs">Explore premium scents from top designers around the world</p>
                <Button asChild className="rounded-full bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black">
                  <Link to="/category/fragrance">
                    Shop Collection
                  </Link>
                </Button>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1615368711218-da4bce2fb4c8" 
                alt="Luxury fragrances" 
                className="absolute right-0 bottom-0 h-5/6 object-cover object-right"
              />
            </div>
          </div>
        </div>
      </section>

      {/* E-commerce Trust Badges */}
      <FeaturesGrid />
      
      {/* Beauty Tips & Blog */}
      <div className="py-16 bg-white dark:bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Beauty Tips & Trends</h2>
              <p className="text-muted-foreground">Discover the latest beauty trends and tips from our experts</p>
            </div>
            <Link to="/blog" className="hidden md:flex items-center mt-4 md:mt-0 text-orange-500 font-medium hover:text-orange-600 transition-colors">
              View all articles <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Link 
                key={i}
                to="/blog/skincare-tips" 
                className="group block"
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
                  <span className="text-xs text-orange-500 font-medium uppercase">Skincare</span>
                  <h3 className="font-medium text-lg mt-1 group-hover:text-orange-500 transition-colors">
                    How to build the perfect skincare routine
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Learn how to create an effective skincare routine that works for your specific skin type and concerns.
                  </p>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="flex justify-center mt-8 md:hidden">
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/blog">View All Articles</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <NewsletterSection />
    </motion.div>
  );
};

export default Index;
