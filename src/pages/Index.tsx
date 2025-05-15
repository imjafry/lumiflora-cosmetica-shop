
import React from "react";
import { motion } from "framer-motion";

// Components
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import FeaturesGrid from "@/components/home/FeaturesGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BrandLogosSection from "@/components/home/BrandLogosSection";
import PromoBannerSection from "@/components/home/PromoBannerSection";
import BestSellersSection from "@/components/home/BestSellersSection";
import OutletBannerSection from "@/components/home/OutletBannerSection";
import PromotionBanner from "@/components/home/PromotionBanner";

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="overflow-x-hidden"
    >
      {/* Top promotion banner */}
      <PromotionBanner />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Shop by Category */}
      <CategoriesSection />

      {/* Brand Logos */}
      <BrandLogosSection />

      {/* Featured Products */}
      <FeaturedProducts />
      
      {/* Promo Banner */}
      <PromoBannerSection />

      {/* Best Sellers */}
      <BestSellersSection />

      {/* Women's Outlet Banner */}
      <OutletBannerSection />

      {/* E-commerce Trust Badges */}
      <FeaturesGrid />
      
      {/* Newsletter Section */}
      <NewsletterSection />
    </motion.div>
  );
};

export default Index;
