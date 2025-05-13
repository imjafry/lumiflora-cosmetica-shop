
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  {
    id: "skincare",
    name: "Skincare",
    description: "Serums, moisturizers, cleansers & more",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    id: "makeup",
    name: "Makeup",
    description: "Foundations, lipsticks, eyeshadows & more",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    color: "from-pink-500/20 to-pink-500/5",
  },
  {
    id: "perfumes",
    name: "Perfumes",
    description: "Luxury fragrances from top brands",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    color: "from-purple-500/20 to-purple-500/5",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function CategoriesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our wide selection of imported beauty products, carefully curated for quality and authenticity
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {categories.map((category) => (
            <motion.div 
              key={category.id} 
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group"
            >
              <Link to={`/category/${category.id}`} className="block">
                <div className={`rounded-2xl overflow-hidden relative bg-gradient-to-b ${category.color} p-1`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  <div className="relative overflow-hidden rounded-xl aspect-[4/5]">
                    <img 
                      src={category.image} 
                      alt={category.name}  
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                      <h3 className="font-bold text-xl mb-1">{category.name}</h3>
                      <p className="text-sm text-white/80">{category.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-12 text-center">
          <Link 
            to="/categories" 
            className="inline-flex items-center text-primary hover:underline transition-colors"
          >
            <span>View all categories</span>
            <svg 
              className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
