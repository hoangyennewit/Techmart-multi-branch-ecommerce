import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ProductAPI } from "../../products/api/productApi";
import type { Product } from "../../products/types";
import { ProductCard } from "../../../components/product/ProductCard";
import { ChevronLeft } from "lucide-react";

export const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchTerm = searchParams.get("q") || "";

  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchTerm.trim()) {
        setError("Vui lòng nhập từ khóa tìm kiếm");
        setResults([]);
        return;
      }

      setLoading(true);
      setError("");
      try {
        const data = await ProductAPI.search(searchTerm);
        setResults(data);
        if (data.length === 0) {
          setError(`Không tìm thấy sản phẩm nào cho "${searchTerm}"`);
        }
      } catch (err) {
        setError("Có lỗi xảy ra khi tìm kiếm");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Quay lại"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Kết quả tìm kiếm
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {searchTerm && `"${searchTerm}"`}
                {results.length > 0 && ` - ${results.length} sản phẩm`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin">
              <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full"></div>
            </div>
            <span className="ml-3 text-gray-600">Đang tìm kiếm...</span>
          </div>
        ) : error && results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {error}
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Thử tìm kiếm từ khác hoặc về trang chủ để xem sản phẩm nổi bật
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/")}
                className="px-6 py-2.5 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
              >
                Về trang chủ
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

