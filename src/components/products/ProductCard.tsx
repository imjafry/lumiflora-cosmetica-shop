
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  isNew?: boolean;
  isBestseller?: boolean;
};

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: "Added to wishlist!",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/products/${product.id}`} className="block group">
        <div className="rounded-xl overflow-hidden border bg-card hover:shadow-md transition-shadow h-full flex flex-col">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden bg-muted/30">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
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
            
            {/* Quick Actions */}
            <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full h-9 w-9 bg-background/80 backdrop-blur-sm hover:bg-background"
                onClick={handleAddToWishlist}
              >
                <Heart className="h-4 w-4" />
                <span className="sr-only">Add to Wishlist</span>
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full h-9 w-9 bg-background/80 backdrop-blur-sm hover:bg-background"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="sr-only">Add to Cart</span>
              </Button>
            </div>
          </div>
          
          {/* Product Info */}
          <div className="p-4 flex-grow flex flex-col">
            <div className="flex-grow">
              <span className="text-sm text-muted-foreground">{product.brand}</span>
              <h3 className="font-medium mt-1 group-hover:text-primary transition-colors">{product.name}</h3>
              
              <div className="flex items-center mt-1 text-sm">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 inline mr-1" />
                <span>{product.rating}</span>
                <span className="text-muted-foreground ml-1">({product.reviewCount})</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div className="font-semibold">৳{product.price}</div>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs hover:text-primary"
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
