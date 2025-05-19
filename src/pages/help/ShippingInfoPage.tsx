import React from "react";
import HelpLayout from "@/components/layouts/HelpLayout";

export default function ShippingInfoPage() {
  return (
    <HelpLayout>
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Shipping Information</h1>
      <div className="space-y-6 text-base text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold mb-2">Shipping Methods</h2>
          <p>We offer standard and express shipping options across Bangladesh. All orders are shipped via trusted courier partners to ensure safe and timely delivery.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-2">Delivery Times</h2>
          <ul className="list-disc pl-6">
            <li>Dhaka: 1-2 business days</li>
            <li>Other cities: 2-4 business days</li>
            <li>Remote areas: 3-7 business days</li>
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-2">Shipping Costs</h2>
          <p>Shipping is free for orders over ৳2000. For orders below this amount, a flat rate of ৳80 applies. Express shipping may incur additional charges.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-2">Order Tracking</h2>
          <p>Once your order is shipped, you will receive a tracking link via email and SMS. You can also track your order from your account dashboard.</p>
        </section>
      </div>
    </HelpLayout>
  );
} 