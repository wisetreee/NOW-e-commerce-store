"use client";

import { Category } from "@/sanity.types";
import CategoryCard from "./CategoryCard";
interface CategoriesGridProps {
  categories: Category[];
  }
  const CategoriesGrid: React.FC<CategoriesGridProps> = ({ categories }) => {
    return (
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">

          {categories.map((category) => (
              <CategoryCard category={category} key={category._id} />   
          ))}
      </div>
    );
  };

export default CategoriesGrid;