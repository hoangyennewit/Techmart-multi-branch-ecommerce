import {useNavigate} from "react-router-dom";
import { ProductCard } from "../../../components/product/ProductCard";
import {Product} from "../../products/types";
type Props = {
    products: Product[];
};
export const FeaturedProducts = ({products}: Props) => {
    const navigate = useNavigate();
    const featuredProducts = products.slice(0, 12);
    return (
        <section>
            <div>
                <h2 className="text-xl font-bold text-center text-amber-50 bg-orange-600 p-3 px-20 max-w-xl 
                transition-all whitespace-nowrap shadow-sm uppercase rounded-r-full">Sản phẩm nổi bật</h2>
            </div>
            <div
                className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-5 px-40">
                {featuredProducts.map((item) => (
                    <div key={item.id} onClick={() => navigate(`/products/${item.id}`)}>
                        <ProductCard product={item} />
                    </div>
                ))}
            </div>
        </section>
    )
};