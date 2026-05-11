import { ShieldCheck, ArrowLeftRight, Truck, Headphones } from "lucide-react";

export const ShopBenefits = () => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 className="font-bold text-gray-800 text-sm uppercase">Quyền lợi mua hàng</h3>
            </div>
            <div className="p-4 space-y-4">
                <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                        <p className="font-medium text-gray-800 text-sm">Bảo hành chính hãng 12 tháng</p>
                        <p className="text-xs text-gray-500 mt-0.5">Tại các trung tâm bảo hành ủy quyền</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <ArrowLeftRight className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                    <div>
                        <p className="font-medium text-gray-800 text-sm">1 đổi 1 trong 30 ngày</p>
                        <p className="text-xs text-gray-500 mt-0.5">Nếu có lỗi phần cứng từ nhà sản xuất</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                        <p className="font-medium text-gray-800 text-sm">Giao hàng miễn phí toàn quốc</p>
                        <p className="text-xs text-gray-500 mt-0.5">Nhận hàng trong 2-3 ngày làm việc</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <Headphones className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                    <div>
                        <p className="font-medium text-gray-800 text-sm">Hỗ trợ kỹ thuật 24/7</p>
                        <p className="text-xs text-gray-500 mt-0.5">Hotline miễn phí 1800.1234</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
