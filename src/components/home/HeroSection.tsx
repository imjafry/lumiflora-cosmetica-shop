
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-background/5 pt-8 md:pt-12">
      <div className="container mx-auto px-4 py-10 md:py-16 flex flex-col md:flex-row items-center">
        {/* Hero Content */}
        <motion.div 
          className="md:w-1/2 space-y-6 text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <span className="block">Discover Global</span>
            <span className="block mt-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Beauty Treasures
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg text-muted-foreground max-w-md mx-auto md:mx-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Premium imported cosmetics delivered to your doorstep across Bangladesh. Elevate your beauty routine with international brands.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <Button asChild size="lg" className="rounded-full px-8 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white border-0">
              <Link to="/category/new-arrivals">Shop New Arrivals</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link to="/category/best-sellers">Best Sellers</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Hero Image */}
        <motion.div 
          className="md:w-1/2 mt-10 md:mt-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-200 dark:bg-pink-900/30 rounded-full filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-purple-200 dark:bg-purple-900/30 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-200 dark:bg-blue-900/30 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
            
            {/* Main image */}
            <img 
              src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9" 
              alt="Beauty products showcase" 
              className="rounded-2xl object-cover w-full h-full shadow-2xl relative z-10"
            />
            
            {/* Floating product badges */}
            <motion.div 
              className="absolute top-5 right-8 bg-white/90 dark:bg-zinc-900/90 p-3 rounded-xl shadow-lg z-20 backdrop-blur-sm"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <span className="text-sm font-medium">Premium Korean Skincare</span>
            </motion.div>
            
            <motion.div 
              className="absolute bottom-10 left-8 bg-white/90 dark:bg-zinc-900/90 p-3 rounded-xl shadow-lg z-20 backdrop-blur-sm"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.5 }}
            >
              <span className="text-sm font-medium">Luxury Fragrances</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Wave decoration at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full h-auto">
          <path 
            fill="currentColor" 
            fillOpacity="0.05"
            d="M0,64L60,58.7C120,53,240,43,360,53.3C480,64,600,96,720,96C840,96,960,64,1080,48C1200,32,1320,32,1380,32L1440,32L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
