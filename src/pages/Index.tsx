
import React from "react";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import NewsletterSection from "@/components/home/NewsletterSection";
import FeaturesGrid from "@/components/home/FeaturesGrid";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="overflow-x-hidden"
    >
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <FeaturesGrid />
      <NewsletterSection />
    </motion.div>
  );
};

export default Index;
