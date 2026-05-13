import { Star } from "lucide-react";
import { ProductComment } from "../../types";

interface Props {
    comment: ProductComment;
}

export default function ReviewItem({ comment }: Props) {
    const avatarLetter = comment.userName ? comment.userName.charAt(0).toUpperCase() : "U";
    
    // Format date gracefully
    const formattedDate = new Date(comment.createdAt).toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });

    return (
        <div className="flex gap-4 py-6 border-b border-gray-100 last:border-0">
            {/* Avatar */}
            <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex flex-col items-center justify-center text-white font-bold text-lg shadow-sm border border-purple-200">
                    {avatarLetter}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <h4 className="font-bold text-gray-800">{comment.userName}</h4>
                    <span className="text-xs text-gray-400">{formattedDate}</span>
                </div>
                
                <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                            key={star} 
                            className={`w-3.5 h-3.5 ${star <= comment.stars ? "fill-purple-500 text-purple-500" : "fill-gray-200 text-gray-200"}`} 
                        />
                    ))}
                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded ml-2 flex items-center gap-1 hidden sm:inline-flex">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        Đã mua tại TechMart
                    </span>
                </div>
                
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                    {comment.content}
                </p>
                
                <div className="mt-4 flex items-center gap-4 text-xs text-gray-400 font-medium">
                    <button className="hover:text-purple-600 transition-colors">Hữu ích</button>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <button className="hover:text-gray-700 transition-colors">Thảo luận</button>
                </div>
            </div>
        </div>
    );
}
