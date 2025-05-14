
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";

const categories = [
  {
    id: "skincare",
    name: "Skincare",
    description: "Skincare essentials for a radiant complexion",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600",
    color: "bg-[#f8e9d6]",
    productCount: 124,
  },
  {
    id: "makeup",
    name: "Makeup",
    description: "Express yourself with premium cosmetics",
    image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=600",
    color: "bg-[#f9d5d3]",
    productCount: 98,
  },
  {
    id: "perfumes",
    name: "Fragrance",
    description: "Luxury scents for lasting impressions",
    image: "https://images.unsplash.com/photo-1615368711218-da4bce2fb4c8?q=80&w=600",
    color: "bg-[#e8f0ff]",
    productCount: 56,
  },
  {
    id: "haircare",
    name: "Hair Care",
    description: "Solutions for healthy, beautiful hair",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600", 
    color: "bg-[#e0f5e9]",
    productCount: 72,
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-16 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Shop by Category</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Explore our curated collection of premium beauty products
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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
                <Card className="border-none overflow-hidden h-full transition-shadow hover:shadow-md">
                  <div className={`${category.color} p-5 rounded-t-lg`}>
                    <div className="overflow-hidden rounded-lg">
                      <AspectRatio ratio={1/1}>
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                      </AspectRatio>
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{category.description}</p>
                    <span className="text-xs font-medium inline-block bg-muted px-2 py-1 rounded-full">
                      {category.productCount} products
                    </span>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
