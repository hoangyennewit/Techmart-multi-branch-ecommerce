import {Header} from "../../../../components/Header";
import {PromoBanner} from "../components/PromoBanner";
import {CategoryBar} from "../../../../components/CategoryBar";
import {FeaturedProducts} from "../components/FeaturedProducts";
import {Footer} from "../../../../components/Footer";
import { useState, useEffect } from "react";
import { ProductAPI } from "../../products/api/productApi";
import { Product } from "../../products/types";

export const HomePage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const realProducts = await ProductAPI.getAll();
                setProducts(realProducts);
            }
            catch (error) {
                console.error("Lỗi khi lấy sản phẩm từ API:", error);
            }
            finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <PromoBanner products={products}/>
                <CategoryBar />
                {isLoading ? (
                    <div className="text-center py-20 text-gray-500">
                        Đang tải dữ liệu sản phẩm...
                    </div>
                ) : (
                    <FeaturedProducts products={products}/>
                )}
            </main>
            <Footer />
        </div>
    );
};