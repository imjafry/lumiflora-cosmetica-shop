
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { ThemeProvider } from "../theme/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import PromotionBanner from "../home/PromotionBanner";

export default function MainLayout() {
  // Add Google Fonts
  useEffect(() => {
    // Add Playfair Display font
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Poppins:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);
  
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <div className="min-h-screen flex flex-col">
        {/* <PromotionBanner /> */}
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
      <Toaster />
      <Sonner />
    </ThemeProvider>
  );
}
