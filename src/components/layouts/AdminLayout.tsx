import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Package, Users, ShoppingBag, Grid, Settings, LogOut, Menu, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

const AdminLayout = () => {
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

  const getPageTitle = () => {
    const currentPath = location.pathname;
    const menuItem = menuItems.find(item => currentPath.startsWith(item.path));
    return menuItem ? menuItem.title : "Admin";
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
        {/* Top bar */}
        <div className="border-b bg-background">
          <div className="flex h-16 items-center px-4 md:px-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => {/* Add mobile menu handler */}}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm">Back to Store</span>
              </Link>
            </div>
            <div className="ml-auto flex items-center gap-4">
              <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
            </div>
          </div>
        </div>
        
        {/* Content area */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout; 