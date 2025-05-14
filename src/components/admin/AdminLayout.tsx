
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  BarChart, 
  CreditCard,
  LogOut,
  Menu,
  X,
  Bell,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast({ title: "Logged out successfully" });
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      toast({ 
        title: "Error logging out", 
        description: "Please try again", 
        variant: "destructive" 
      });
    }
  };

  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, path: "/admin" },
    { name: "Products", icon: <Package className="w-5 h-5" />, path: "/admin/products" },
    { name: "Orders", icon: <ShoppingCart className="w-5 h-5" />, path: "/admin/orders" },
    { name: "Customers", icon: <Users className="w-5 h-5" />, path: "/admin/customers" },
    { name: "Payments", icon: <CreditCard className="w-5 h-5" />, path: "/admin/payments" },
    { name: "Analytics", icon: <BarChart className="w-5 h-5" />, path: "/admin/analytics" },
    { name: "Settings", icon: <Settings className="w-5 h-5" />, path: "/admin/settings" },
  ];

  const NavLink = ({ item }) => {
    const isActive = location.pathname === item.path;
    
    return (
      <Link
        to={item.path}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
          isActive 
            ? "bg-primary text-primary-foreground" 
            : "hover:bg-primary/10 text-muted-foreground hover:text-primary"
        )}
      >
        {item.icon}
        <span>{item.name}</span>
        {isActive && (
          <motion.div
            layoutId="sidebar-highlight"
            className="absolute right-0 w-1 h-6 bg-primary rounded-l-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </Link>
    );
  };

  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r bg-card">
        <div className="p-6 border-b">
          <Link to="/admin" className="flex items-center gap-2 font-bold text-xl">
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white w-8 h-8 rounded-md flex items-center justify-center">
              BCA
            </div>
            BeautyCrossAsia
          </Link>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          <p className="text-xs font-medium text-muted-foreground px-2 py-2">MAIN MENU</p>
          {navItems.map((item) => (
            <NavLink key={item.name} item={item} />
          ))}
        </div>
        
        <div className="p-4 border-t">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>
      
      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <Link to="/admin" className="flex items-center gap-2 font-bold text-xl">
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white w-8 h-8 rounded-md flex items-center justify-center">
                  BCA
                </div>
                BeautyCrossAsia
              </Link>
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden" 
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
            <p className="text-xs font-medium text-muted-foreground px-2 py-2">MAIN MENU</p>
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                  location.pathname === item.path 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-primary/10 text-muted-foreground hover:text-primary"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
          
          <div className="p-4 border-t">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="flex h-16 items-center px-4 gap-4">
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            
            <div className="flex-1 hidden md:block">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search products, orders, customers..." 
                  className="w-[300px] pl-8 rounded-lg bg-muted/50" 
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4 ml-auto">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"></span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Notifications</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <div className="border-l h-6"></div>
              
              <div className="flex items-center gap-2">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://github.com/shadcn.png" alt="Admin User" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-muted-foreground">admin@beautycrossasia.com</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
