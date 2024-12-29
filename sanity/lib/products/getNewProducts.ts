import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live";

export const getNewProducts = async() => {

    const NEW_PRODUCTS_QUERY = defineQuery(`
        *[
        _type == "product"
        ] | order(_createdAt desc) [0..10]     
        `);
        
        try {
            const products = await sanityFetch({
                query: NEW_PRODUCTS_QUERY,
            });
            return products.data || [];
            } catch (error) {
                console.error ('Ошибка при запросе новых товаров:', error);
                return [];
            }
};