
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PromotionBanner() {
  return (
    <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white">
      <div className="container mx-auto px-4 py-2 flex flex-col sm:flex-row items-center justify-between">
        <div className="text-center sm:text-left mb-2 sm:mb-0">
          <span className="font-medium">Summer Sale! Up to 40% off on selected products</span>
        </div>
        <Button asChild size="sm" variant="secondary" className="rounded-full whitespace-nowrap">
          <Link to="/category/sale" className="flex items-center gap-1">
            <ShoppingBag className="h-3.5 w-3.5" />
            Shop Now
          </Link>
        </Button>
      </div>
    </div>
  );
}
