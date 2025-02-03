"use client";
import ProductCard from "./ProductCard";
import { Product } from "@/sanity.types";
interface ProductGridProps {
    products: Product[];
  }
  const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
    return (
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {/* Контейнер карточек */}
          {products.map((product) => (
              <ProductCard product={product} key={product._id}/>           
          ))}
      </div>
    );
  };

export default ProductGrid;