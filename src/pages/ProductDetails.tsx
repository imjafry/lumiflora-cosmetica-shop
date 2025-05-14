
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Star, ChevronRight, Check, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

// Mock product data - would be fetched from API in a real app
const products = {
  "1": {
    id: "1",
    name: "Hydrating Serum",
    brand: "SkinJoy",
    price: 2490,
    originalPrice: 2990,
    rating: 4.8,
    reviewCount: 156,
    images: [
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      "https://images.unsplash.com/photo-1607602023447-817ea84dc31f",
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae7b"
    ],
    category: "skincare",
    isNew: true,
    isBestseller: true,
    description: "Our bestselling hydrating serum deeply moisturizes and rejuvenates your skin, leaving it plump and radiant. Infused with hyaluronic acid and vitamin E for maximum hydration.",
    benefits: [
      "Deeply hydrates skin for up to 72 hours",
      "Reduces fine lines and wrinkles",
      "Non-greasy, lightweight formula",
      "Suitable for all skin types"
    ],
    ingredients: "Water, Butylene Glycol, Glycerin, Sodium Hyaluronate, Tocopheryl Acetate, Panthenol, Allantoin, Hydroxyethylcellulose, Disodium EDTA, Citric Acid, Sodium Citrate, Phenoxyethanol, Ethylhexylglycerin",
    howToUse: "Apply 2-3 drops to clean, damp skin morning and night. Gently pat into skin until fully absorbed. Follow with moisturizer.",
    stock: 23
  },
  "2": {
    id: "2",
    name: "Matte Lipstick",
    brand: "GlamourCo",
    price: 1790,
    originalPrice: 2290,
    rating: 4.6,
    reviewCount: 98,
    images: [
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      "https://images.unsplash.com/photo-1610630495992-d1678dac4a8e",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796"
    ],
    category: "makeup",
    isNew: false,
    isBestseller: true,
    description: "Long-lasting matte lipstick with a smooth, velvety finish. Formulated with moisturizing ingredients to prevent drying and cracking throughout the day.",
    benefits: [
      "Stays on for up to 8 hours",
      "Doesn't dry out lips",
      "Highly pigmented formula",
      "Cruelty-free and vegan"
    ],
    ingredients: "Isododecane, Dimethicone, Microcrystalline Wax, Polybutene, Hydrogenated Polyisobutene, Ozokerite, Silica, Tocopheryl Acetate, Phenoxyethanol",
    howToUse: "Apply directly to lips starting from the center and moving outward. For a more precise application, use a lip brush.",
    stock: 15
  }
};

