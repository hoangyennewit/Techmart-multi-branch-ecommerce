import { Star } from "lucide-react";
import { ProductComment } from "../../types";

type Props = {
    comments: ProductComment[];
    averageRating: number;
    totalReviews: number;
};

export default function RatingSummary({ comments, averageRating, totalReviews }: Props) {
    // Tinh phân bổ (%)
    const getDistribution = (star: number) => {
        if (totalReviews === 0) return 0;
        const count = comments.filter((c) => c.stars === star).length;
        return (count / totalReviews) * 100;
    };
    
    // Tinh số lượng review ứng với số sao
    const getCount = (star: number) => {
        return comments.filter((c) => c.stars === star).length;
    };

    return (
        <div className="flex flex-col md:flex-row items-center gap-8 mb-8 pb-8 border-b border-gray-100">
            {/* Left: Tóm tắt điểm */}
            <div className="flex flex-col items-center justify-center w-full md:w-1/3">
                <span className="text-5xl font-extrabold text-purple-600 mb-2">
                    {averageRating.toFixed(1)}
                </span>
                <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                            key={star} 
                            className={`w-6 h-6 ${star <= Math.round(averageRating) ? "fill-purple-500 text-purple-500" : "fill-gray-200 text-gray-200"}`} 
                        />
                    ))}
                </div>
                <span className="text-gray-500 text-sm">{totalReviews} đánh giá</span>
            </div>

            {/* Right: Phân bổ */}
            <div className="w-full md:w-2/3 flex flex-col gap-2">
                {[5, 4, 3, 2, 1].map((star) => {
                    const percent = getDistribution(star);
                    return (
                        <div key={star} className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-700 w-12 flex items-center justify-end gap-1">
                                {star} <Star className="w-3.5 h-3.5 fill-gray-400 text-gray-400" />
                            </span>
                            <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-purple-500 rounded-full transition-all duration-500"
                                    style={{ width: `${percent}%` }}
                                ></div>
                            </div>
                            <span className="text-xs text-gray-400 w-10">{getCount(star)}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

