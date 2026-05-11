import { ArrowLeft } from "lucide-react";

const formatPrice = (price: number) => price.toLocaleString("vi-VN") + "đ";

// Định nghĩa kiểu dữ liệu cho sản phẩm trong giỏ hàng
export interface CartItemType {
    id: string;
    name: string;
    price: number;
    color: string;
    quantity: number;
    imageUrl: string;
}

interface OrderSummaryProps {
    items: CartItemType[];
    total: number;
    shippingFee: number;
    grandTotal: number;
    formId: string; // Nhận ID của form để kích hoạt nút Submit
}

export const OrderSummary = ({ items, total, shippingFee, grandTotal, formId }: OrderSummaryProps) => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-lg font-bold text-gray-800 mb-5 pb-4 border-b border-gray-100">
                Tóm tắt đơn hàng
            </h2>

            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                    <div key={`${item.id}-${item.color}`} className="flex gap-3">
                        <div className="relative w-16 h-16 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
                            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain p-1" />
                            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gray-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                                {item.quantity}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-800 line-clamp-2 leading-tight mb-1">{item.name}</h4>
                            <p className="text-xs text-gray-500 mb-1">Màu: {item.color}</p>
                            <p className="text-sm font-bold text-gray-800">{formatPrice(item.price)}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="space-y-3 text-sm pb-4 border-b border-gray-100">
                <div className="flex justify-between text-gray-500">
                    <span>Tạm tính ({items.reduce((s, i) => s + i.quantity, 0)} sp)</span>
                    <span className="text-gray-800 font-medium">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                    <span>Phí vận chuyển</span>
                    <span className="text-gray-800 font-medium">{formatPrice(shippingFee)}</span>
                </div>
            </div>

            <div className="py-5 flex justify-between items-center">
                <span className="font-bold text-gray-800 text-base">Tổng cộng</span>
                <span className="text-2xl font-black text-purple-600">
                    {formatPrice(grandTotal)}
                </span>
            </div>

            {/* Nút Submit này liên kết với form bên ShippingForm qua thuộc tính form={formId} */}
            <button
                type="submit"
                form={formId} 
                className="w-full bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-bold py-4 rounded-2xl text-lg uppercase tracking-wide shadow-lg shadow-purple-200 transition-all duration-150 flex justify-center items-center gap-2"
            >
                Đặt hàng
                <ArrowLeft className="w-5 h-5 rotate-180" />
            </button>
        </div>
    );
};
