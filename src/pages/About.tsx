
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Truck, ShieldCheck, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Beauty Without <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">Boundaries</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Bringing authentic international beauty products to Bangladesh, empowering everyone to look and feel their best.
            </motion.p>
          </div>
        </div>
        
        {/* Background decorations */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-200 dark:bg-purple-900/20 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-pink-200 dark:bg-pink-900/20 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
      </section>
      
      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1596462502278-27bfdc403348" 
                    alt="BeautyCrossAsia team" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-pink-400 to-indigo-400 rounded-2xl -rotate-6"></div>
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl rotate-12"></div>
              </div>
            </motion.div>
            
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                  <p className="text-muted-foreground">
                    At BeautyCrossAsia, our mission is to make authentic international beauty products accessible to everyone in Bangladesh. We believe that quality skincare and cosmetics should not be limited by geography or availability.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                  <p className="text-muted-foreground">
                    To become Bangladesh's most trusted beauty destination, known for authenticity, quality, and exceptional customer experience. We envision a world where everyone has access to the best beauty products regardless of borders.
                  </p>
                </div>
                
                <div className="pt-2">
                  <Button asChild className="rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white border-0">
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These core principles guide every decision we make and every product we offer
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <CheckCircle className="h-10 w-10" />,
                title: "Authenticity",
                description: "We guarantee 100% authentic products, sourced directly from official suppliers and manufacturers."
              },
              {
                icon: <ShieldCheck className="h-10 w-10" />,
                title: "Quality",
                description: "Every product meets strict quality standards before reaching our customers."
              },
              {
                icon: <HeartHandshake className="h-10 w-10" />,
                title: "Customer First",
                description: "Your satisfaction is our priority. We're here to help you look and feel your best."
              },
              {
                icon: <Truck className="h-10 w-10" />,
                title: "Accessibility",
                description: "Making international beauty products accessible throughout Bangladesh with reliable delivery."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border rounded-xl p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
            
            <div className="prose prose-lg dark:prose-invert mx-auto">
              <p>
                BeautyCrossAsia was founded in 2020 by a group of beauty enthusiasts who were frustrated by the lack of authentic international cosmetic products in Bangladesh. What started as a small operation importing products for friends and family quickly grew into something bigger.
              </p>
              
              <p>
                We noticed that many Bangladeshis were paying premium prices for products that were often counterfeit or expired. Our founder, Samira Rahman, decided to create a solution by establishing direct relationships with international brands and authorized distributors.
              </p>
              
              <p>
                Today, BeautyCrossAsia has grown into Bangladesh's trusted beauty destination, serving thousands of customers nationwide. Our team has expanded to include beauty experts, logistics specialists, and customer service professionals all dedicated to bringing you the best products from across the world.
              </p>
              
              <p>
                What sets us apart is our commitment to authenticity and customer satisfaction. Every product we sell comes with our authenticity guarantee, and our team is always available to help you find the perfect products for your needs.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Join Our Team */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-3xl p-8 md:p-16 text-white text-center"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              We're always looking for passionate individuals to join our growing team. If you love beauty and want to make a difference, we'd love to hear from you.
            </p>
            <Button asChild size="lg" variant="secondary" className="rounded-full">
              <Link to="/contact">View Opportunities</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
