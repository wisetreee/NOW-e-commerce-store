"use client";

import { Product } from '@/sanity.types';
import React, { useEffect, useState } from 'react'
import IconButton from '../ui/IconButton';
import { notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import { imageUrl } from '@/sanity/lib/imageUrl';
import SizeGrid from '../common/SizesGrid';
import { PortableText } from 'next-sanity';
import ImageSlider from '../ui/ImageSlider';
import Button from '../ui/Button';
import useBasketStore, { BasketItem } from '@/store/basket';
import toast, { Toaster } from 'react-hot-toast';

    
interface ProductPageSectionProps {
    product: Product;
  }

const ProductPageSection: React.FC<ProductPageSectionProps> = ({ product }) => {
  const router = useRouter();
  const [selectedSize, setselectedSize] = useState<number[]>([]);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [availableSizes, setAvailableSizes] = useState<number[]>([]);
  const { addItem } = useBasketStore();
  const totalQuantity = useBasketStore((state) => state.getTotalQuantity());
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    const sizes = product.sizes
      ?.filter(size => size.quantity !== undefined && size.quantity > 0 && size.size !== undefined) // Фильтруем undefined
      ?.map(size => size.size as number) // Явно указываем, что это число
      ?.sort((a, b) => a - b) || [];
  
    setAvailableSizes(sizes);
  }, [product]); // Добавляем зависимость, чтобы useEffect запускался при изменении product

  useEffect(() => {
    setIsClient(true)
  }, []);
  
  if (!isClient) {
    return null;
  }

  const increaseQuantity = (selectedQuantity: number) => {
    setSelectedQuantity (selectedQuantity+1);
  }
  const decreaseQuantity = (selectedQuantity: number) => {
    if (selectedQuantity > 1 ) {
      setSelectedQuantity (selectedQuantity-1);
    }
    else {
      return;
    }
  }

  if (!product) {
    return notFound();
  }

  const onAddInBasket = (product: Product) => {
    
    if (totalQuantity + selectedQuantity > 10) {
      toast.error('В корзину нельзя добавлять больше 10 предметов');
      return;
    }

     const basketItem: BasketItem = 
       {
         product: product,
         quantity: selectedQuantity,
         size: selectedSize[0],
       };

       try {
       addItem(basketItem);
       toast.success('Успешно добавлено!');
       }
       catch (e) {
        toast.error('Упс...Возникла какая-то ошибка! Попробуйте позже.');
        console.error(`Ошибка добавления товара в корзину: ${e}`)
        return;
       }


  }

  return (
    <section className="mt-4">
        <IconButton src="/turn-back.svg" theme="light" onClick={() => router.back()}/>
       <div className="mb-8 flex flex-col sm:flex-row gap-4 items-top">
              <div className='left'>
              <div className='w-full aspect-square sm:hidden h-80'>
                {/* TODO: исправить ImageSlider так, чтобы он по возможности был квадратным и с работающим drag */}
                    <ImageSlider 
                      images={product.gallery?.slice(0, 4)
                        .map(image => image.asset?._ref ? imageUrl(image.asset._ref).url() : null) // Проверяем `asset._ref`
                        .filter((url): url is string => url !== null) ?? []} 
                    />
                  </div>  
                <div className="hidden sm:grid sm:grid-cols-2 gap-2">      
                    
                  {product.gallery?.slice(0, 4).map((image, index) => (
                    image.asset?._ref && ( // Проверяем, есть ли asset и _ref
                      <div key={index} className="relative w-full h-full sm:size-40 md:size-56 lg:size-72 xl:size-[25rem] bg-white brightness-95 hover:brightness-90 duration-300 ease-in-out">
                        <Image 
                          src={imageUrl(image.asset._ref).url()} // Формируем URL изображения
                          alt={`Product image ${index + 1}`}
                          quality={100}
                          fill
                          priority
                          className="object-cover absolute"
                        />
                      </div>
                      )))}
                </div>
              </div>
              <div className='right flex flex-col flex-1'>
                <h1>{product.name}</h1>
                <h3 className="font-regular text-content_3">{product.type}</h3>
                <h3 className="font-semibold text-content_1 mb-4">{product.price} ₽</h3>
                <SizeGrid selectedSizes={selectedSize} onSizeChange={setselectedSize} availableSizes={availableSizes}/>
                <div className='flex gap-2 my-4 items-center'>
                        <div className='bg-content_1 flex items-center p-0.5'>
                        <IconButton src='/minus-white.svg' onClick={() => decreaseQuantity(selectedQuantity)}/>
                        </div>
                        <div className='size-16 border flex items-center justify-center'>
                          {selectedQuantity}
                        </div>
                        <div className='bg-content_1 flex items-center p-0.5'>
                        <IconButton src='/plus-white.svg' onClick={() => increaseQuantity(selectedQuantity)}/>
                        </div>
                </div>
                <Button text='Добавить в корзину' disabled={!selectedSize.length} onClick={()=>onAddInBasket(product)}/>
                <Toaster />
              </div>
        </div>
        {product.description && (
          <div className="mb-8">
            <h1>Описание</h1>
            <PortableText value={product.description}/>
          </div>
        )}                
      </section>
  )
}

export default ProductPageSection