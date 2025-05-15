
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, Filter, Star } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";

// Mock categories data
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
  perfumes: {
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
  sale: {
    name: "Sale",
    description: "Special offers and discounted products",
    bannerImage: "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2000",
    color: "#fff0f3",
  },
};

// Mock products data (filtered based on category)
const allProducts = [
  {
    id: "1",
    name: "Hydrating Serum",
    brand: "SkinJoy",
    price: 2490,
    original_price: 2990,
    rating: 4.8,
    reviewCount: 156,
    images: ["https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"],
    category: "skincare",
    is_new: true,
    is_sale: true,
    discount_percent: 17,
  },
  {
    id: "5",
    name: "Face Moisturizer",
    brand: "SkinJoy",
    price: 1990,
    original_price: 2490,
    rating: 4.5,
    reviewCount: 113,
    images: ["https://images.unsplash.com/photo-1570554886111-e80fcca6a029"],
    category: "skincare",
    is_sale: true,
    discount_percent: 20,
  },
  {
    id: "7",
    name: "Hydrating Facial Mist",
    brand: "SkinJoy",
    price: 1690,
    original_price: 1990,
    rating: 4.8,
    reviewCount: 120,
    images: ["https://images.unsplash.com/photo-1624988898779-754745cbca1b"],
    category: "skincare",
    is_bestseller: true,
    is_sale: true,
    discount_percent: 15,
  },
  {
    id: "2",
    name: "Matte Lipstick",
    brand: "GlamourCo",
    price: 1790,
    original_price: 2290,
    rating: 4.6,
    reviewCount: 98,
    images: ["https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07"],
    category: "makeup",
    is_sale: true,
    discount_percent: 22,
  },
  {
    id: "6",
    name: "BB Cream",
    brand: "GlamourCo",
    price: 2290,
    original_price: 2790,
    rating: 4.4,
    reviewCount: 73,
    images: ["https://images.unsplash.com/photo-1627384113972-f4c0392fe5aa"],
    category: "makeup",
    is_sale: true,
    discount_percent: 18,
  },
  {
    id: "3",
    name: "Luxe Perfume",
    brand: "Scent & Co",
    price: 5990,
    rating: 4.9,
    reviewCount: 42,
    images: ["https://images.unsplash.com/photo-1541643600914-78b084683601"],
    category: "perfumes",
    is_new: true,
  },
  {
    id: "4",
    name: "Hair Treatment Oil",
    brand: "NatureGlow",
    price: 1890,
    original_price: 2390,
    rating: 4.7,
    reviewCount: 87,
    images: ["https://images.unsplash.com/photo-1534368786749-d48e2f071a34"],
    category: "haircare",
    is_sale: true,
    discount_percent: 21,
  },
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "priceAsc", label: "Price: Low to High" },
  { value: "priceDesc", label: "Price: High to Low" },
  { value: "rating", label: "Rating" },
];

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("featured");
  
  useEffect(() => {
    if (categoryId) {
      // Filter products based on the category
      const filteredProducts = allProducts.filter(product => 
        product.category === categoryId || 
        (categoryId === "sale" && product.is_sale)
      );
      
      setProducts(filteredProducts);
    }
  }, [categoryId]);
  
  // Handle sorting
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
    
    const sortedProducts = [...products];
    
    switch (e.target.value) {
      case "priceAsc":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        // In a real app, we would sort by date
        break;
      default:
        // Default featured sort
        break;
    }
    
    setProducts(sortedProducts);
  };
  
  const category = categoryId && categories[categoryId];
  
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
            <span className="text-sm text-gray-500">{products.length} products found</span>
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
        {products.length > 0 ? (
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
