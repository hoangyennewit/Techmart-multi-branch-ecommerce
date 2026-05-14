import { Truck, CreditCard, Package } from "lucide-react";

export interface CheckoutFormData {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    note: string;
}

interface ShippingFormProps {
    formData: CheckoutFormData;
    paymentMethod: string;
    onChangeForm: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onChangePayment: (method: string) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    formId: string;
}

export const ShippingForm = ({ formData, paymentMethod, onChangeForm, onChangePayment, onSubmit, formId }: ShippingFormProps) => {
    return (
        <form id={formId} onSubmit={onSubmit} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
            {/* THÔNG TIN GIAO HÀNG */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                    <Truck className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Thông tin giao hàng</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                <div className="space-y-1.5">
                    <label htmlFor="fullName" className="text-sm font-semibold text-gray-700">Họ và tên <span className="text-red-500">*</span></label>
                    <input id="fullName" type="text" name="fullName" required value={formData.fullName} onChange={onChangeForm} placeholder="Nhập họ và tên" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all" />
                </div>
                <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-sm font-semibold text-gray-700">Số điện thoại <span className="text-red-500">*</span></label>
                    <input id="phone" type="tel" name="phone" required value={formData.phone} onChange={onChangeForm} placeholder="Nhập số điện thoại" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all" />
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email (Tùy chọn)</label>
                    <input id="email" type="email" name="email" value={formData.email} onChange={onChangeForm} placeholder="Nhập email để nhận thông báo đơn hàng" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all" />
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                    <label htmlFor="address" className="text-sm font-semibold text-gray-700">Địa chỉ giao hàng <span className="text-red-500">*</span></label>
                    <input id="address" type="text" name="address" required value={formData.address} onChange={onChangeForm} placeholder="Số nhà, Tên đường, Phường/Xã, Quận/Huyện, Tỉnh/Thành phố" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all" />
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                    <label htmlFor="note" className="text-sm font-semibold text-gray-700">Ghi chú (Tùy chọn)</label>
                    <textarea id="note" name="note" rows={3} value={formData.note} onChange={onChangeForm} placeholder="Ghi chú về đơn hàng..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all resize-none" />
                </div>
            </div>

            {/* PHƯƠNG THỨC THANH TOÁN */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                    <CreditCard className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Phương thức thanh toán</h2>
            </div>

            <div className="space-y-4">
                {/* COD */}
                <div onClick={() => onChangePayment("cod")} className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === "cod" ? "border-purple-600 bg-purple-50 ring-1 ring-purple-600" : "border-gray-200 hover:border-purple-200"}`}>
                    <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "cod" ? "border-purple-600" : "border-gray-300"}`}>
                            {paymentMethod === "cod" && <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />}
                        </div>
                        <div>
                            <p className="font-semibold text-gray-800">Thanh toán khi nhận hàng (COD)</p>
                            <p className="text-sm text-gray-500">Thanh toán bằng tiền mặt khi giao hàng</p>
                        </div>
                    </div>
                    <Package className={`w-6 h-6 ${paymentMethod === "cod" ? "text-purple-600" : "text-gray-400"}`} />
                </div>

                {/* ZaloPay */}
                <div onClick={() => onChangePayment("transfer")} className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === "transfer" ? "border-purple-600 bg-purple-50 ring-1 ring-purple-600" : "border-gray-200 hover:border-purple-200"}`}>
                    <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "transfer" ? "border-purple-600" : "border-gray-300"}`}>
                            {paymentMethod === "transfer" && <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />}
                        </div>
                        <div>
                            <p className="font-semibold text-gray-800">Thanh toán qua ZaloPay</p>
                            <p className="text-sm text-gray-500">Thanh toán an toàn qua ví điện tử ZaloPay</p>
                        </div>
                    </div>
                    <img src="/icons/zalopay.png" alt="ZaloPay" className="w-8 h-8 object-contain" />
                </div>

                {/* MoMo */}
                <div onClick={() => onChangePayment("momo")} className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === "momo" ? "border-pink-500 bg-pink-50 ring-1 ring-pink-500" : "border-gray-200 hover:border-pink-200"}`}>
                    <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "momo" ? "border-pink-500" : "border-gray-300"}`}>
                            {paymentMethod === "momo" && <div className="w-2.5 h-2.5 rounded-full bg-pink-500" />}
                        </div>
                        <div>
                            <p className="font-semibold text-gray-800">Thanh toán qua MoMo</p>
                            <p className="text-sm text-gray-500">Thanh toán an toàn qua ví điện tử MoMo</p>
                        </div>
                    </div>
                    <img src="/icons/momo.png" alt="MoMo" className="w-8 h-8 object-contain" />
                </div>
            </div>
        </form>
    );
};

// import { Truck, CreditCard, Package } from "lucide-react";

