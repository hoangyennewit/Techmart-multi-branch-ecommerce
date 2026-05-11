import { useNavigate } from "react-router-dom";
import { Logo } from "../../../components/common/Logo";
import { useState, useEffect } from "react";
import { useAuth } from "../store/AuthContext";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import {
  getRedirectState,
  clearRedirectState,
} from "../../../utils/redirectStateManager";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Note: AuthContext will handle redirect state when user logs in
  // This check is kept for reference but AuthContext is the primary handler
  useEffect(() => {
    if (isAuthenticated) {
      console.log(
        "User authenticated in RegisterPage, AuthContext will handle redirect",
      );
      // Don't navigate here - let AuthContext handle it via user state
    }
  }, [isAuthenticated]);

  const update =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, password, confirm } = form;
    if (!name || !email || !phone || !password || !confirm) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }
    if (password !== confirm) {
      setError("Mật khẩu nhập lại không khớp.");
      return;
    }
    setError("");
    setSuccess(true);
    setTimeout(() => navigate("/login"), 1500);
  };

  const inputClass =
    "flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 gap-3 " +
    "focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100 transition-all";

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
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
          <div className="bg-white rounded-3xl shadow-xl shadow-orange-100/60 border border-orange-100 overflow-hidden">
            {/* Card Header */}
            <div className="bg-orange-500 px-8 py-6">
              <h1 className="text-2xl font-extrabold text-white tracking-tight">
                Tạo tài khoản
              </h1>
              <p className="text-orange-100 text-sm mt-1">
                Tham gia TechMart để mua sắm dễ dàng!
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleRegister}
              className="px-8 py-7 flex flex-col gap-4"
            >
              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}
              {success && (
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl text-sm">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  Đăng ký thành công! Đang chuyển hướng...
                </div>
              )}

              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Họ và tên
                </label>
                <div className={inputClass}>
                  <User className="w-4 h-4 text-gray-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Nguyễn Văn A"
                    value={form.name}
                    onChange={update("name")}
                    className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </label>
                <div className={inputClass}>
                  <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                  <input
                    type="email"
                    placeholder="example@email.com"
                    value={form.email}
                    onChange={update("email")}
                    className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Số điện thoại
                </label>
                <div className={inputClass}>
                  <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                  <input
                    type="tel"
                    placeholder="0901 234 567"
                    value={form.phone}
                    onChange={update("phone")}
                    className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Mật khẩu
                </label>
                <div className={inputClass}>
                  <Lock className="w-4 h-4 text-gray-400 shrink-0" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Ít nhất 6 ký tự"
                    value={form.password}
                    onChange={update("password")}
                    className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Hiện/ẩn mật khẩu"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Nhập lại mật khẩu
                </label>
                <div className={inputClass}>
                  <Lock className="w-4 h-4 text-gray-400 shrink-0" />
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Nhập lại mật khẩu"
                    value={form.confirm}
                    onChange={update("confirm")}
                    className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Hiện/ẩn"
                  >
                    {showConfirm ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-orange-500 hover:from-orange-700 hover:to-orange-800
                                           text-white font-bold py-3.5 rounded-xl transition-all duration-200 active:scale-95
                                           shadow-lg shadow-orange-200 uppercase tracking-wider text-sm mt-1"
              >
                Đăng ký tài khoản
              </button>
            </form>
          </div>

          {/* Login Link */}
          <p className="text-center mt-5 text-sm text-gray-600">
            Đã có tài khoản?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-orange-600 font-bold hover:text-orange-700 hover:underline transition-colors"
            >
              Đăng nhập
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

