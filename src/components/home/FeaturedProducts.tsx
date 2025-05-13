
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../products/ProductCard";

// Mock data for featured products
const featuredProducts = [
  {
    id: "1",
    name: "Hydrating Serum",
    brand: "SkinJoy",
    price: 2490,
    rating: 4.8,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    category: "skincare",
    isNew: true,
    isBestseller: true,
  },
  {
    id: "2",
    name: "Matte Lipstick",
    brand: "GlamourCo",
    price: 1790,
    rating: 4.6,
    reviewCount: 98,
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    category: "makeup",
    isNew: false,
    isBestseller: true,
  },
  {
    id: "3",
    name: "Rose Perfume",
    brand: "LuxScent",
    price: 5990,
    rating: 4.9,
    reviewCount: 72,
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    category: "perfumes",
    isNew: true,
    isBestseller: false,
  },
  {
    id: "4",
    name: "Cleansing Foam",
    brand: "SkinJoy",
    price: 1290,
    rating: 4.7,
    reviewCount: 124,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    category: "skincare",
    isNew: false,
    isBestseller: false,
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold">Bestsellers</h2>
            <p className="text-muted-foreground mt-2">Our most popular products that customers love</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link to="/best-sellers" className="text-primary hover:underline flex items-center">
              View all bestsellers
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
