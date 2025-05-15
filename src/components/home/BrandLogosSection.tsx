
import React from "react";
import { motion } from "framer-motion";

// Brand logos
const brandLogos = [
  {
    name: "Natural Co",
    logo: "https://placehold.co/120x60?text=Natural+Co",
  },
  {
    name: "Skin Joy",
    logo: "https://placehold.co/120x60?text=Skin+Joy",
  },
  {
    name: "Beauty Plus",
    logo: "https://placehold.co/120x60?text=Beauty+Plus",
  },
  {
    name: "Pure Care",
    logo: "https://placehold.co/120x60?text=Pure+Care",
  },
  {
    name: "D&S",
    logo: "https://placehold.co/120x60?text=D%26S",
  },
  {
    name: "Glamour",
    logo: "https://placehold.co/120x60?text=Glamour",
  }
];

export default function BrandLogosSection() {
  return (
    <div className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {brandLogos.map((brand, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="grayscale hover:grayscale-0 transition-all duration-300"
            >
              <img src={brand.logo} alt={brand.name} className="h-9 w-auto" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
