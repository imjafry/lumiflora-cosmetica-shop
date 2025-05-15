
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const heroBackgrounds = [
  "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=2000",
  "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?q=80&w=2000",
  "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=2000"
];

export default function HeroSection() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  
  // Rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex(prev => (prev + 1) % heroBackgrounds.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {heroBackgrounds.map((bg, index) => (
          <div 
            key={index}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ 
              backgroundImage: `url(${bg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: index === currentBgIndex ? 1 : 0
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[600px] items-center py-12 md:py-20">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 font-playfair"
            >
              <span className="text-rose-300 italic font-light">Discover</span>
              <br />
              The Secrets of Beauty
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-base text-white/80 max-w-lg mx-auto lg:mx-0 mb-8"
            >
              Find exceptional beauty products that help you reveal your true radiance.
              Premium quality with natural ingredients.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <Button 
                asChild 
                size="lg" 
                className="rounded-full bg-rose-400 hover:bg-rose-500 text-white px-8 py-6"
              >
                <Link to="/products" className="flex items-center gap-2">
                  Shop Now <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Image Side - empty to allow background to show */}
          <div></div>
        </div>
      </div>
    </div>
  );
}
