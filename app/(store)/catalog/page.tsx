import ProductCatalogSection from "@/app/components/catalogPage/ProductCatalogSection";
import { GetAllCategories } from "@/sanity/lib/categories/getAllCategories";
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
  });

  const categoriesForFilter = await GetAllCategories();

  return (
    <main>
      <div className="container">
        <ProductCatalogSection products={products} categories={categoriesForFilter}/>
      </div>
    </main>
  );
}