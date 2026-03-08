import {useState} from "react";
import {Star} from "lucide-react";

export default function ReviewForm({onSubmit}: {onSubmit: (data: {comment: string; rating: number}) => void}) {
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!rating || !comment) {
            alert("Vui lòng nhập đầy đủ thông tin đánh giá");
            return;
        }
        onSubmit({comment, rating});
        setComment("");
        setRating(0);
    }
    return (
        <form onSubmit = {handleSubmit} className="space-y-4">
            {/* Ten Nguoi dung danh gia */} 
            <div className = "flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={24} 
                    className={`cursor-pointer ${star <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} 
                    onClick={() => setRating(star)} />
                ))}
            </div>
            <textarea
                value = {comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder = "Viết đánh giá của bạn tại đây..."
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="text-right">
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Gửi đánh giá
                </button>
            </div>
        </form>
    );
};
