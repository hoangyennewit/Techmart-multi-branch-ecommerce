import { Header } from "@/components/Header";
import { CategoryBar } from "../../../../components/CategoryBar";
import { BrandFilter } from "../components/BrandFilter";
import { useState, useEffect } from "react";
import { ProductSection } from "../components/ProductSection";
import { ProductAPI } from "../api/productApi";
import { Footer } from "@/components/Footer";

export const ProductListPage = () => {
    const [filteredBrand, setFilteredBrand] = useState<string | null>(null);
    
    //Trạng thái lọc thương hiệu hiện tại
    const [phoneProducts, setPhoneProducts] = useState<any[]>([]);
    const [laptopProducts, setLaptopProducts] = useState<any[]>([]);
    const [tabletProducts, setTabletProducts] = useState<any[]>([]);
    const [accessoryProducts, setAccessoryProducts] = useState<any[]>([]);
    const [audioProducts, setAudioProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    //lấy sản phẩm cho mỗi danh mục
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                // Fetch 6 products from each category
                const phones = await ProductAPI.getByCategory("dien-thoai");
                const laptops = await ProductAPI.getByCategory("laptop");
                const tablets = await ProductAPI.getByCategory("may-tinh-bang");
                const accessories = await ProductAPI.getByCategory("phu-kien");
                const audio = await ProductAPI.getByCategory("am-thanh");

                // Set only first 6 products for each category
                setPhoneProducts(phones.slice(0, 6));
                setLaptopProducts(laptops.slice(0, 6));
                setTabletProducts(tablets.slice(0, 6));
                setAccessoryProducts(accessories.slice(0, 6));
                setAudioProducts(audio.slice(0, 6));
            } catch (error) {
                console.error("Lỗi khi lấy sản phẩm:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <Header />
            <CategoryBar />
            <div>
                <BrandFilter onBrandChange={(brandId) => setFilteredBrand(brandId)} />
            </div>
            <div className="px-4 sm:px-10 py-8 max-w-screen-2xl mx-auto">
                {!loading && (
                    <>
                        {phoneProducts.length > 0 && <ProductSection title="Điện thoại" products={phoneProducts} />}
                        {laptopProducts.length > 0 && <ProductSection title="Laptop" products={laptopProducts} />}
                        {tabletProducts.length > 0 && <ProductSection title="Máy tính bảng" products={tabletProducts} />}
                        {accessoryProducts.length > 0 && <ProductSection title="Phụ kiện" products={accessoryProducts} />}
                        {audioProducts.length > 0 && <ProductSection title="Âm thanh" products={audioProducts} />}
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
}