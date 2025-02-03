import { sanityFetch } from "../live";
import { defineQuery } from "next-sanity"
export async function getFilteredProducts({
  query = "",
  gender = "",
  sizes = [],
  categories = [],
  minPrice = 0,
  maxPrice = 0,
  page = 1,
  limit = 10,
}: {
  query?: string;
  gender?: string;
  sizes?: number[];
  categories: string[];
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}) {

  // Проверка на наличие максимальной цены
  let resolvedMaxPrice = maxPrice;
  if (maxPrice === 0) {
    const maxPriceQuery = `
      *[_type == "product"] | order(price desc)[0].price
    `;
    const highestPrice = await sanityFetch({ query: maxPriceQuery });
    resolvedMaxPrice = highestPrice.data || 0;
  }
  // Основной GROQ-запрос
  // count(categories[_ref in $categories[]]) > 0
  //categories[]->slug.current match $categories)
  // count($categories) == 0 || count(categories[]->slug.current[slug in $categories][0]) > 0
  // *[_type=="category" && slug.current in $categories]._id  match categories[]._ref
  const FILTERED_PRODUCTS_QUERY = defineQuery(`
    *[
      _type == "product" &&
      (name match $query || description[].children[].text match $query || $query == "") &&
      ($gender == "" || gender == $gender) &&
      ($sizes == null || defined(*[_type == "product" && _id == ^._id && count(sizes[size in $sizes]) > 0][0])) &&
      ($categories == null || count($categories) == 0 || *[_type=="category" && slug.current in $categories]._id  match categories[]._ref) &&
      price >= $minPrice &&
      price <= $maxPrice 
    ]
    | order(name asc)
    {
      _id,
      name,
      type,
      price,
      slug,
      "image": image.asset->url,
    }
  `);

  // Параметры для запроса
  const params: Record<string, unknown> = {
    query: query.toLowerCase() || "", // undefined вместо пустой строки
    gender: gender || "",
    sizes: sizes.length > 0 ? sizes : null,
    categories: categories,
    minPrice,
    maxPrice: resolvedMaxPrice,
  };

  try {
    const products = await sanityFetch({ query: FILTERED_PRODUCTS_QUERY, params });
    return products?.data || [];
  } catch (error) {
    console.error("Ошибка при запросе товаров по фильтру:", error);
    return [];
  }
}