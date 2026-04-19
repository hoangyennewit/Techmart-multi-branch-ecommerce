import {Header} from "../../../components/Header";
import {CategoryBar} from "../../../components/CategoryBar";
import {ProductCard} from "../../../components/product/ProductCard";
import {Product} from "../../products/types";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {productApi} from "../../products/api/productApi";

export const CategoryPage = () => {
    const {slug} = useParams<{slug: string}>();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const data = await productApi.getByCategory(slug || "");
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
        <div>
            <Header />
            <CategoryBar />
            <main className="">
                {loading ? (
                    <div className="text-center py-10">Đang tải...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                        {products.length > 0 ? (
                            products.map((item) => (
                                <ProductCard key={item.id} product={item} />
                            ))
                        ) : (
                            <div className="text-center py-10">Không có sản phẩm nào trong danh mục này.</div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};