// export interface CheckoutFormData {
//     fullName: string;
//     phone: string;
//     email: string;
//     address: string;
//     note: string;
// }

// interface ShippingFormProps {
//     formData: CheckoutFormData;
//     paymentMethod: string;
//     onChangeForm: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
//     onChangePayment: (method: string) => void;
//     onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
//     formId: string;
// }

// export const ShippingForm = ({ formData, paymentMethod, onChangeForm, onChangePayment, onSubmit, formId }: ShippingFormProps) => {
//     return (
//         <form id={formId} onSubmit={onSubmit} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
//             {/* THÔNG TIN GIAO HÀNG */}
//             <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
//                 <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
//                     <Truck className="w-5 h-5" />
//                 </div>
//                 <h2 className="text-xl font-bold text-gray-800">Thông tin giao hàng</h2>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
//                 <div className="space-y-1.5">
//                     <label htmlFor="fullName" className="text-sm font-semibold text-gray-700">Họ và tên <span className="text-red-500">*</span></label>
//                     <input id="fullName" type="text" name="fullName" required value={formData.fullName} onChange={onChangeForm} placeholder="Nhập họ và tên" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all" />
//                 </div>
//                 <div className="space-y-1.5">
//                     <label htmlFor="phone" className="text-sm font-semibold text-gray-700">Số điện thoại <span className="text-red-500">*</span></label>
//                     <input id="phone" type="tel" name="phone" required value={formData.phone} onChange={onChangeForm} placeholder="Nhập số điện thoại" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all" />
//                 </div>
//                 <div className="sm:col-span-2 space-y-1.5">
//                     <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email (Tùy chọn)</label>
//                     <input id="email" type="email" name="email" value={formData.email} onChange={onChangeForm} placeholder="Nhập email để nhận thông báo đơn hàng" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all" />
//                 </div>
//                 <div className="sm:col-span-2 space-y-1.5">
//                     <label htmlFor="address" className="text-sm font-semibold text-gray-700">Địa chỉ giao hàng <span className="text-red-500">*</span></label>
//                     <input id="address" type="text" name="address" required value={formData.address} onChange={onChangeForm} placeholder="Số nhà, Tên đường, Phường/Xã, Quận/Huyện, Tỉnh/Thành phố" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all" />
//                 </div>
//                 <div className="sm:col-span-2 space-y-1.5">
//                     <label htmlFor="note" className="text-sm font-semibold text-gray-700">Ghi chú (Tùy chọn)</label>
//                     <textarea id="note" name="note" rows={3} value={formData.note} onChange={onChangeForm} placeholder="Ghi chú về đơn hàng..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all resize-none" />
//                 </div>
//             </div>

//             {/* PHƯƠNG THỨC THANH TOÁN */}
//             <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
//                 <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
//                     <CreditCard className="w-5 h-5" />
//                 </div>
//                 <h2 className="text-xl font-bold text-gray-800">Phương thức thanh toán</h2>
//             </div>

//             <div className="space-y-4">
//                 {/* COD */}
//                 <div onClick={() => onChangePayment("cod")} className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === "cod" ? "border-purple-600 bg-purple-50 ring-1 ring-purple-600" : "border-gray-200 hover:border-purple-200"}`}>
//                     <div className="flex items-center gap-3">
//                         <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "cod" ? "border-purple-600" : "border-gray-300"}`}>
//                             {paymentMethod === "cod" && <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />}
//                         </div>
//                         <div>
//                             <p className="font-semibold text-gray-800">Thanh toán khi nhận hàng (COD)</p>
//                             <p className="text-sm text-gray-500">Thanh toán bằng tiền mặt khi giao hàng</p>
//                         </div>
//                     </div>
//                     <Package className={`w-6 h-6 ${paymentMethod === "cod" ? "text-purple-600" : "text-gray-400"}`} />
//                 </div>

//                 {/* ZaloPay */}
//                 <div onClick={() => onChangePayment("transfer")} className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === "transfer" ? "border-purple-600 bg-purple-50 ring-1 ring-purple-600" : "border-gray-200 hover:border-purple-200"}`}>
//                     <div className="flex items-center gap-3">
//                         <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "transfer" ? "border-purple-600" : "border-gray-300"}`}>
//                             {paymentMethod === "transfer" && <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />}
//                         </div>
//                         <div>
//                             <p className="font-semibold text-gray-800">Thanh toán qua ZaloPay</p>
//                             <p className="text-sm text-gray-500">Thanh toán an toàn qua ví điện tử ZaloPay</p>
//                         </div>
//                     </div>
//                     <CreditCard className={`w-6 h-6 ${paymentMethod === "transfer" ? "text-purple-600" : "text-gray-400"}`} />
//                 </div>
//             </div>
//         </form>
//     );
// };
