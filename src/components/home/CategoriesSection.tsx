
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: "skincare",
    name: "Skincare",
    description: "Serums, moisturizers, cleansers & more",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    color: "from-blue-500/20 to-blue-500/5",
    icon: "✨",
    itemCount: 124,
  },
  {
    id: "makeup",
    name: "Makeup",
    description: "Foundations, lipsticks, eyeshadows & more",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    color: "from-pink-500/20 to-pink-500/5",
    icon: "💄",
    itemCount: 98,
  },
  {
    id: "perfumes",
    name: "Perfumes",
    description: "Luxury fragrances from top brands",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    color: "from-purple-500/20 to-purple-500/5",
    icon: "🌸",
    itemCount: 56,
  },
  {
    id: "haircare",
    name: "Hair Care",
    description: "Shampoos, conditioners, treatments & more",
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388",
    color: "from-amber-500/20 to-amber-500/5",
    icon: "💇‍♀️",
    itemCount: 72,
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
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
                <div className={`rounded-2xl overflow-hidden relative bg-gradient-to-b ${category.color} p-1 shadow-sm hover:shadow-md transition-all`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  <div className="relative overflow-hidden rounded-xl aspect-[4/5]">
                    <img 
                      src={category.image} 
                      alt={category.name}  
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="bg-white/20 backdrop-blur-sm w-12 h-12 rounded-full flex items-center justify-center text-xl mb-3">
                          {category.icon}
                        </div>
                        <h3 className="font-bold text-xl mb-1 text-white">{category.name}</h3>
                        <p className="text-sm text-white/80 mb-3">{category.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-white bg-white/20 rounded-full px-3 py-1">
                            {category.itemCount} items
                          </span>
                          <span className="text-white text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                            Shop now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
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
            className="inline-flex items-center gap-2 bg-muted/50 hover:bg-muted text-foreground px-6 py-3 rounded-full transition-colors font-medium"
          >
            <span>View all categories</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
