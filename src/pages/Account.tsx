import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, Package, ShoppingBag, Heart, 
  LogOut, ChevronRight, Plus, Minus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const Account = () => {
  // Mock user data - replace with actual user data from authentication
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    memberSince: "January 2023",
  };

  // Mock order history data - replace with actual order data from backend
  const orderHistory = [
    {
      id: "12345",
      date: "2024-07-15",
      items: 3,
      total: 74.97,
      status: "Shipped",
    },
    {
      id: "67890",
      date: "2024-07-01",
      items: 5,
      total: 125.00,
      status: "Delivered",
    },
  ];

  return (
    <motion.div
      className="container mx-auto px-4 py-8 md:py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Account Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-card rounded-xl border p-6">
            <div className="flex items-center space-x-4 mb-6">
              <User className="h-10 w-10" />
              <div>
                <h2 className="text-lg font-medium">{user.name}</h2>
                <p className="text-sm text-muted-foreground">
                  Member since {user.memberSince}
                </p>
              </div>
            </div>

            <nav className="grid gap-4">
              <Button variant="ghost" className="justify-start rounded-full">
                <Package className="mr-2 h-4 w-4" />
                My Orders
                <ChevronRight className="ml-auto h-4 w-4" />
              </Button>
              <Button variant="ghost" className="justify-start rounded-full">
                <ShoppingBag className="mr-2 h-4 w-4" />
                My Wishlist
                <ChevronRight className="ml-auto h-4 w-4" />
              </Button>
              <Button variant="ghost" className="justify-start rounded-full">
                <Heart className="mr-2 h-4 w-4" />
                Saved Addresses
                <ChevronRight className="ml-auto h-4 w-4" />
              </Button>
            </nav>

            <div className="border-t mt-6 pt-6">
              <Button variant="ghost" className="justify-start rounded-full w-full">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Account Content */}
        <div className="md:col-span-2">
          <div className="bg-card rounded-xl border p-6">
            <h2 className="text-lg font-medium mb-6">Order History</h2>

            {orderHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-muted-foreground">
                  <thead className="text-xs uppercase bg-muted/50">
                    <tr>
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Items</th>
                      <th className="py-3 px-4">Total</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderHistory.map((order) => (
                      <tr key={order.id} className="border-b">
                        <td className="py-3 px-4">{order.id}</td>
                        <td className="py-3 px-4">{order.date}</td>
                        <td className="py-3 px-4">{order.items}</td>
                        <td className="py-3 px-4">৳{order.total}</td>
                        <td className="py-3 px-4">{order.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <ShoppingBag className="mx-auto h-6 w-6 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  You haven't placed any orders yet.
                </p>
                <Button asChild className="mt-4 rounded-full">
                  <Link to="/">Start Shopping</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Account;
