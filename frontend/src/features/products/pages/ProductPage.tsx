import {useParams} from "react-router-dom";
import {Header} from "../../../components/Header";
import {ProductSpecs} from "../components/ProductSpecs";
import { products } from "../../../data/products";
import {ProductComments} from "../components/ProductComments/ProductComments";
import { ProductGallery } from "../components/ProductGallery/ProductGallery";
import { ProductInfo } from "../components/ProductInfo";
export const ProductPage = () => {
    const {id} = useParams();
    const product = products.find((p) => p.id === id);
    if (!product) {
        return <div className="text-center mt-20 text-2xl font-bold">Sản phẩm không tồn tại</div>;
    }
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div>
                <Header />
            </div>
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
                {/* Sản phẩm */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-5 bg-white p-4 rounded-xl border border-gray-200 shadow-sm sticky top-24">
                        <ProductGallery images={product.images} />
                    </div>
                    <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <ProductInfo product={product}/>
                    </div>
                </div>

                {/* Chi tiết thông số sản phẩm */}
                <div className="mt-8 bg-white p-6 lg:p-10 rounded-xl border border-gray-200 shadow-sm">
                    {product && <ProductSpecs product={product} />}
                </div>

                {/* Bình Luận */}
                <div className="mt-8 flex flex-col items-center">
                    {product && <ProductComments product={product} />}
                </div>
            </div>
        </div>
    );
};