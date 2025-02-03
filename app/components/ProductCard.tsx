"use client";
import { Product } from "@/sanity.types";
import { imageUrl } from "@/sanity/lib/imageUrl";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`/catalog/${product.slug?.current}`} className=" w-full ">
        <div className="relative w-full aspect-w-1 aspect-h-1 bg-white brightness-95 mb-2 hover:brightness-90 duration-300 ease-in-out">
          {product.image && (
            <Image
              alt="Logo"
              src={imageUrl(product.image).url()}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-scale-down"
            />
          )}
        </div>
        <h2 className="font-semibold text-content_1">{product.name}</h2>
        <h3 className="font-regular text-sm text-content_3">{product.type}</h3>
        <h3 className="font-semibold  text-sm text-content_1">{product.price} ₽</h3>
    </Link>
  );
};

export default ProductCard;