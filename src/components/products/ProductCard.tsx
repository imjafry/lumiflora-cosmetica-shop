
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  rating?: number;
  reviewCount?: number;
  images: string[];
  category: string;
  is_new?: boolean;
  is_bestseller?: boolean;
  is_featured?: boolean;
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

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: "Quick view",
      description: `Quick view for ${product.name} is coming soon.`,
    });
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Link to={`/products/${product.id}`} className="block group h-full">
        <div className="rounded-xl overflow-hidden border bg-card hover:shadow-md transition-shadow h-full flex flex-col">
          {/* Product Image */}
          <div className="relative aspect-[4/5] overflow-hidden bg-muted/30">
            <img
              src={product.images?.[0] || "https://placehold.co/400x500?text=No+Image"}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.is_new && (
                <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">New</Badge>
              )}
              {product.is_bestseller && (
                <Badge variant="default" className="bg-amber-500 hover:bg-amber-600">Bestseller</Badge>
              )}
              {product.is_featured && product.price >= 5000 && (
                <Badge variant="default" className="bg-purple-500 hover:bg-purple-600">Premium</Badge>
              )}
            </div>
            
            {/* Quick Actions Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full h-9 w-9 bg-white hover:bg-white/90 text-black"
                  onClick={handleQuickView}
                >
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">Quick View</span>
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full h-9 w-9 bg-white hover:bg-white/90 text-black"
                  onClick={handleAddToWishlist}
                >
                  <Heart className="h-4 w-4" />
                  <span className="sr-only">Add to Wishlist</span>
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full h-9 w-9 bg-white hover:bg-white/90 text-black"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span className="sr-only">Add to Cart</span>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Product Info */}
          <div className="p-4 flex-grow flex flex-col">
            <div className="flex-grow">
              <span className="text-sm text-muted-foreground">{product.brand}</span>
              <h3 className="font-medium mt-1 group-hover:text-primary transition-colors">{product.name}</h3>
              
              {product.rating && (
                <div className="flex items-center mt-1 text-sm">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-3.5 w-3.5 ${i < Math.round(product.rating) 
                          ? "fill-amber-400 text-amber-400" 
                          : "fill-muted text-muted"}`} 
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground ml-1">
                    ({product.reviewCount || 0})
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div className="font-semibold">৳{product.price.toLocaleString()}</div>
              <Button
                variant="default"
                size="sm"
                className="text-xs rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
