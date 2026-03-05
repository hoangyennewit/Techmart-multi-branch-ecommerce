import {useNavigate} from "react-router-dom";
import { Logo } from "../../../components/common/Logo";
import logostore from "@/assets/logos/Icon-Logo.png";
export const LoginPage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div onClick ={() => navigate("/")}
            className="flex items-center justify-center bg-white-100
            border-b-3 border-orange-200">
                <Logo />
                {/* Add your login form here */}
            </div>
            <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg border-orange-300 border-2 shadow-md">
                <section className="flex items-center">
                    <div className="flex items-center justify-center w-1/2">
                        <img src={logostore} alt="Logo" className="h-[200px] object-contain" />
                    </div>
                    <div className="flex flex-col gap-3 mt-3">
                        <input type="email" placeholder="Tài khoản" className="border-2 border-orange-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        <input type="password" placeholder="Mật khẩu" className="border-2 border-orange-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                </section>
                <div className="flex items-center justify-between mt-4 px-2">
                    <a
                        href="#"
                        className="text-sm text-blue-500 hover:underline"
                    >
                        Quên mật khẩu?
                    </a>

                    <button
                        className="bg-orange-500 text-white font-bold px-6 py-2 rounded-full text-sm
                        hover:bg-orange-600 transition-all shadow-sm uppercase tracking-wider"
                        onClick={() => navigate("/")}
                    >
                        ĐĂNG NHẬP
                    </button>
                </div>
                
                <div>
                    <h2 className="text-sm text-center mt-6 text-orange-400 font-bold">HOẶC ĐĂNG NHẬP BẰNG</h2>
                    <div className="flex items-center justify-center gap-4 mt-3">
                        <button className="bg-blue-500 text-white font-bold px-6 py-2 rounded-full hover:bg-blue-600 transition-all whitespace-nowrap shadow-sm uppercase tracking-wider w-12 h-12 text-2xl">
                            F
                        </button>
                        <button className="bg-red-500 text-white font-bold px-6 py-2 rounded-full hover:bg-red-600 transition-all whitespace-nowrap shadow-sm uppercase tracking-wider w-12 h-12 text-2xl">
                            G
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center gap-4 mt-6">
                <button className="bg-orange-500 text-white font-bold px-6 py-2 rounded-full text-xs hover:bg-green-600 transition-all whitespace-nowrap shadow-sm uppercase tracking-wider"
                onClick={() => navigate("/register")}
                >
                    ĐĂNG KÝ
                </button>
            </div>
        </div>

    );
}