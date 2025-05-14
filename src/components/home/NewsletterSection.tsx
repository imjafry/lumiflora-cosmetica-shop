
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      setEmail("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-6xl mx-auto bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 dark:from-pink-900/10 dark:via-purple-900/10 dark:to-indigo-900/10 rounded-3xl p-8 md:p-12 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-pink-200 dark:bg-pink-900/30 rounded-full filter blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-40 h-40 bg-indigo-200 dark:bg-indigo-900/30 rounded-full filter blur-3xl opacity-50"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/2 text-center md:text-left">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 dark:bg-pink-900/30 mb-6">
                <Mail className="h-8 w-8 text-pink-500" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get 10% Off Your First Order</h2>
              <p className="text-muted-foreground max-w-lg">
                Join our newsletter and be the first to know about new collections, special offers, and exclusive beauty tips from our experts.
              </p>
              
              <div className="hidden md:block mt-8">
                <div className="flex gap-2 items-start">
                  <div className="bg-white dark:bg-zinc-800 p-2 rounded-full">
                    <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=48&h=48&crop=faces&auto=format&fit=crop" alt="Customer" className="w-8 h-8 rounded-full object-cover" />
                  </div>
                  <div className="bg-white/80 dark:bg-zinc-800/80 p-3 rounded-2xl rounded-tl-none max-w-xs">
                    <p className="text-xs text-foreground">
                      "I love the exclusive offers I get from the newsletter. The seasonal discounts are amazing!"
                    </p>
                    <p className="text-xs font-medium mt-1">Lisa T. - Loyal Customer</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm">
                <h3 className="text-xl font-medium mb-2">Subscribe to our newsletter</h3>
                <p className="text-sm text-muted-foreground mb-4">Stay updated with the latest products and offers</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-lg"
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="w-full rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white border-0"
                    disabled={isLoading}
                  >
                    {isLoading ? "Subscribing..." : "Subscribe & Get 10% Off"}
                  </Button>
                  
                  <div className="text-xs text-center text-muted-foreground">
                    We respect your privacy. Unsubscribe at any time.
                  </div>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