const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { addItem } = useCart();
  
  const product = productId ? products[productId] : null;
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: quantity,
      brand: product.brand,
      originalPrice: product.originalPrice
    });
  };
  
  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: isWishlisted 
        ? `${product.name} has been removed from your wishlist.`
        : `${product.name} has been added to your wishlist.`
    });
  };
  
  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <motion.div 
      className="container mx-auto px-4 py-8 md:py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground mb-8">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link to={`/category/${product.category}`} className="hover:text-primary transition-colors capitalize">
          {product.category}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="truncate max-w-[200px]">{product.name}</span>
      </div>
      
      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          {/* Main Image */}
          <div className="aspect-square bg-[#f8f8f8] dark:bg-zinc-900 rounded-2xl overflow-hidden">
            <img 
              src={product.images[activeImageIndex]} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Image Thumbnails */}
          <div className="flex gap-3">
            {product.images.map((image, index) => (
              <button 
                key={index} 
                className={`w-20 h-20 rounded-lg overflow-hidden bg-[#f8f8f8] dark:bg-zinc-900 
                  ${index === activeImageIndex ? 'ring-2 ring-orange-500' : 'opacity-70'}`}
                onClick={() => setActiveImageIndex(index)}
              >
                <img 
                  src={image} 
                  alt={`${product.name} - view ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
          
          {/* Product Badges */}
          <div className="flex flex-wrap gap-2">
            {product.isNew && (
              <Badge className="bg-blue-500 hover:bg-blue-600">New Arrival</Badge>
            )}
            {product.isBestseller && (
              <Badge className="bg-orange-500 hover:bg-orange-600">Bestseller</Badge>
            )}
            {product.originalPrice && (
              <Badge className="bg-red-500 hover:bg-red-600">
                Save {Math.round((1 - product.price/product.originalPrice) * 100)}%
              </Badge>
            )}
          </div>
        </motion.div>
        
        {/* Product Info */}
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mb-6">
            <span className="text-lg text-muted-foreground">{product.brand}</span>
            <h1 className="text-3xl md:text-4xl font-bold mt-1 mb-2">{product.name}</h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) 
                        ? "fill-amber-400 text-amber-400" 
                        : "fill-gray-200 text-gray-200"
                    }`} 
                  />
                ))}
              </div>
              <span className="text-sm">{product.rating} ({product.reviewCount} reviews)</span>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold">৳{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">৳{product.originalPrice.toLocaleString()}</span>
              )}
            </div>
            
            {product.stock < 10 && (
              <div className="text-red-500 mt-2 text-sm font-medium flex items-center">
                <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span> 
                Only {product.stock} left in stock!
              </div>
            )}
          </div>
          
          <div className="mb-8">
            <p className="text-muted-foreground">{product.description}</p>
          </div>
          
          {/* Quantity Selector */}
          <div className="flex items-center mb-8">
            <span className="text-sm font-medium mr-4">Quantity:</span>
            <div className="flex items-center border border-input rounded-full overflow-hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-l-full h-10"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="w-12 flex items-center justify-center">{quantity}</div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-r-full h-10"
                onClick={incrementQuantity}
                disabled={quantity >= product.stock}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button 
              className="flex-1 rounded-full bg-orange-500 hover:bg-orange-600 text-white" 
              size="lg"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button 
              variant="outline" 
              className={`rounded-full ${isWishlisted ? 'bg-pink-50 text-pink-500 border-pink-200 dark:bg-pink-950 dark:text-pink-300 dark:border-pink-800' : 'border-orange-500 text-orange-500'}`}
              size="lg"
              onClick={handleToggleWishlist}
            >
              <Heart className={`mr-2 h-5 w-5 ${isWishlisted ? 'fill-pink-500 text-pink-500' : ''}`} />
              {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
            </Button>
          </div>
          
          {/* Product Benefits */}
          <div className="mb-8">
            <h3 className="font-medium mb-4 text-lg">Key Benefits:</h3>
            <ul className="space-y-3">
              {product.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <div className="mr-3 mt-1">
                    <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Delivery Info */}
          <div className="bg-[#f8f8f8] dark:bg-zinc-900 rounded-xl p-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <svg className="h-6 w-6 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M8 4v16" />
                  <path d="M16 4v16" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Free Delivery</h4>
                <p className="text-sm text-muted-foreground">Available for orders over ৳5000</p>
              </div>
            </div>
            <div className="border-t my-3 dark:border-zinc-700"></div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <svg className="h-6 w-6 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                  <path d="M12 12v9" />
                  <path d="m8 17 4 4 4-4" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Easy Returns</h4>
                <p className="text-sm text-muted-foreground">7 days return policy</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Additional Info Tabs */}
      <div className="mt-16">
        <div className="border-b dark:border-zinc-800">
          <div className="flex space-x-8">
            <button className="border-b-2 border-orange-500 px-1 py-4 text-orange-500 font-medium">Ingredients</button>
            <button className="px-1 py-4 text-muted-foreground">How to Use</button>
            <button className="px-1 py-4 text-muted-foreground">Reviews ({product.reviewCount})</button>
          </div>
        </div>
        <div className="py-6">
          <p className="text-muted-foreground leading-relaxed">{product.ingredients}</p>
        </div>
      </div>
      
      {/* Related Products - would be implemented in a real app */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
        {/* Related products would go here */}
      </div>
    </motion.div>
  );
};

export default ProductDetails;
