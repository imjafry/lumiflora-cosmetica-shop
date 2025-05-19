import React from "react";
import { Link, useLocation } from "react-router-dom";

const helpLinks = [
  { label: "FAQs", to: "/help/faqs" },
  { label: "Shipping Info", to: "/help/shipping" },
  { label: "Returns Policy", to: "/help/returns" },
  { label: "Privacy Policy", to: "/help/privacy" },
  { label: "Terms & Conditions", to: "/help/terms" },
];

const HelpLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  return (
    <div className="container mx-auto py-8 px-4 md:px-0 flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 mb-4 md:mb-0">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 sticky top-8">
          <h2 className="text-xl font-bold mb-4">Help & Support</h2>
          <nav className="flex flex-col gap-2">
            {helpLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-medium px-2 py-1 rounded transition-colors ${location.pathname === link.to ? "bg-primary/10 text-primary" : "hover:bg-muted text-muted-foreground"}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 min-w-0">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default HelpLayout; 