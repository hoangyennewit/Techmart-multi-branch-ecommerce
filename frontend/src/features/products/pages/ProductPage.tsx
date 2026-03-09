import {useParams} from "react-router-dom";
import {Header} from "../../../components/Header";
import {ProductSpecs} from "../components/ProductSpecs";
import { products } from "../../../data/products";
import {ProductComments} from "../components/ProductComments/ProductComments";
import { ProductGallery } from "../components/ProductGallery/ProductGallery";
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
            <div className="min-h-screen bg-gray-100">
                {/* Sản phẩm */}
                <div className="p-50 rounded-lg mt-20 max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
                    <div className="max-w-4xl mx-auto mt-1 p-10 bg-white rounded-lg border-gray-300 border-2 shadow-md">
                        <ProductGallery images={product.images} />
                    </div>
                {/* Chi tiết thông số sản phẩm */}
                    <div className="flex-1 mt-1 p-10 bg-white rounded-lg border-gray-300 border-2 shadow-md">
                        {product && <ProductSpecs product={product} />}
                    </div>
                </div>

                {/* Bình Luận */}
                <div className="bg-stone-300 p-50 rounded-lg mt-20 max-w-7xl mx-auto">
                    {product && <ProductComments product={product} />}
                </div>
            </div>
        </div>
    );
};