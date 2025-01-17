import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live";

export const GetPopularCategories = async() => {

    const CATEGORIES_QUERY = defineQuery(`*[ _type == "category" ][0..3] `);
        
        try {
            const categories = await sanityFetch({
                query: CATEGORIES_QUERY,
            });
            return categories.data || undefined;
            } catch (error) {
                console.error ('Ошибка при запросе данных для популярных категорий:', error);
                return [];
            }
};