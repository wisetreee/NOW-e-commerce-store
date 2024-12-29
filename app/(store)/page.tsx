import { getNewProducts } from "@/sanity/lib/products/getNewProducts";
import ProductCard from "../components/ProductCard";

export default async function Home() {
  const products = await getNewProducts();
  
  return (
    <div>
     <h1>Hello world!</h1>
     {products.map ((product, index) => (
      <ProductCard key = {product._id} product = {product}/>
     ))}
    </div>
  );
}
