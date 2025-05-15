
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface BreadcrumbsProps {
  category: string;
  productName: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ category, productName }) => {
  return (
    <div className="flex items-center text-sm text-muted-foreground mb-8">
      <Link to="/" className="hover:text-primary transition-colors">Home</Link>
      <ChevronRight className="h-4 w-4 mx-2" />
      <Link to={`/category/${category}`} className="hover:text-primary transition-colors capitalize">
        {category}
      </Link>
      <ChevronRight className="h-4 w-4 mx-2" />
      <span className="truncate max-w-[200px]">{productName}</span>
    </div>
  );
};

export default Breadcrumbs;
