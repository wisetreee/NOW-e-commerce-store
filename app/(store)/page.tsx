import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import ProductCard from "../components/ProductCard";

export default async function Home() {
  const products = await getAllProducts();
  
  return (
    <div>
     <h1>Hello world!</h1>
     {products.map ((product, index) => (
      <div><ProductCard product = {product}/></div>
     ))}
    </div>
  );
}
