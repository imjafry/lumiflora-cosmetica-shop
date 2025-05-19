import React from "react";
import HelpLayout from "@/components/layouts/HelpLayout";

export default function PrivacyPolicyPage() {
  return (
    <HelpLayout>
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="space-y-6 text-base text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold mb-2">Information We Collect</h2>
          <p>We collect information you provide when you create an account, place an order, or contact support. This includes your name, email, address, and payment details.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-2">How We Use Your Information</h2>
          <ul className="list-disc pl-6">
            <li>To process and deliver your orders</li>
            <li>To communicate with you about your account or orders</li>
            <li>To improve our products and services</li>
            <li>For marketing and promotional purposes (with your consent)</li>
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-2">Your Rights</h2>
          <p>You have the right to access, update, or delete your personal information at any time. Contact us at privacy@beautycrossasia.com for assistance.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-2">Data Security</h2>
          <p>We use industry-standard security measures to protect your data. Your information is never shared with third parties except as required to fulfill your order or by law.</p>
        </section>
      </div>
    </HelpLayout>
  );
} 