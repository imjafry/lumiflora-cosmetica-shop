
import React from "react";
import { motion } from "framer-motion";
import { Package, Truck, CreditCard, ArrowLeft, Award, Shield } from "lucide-react";

const features = [
  {
    id: "authentic",
    title: "100% Authentic Products",
    description: "We source directly from official suppliers to ensure authenticity of all products",
    icon: <Award className="w-6 h-6" />,
    color: "from-pink-500 to-pink-600",
  },
  {
    id: "delivery",
    title: "Nationwide Delivery",
    description: "Fast and secure delivery available throughout Bangladesh",
    icon: <Truck className="w-6 h-6" />,
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "payment",
    title: "Cash on Delivery",
    description: "Pay only when you receive and inspect your products",
    icon: <CreditCard className="w-6 h-6" />,
    color: "from-indigo-500 to-indigo-600",
  },
  {
    id: "returns",
    title: "Easy Returns",
    description: "Hassle-free returns within 7 days of delivery",
    icon: <ArrowLeft className="w-6 h-6" />,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "premium",
    title: "Premium Selection",
    description: "Carefully curated products from the world's best beauty brands",
    icon: <Package className="w-6 h-6" />,
    color: "from-amber-500 to-amber-600",
  },
  {
    id: "secure",
    title: "Secure Shopping",
    description: "Your personal information is always protected with us",
    icon: <Shield className="w-6 h-6" />,
    color: "from-green-500 to-green-600",
  },
];

export default function FeaturesGrid() {
  return (
    <section className="py-16 md:py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Experience the BeautyCrossAsia difference with our commitment to quality, convenience, and customer satisfaction
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
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
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <div className="flex flex-col p-6 rounded-xl bg-card border border-border h-full hover:shadow-md transition-shadow relative overflow-hidden group">
                {/* Color gradient background that shows on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-5`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
