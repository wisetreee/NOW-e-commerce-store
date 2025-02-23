"use client";
import { imageUrl } from "@/sanity/lib/imageUrl";
import useBasketStore, { BasketItem } from "@/store/basket";
import Image from "next/image";
import Link from "next/link";
import IconButton from "../ui/IconButton";
import toast, { Toaster } from "react-hot-toast";

interface BasketProductCardProps {
  item: BasketItem;
}

const BasketProductCard: React.FC<BasketProductCardProps> = ({ item }) => {
  const {addSingleItem, removeSingleItem } = useBasketStore();
  const totalQuantity = useBasketStore((state) => state.getTotalQuantity());

  const onAddSingleItem = (item: BasketItem) => {
    if (totalQuantity + 1  > 10) {
      toast.error('В корзину нельзя добавлять больше 10 предметов');
    }
    else {
      addSingleItem(item)
    }
  }

  return (
     
    <div className="flex gap-4 align-start ">
      <Toaster/>
        <div className="relative size-32 sm:size-48 bg-white brightness-95 hover:brightness-90 duration-300 ease-in-out">
          {item.product.image && (
            <Link href={`/catalog/product/${item.product.slug?.current}`} >
              <Image
                alt="Logo"
                src={imageUrl(item.product.image).url()}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-scale-down"
              />
            </Link>
          )}
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h2 className="font-semibold text-content_1">{item.product.name}</h2>
            <h3 className="font-regular text-sm text-content_3">{item.product.type}</h3>
            <h3 className="font-semibold text-sm text-content_1">{item.product.price} ₽</h3>
            <h3 className="font-semibold text-sm text-content_1">{item.size}</h3>
            <h3 className="font-semibold text-sm text-content_1">{item.product.gender ==="male" ? "Муж." : "Жен."}</h3>
          </div>

            <div className="flex gap-2 items-center">
            <div className='bg-content_1 flex items-center p-0.2 sm:p-0.5'>
                   <IconButton src='/minus-white.svg' onClick={() => removeSingleItem(item)}/>
                 </div>
                 <div className='size-12 sm:size-16 border flex items-center justify-center'>
                     {item.quantity}
                 </div>
                 <div className='bg-content_1 flex items-center p-0.2 sm:p-0.5'>
                   <IconButton src='/plus-white.svg' onClick={() => onAddSingleItem(item)}/>
                 </div>
             </div>
        </div>
    </div>
    
  );
};

export default BasketProductCard;