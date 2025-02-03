"use client";

import { Product } from "@/sanity.types";
import ProductGrid from "./ProductGrid";
import FilterPanel from "./FilterPanel";
import { useState } from "react";
import { useRouter } from 'next/navigation' 
import IconButton from "./IconButton";

interface ProductCatalogSectionProps {
    products: Product[];
  }
  const ProductCatalogSection: React.FC<ProductCatalogSectionProps> = ({ products }) => {
    const router = useRouter();
    const [panelOpen, setPanelOpen]  = useState(false);
    return (
            <section className="mt-4">
                    <IconButton src="/turn-back.svg" theme="light" onClick={() => router.back()}>
                      </IconButton>  
                 <div className="upper-panel mb-4 flex justify-between items-center">
                     <h1>Каталог товаров</h1>
                      <button 
                      className="p-2 border"
                      onClick={() => setPanelOpen(!panelOpen)}>
                             Фильтр        
                     </button>
                    </div>
                <ProductGrid products={products}/>
                 <FilterPanel panelOpen={panelOpen} setPanelOpen={setPanelOpen}/>
            </section>
                
        
    );
  };

export default ProductCatalogSection;