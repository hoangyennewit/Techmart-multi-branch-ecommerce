import {useParams, Link} from "react-router-dom";
import {Header} from "../../../components/Header";
import {ProductSpecs} from "../components/ProductSpecs";
import {ProductComments} from "../components/ProductComments/ProductComments";
import { ProductGallery } from "../components/ProductGallery/ProductGallery";
import { ProductInfo } from "../components/ProductInfo";
import { ShopBenefits } from "../components/ShopBenefits";
import { Product } from "../../products/types";
import { ProductAPI } from "../../products/api/productApi";
import { useState, useEffect } from "react";
import { ChevronRight, Home, Star } from "lucide-react";

export const ProductPage = () => {
    const { id } = useParams<{ id: string }>();    
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    useEffect(() => {
        const fetchProduct = async () => {
            if(!id) return;
            setIsLoading(true);
            try {
                const data = await ProductAPI.getById(id);
                setProduct(data);
            }
            catch (error) {
                console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchProduct();
        window.scrollTo(0, 0);
    }, [id]);
    
    if(isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-medium">Đang tải thông tin sản phẩm...</p>
                </div>
            </div>
        );
    }
    
    if (!product) {
        return <div className="text-center mt-20 text-2xl font-bold">Sản phẩm không tồn tại</div>;
    }

    return (
        <div className="min-h-screen bg-[#F4F6F8] pb-20">
            <div>
                <Header />
            </div>

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200 shadow-sm py-3 mb-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex text-sm text-gray-500" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-2">
                            <li className="inline-flex items-center">
                                <Link to="/" className="inline-flex items-center hover:text-purple-600 transition-colors">
                                    <Home className="w-4 h-4 mr-1.5" />
                                    Trang chủ
                                </Link>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <ChevronRight className="w-4 h-4 mx-1" />
                                    <Link to="/products" className="hover:text-purple-600 transition-colors">
                                        Sản phẩm
                                    </Link>
                                </div>
                            </li>
                            <li aria-current="page">
                                <div className="flex items-center">
                                    <ChevronRight className="w-4 h-4 mx-1" />
                                    <span className="text-gray-800 font-medium line-clamp-1">{product.name}</span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Product Title Header (Mobile & Desktop) */}
                <div className="bg-white p-4 sm:p-6 rounded-t-xl border-t border-l border-r border-gray-200 shadow-sm border-b pb-4 mb-0">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 leading-tight">
                            {product.name}
                        </h1>
                        <div className="flex items-center gap-2">
                            <div className="flex text-yellow-400">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className={`w-4 h-4 ${star <= Math.round(product.rating) ? "fill-current" : "text-gray-300"}`} />
                                ))}
                            </div>
                            <span className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">
                                {product.rating} đánh giá
                            </span>
                            <span className="text-gray-300">|</span>
                            <span className="text-sm text-gray-500">Lượt bán: {product.stock * 3}</span>
                        </div>
                    </div>
                </div>

                {/* 3-Column Main Grid */}
                <div className="bg-white p-4 sm:p-6 rounded-b-xl border-l border-r border-b border-gray-200 shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* Cột 1: Hình ảnh */}
                        <div className="lg:col-span-4 sticky top-24">
                            <ProductGallery images={product.images} />
                        </div>
                        
                        {/* Cột 2: Thông tin mua hàng */}
                        <div className="lg:col-span-5">
                            {/* We pass a prop or just hide the title inside ProductInfo because we already render it above */}
                            <div className="[&_h1]:hidden">
                                <ProductInfo product={product}/>
                            </div>
                        </div>

                        {/* Cột 3: Chính sách & Thông số */}
                        <div className="lg:col-span-3 flex flex-col gap-6">
                            <ShopBenefits />
                            {product && <ProductSpecs product={product} />}
                        </div>

                    </div>
                </div>

                {/* Phần Mở rộng (Bài viết, Bình luận) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
                    <div className="lg:col-span-8">
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center">
                            {product && <ProductComments product={product} />}
                        </div>
                    </div>
                    
                    <div className="lg:col-span-4 hidden lg:block">
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-24">
                            <h3 className="font-bold text-gray-800 text-lg mb-4">Có thể bạn quan tâm</h3>
                            <div className="text-sm text-gray-500 text-center py-10 border border-dashed border-gray-300 rounded-lg">
                                Sản phẩm tương tự sẽ hiển thị ở đây
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
