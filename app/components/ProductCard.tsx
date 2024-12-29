import { Product } from "@/sanity.types";
import { imageUrl } from "@/sanity/lib/imageUrl";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`/product/${product.slug?.current}`}>
        <div className="img-container">
            {product.image &&(
        <Image
            alt="Logo"
            src={imageUrl(product.image).url()} 
            width={300}
            height={300}
        />
            )}
        </div>
      <h1>{product.name}</h1>
    </Link>
  );
};

export default ProductCard;