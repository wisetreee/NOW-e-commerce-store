"use client";

import { Product } from '@/sanity.types';
import React, { useState } from 'react'
import IconButton from './IconButton';
import { notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import { imageUrl } from '@/sanity/lib/imageUrl';
import SizeGrid from './SizesGrid';
import { PortableText } from 'next-sanity';


interface ProductPageSectionProps {
    product: Product;
  }

const ProductPageSection: React.FC<ProductPageSectionProps> = ({ product }) => {
  const router = useRouter();
  const [selectedSize, setselectedSize] = useState<number[]>([]);
  const [selectedQuantity, setSelectedQuantity] = useState(0);

  const increaseQuantity = (selectedQuantity: number) => {
    setSelectedQuantity (selectedQuantity+1);
  }
  const decreaseQuantity = (selectedQuantity: number) => {
    if (selectedQuantity > 0) {
      setSelectedQuantity (selectedQuantity-1);
    }
    else {
      return;
    }
  }



  if (!product) {
    return notFound();
  }

  return (
    <section className="mt-4">
        <IconButton src="/turn-back.svg" theme="light" onClick={() => router.back()}/>
       <div className="mb-4 flex flex-col sm:flex-row gap-4 items-top">
              <div className='left'>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                <SizeGrid selectedSizes={selectedSize} onSizeChange={setselectedSize}/>
                <div className='flex gap-4 mt-4 items-center'>
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