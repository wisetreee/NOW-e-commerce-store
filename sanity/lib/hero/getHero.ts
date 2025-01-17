import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live";

export const getHero = async() => {

    const HERO_QUERY = defineQuery(`*[ _type == "hero" ][0]`);
        
        try {
            const hero = await sanityFetch({
                query: HERO_QUERY,
            });
            return hero.data || undefined;
            } catch (error) {
                console.error ('Ошибка при запросе данных для шапки сайта:', error);
                return [];
            }
};