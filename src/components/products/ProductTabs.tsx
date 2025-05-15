
import React from "react";

interface ProductTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  ingredients: string;
  howToUse: string;
  reviewCount: number;
}

const ProductTabs: React.FC<ProductTabsProps> = ({
  activeTab,
  setActiveTab,
  ingredients,
  howToUse,
  reviewCount
}) => {
  return (
    <div className="mt-16">
      <div className="border-b dark:border-zinc-800">
        <div className="flex space-x-8">
          <button 
            className={`px-1 py-4 font-medium ${activeTab === 'ingredients' ? 'border-b-2 border-orange-500 text-orange-500' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('ingredients')}
          >
            Ingredients
          </button>
          <button 
            className={`px-1 py-4 font-medium ${activeTab === 'howToUse' ? 'border-b-2 border-orange-500 text-orange-500' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('howToUse')}
          >
            How to Use
          </button>
          <button 
            className={`px-1 py-4 font-medium ${activeTab === 'reviews' ? 'border-b-2 border-orange-500 text-orange-500' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({reviewCount})
          </button>
        </div>
      </div>
      <div className="py-6">
        {activeTab === 'ingredients' && (
          <p className="text-muted-foreground leading-relaxed">{ingredients}</p>
        )}
        {activeTab === 'howToUse' && (
          <p className="text-muted-foreground leading-relaxed">{howToUse}</p>
        )}
        {activeTab === 'reviews' && (
          <p className="text-muted-foreground">Customer reviews will be displayed here.</p>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
