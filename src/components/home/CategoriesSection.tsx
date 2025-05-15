
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: "skincare",
    name: "Natural Beauty Collection",
    description: "Discover our premium skincare essentials",
    image: "https://images.unsplash.com/photo-1612540943771-0f492ce2010f?q=80&w=600",
    color: "bg-[#f2f0e8]",
    productCount: 124,
    tag: "NEW COLLECTION",
  },
  {
    id: "makeup",
    name: "10% OFF Body Butter",
    description: "Limited time promotion on select items",
    image: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=600",
    color: "bg-[#f9d5d3]",
    productCount: 98,
    tag: "SPECIAL OFFER",
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link to={`/category/${category.id}`}>
                <div className={`${category.color} rounded-xl p-8 h-[240px] relative overflow-hidden`}>
                  <div className="absolute top-8 left-8 z-10">
                    <span className="text-xs font-semibold tracking-wider text-rose-500">{category.tag}</span>
                    <h3 className="text-2xl font-medium my-2">{category.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                    <span className="flex items-center text-sm font-medium text-gray-800 hover:text-rose-500 transition-colors">
                      Shop Now <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </span>
                  </div>
                  
                  <img
                    src={category.image}
                    alt={category.name}
                    className="absolute right-0 bottom-0 h-full object-contain object-right-bottom"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
