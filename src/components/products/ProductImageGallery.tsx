
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import SafeImage from "../common/SafeImage";

interface ProductImageGalleryProps {
  images: string[];
  name: string;
  badges: {
    isNew?: boolean;
    isBestseller?: boolean;
    isSale?: boolean;
    discountPercent?: number;
  };
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ 
  images, 
  name, 
  badges 
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* Main Image */}
      <div className="aspect-square bg-[#f8f8f8] dark:bg-zinc-900 rounded-2xl overflow-hidden">
        <SafeImage
          src={images[activeImageIndex]} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Image Thumbnails */}
      <div className="flex gap-3">
        {images.map((image: string, index: number) => (
          <button 
            key={index} 
            className={`w-20 h-20 rounded-lg overflow-hidden bg-[#f8f8f8] dark:bg-zinc-900 
              ${index === activeImageIndex ? 'ring-2 ring-orange-500' : 'opacity-70'}`}
            onClick={() => setActiveImageIndex(index)}
          >
            <SafeImage
              src={image} 
              alt={`${name} - view ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
      
      {/* Product Badges */}
      <div className="flex flex-wrap gap-2">
        {badges.isNew && (
          <Badge className="bg-blue-500 hover:bg-blue-600">New Arrival</Badge>
        )}
        {badges.isBestseller && (
          <Badge className="bg-orange-500 hover:bg-orange-600">Bestseller</Badge>
        )}
        {badges.isSale && (
          <Badge className="bg-red-500 hover:bg-red-600">
            Save {badges.discountPercent}%
          </Badge>
        )}
      </div>
    </motion.div>
  );
};

export default ProductImageGallery;
