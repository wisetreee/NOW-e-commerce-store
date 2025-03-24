import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live";

export const GetPopularCategories = async() => {

    const POPULAR_CATEGORIES_QUERY = defineQuery(`*[ _type == "category" ][0..3] `);
        
        try {
            const categories = await sanityFetch({
                query: POPULAR_CATEGORIES_QUERY,
            });
            return categories.data || undefined;
            } catch (error) {
                console.error ('Ошибка при запросе данных для популярных категорий:', error);
                return [];
            }
};