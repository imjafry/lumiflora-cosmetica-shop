
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Trash2, ArrowRight, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
  const { items, removeItem, updateQuantity, subtotal } = useCart();
  const [promoCode, setPromoCode] = React.useState("");
  const [promoApplied, setPromoApplied] = React.useState(false);
  
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "welcome10") {
      setPromoApplied(true);
    }
  };
  
  // Calculate cart totals
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const deliveryFee = subtotal > 5000 ? 0 : 100;
  const total = subtotal - discount + deliveryFee;
  
  // Empty cart state
  if (items.length === 0) {
    return (
      <motion.div 
        className="container mx-auto px-4 py-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-md mx-auto">
          <div className="mb-6 bg-muted/50 inline-flex p-6 rounded-full">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button asChild className="rounded-full bg-orange-500 hover:bg-orange-600 text-white">
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      className="container mx-auto px-4 py-8 md:py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-xl border p-6">
            <div className="space-y-6">
              {items.map((item) => (
                <motion.div 
                  key={item.id} 
                  className="flex flex-col sm:flex-row sm:items-center gap-4 pb-6 border-b last:border-0 last:pb-0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-full sm:w-20 h-20 rounded-md overflow-hidden bg-[#f8f8f8] dark:bg-zinc-900 shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.brand}</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-input rounded-md">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 rounded-l-md"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <div className="w-8 flex items-center justify-center text-sm">
                        {item.quantity}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 rounded-r-md"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <div className="w-24 text-right font-medium">
                      ৳{item.price * item.quantity}
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div>
          <div className="bg-card rounded-xl border p-6 sticky top-24">
            <h2 className="text-lg font-bold mb-6">Order Summary</h2>
            
            {/* Promo Code */}
            <div className="mb-6">
              <div className="flex gap-2">
                <Input 
                  placeholder="Promo code" 
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  disabled={promoApplied}
                  className="rounded-full"
                />
                <Button 
                  onClick={applyPromoCode} 
                  disabled={promoApplied || !promoCode}
                  className="rounded-full bg-orange-500 hover:bg-orange-600 disabled:bg-muted"
                >
                  Apply
                </Button>
              </div>
              {promoApplied && (
                <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                  Promo code applied successfully!
                </p>
              )}
            </div>
            
            {/* Price Breakdown */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>৳{subtotal}</span>
              </div>
              
              {promoApplied && (
                <div className="flex justify-between text-green-600 dark:text-green-400">
                  <span>Discount (10%)</span>
                  <span>-৳{discount}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span>{deliveryFee === 0 ? "Free" : `৳${deliveryFee}`}</span>
              </div>
              
              <div className="border-t pt-3 flex justify-between font-bold text-base">
                <span>Total</span>
                <span>৳{total}</span>
              </div>
            </div>
            
            {/* Checkout Button */}
            <div className="mt-6">
              <Button 
                asChild
                className="w-full rounded-full bg-orange-500 hover:bg-orange-600 text-white"
              >
                <Link to="/checkout">
                  Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            {/* Continue Shopping */}
            <div className="mt-4">
              <Button 
                asChild
                variant="outline"
                className="w-full rounded-full"
              >
                <Link to="/products">
                  Continue Shopping
                </Link>
              </Button>
            </div>
            
            <div className="mt-6 text-xs text-center text-muted-foreground">
              <p>We accept Cash on Delivery</p>
              <p className="mt-1">Free shipping on orders over ৳5,000</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;
