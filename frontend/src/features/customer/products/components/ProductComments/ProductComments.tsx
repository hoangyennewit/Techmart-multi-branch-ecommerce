import { useEffect, useState } from "react";
import { Product, ProductComment } from "../../types";
import ReviewForm from "./ReviewForm";
import RatingSummary from "./RatingSumary";
import ReviewFilter from "./ReviewFilter";
import ReviewItem from "./ReviewItem";
import { MessageSquare, LogIn } from "lucide-react";
import { ProductAPI } from "../../api/productApi";
import { useAuth } from "../../../../auth/store/AuthContext";
import { Link } from "react-router-dom";

type Props = {
    product: Product;
};

export const ProductComments = ({ product }: Props) => {
    const { isAuthenticated, user } = useAuth();
    const [comments, setComments] = useState<ProductComment[]>([]);
    const [filterRating, setFilterRating] = useState<number>(0);

    const fetchReviews = async () => {
        if (!product.id) return;
        try {
            const data = await ProductAPI.getReviews(product.id);
            setComments(data || []);
        } catch (error) {
            console.error("Lỗi khi tải đánh giá:", error);
        }
    };

    useEffect(() => {
        fetchReviews();
        setFilterRating(0);
    }, [product.id]);
    
    const totalReviews = comments.length;
    
    // Calculate Average Rating
    const averageRating = totalReviews > 0
        ? comments.reduce((acc, curr) => acc + curr.stars, 0) / totalReviews
        : 0;

    // Calculate Counts per Star
    const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    comments.forEach(c => {
        if (counts[c.stars] !== undefined) {
            counts[c.stars]++;
        }
    });

    // Handle posting new review
    const handleAddReview = async (data: { comment: string; rating: number }) => {
        if (!isAuthenticated) {
            alert("Bạn cần đăng nhập để đánh giá sản phẩm này.");
            return;
        }
        
        try {
            const newReview = await ProductAPI.addReview(product.id, {
                ma_nguoi_dung: user?.id,
                noi_dung: data.comment,
                so_sao: data.rating
            });
            // Tải lại danh sách đánh giá sau khi thêm
            fetchReviews();
        }
        catch (error) {
            console.error("Lỗi khi thêm đánh giá mới:", error);
            alert("Đã xảy ra lỗi khi gửi đánh giá. Vui lòng thử lại sau.");
        }
    };

    // Filter comments
    const filteredComments = filterRating === 0
        ? comments
        : comments.filter(c => c.stars === filterRating);

    return (
        <div className="w-full max-w-4xl bg-white rounded-2xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h2 className="text-2xl font-bold mb-8 text-gray-800 flex items-center gap-2">
                Đánh giá & Nhận xét
                <span className="text-sm font-semibold bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                    {totalReviews}
                </span>
            </h2>

            {/* Thống kê Tổng quan */}
            <RatingSummary 
                comments={comments} 
                averageRating={averageRating} 
                totalReviews={totalReviews} 
            />

            {/* Form Gửi Đánh Giá */}
            {isAuthenticated ? (
                <div className="mb-10 bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-purple-600" />
                        Viết đánh giá của bạn
                    </h3>
                    <ReviewForm onSubmit={handleAddReview} />
                </div>
            ) : (
                <div className="mb-10 bg-gray-50 p-6 rounded-xl border border-gray-100 text-center">
                    <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="font-bold text-gray-800 mb-2">Đăng nhập để đánh giá</h3>
                    <p className="text-gray-500 mb-4 text-sm">Vui lòng đăng nhập để chia sẻ cảm nhận của bạn về sản phẩm này.</p>
                    <Link to="/login" className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                        <LogIn className="w-4 h-4" />
                        Đăng nhập ngay
                    </Link>
                </div>
            )}

            {/* Filter Section */}
            {totalReviews > 0 && (
                <ReviewFilter 
                    activeFilter={filterRating} 
                    onFilterChange={setFilterRating}
                    totalReviews={totalReviews}
                    counts={counts}
                />
            )}

            {/* Danh sách Comments */}
            <div className="space-y-2">
                {totalReviews === 0 ? (
                    <div className="py-12 text-center">
                        <MessageSquare className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                        <p className="text-gray-500 font-medium">Chưa có đánh giá nào cho sản phẩm này.</p>
                        <p className="text-sm text-gray-400 mt-1">Hãy là người đầu tiên chia sẻ cảm nhận của bạn nhé!</p>
                    </div>
                ) : filteredComments.length === 0 ? (
                    <div className="py-10 text-center text-gray-500">
                        Không có đánh giá nào khớp với bộ lọc {filterRating} sao.
                    </div>
                ) : (
                    filteredComments.map((comment) => (
                        <ReviewItem key={comment.id} comment={comment} />
                    ))
                )}
            </div>
        </div>
    );
};
