import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live";

export const GetAllCategories = async() => {

    const ALL_CATEGORIES_QUERY = defineQuery(`*[ _type == "category" ]`);
        
        try {
            const categories = await sanityFetch({
                query: ALL_CATEGORIES_QUERY,
            });
            return categories.data || undefined;
            } catch (error) {
                console.error ('Ошибка при запросе данных для категорий:', error);
                return [];
            }
};