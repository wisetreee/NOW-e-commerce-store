"use client";
import { Category } from "@/sanity.types";
import { imageUrl } from "@/sanity/lib/imageUrl";
import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC <CategoryCardProps> = ({ category }) => {
  return (
    <Link href={`/catalog?categories=${category.slug?.current}`}>
        <div className="relative w-full aspect-[4/7] bg-white brightness-95 mb-2 hover:brightness-90 duration-300 ease-in-out">
          {category.image && (
            <Image
              alt="Logo"
              src={imageUrl(category.image).url()}
              fill

            />
          )}
        </div>
        <h2 className="font-semibold text-content_1">{category.title}</h2>
    </Link>
  );
};

export default CategoryCard;