import {useNavigate} from "react-router-dom";
import { Logo } from "../../../components/common/Logo";
import logostore from "@/assets/logos/Icon-Logo.png";
export const RegisterPage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div onClick ={() => navigate("/")}
            className="flex items-center justify-center bg-white-100
            border-b-3 border-orange-200">
                <Logo />
            </div>
            <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg border-orange-300 border-2 shadow-md">
                <h2 className="text-2xl font-bold text-center text-orange-400 mb-6">ĐĂNG KÝ TÀI KHOẢN</h2>
                <div className="flex flex-col gap-3 mt-3">
                    <input placeholder="Tài Khoản" className="border-2 border-orange-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"></input>
                    <input placeholder="Mật Khẩu" type="password" className="border-2 border-orange-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"></input>
                    <input placeholder="Nhập lại mật khẩu" type="password" className="border-2 border-orange-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"></input>
                    <input placeholder="Số điện thoại" className="border-2 border-orange-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"></input>
                </div>
                <div className="flex items-center justify-center gap-4 mt-6">
                    <button className="bg-orange-500 text-white font-bold px-6 py-2 rounded-full text-sm
                    hover:bg-orange-600 transition-all shadow-sm uppercase tracking-wider mt-4"
                    onClick={() => navigate("/login")}
                    >
                        ĐĂNG KÝ
                    </button>
                </div>
                
            </div>
        </div>
    );
}