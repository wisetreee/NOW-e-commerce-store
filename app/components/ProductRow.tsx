"use client";
import ProductCard from "./ProductCard";
import { Product } from "@/sanity.types";
interface ProductRowProps {
    products: Product[];
  }
  const ProductRow: React.FC<ProductRowProps> = ({ products }) => {
    return (
      <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {/* Контейнер карточек */}
        <div className="flex gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex-shrink-0 w-1/2  md:w-1/5 max-w-[14.5rem]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    );
  };

export default ProductRow;