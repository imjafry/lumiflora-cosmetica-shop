
import React from "react";
import { Check } from "lucide-react";

interface ProductBenefitsProps {
  benefits: string[];
}

const ProductBenefits: React.FC<ProductBenefitsProps> = ({ benefits }) => {
  return (
    <div className="mb-8">
      <h3 className="font-medium mb-4 text-lg">Key Benefits:</h3>
      <ul className="space-y-3">
        {benefits.map((benefit: string, index: number) => (
          <li key={index} className="flex items-start">
            <div className="mr-3 mt-1">
              <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <span className="text-muted-foreground">{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductBenefits;
