import {useParams} from "react-router-dom";
import {Header} from "../../../components/Header";
import {ProductSpecs} from "../components/ProductSpecs";
import { products } from "../../../data/products";
import {ProductComments} from "../components/ProductComments";
export const ProductPage = () => {
    const {id} = useParams();
    const product = products.find((p) => p.id === id);
    if (!product) {
        return <div className="text-center mt-20 text-2xl font-bold">Sản phẩm không tồn tại</div>;
    }
    return (
        <div>
            <div>
                <Header />
            </div>
            <div>
                {/* Sản phẩm */}
                <div>
                    <div>
                    </div>
                </div>
                {/* Chi tiết thông số sản phẩm */}
                <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg border-orange-300 border-2 shadow-md">
                    {product && <ProductSpecs product={product} />}
                </div>
                {/* Bình Luận */}
                <div className="bg-stone-300 p-50 rounded-lg mt-20 max-w-7xl mx-auto">
                    {product && <ProductComments product={product} />}
                </div>
            </div>
        </div>
    );
};