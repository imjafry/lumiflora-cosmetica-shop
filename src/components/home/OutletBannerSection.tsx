
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function OutletBannerSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-[#fff5f7] rounded-2xl p-12 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-2xl font-medium mb-2">Women's Outlet</h3>
            <h2 className="text-3xl md:text-4xl font-playfair font-medium mb-6">
              Further reductions. Up to <span className="text-rose-500">70% Off.</span>
            </h2>
            <p className="text-gray-600 mb-8">Find all your favorite beauty brands at unbelievable prices.</p>
            <Button asChild className="rounded-none bg-zinc-900 hover:bg-black text-white">
              <Link to="/category/sale" className="px-8">SHOP THE OUTLET</Link>
            </Button>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute left-0 bottom-0 w-40 h-40">
            <div className="absolute w-full h-full bg-contain bg-no-repeat bg-bottom opacity-30"
              style={{backgroundImage: "url('https://images.unsplash.com/photo-1599958714858-a9e63c12a03f?q=80&w=400')"}}></div>
          </div>
          <div className="absolute right-0 top-0 w-40 h-40">
            <div className="absolute w-full h-full bg-contain bg-no-repeat bg-top opacity-30"
              style={{backgroundImage: "url('https://images.unsplash.com/photo-1608248543803-ba4f8c70ae7b?q=80&w=400')"}}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
