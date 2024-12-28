import { Product } from "@/sanity.types"




const ProductCard = (product: Product ) => {
    return <div>
        <h1>{product.name}</h1>
    </div>
}

export default ProductCard;