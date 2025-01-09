import { getNewProducts } from "@/sanity/lib/products/getNewProducts";
import ProductRow from "../components/ProductRow";

export default async function Home() {
  const products = await getNewProducts();
  
  return (
    <section>
      <div className="container mx-auto px-8 md:px-8 lg:px-16 justify-between items-center">
     <h1 className="mb-4">Новинки</h1>
     <ProductRow products={products}/>
     </div>
    </section>

  );
}
