
import React from "react";

const DeliveryInfo: React.FC = () => {
  return (
    <div className="bg-[#f8f8f8] dark:bg-zinc-900 rounded-xl p-4 mb-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
          <svg className="h-6 w-6 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M8 4v16" />
            <path d="M16 4v16" />
          </svg>
        </div>
        <div>
          <h4 className="font-medium">Free Delivery</h4>
          <p className="text-sm text-muted-foreground">Available for orders over ৳5000</p>
        </div>
      </div>
      <div className="border-t my-3 dark:border-zinc-700"></div>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
          <svg className="h-6 w-6 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
            <path d="M12 12v9" />
            <path d="m8 17 4 4 4-4" />
          </svg>
        </div>
        <div>
          <h4 className="font-medium">Easy Returns</h4>
          <p className="text-sm text-muted-foreground">7 days return policy</p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;
