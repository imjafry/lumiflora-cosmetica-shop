
import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                BeautyCrossAsia
              </div>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Your premier destination for imported cosmetics in Bangladesh, bringing global beauty to your doorstep.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2 border border-border hover:border-primary hover:text-primary transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2 border border-border hover:border-primary hover:text-primary transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2 border border-border hover:border-primary hover:text-primary transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/new-arrivals" className="text-sm hover:text-primary transition-colors">New Arrivals</Link></li>
              <li><Link to="/best-sellers" className="text-sm hover:text-primary transition-colors">Best Sellers</Link></li>
              <li><Link to="/about" className="text-sm hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/category/skincare" className="text-sm hover:text-primary transition-colors">Skincare</Link></li>
              <li><Link to="/category/makeup" className="text-sm hover:text-primary transition-colors">Makeup</Link></li>
              <li><Link to="/category/perfumes" className="text-sm hover:text-primary transition-colors">Perfumes</Link></li>
              <li><Link to="/category/haircare" className="text-sm hover:text-primary transition-colors">Hair Care</Link></li>
              <li><Link to="/category/bodycare" className="text-sm hover:text-primary transition-colors">Body Care</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Help & Support</h3>
            <ul className="space-y-2">
              <li><Link to="/help/faqs" className="text-sm hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link to="/help/shipping" className="text-sm hover:text-primary transition-colors">Shipping Info</Link></li>
              <li><Link to="/help/returns" className="text-sm hover:text-primary transition-colors">Returns Policy</Link></li>
              <li><Link to="/help/privacy" className="text-sm hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/help/terms" className="text-sm hover:text-primary transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} BeautyCrossAsia.com. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-4 text-xs text-muted-foreground">
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
