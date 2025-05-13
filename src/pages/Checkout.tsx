
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, CreditCard, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define form schema with zod
const checkoutSchema = z.object({
  fullName: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(11, { message: "Phone number must be at least 11 digits" }),
  address: z.string().min(5, { message: "Please enter your full address" }),
  district: z.string().min(1, { message: "Please select your district" }),
  postalCode: z.string().min(4, { message: "Please enter a valid postal code" }),
  deliveryInstructions: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

// Mock cart summary data - would be from context/state in a real app
const cartSummary = {
  subtotal: 6770,
  discount: 677,
  deliveryFee: 0,
  total: 6093,
  items: [
    {
      id: "1",
      name: "Hydrating Serum",
      quantity: 2,
      price: 2490,
    },
    {
      id: "2",
      name: "Matte Lipstick",
      quantity: 1,
      price: 1790,
    },
  ],
};

// List of districts in Bangladesh
const bangladeshDistricts = [
  "Dhaka", "Chittagong", "Khulna", "Rajshahi", "Barisal", 
  "Sylhet", "Rangpur", "Mymensingh", "Comilla", "Narayanganj",
  "Gazipur", "Narsingdi", "Jessore", "Bogra", "Dinajpur"
];

const Checkout = () => {
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      district: "",
      postalCode: "",
      deliveryInstructions: "",
    },
  });

  const onSubmit = (data: CheckoutFormValues) => {
    console.log("Order placed:", data);
    toast({
      title: "Order Placed Successfully!",
      description: "Your order has been placed. You will receive a confirmation shortly.",
    });
    // In a real app, you would submit to backend, redirect to confirmation page, etc.
  };

  return (
    <motion.div 
      className="container mx-auto px-4 py-8 md:py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <Link to="/cart" className="flex items-center text-sm text-muted-foreground hover:text-primary">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Cart
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Contact Information */}
              <div className="bg-card rounded-xl border p-6">
                <h2 className="text-lg font-medium mb-6">Contact Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your.email@example.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="01XXXXXXXXX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              {/* Shipping Address */}
              <div className="bg-card rounded-xl border p-6">
                <h2 className="text-lg font-medium mb-6">Shipping Address</h2>
                
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter your full address" 
                            className="resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="district"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>District</FormLabel>
                          <FormControl>
                            <select 
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                              {...field}
                            >
                              <option value="" disabled>Select District</option>
                              {bangladeshDistricts.map(district => (
                                <option key={district} value={district}>{district}</option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter postal code" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="deliveryInstructions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Delivery Instructions (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any specific instructions for delivery" 
                            className="resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              {/* Payment Method */}
              <div className="bg-card rounded-xl border p-6">
                <h2 className="text-lg font-medium mb-6">Payment Method</h2>
                
                <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center mr-3">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                    </div>
                    <div>
                      <div className="font-medium">Cash on Delivery</div>
                      <div className="text-xs text-muted-foreground">Pay when you receive your order</div>
                    </div>
                  </div>
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <Button
                  variant="outline"
                  type="button"
                  asChild
                  className="rounded-full"
                >
                  <Link to="/cart">Return to Cart</Link>
                </Button>
                <Button 
                  type="submit" 
                  className="rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white border-0"
                >
                  Place Order
                </Button>
              </div>
            </form>
          </Form>
        </div>
        
        {/* Order Summary */}
        <div>
          <div className="bg-card rounded-xl border p-6 sticky top-24">
            <h2 className="text-lg font-bold mb-6">Order Summary</h2>
            
            {/* Items */}
            <div className="space-y-4 mb-6">
              {cartSummary.items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} <span className="text-muted-foreground">x{item.quantity}</span></span>
                  <span>৳{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            
            {/* Divider */}
            <div className="border-t my-4"></div>
            
            {/* Totals */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>৳{cartSummary.subtotal}</span>
              </div>
              
              <div className="flex justify-between text-green-600">
                <span>Discount (10%)</span>
                <span>-৳{cartSummary.discount}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span>{cartSummary.deliveryFee === 0 ? "Free" : `৳${cartSummary.deliveryFee}`}</span>
              </div>
              
              <div className="border-t pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span>৳{cartSummary.total}</span>
              </div>
            </div>
            
            <div className="mt-6 flex items-center justify-center text-muted-foreground text-xs">
              <MapPin className="h-4 w-4 mr-2" />
              <span>Delivery available within Bangladesh only</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;
