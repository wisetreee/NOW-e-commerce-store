import { getNewProducts } from "@/sanity/lib/products/getNewProducts";
import ProductRow from "../common/ProductRow";

const NewProductsSection = async () => {
    const products = await getNewProducts();
  return (
    <section className="mb-16">
      <div className="container">
     <h1 className="mb-4">Новинки</h1>
     <ProductRow products={products}/>
     </div>
    </section>
  );
};

export default NewProductsSection;