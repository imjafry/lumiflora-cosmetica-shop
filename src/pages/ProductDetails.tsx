
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Star, ChevronRight, Check, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

// Mock benefits and other additional data that might not be in the database
const productBenefits = {
  skincare: [
    "Deeply hydrates skin for up to 72 hours",
    "Reduces fine lines and wrinkles",
    "Non-greasy, lightweight formula",
    "Suitable for all skin types"
  ],
  makeup: [
    "Long-lasting color payoff",
    "Buildable coverage",
    "Enriched with vitamins and antioxidants",
    "Dermatologically tested"
  ],
  perfume: [
    "Long-lasting fragrance",
    "Unique blend of essential oils",
    "Paraben and phthalate free",
    "Ideal for daily use"
  ],
  haircare: [
    "Strengthens and repairs damaged hair",
    "Prevents split ends",
    "Adds shine and smoothness",
    "Protects from heat styling"
  ],
  bodycare: [
    "All-day hydration",
    "Absorbs quickly with no residue",
    "Natural ingredients",
    "Dermatologically tested"
  ],
  accessories: [
    "High-quality materials",
    "Ergonomic design",
    "Long-lasting durability",
    "Essential for your beauty routine"
  ]
};

const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  
  useEffect(() => {
    async function fetchProduct() {
      if (!productId) return;
      
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', productId)
          .single();
        
        if (error) {
          throw error;
        }
        
        if (data) {
          // Add some demo data
          setProduct({
            ...data,
            is_sale: Math.random() > 0.5,
            discount_percent: Math.floor(Math.random() * 40) + 10, // 10-50% discount
            original_price: Math.round(data.price * (1 + (Math.random() * 0.5))),
            rating: 4 + Math.random(),
            reviewCount: Math.floor(Math.random() * 200) + 50,
            benefits: productBenefits[data.category as keyof typeof productBenefits] || productBenefits.skincare,
            ingredients: "Water, Butylene Glycol, Glycerin, Sodium Hyaluronate, Tocopheryl Acetate, Panthenol, Allantoin, Hydroxyethylcellulose, Disodium EDTA, Citric Acid, Sodium Citrate, Phenoxyethanol, Ethylhexylglycerin",
            howToUse: "Apply 2-3 drops to clean, damp skin morning and night. Gently pat into skin until fully absorbed. Follow with moisturizer."
          });
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast({
          title: "Error loading product",
          description: "Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
    
    fetchProduct();
  }, [productId]);
  
  const handleAddToCart = () => {
    if (!product) return;
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: quantity,
      brand: product.brand,
      originalPrice: product.original_price
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
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-rose-500 rounded-full animate-spin"></div>
      </div>
    );
  }

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
            {product.images.map((image: string, index: number) => (
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
            {product.is_new && (
              <Badge className="bg-blue-500 hover:bg-blue-600">New Arrival</Badge>
            )}
            {product.is_bestseller && (
              <Badge className="bg-orange-500 hover:bg-orange-600">Bestseller</Badge>
            )}
            {product.is_sale && (
              <Badge className="bg-red-500 hover:bg-red-600">
                Save {Math.round((1 - product.price/product.original_price) * 100)}%
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
              <span className="text-sm">{product.rating.toFixed(1)} ({product.reviewCount} reviews)</span>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold">৳{product.price.toLocaleString()}</span>
              {product.is_sale && product.original_price && (
                <span className="text-xl text-muted-foreground line-through">৳{product.original_price.toLocaleString()}</span>
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
              {product.benefits.map((benefit: string, index: number) => (
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
    </motion.div>
  );
};

export default ProductDetails;
