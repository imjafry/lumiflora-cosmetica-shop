
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";

export default function HeroSection() {
  // Countdown timer state
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  // Update countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#f8f5f0] dark:bg-zinc-900 overflow-hidden">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content Side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            {/* Limited Offer Tag */}
            <div className="inline-flex items-center mb-6 relative">
              <div className="bg-[#ff6b3d] text-white text-xs uppercase font-bold tracking-wider py-1 px-3 rounded-full">
                Limited Offer
              </div>
              <div className="ml-2 font-bold flex items-center gap-1 bg-[#f8e9d6] dark:bg-amber-900/30 px-3 py-1 rounded-full">
                <span>{timeRemaining.hours.toString().padStart(2, '0')}</span>:
                <span>{timeRemaining.minutes.toString().padStart(2, '0')}</span>:
                <span>{timeRemaining.seconds.toString().padStart(2, '0')}</span>
              </div>
            </div>
            
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6"
            >
              Unlock the Secrets to
              <span className="block mt-2">Radiant Skin</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-base text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-8"
            >
              We're here to provide the best skincare and beauty products 
              which help you to be the real you.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <Button asChild size="lg" className="rounded-full bg-black hover:bg-zinc-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200 px-8">
                <Link to="/products" className="flex items-center gap-2">
                  Shop Now <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </motion.div>
            
            {/* Sale Tag */}
            <div className="mt-8 lg:mt-16 inline-block relative">
              <div className="relative w-24 h-24 rounded-full bg-[#ff6b3d] flex items-center justify-center transform rotate-12">
                <div className="text-center text-white font-bold leading-tight">
                  <div className="text-sm">Get</div>
                  <div className="text-xl">20% Off</div>
                  <div className="text-xs">New Products</div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right Image Side */}
          <motion.div 
            className="relative order-1 lg:order-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000"
                alt="Beauty model with skincare products"
                className="rounded-lg w-full h-auto shadow-lg"
              />
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 text-[#ff6b3d]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>
              
              <div className="absolute -bottom-2 -left-2 w-10 h-10 text-[#ff6b3d]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>
              
              {/* Product card overlay */}
              <motion.div 
                className="hidden md:block absolute bottom-4 right-4 bg-white dark:bg-zinc-800 p-3 rounded-xl shadow-lg z-20 w-48"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[#f8e9d6] dark:bg-amber-900/30 p-2 rounded-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=200" 
                      alt="Product" 
                      className="w-10 h-10 rounded object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-pink-500 font-medium">Best seller</p>
                    <p className="text-sm font-medium">Moisturizing Cream</p>
                    <span className="text-sm font-bold">৳2,490</span>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Background decorative elements */}
            <div className="absolute -z-10 w-full h-full">
              <div className="absolute top-1/4 -right-8 w-24 h-24 bg-[#f8e9d6] dark:bg-amber-900/30 rounded-full"></div>
              <div className="absolute bottom-1/4 -left-8 w-16 h-16 bg-[#f8e9d6] dark:bg-amber-900/30 rounded-full"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
