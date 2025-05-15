
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function PromoBannerSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-[#f6f2ea] rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-12 flex flex-col justify-center">
              <div className="max-w-lg">
                <span className="text-rose-500 font-medium mb-2 inline-block">SAVE TODAY</span>
                <h3 className="text-4xl font-playfair font-medium mb-4">
                  <span className="text-rose-500">30% </span>
                  <span className="italic font-light">off</span>
                </h3>
                <h4 className="text-2xl font-medium mb-4">Spa Beauty Care</h4>
                <p className="text-gray-600 mb-6">Experience luxury skincare with our premium collection. Limited time offer - treat yourself today!</p>
                <Button asChild className="rounded-full bg-zinc-900 hover:bg-black text-white">
                  <Link to="/category/skincare" className="px-8">Shop Now</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[300px] md:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1000"
                alt="Spa Beauty Care" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
