
import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Package, Users, ShoppingBag, Grid, Settings, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const menuItems = [
    {
      title: "Dashboard",
      path: "/admin",
      icon: Grid,
    },
    {
      title: "Products",
      path: "/admin/products",
      icon: Package,
    },
    {
      title: "Categories",
      path: "/admin/categories",
      icon: Grid,
    },
    {
      title: "Orders",
      path: "/admin/orders",
      icon: ShoppingBag,
    },
    {
      title: "Customers",
      path: "/admin/customers",
      icon: Users,
    },
    {
      title: "Settings",
      path: "/admin/settings",
      icon: Settings,
    },
  ];
  
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out successfully",
        description: "You've been logged out of your account.",
      });
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        title: "Error logging out",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const isActiveLink = (path: string) => {
    if (path === "/admin" && location.pathname === "/admin") {
      return true;
    }
    if (path !== "/admin" && location.pathname.startsWith(path)) {
      return true;
    }
    return false;
  };
  
  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <div className="hidden md:block w-64 bg-background border-r">
        <div className="h-full flex flex-col">
          {/* Logo and header */}
          <div className="p-4 border-b">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold tracking-tight">BeautyCrossAsia</span>
            </Link>
            <p className="text-xs text-muted-foreground mt-1">Admin Panel</p>
          </div>
          
          {/* Navigation menu */}
          <div className="flex-1 py-6 px-4">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-md text-sm group transition-colors ${
                      isActiveLink(item.path)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Footer with user info */}
          <div className="p-4 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-pink-400 to-orange-600 flex items-center justify-center text-white font-medium">
                  {user?.email?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium truncate max-w-[120px]">
                    {user?.email}
                  </p>
                  <p className="text-xs text-muted-foreground">Admin</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1">
        {/* Mobile header */}
        <div className="md:hidden border-b p-4 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="font-bold">BeautyCrossAsia Admin</span>
          </Link>
          <Button
            variant="outline"
            size="sm"
            className="ml-4"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Content area */}
        <div className="p-6">
          {location.pathname === "/admin" ? (
            <DashboardOverview />
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
};

// Dashboard Overview component for the main admin page
const DashboardOverview = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Sales", value: "৳24,750", change: "+12%" },
          { title: "Orders", value: "142", change: "+8%" },
          { title: "Customers", value: "89", change: "+24%" },
          { title: "Products", value: "256", change: "+4%" },
        ].map((stat, index) => (
          <div key={index} className="bg-background rounded-lg border p-6">
            <h3 className="text-muted-foreground font-medium">{stat.title}</h3>
            <div className="flex items-end mt-2 justify-between">
              <p className="text-2xl font-bold">{stat.value}</p>
              <span className={`text-xs px-2 py-1 rounded ${stat.change.startsWith('+') ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Recent activity */}
      <div className="bg-background rounded-lg border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
        </div>
        <div className="divide-y">
          {/* Empty state for now */}
          <div className="p-8 text-center">
            <p className="text-muted-foreground">Connect to your data to see recent orders.</p>
            <Button variant="outline" className="mt-4">
              <Link to="/admin/orders">View Orders</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
