import { Product } from "@/sanity.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface BasketItem {
    product: Product;
    size: number;
    quantity: number;
   
}

interface BasketState {
    items: BasketItem[];
    addItem: (newItem: BasketItem) => void;
    removeItem: (newItem: BasketItem) => void;
    addSingleItem: (targetItem: BasketItem) => void;
    removeSingleItem: (targetItem: BasketItem) => void;
    clearBasket: () => void;
    getTotalPrice: () => number;
    getTotalQuantity: () => number;
    getItemCount: (productId: string) => number;
    getGroupedItems: () => BasketItem[];

}

const useBasketStore = create<BasketState>() (
    persist (
        (set, get) => ({
            items: [],
            addItem: (newItem) => set((state) => {
                const existingItem = state.items.find(item => item.product._id === newItem.product._id && item.size == newItem.size);
                if (existingItem) {
                    return {
                        items: state.items.map (item => 
                            item.product._id === newItem.product._id && item.size == newItem.size
                             ? {...item, quantity: item.quantity + newItem.quantity}
                             : item
                        )
                    };
                } else {
                    return {items: [...state.items, newItem]};
                }
            }),
            removeItem: (targetItem) =>
                set((state) => ({
                  items: state.items.filter(
                    (item) => !(item.product._id === targetItem.product._id && item.size === targetItem.size)
                  ),
                })),
            addSingleItem: (targetItem) =>
                set((state) => ({
                  items: state.items.map((item) =>
                    item.product._id === targetItem.product._id && item.size === targetItem.size
                      ? { ...item, quantity: item.quantity + 1 }
                      : item
                  ),
                })),
                removeSingleItem: (targetItem) =>
                    set((state) => ({
                      items: state.items
                        .map((item) =>
                          item.product._id === targetItem.product._id && item.size === targetItem.size
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                        )
                        .filter((item) => item.quantity > 0), // Удаляем товар, если количество стало 0
                    })),
             clearBasket: () => set({items: [] }),
             getTotalPrice: () => {
                 return get().items.reduce((total, item) => total + (item.product.price ?? 0) * item.quantity, 0);
             },
             getTotalQuantity: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
              },
             getItemCount: (productId) => {
                const item = get().items.find(item => item.product._id === productId);
                return item ? item.quantity : 0;
             },
             getGroupedItems: () => get().items,
        }),    
      {
            name: "basket-store",
        }
    )
);

export default useBasketStore;