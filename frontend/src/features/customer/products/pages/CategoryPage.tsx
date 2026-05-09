import {Header} from "../../../../components/Header";
import {CategoryBar} from "../../../../components/CategoryBar";
import {ProductCard} from "../../../../components/product/ProductCard";
import {Product} from "../../products/types";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductAPI } from "../../products/api/productApi";
import { Footer } from "../../../../components/Footer";

export const CategoryPage = () => {
    const {slug} = useParams<{slug: string}>();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const data = await ProductAPI.getByCategory(slug || "");
                setProducts(data);
            } catch (error) {
                console.error("Lỗi lấy sản phẩm: ", error);
            } finally {
                setLoading(false);
            }
        };
        if(slug) {
            fetchProducts();
        }
    },
    [slug]);
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <CategoryBar />
            <main className="flex-1 w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12 py-8">
                {loading ? (
                    <div className="text-center py-20 text-gray-500 font-medium">
                        Đang tải danh sách sản phẩm...
                    </div>
                    ) : products.length > 0 ?(
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {products.map((item) => (
                            <ProductCard key={item.id} product={item} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-2xl shadow-sm border border-gray-100">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-1">Không tìm thấy sản phẩm</h3>
                        <p className="text-gray-500">Chưa có sản phẩm nào trong danh mục này. Vui lòng quay lại sau.</p>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};