import { Header } from "@/components/Header";
import { CategoryBar } from "../../../../components/CategoryBar";
import { BrandFilter } from "../components/BrandFilter";
import { useState, useEffect, useMemo } from "react";
import { ProductSection } from "../components/ProductSection";
import { ProductAPI } from "../api/productApi";
import { Footer } from "@/components/Footer";
import { Product } from "../types";
import { SlidersHorizontal, X } from "lucide-react";

const SORT_OPTIONS = [
  { value: 'default', label: 'Mặc định' },
  { value: 'price_asc', label: 'Giá thấp đến cao' },
  { value: 'price_desc', label: 'Giá cao đến thấp' },
  { value: 'rating', label: 'Đánh giá cao nhất' },
];

export const ProductListPage = () => {
    const [filteredBrand, setFilteredBrand] = useState<number | null>(null);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // Filter panel state
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');
    const [sortBy, setSortBy] = useState('default');
    const [appliedMin, setAppliedMin] = useState<number | null>(null);
    const [appliedMax, setAppliedMax] = useState<number | null>(null);
    const [appliedSort, setAppliedSort] = useState('default');

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const categories = ['dien-thoai', 'laptop', 'may-tinh-bang', 'phu-kien', 'am-thanh'];
                const results = await Promise.all(categories.map(c => ProductAPI.getByCategory(c)));
                setAllProducts(results.flat());
            } catch (error) {
                console.error("Lỗi khi lấy sản phẩm:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Lọc và sort sản phẩm theo brand + giá + sort
    const filteredProducts = useMemo(() => {
        let result = [...allProducts];

        if (filteredBrand !== null) {
            result = result.filter(p => p.brandId === filteredBrand);
        }
        if (appliedMin !== null) {
            result = result.filter(p => p.price >= appliedMin);
        }
        if (appliedMax !== null) {
            result = result.filter(p => p.price <= appliedMax);
        }
        if (appliedSort === 'price_asc') result.sort((a, b) => a.price - b.price);
        else if (appliedSort === 'price_desc') result.sort((a, b) => b.price - a.price);
        else if (appliedSort === 'rating') result.sort((a, b) => (b.rating || 0) - (a.rating || 0));

        return result;
    }, [allProducts, filteredBrand, appliedMin, appliedMax, appliedSort]);

    // Nhóm lại theo danh mục để hiển thị section
    const categoryMap: Record<number, string> = { 1: 'Điện thoại', 2: 'Laptop', 3: 'Máy tính bảng', 4: 'Phụ kiện', 5: 'Âm thanh' };
    const grouped = useMemo(() => {
        const map = new Map<number, Product[]>();
        filteredProducts.forEach(p => {
            if (!map.has(p.categoryId)) map.set(p.categoryId, []);
            map.get(p.categoryId)!.push(p);
        });
        return map;
    }, [filteredProducts]);

    const handleApplyFilter = () => {
        setAppliedMin(priceMin ? Number(priceMin) * 1_000_000 : null);
        setAppliedMax(priceMax ? Number(priceMax) * 1_000_000 : null);
        setAppliedSort(sortBy);
        setIsPanelOpen(false);
    };

    const handleResetFilter = () => {
        setPriceMin(''); setPriceMax(''); setSortBy('default');
        setAppliedMin(null); setAppliedMax(null); setAppliedSort('default');
        setIsPanelOpen(false);
    };

    const hasActiveFilter = appliedMin !== null || appliedMax !== null || appliedSort !== 'default';

    return (
        <div>
            <Header />
            <CategoryBar />
            <div>
                <BrandFilter
                    activeBrand={filteredBrand}
                    onBrandChange={(brandId) => setFilteredBrand(brandId)}
                    onFilterClick={() => setIsPanelOpen(true)}
                    hasActiveFilter={hasActiveFilter}
                />
            </div>

            {/* Filter Slide-in Panel */}
            {isPanelOpen && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsPanelOpen(false)} />
                    <div className="relative bg-white w-80 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h2 className="text-lg font-black text-gray-900">Bộ lọc sản phẩm</h2>
                            <button onClick={() => setIsPanelOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                                <X size={20} className="text-gray-500" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            {/* Khoảng giá */}
                            <div>
                                <h3 className="text-sm font-black text-gray-700 uppercase tracking-widest mb-4">Khoảng giá (triệu đồng)</h3>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="number"
                                        placeholder="Từ"
                                        value={priceMin}
                                        onChange={e => setPriceMin(e.target.value)}
                                        className="w-full border-2 border-gray-100 rounded-xl px-4 py-2.5 text-sm font-medium focus:border-blue-500 outline-none"
                                        min="0"
                                    />
                                    <span className="text-gray-400 font-bold">—</span>
                                    <input
                                        type="number"
                                        placeholder="Đến"
                                        value={priceMax}
                                        onChange={e => setPriceMax(e.target.value)}
                                        className="w-full border-2 border-gray-100 rounded-xl px-4 py-2.5 text-sm font-medium focus:border-blue-500 outline-none"
                                        min="0"
                                    />
                                </div>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {[{label:'<5 triệu', min:'', max:'5'},{label:'5-10 triệu', min:'5', max:'10'},{label:'10-20 triệu', min:'10', max:'20'},{label:'>20 triệu', min:'20', max:''}].map(r => (
                                        <button key={r.label} onClick={() => {setPriceMin(r.min); setPriceMax(r.max);}}
                                            className={`px-3 py-1.5 text-xs font-bold rounded-full border-2 transition-all ${priceMin === r.min && priceMax === r.max ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-100 text-gray-600 hover:border-gray-200'}`}>
                                            {r.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sắp xếp */}
                            <div>
                                <h3 className="text-sm font-black text-gray-700 uppercase tracking-widest mb-4">Sắp xếp theo</h3>
                                <div className="space-y-2">
                                    {SORT_OPTIONS.map(opt => (
                                        <button key={opt.value} onClick={() => setSortBy(opt.value)}
                                            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all border-2 ${sortBy === opt.value ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-100 text-gray-600 hover:border-gray-200 hover:bg-gray-50'}`}>
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-100 flex gap-3">
                            <button onClick={handleResetFilter} className="flex-1 py-3 border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all text-sm">
                                Đặt lại
                            </button>
                            <button onClick={handleApplyFilter} className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all text-sm shadow-lg shadow-blue-200">
                                Áp dụng
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="px-4 sm:px-10 py-8 max-w-screen-2xl mx-auto">
                {loading ? (
                    <div className="flex justify-center items-center py-24">
                        <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
                    </div>
                ) : grouped.size === 0 ? (
                    <div className="text-center py-24">
                        <p className="text-2xl font-black text-gray-300 mb-2">Không tìm thấy sản phẩm</p>
                        <p className="text-gray-400 text-sm">Thử thay đổi bộ lọc của bạn</p>
                        <button onClick={() => { setFilteredBrand(null); handleResetFilter(); }} className="mt-6 px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-sm">
                            Xoá bộ lọc
                        </button>
                    </div>
                ) : (
                    <>
                        {[1, 2, 3, 4, 5].map(catId => {
                            const products = grouped.get(catId);
                            if (!products || products.length === 0) return null;
                            return <ProductSection key={catId} title={categoryMap[catId]} products={products} />;
                        })}
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
}