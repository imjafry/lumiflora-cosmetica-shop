
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Components
import Breadcrumbs from "@/components/products/Breadcrumbs";
import ProductImageGallery from "@/components/products/ProductImageGallery";
import ProductInfo from "@/components/products/ProductInfo";
import ProductBenefits from "@/components/products/ProductBenefits";
import DeliveryInfo from "@/components/products/DeliveryInfo";
import ProductTabs from "@/components/products/ProductTabs";

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
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ingredients');
  
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
      <Breadcrumbs category={product.category} productName={product.name} />
      
      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <ProductImageGallery 
          images={product.images} 
          name={product.name} 
          badges={{
            isNew: product.is_new,
            isBestseller: product.is_bestseller,
            isSale: product.is_sale,
            discountPercent: Math.round((1 - product.price/product.original_price) * 100)
          }}
        />
        
        {/* Product Info */}
        <div>
          <ProductInfo product={product} />
          <ProductBenefits benefits={product.benefits} />
          <DeliveryInfo />
        </div>
      </div>
      
      {/* Additional Info Tabs */}
      <ProductTabs 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        ingredients={product.ingredients}
        howToUse={product.howToUse}
        reviewCount={product.reviewCount}
      />
    </motion.div>
  );
};

export default ProductDetails;
