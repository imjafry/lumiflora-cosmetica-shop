
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Star, ChevronRight, Check, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

// Mock product data - would be fetched from API in a real app
const products = {
  "1": {
    id: "1",
    name: "Hydrating Serum",
    brand: "SkinJoy",
    price: 2490,
    rating: 4.8,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
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
    rating: 4.6,
    reviewCount: 98,
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
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
    toast({
      title: "Added to cart!",
      description: `${product.name} (${quantity}) has been added to your cart.`
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
        {/* Product Image */}
        <motion.div 
          className="aspect-square relative rounded-2xl overflow-hidden bg-muted/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-primary text-primary-foreground text-xs font-medium px-2.5 py-1 rounded">
                New
              </span>
            )}
            {product.isBestseller && (
              <span className="bg-amber-500 text-white text-xs font-medium px-2.5 py-1 rounded">
                Bestseller
              </span>
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
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-2">
              <span className="text-lg text-muted-foreground">{product.brand}</span>
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400 inline mr-1" />
                <span>{product.rating} ({product.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <span className="text-2xl md:text-3xl font-bold">৳{product.price}</span>
            {product.stock < 10 && (
              <div className="text-red-500 mt-2 text-sm">
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
            <div className="flex items-center border border-input rounded-md">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-l-md h-10"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="w-10 flex items-center justify-center">{quantity}</div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-r-md h-10"
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
              className="flex-1 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white border-0" 
              size="lg"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button 
              variant="outline" 
              className={`rounded-full ${isWishlisted ? 'bg-pink-50 text-pink-500 border-pink-200 dark:bg-pink-950 dark:text-pink-300 dark:border-pink-800' : ''}`}
              size="lg"
              onClick={handleToggleWishlist}
            >
              <Heart className={`mr-2 h-5 w-5 ${isWishlisted ? 'fill-pink-500 text-pink-500' : ''}`} />
              {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
            </Button>
          </div>
          
          {/* Product Benefits */}
          <div className="mb-8">
            <h3 className="font-medium mb-4">Benefits:</h3>
            <ul className="space-y-2">
              {product.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* How to Use */}
          <div className="mb-8">
            <h3 className="font-medium mb-2">How to Use:</h3>
            <p className="text-muted-foreground">{product.howToUse}</p>
          </div>
        </motion.div>
      </div>
      
      {/* Additional Tabs (would be expanded in a real app) */}
      <div className="mt-16">
        <div className="border-b">
          <div className="flex space-x-8">
            <button className="border-b-2 border-primary px-1 py-4 text-primary">Ingredients</button>
            <button className="px-1 py-4 text-muted-foreground">Reviews</button>
            <button className="px-1 py-4 text-muted-foreground">Shipping</button>
          </div>
        </div>
        <div className="py-6">
          <p className="text-muted-foreground">{product.ingredients}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
