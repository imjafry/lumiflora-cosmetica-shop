import React from "react";
import HelpLayout from "@/components/layouts/HelpLayout";

export default function ReturnsPolicyPage() {
  return (
    <HelpLayout>
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Returns Policy</h1>
      <div className="space-y-6 text-base text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold mb-2">Eligibility</h2>
          <p>Items can be returned within 7 days of delivery if they are unused, unopened, and in their original packaging. Certain items such as personal care products may not be eligible for return due to hygiene reasons.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-2">How to Return</h2>
          <ol className="list-decimal pl-6">
            <li>Contact our support team with your order details.</li>
            <li>Pack the item securely in its original packaging.</li>
            <li>We will arrange a pickup or provide drop-off instructions.</li>
          </ol>
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-2">Refunds</h2>
          <p>Once your return is received and inspected, your refund will be processed within 5-7 business days. Refunds are issued to the original payment method.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-2">Exchanges</h2>
          <p>If you received a defective or incorrect item, we will arrange for a replacement at no extra cost.</p>
        </section>
      </div>
    </HelpLayout>
  );
} 