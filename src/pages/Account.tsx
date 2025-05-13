
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { 
  User, Package, Heart, CreditCard, LogOut, 
  ChevronRight, ExternalLink, Clock
} from "lucide-react";

// Sample order data - would come from API in real app
const orders = [
  {
    id: "ORD12345",
    date: "2023-05-15",
    total: 4280,
    status: "Delivered",
    items: 3
  },
  {
    id: "ORD12346",
    date: "2023-06-02",
    total: 1790,
    status: "Processing",
    items: 1
  },
  {
    id: "ORD12347",
    date: "2023-06-10",
    total: 3280,
    status: "Shipped",
    items: 2
  }
];

const Account = () => {
  const [user, setUser] = useState({
    name: "Sarah Ahmed",
    email: "sarah.ahmed@example.com",
    phone: "01712345678",
    address: "123 Green Road, Dhaka",
  });
  
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully."
    });
  };
  
  return (
    <motion.div 
      className="container mx-auto px-4 py-8 md:py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="hidden lg:block">
          <nav className="space-y-2">
            <div className="flex items-center p-3 rounded-lg bg-primary/10 text-primary font-medium">
              <User className="h-5 w-5 mr-3" />
              <span>Profile</span>
            </div>
            <div className="flex items-center p-3 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
              <Package className="h-5 w-5 mr-3" />
              <span>Orders</span>
            </div>
            <div className="flex items-center p-3 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
              <Heart className="h-5 w-5 mr-3" />
              <span>Wishlist</span>
            </div>
            <div className="flex items-center p-3 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
              <CreditCard className="h-5 w-5 mr-3" />
              <span>Payment Methods</span>
            </div>
            <div className="border-t my-4"></div>
            <div className="flex items-center p-3 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
              <LogOut className="h-5 w-5 mr-3" />
              <span>Log Out</span>
            </div>
          </nav>
        </div>
        
        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="profile">
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
              <TabsTrigger value="addresses">Addresses</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <div className="bg-card rounded-xl border p-6">
                <h2 className="text-xl font-medium mb-6">My Profile</h2>
                
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <Input 
                        value={user.name} 
                        onChange={(e) => setUser({...user, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address</label>
                      <Input 
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <Input 
                        value={user.phone}
                        onChange={(e) => setUser({...user, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Address</label>
                      <Input 
                        value={user.address}
                        onChange={(e) => setUser({...user, address: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="rounded-full">
                      Save Changes
                    </Button>
                  </div>
                </form>
              </div>
              
              <div className="mt-8 bg-card rounded-xl border p-6">
                <h2 className="text-xl font-medium mb-6">Change Password</h2>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Current Password</label>
                      <Input type="password" />
                    </div>
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">New Password</label>
                        <Input type="password" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                        <Input type="password" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button variant="outline" className="rounded-full">
                      Change Password
                    </Button>
                  </div>
                </form>
              </div>
            </TabsContent>
            
            <TabsContent value="orders">
              <div className="bg-card rounded-xl border p-6">
                <h2 className="text-xl font-medium mb-6">My Orders</h2>
                
                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div 
                        key={order.id} 
                        className="border rounded-lg p-4 hover:border-primary/50 hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center">
                              <span className="font-medium">{order.id}</span>
                              <span className="mx-2 text-muted-foreground">•</span>
                              <span className="text-sm text-muted-foreground">{new Date(order.date).toLocaleDateString()}</span>
                            </div>
                            <div className="text-sm">{order.items} items • ৳{order.total}</div>
                          </div>
                          
                          <div className="flex items-center justify-between md:justify-end mt-4 md:mt-0">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span className={`text-sm ${
                                order.status === "Delivered" ? "text-green-600" :
                                order.status === "Processing" ? "text-amber-500" :
                                "text-blue-500"
                              }`}>
                                {order.status}
                              </span>
                            </div>
                            <Button variant="ghost" size="sm" className="ml-6">
                              View Details <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                    <p className="text-muted-foreground mb-6">
                      You haven't placed any orders yet.
                    </p>
                    <Button asChild className="rounded-full">
                      <a href="/">Start Shopping</a>
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="wishlist">
              <div className="bg-card rounded-xl border p-6">
                <h2 className="text-xl font-medium mb-6">My Wishlist</h2>
                
                <div className="text-center py-12">
                  <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
                  <p className="text-muted-foreground mb-6">
                    Add items that you like to your wishlist.
                  </p>
                  <Button asChild className="rounded-full">
                    <a href="/">Explore Products</a>
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="addresses">
              <div className="bg-card rounded-xl border p-6">
                <h2 className="text-xl font-medium mb-6">My Addresses</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 relative">
                    <div className="absolute top-4 right-4">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="bg-primary/10 text-primary rounded-full text-xs font-medium px-2 py-1 inline-block mb-3">
                      Default
                    </div>
                    <h3 className="font-medium">Home</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Sarah Ahmed<br />
                      123 Green Road<br />
                      Dhaka, 1205<br />
                      Phone: 01712345678
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4 border-dashed flex items-center justify-center">
                    <Button variant="ghost" className="h-auto flex flex-col p-8">
                      <div className="rounded-full w-10 h-10 border-2 border-dashed border-muted-foreground flex items-center justify-center mb-2">
                        <Plus className="h-5 w-5" />
                      </div>
                      <span>Add New Address</span>
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </motion.div>
  );
};

export default Account;
