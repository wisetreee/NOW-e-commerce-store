import { GetPopularCategories } from "@/sanity/lib/categories/getPopularCategories";
import CategoriesGrid from "../common/CategoriesGrid";

const PopularCategoriesSection = async () => {
    const categories = await GetPopularCategories();
  return (
    <section className="mb-16">
        <div className="container">
        <h1 className="mb-4">Популярное</h1>
          <CategoriesGrid categories={categories}/>
        </div>
    </section>
  );
};

export default PopularCategoriesSection;