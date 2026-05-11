import {useState} from "react";
import {Star} from "lucide-react";

export default function ReviewForm({onSubmit}: {onSubmit: (data: {comment: string; rating: number}) => void}) {
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!rating || !comment.trim()) {
            alert("Vui lòng chọn số sao và nhập nội dung đánh giá của bạn.");
            return;
        }
        onSubmit({comment, rating});
        setComment("");
        setRating(0);
    }
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-700">Chất lượng sản phẩm:</span>
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                            key={star} 
                            className={`w-7 h-7 cursor-pointer transition-colors ${star <= rating ? "fill-orange-500 text-orange-500 hover:scale-110" : "fill-gray-200 text-gray-200 hover:fill-orange-200"}`} 
                            onClick={() => setRating(star)} 
                        />
                    ))}
                </div>
                {rating > 0 && <span className="text-sm font-medium text-orange-600 ml-2 animate-pulse">{rating} Sao</span>}
            </div>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Mời bạn chia sẻ thêm cảm nhận về sản phẩm..."
                rows={3}
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all resize-none shadow-inner"
            />
            <div className="flex justify-end">
                <button 
                    type="submit"
                    disabled={!rating || !comment.trim()}
                    className="px-6 py-2.5 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 shadow-md shadow-orange-200 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Gửi đánh giá
                </button>
            </div>
        </form>
    );
};

