
import React, { useState } from "react";
import { Heart, ShoppingCart, Star, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useCart } from "@/contexts/CartContext";
import { motion } from "framer-motion";

interface ProductInfoProps {
  product: {
    id: string;
    name: string;
    brand: string;
    price: number;
    original_price?: number;
    is_sale?: boolean;
    rating: number;
    reviewCount: number;
    stock: number;
    description: string;
    images: string[];
  };
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem } = useCart();
  
  const handleAddToCart = () => {
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
    </motion.div>
  );
};

export default ProductInfo;
