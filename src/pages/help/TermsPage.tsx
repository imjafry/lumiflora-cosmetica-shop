import React from "react";
import HelpLayout from "@/components/layouts/HelpLayout";

export default function TermsPage() {
  return (
    <HelpLayout>
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Terms & Conditions</h1>
      <div className="space-y-6 text-base text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold mb-2">User Agreement</h2>
          <p>By using our website, you agree to comply with our terms and conditions. Please read them carefully before making a purchase.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-2">Acceptable Use</h2>
          <ul className="list-disc pl-6">
            <li>Do not use our site for unlawful purposes</li>
            <li>Do not attempt to gain unauthorized access to our systems</li>
            <li>Respect the rights and privacy of other users</li>
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-2">Limitation of Liability</h2>
          <p>We are not liable for any indirect, incidental, or consequential damages arising from your use of our site or products. Our maximum liability is limited to the amount paid for your order.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-2">Changes to Terms</h2>
          <p>We reserve the right to update these terms at any time. Continued use of the site constitutes acceptance of the revised terms.</p>
        </section>
      </div>
    </HelpLayout>
  );
} 