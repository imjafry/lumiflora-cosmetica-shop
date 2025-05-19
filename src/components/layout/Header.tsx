import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "../theme/ThemeToggle";
import { ShoppingCart, User, Menu, X, Search, Heart, Bell } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { Badge } from "../ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import NotificationDropdown from "@/components/notifications/NotificationDropdown";

type CategoryType = Database["public"]["Enums"]["product_category"];

// Logo component
const Logo = () => (
  <Link to="/" className="flex items-center">
    <div className="relative">
      <div className="text-2xl font-bold tracking-tight">
        BeautyCrossAsia
      </div>
      <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-pink-500 to-orange-500 transform scale-x-100 origin-left transition-transform duration-300"></div>
    </div>
  </Link>
);

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user, isAdmin } = useAuth();
  const { items } = useCart();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  // Fetch categories from Supabase
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('category')
          .limit(30); // Fetch more than needed to get unique values

        if (error) throw error;

        // Extract unique categories
        const uniqueCategories = Array.from(new Set(data.map(item => item.category)));

        // Limit to 6 categories
        setCategories(uniqueCategories.slice(0, 6) as CategoryType[]);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Handle scroll event for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Additional navigation items
  const additionalNavItems = [
    { name: "Home", href: "/" },
    { name: "New Arrivals", href: "/new-arrivals" },
    { name: "Sale", href: "/category/sale" },
  ];

  // Format category name for display
  const formatCategoryName = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300 ease-in-out",
        isScrolled
          ? "bg-background/90 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {/* Home link */}
            <Link
              to="/"
              className="text-sm font-medium hover:text-primary transition-colors relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </Link>

            {/* Dynamic categories from Supabase */}
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${category}`}
                className="text-sm font-medium hover:text-primary transition-colors relative group capitalize"
              >
                {formatCategoryName(category)}
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            ))}

            {/* Additional static nav items */}
            <Link
              to="/new-arrivals"
              className="text-sm font-medium hover:text-primary transition-colors relative group"
            >
              New Arrivals
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </Link>

            <Link
              to="/category/sale"
              className="text-sm font-medium hover:text-primary transition-colors relative group"
            >
              Sale
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </Link>

            {/* Admin link if user is admin */}
            {user && isAdmin && (
              <Link
                to="/admin"
                className="text-sm font-medium hover:text-primary transition-colors relative group"
              >
                Admin Dashboard
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            )}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-3">
            {/* Search button */}
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist button */}
            <Button variant="ghost" size="icon" className="rounded-full relative hidden sm:flex" asChild>
              <Link to="/account?tab=wishlist">
                <Heart className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0">0</Badge>
              </Link>
            </Button>

            {/* Notifications */}
            {user && <NotificationDropdown />}

            {/* Theme toggle */}
            {/* <ThemeToggle /> */}

            {/* Cart button */}
            <Button variant="ghost" size="icon" className="rounded-full relative" asChild>
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0">
                  {cartItemCount}
                </Badge>
              </Link>
            </Button>

            {/* User account button */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              asChild
            >
              <Link to={user ? "/account" : "/login"}>
                {user ? (
                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-pink-400 to-orange-600 flex items-center justify-center text-white font-medium text-xs">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                ) : (
                  <User className="h-5 w-5" />
                )}
              </Link>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Search bar - animated dropdown */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            searchOpen ? "max-h-24 opacity-100 mt-3" : "max-h-0 opacity-0"
          )}
        >
          <div className="flex items-center border-2 border-muted rounded-full overflow-hidden px-4 py-2 bg-background">
            <Search className="h-4 w-4 mr-2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for products..."
              className="flex-1 bg-transparent outline-none text-sm"
            />
            <Button
              size="sm"
              variant="ghost"
              className="p-1 h-auto rounded-full"
              onClick={() => setSearchOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile navigation menu */}
      <MobileMenu
        open={mobileMenuOpen}
        setOpen={setMobileMenuOpen}
        navItems={[
          { name: "Home", href: "/" },
          ...categories.map(category => ({
            name: formatCategoryName(category),
            href: `/category/${category}`
          })),
          { name: "New Arrivals", href: "/new-arrivals" },
          { name: "Sale", href: "/category/sale" },
          ...(user && isAdmin ? [{ name: "Admin Dashboard", href: "/admin" }] : [])
        ]}
      />
    </header>
  );
}
