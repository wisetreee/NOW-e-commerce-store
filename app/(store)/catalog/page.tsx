import ProductCatalogSection from "@/app/components/ProductCatalogSection";
import { getFilteredProducts } from "@/sanity/lib/products/getFilteredProducts";

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | number | number[] | undefined }>
})  {
  const {
    query = "",
    gender = "",
    sizes = [],
    categories = [],
    minPrice = 0,
    maxPrice = 0,
    page = 1,
    limit = 10,
  } = await searchParams;

  const categoriesArray =
    typeof categories === "string" ? categories.split(",") : [];

  const sizesArray =
    typeof sizes === "string" ? sizes.split(",").map(Number) : Array.isArray(sizes) ? sizes.map(Number) : [];

  // Получение отфильтрованных продуктов
  const products = await getFilteredProducts({
    query: query as string,
    gender: gender as string,
    sizes: sizesArray,
    categories: categoriesArray,
    minPrice: Number(minPrice),
    maxPrice: Number(maxPrice),
    page: Number(page),
    limit: Number(limit),
  });


  return (
    <main>
      <div className="container">
        <ProductCatalogSection products={products}/>
      </div>
    </main>
  );
}