import { useNavigate } from "react-router-dom";
import { Logo } from "../../../components/common/Logo";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react";

export const LoginPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Vui lòng nhập đầy đủ tài khoản và mật khẩu.");
            return;
        }
        setError("");
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex flex-col">
            {/* Top bar with logo */}
            <div
                className="flex items-center justify-center py-5 border-b border-orange-100 bg-white/80 backdrop-blur-sm cursor-pointer"
                onClick={() => navigate("/")}
            >
                <Logo />
            </div>

            {/* Main Card */}
            <div className="flex-1 flex items-center justify-center px-4 py-10">
                <div className="w-full max-w-md mx-3 sm:mx-auto">
                    {/* Card */}
                    <div className="bg-white rounded-3xl shadow-xl shadow-orange-100/60 border border-orange-100 overflow-hidden">
                        {/* Card Header */}
                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-6">
                            <h1 className="text-2xl font-extrabold text-white tracking-tight">Đăng nhập</h1>
                            <p className="text-orange-100 text-sm mt-1">Chào mừng trở lại TechMart!</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleLogin} className="px-8 py-7 flex flex-col gap-5">
                            {error && (
                                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    {error}
                                </div>
                            )}

                            {/* Email */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Email / Tài khoản
                                </label>
                                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 gap-3
                                                focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100 transition-all">
                                    <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                                    <input
                                        type="email"
                                        placeholder="example@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Mật khẩu
                                </label>
                                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 gap-3
                                                focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100 transition-all">
                                    <Lock className="w-4 h-4 text-gray-400 shrink-0" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Nhập mật khẩu"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                        aria-label="Hiện/ẩn mật khẩu"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Forgot password */}
                            <div className="flex justify-end -mt-2">
                                <button type="button" className="text-xs text-orange-500 hover:text-orange-600 hover:underline transition-colors">
                                    Quên mật khẩu?
                                </button>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700
                                           text-white font-bold py-3.5 rounded-xl transition-all duration-200 active:scale-95
                                           shadow-lg shadow-orange-200 uppercase tracking-wider text-sm"
                            >
                                Đăng nhập
                            </button>

                            {/* Divider */}
                            <div className="flex items-center gap-3">
                                <div className="flex-1 h-px bg-gray-200" />
                                <span className="text-xs text-gray-400 font-medium">HOẶC</span>
                                <div className="flex-1 h-px bg-gray-200" />
                            </div>

                            {/* Social Login */}
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3
                                               hover:bg-blue-50 hover:border-blue-300 transition-all text-sm font-semibold text-gray-600"
                                >
                                    <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                    Facebook
                                </button>
                                <button
                                    type="button"
                                    className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3
                                               hover:bg-red-50 hover:border-red-200 transition-all text-sm font-semibold text-gray-600"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115z" />
                                        <path fill="#34A853" d="M16.04 18.013c-1.09.733-2.463 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987z" />
                                        <path fill="#4A90D9" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21z" />
                                        <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067z" />
                                    </svg>
                                    Google
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Register Link */}
                    <p className="text-center mt-5 text-sm text-gray-600">
                        Chưa có tài khoản?{" "}
                        <button
                            onClick={() => navigate("/register")}
                            className="text-orange-500 font-bold hover:text-orange-600 hover:underline transition-colors"
                        >
                            Đăng ký ngay
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};