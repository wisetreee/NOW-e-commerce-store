"use client";

import { Category, Product } from "@/sanity.types";
import ProductGrid from "../common/ProductGrid";
import FilterPanel from "./FilterPanel";
import { useState } from "react";
import { useRouter } from 'next/navigation' 
import IconButton from "../ui/IconButton";

interface ProductCatalogSectionProps {
    products: Product[];
    categories: Category[];
  }
  const ProductCatalogSection: React.FC<ProductCatalogSectionProps> = ({ products, categories }) => {
    const router = useRouter();
    const [panelOpen, setPanelOpen]  = useState(false);
    return (
            <section className="my-4">
                    <IconButton src="/turn-back.svg" theme="light" onClick={() => router.back()}/>
                 <div className="upper-panel mb-2 flex justify-between items-center">
                     <h1>Каталог товаров</h1>
                      <button 
                      className="p-2 border"
                      onClick={() => setPanelOpen(!panelOpen)}>
                        Фильтр        
                     </button>
                  </div>
                <ProductGrid products={products}/>
                <FilterPanel panelOpen={panelOpen} categories={categories} setPanelOpen={setPanelOpen}/>
            </section>
                
        
    );
  };

export default ProductCatalogSection;