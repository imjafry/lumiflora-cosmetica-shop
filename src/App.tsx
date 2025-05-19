import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/ProductDetails";
import CategoryPage from "./pages/CategoryPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Account from "./pages/Account";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import FaqPage from "./pages/help/FaqPage";
import ShippingInfoPage from "./pages/help/ShippingInfoPage";
import ReturnsPolicyPage from "./pages/help/ReturnsPolicyPage";
import PrivacyPolicyPage from "./pages/help/PrivacyPolicyPage";
import TermsPage from "./pages/help/TermsPage";

// Layouts
import MainLayout from "./components/layout/MainLayout";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import ProductsPage from "./pages/admin/ProductsPage";
import { default as AdminCategoryPage } from "./pages/admin/CategoryPage";
import OrdersPage from "./pages/admin/OrdersPage";
import CustomersPage from "./pages/admin/CustomersPage";
import SettingsPage from "./pages/admin/SettingsPage";
import AdminLayout from "./components/layouts/AdminLayout";
import NewArrivalsPage from "./pages/NewArrivalsPage";
import SalePage from "./pages/SalePage";
// Create a client
const queryClient = new QueryClient();

// Protected Route Component for Admin Routes
const AdminRoute = () => {
  const { user, isAdmin, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 relative">
          <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-b-2 border-rose-500 animate-spin"></div>
          <div className="text-xl font-bold absolute inset-0 flex items-center justify-center bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
            BCA
          </div>
        </div>
      </div>
    );
  }
  
  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return <AdminLayout />;
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading of resources
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 relative">
            <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-b-2 border-rose-500 animate-spin"></div>
            <div className="text-xl font-bold absolute inset-0 flex items-center justify-center bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              BCA
            </div>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">Loading BeautyCrossAsia...</div>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route element={<MainLayout />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/category/:category" element={<CategoryPage />} />
                  <Route path="/products/:productId" element={<ProductDetails />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/new-arrivals" element={<NewArrivalsPage />} />
                  <Route path="/category/sale" element={<SalePage />} />
                  <Route path="/help/faqs" element={<FaqPage />} />
                  <Route path="/help/shipping" element={<ShippingInfoPage />} />
                  <Route path="/help/returns" element={<ReturnsPolicyPage />} />
                  <Route path="/help/privacy" element={<PrivacyPolicyPage />} />
                  <Route path="/help/terms" element={<TermsPage />} />
                </Route>
                {/* Standalone Login Route */}
                <Route path="/login" element={<Login />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminRoute />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="products" element={<ProductsPage />} />
                  <Route path="categories" element={<AdminCategoryPage />} />
                  <Route path="orders" element={<OrdersPage />} />
                  <Route path="customers" element={<CustomersPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="*" element={<AdminDashboard />} />
                </Route>
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
