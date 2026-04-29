import { Link, useNavigate } from "react-router-dom";
import { Header } from "../../../components/Header";
import { Package, Truck, CheckCircle, Clock, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../../auth/store/AuthContext";
import { getMyOrdersAPI } from "../../orders/api/orderApi";

export const OrderTrackingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication - redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const data = await getMyOrdersAPI();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, [isAuthenticated]);

  const formatPrice = (price: number) => price.toLocaleString("vi-VN") + "đ";

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "processing":
        return {
          label: "Đang xử lý",
          color: "text-blue-500",
          bg: "bg-blue-500",
          icon: Package,
          step: 2,
        };
      case "shipping":
        return {
          label: "Đang giao hàng",
          color: "text-purple-500",
          bg: "bg-purple-500",
          icon: Truck,
          step: 3,
        };
      case "delivered":
        return {
          label: "Đã giao hàng",
          color: "text-green-500",
          bg: "bg-green-500",
          icon: CheckCircle,
          step: 4,
        };
      default: // pending
        return {
          label: "Đã đặt hàng",
          color: "text-orange-500",
          bg: "bg-orange-500",
          icon: Clock,
          step: 1,
        };
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-1 flex justify-center items-center">
          <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <Header />

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">
          Theo dõi Đơn hàng
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Bạn chưa có đơn hàng nào
            </h2>
            <p className="text-gray-500 mb-6">
              Hãy tham quan các mặt hàng công nghệ mới nhất tại TechMart nhé!
            </p>
            <Link
              to="/"
              className="inline-block bg-orange-500 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-orange-200 hover:bg-orange-600 transition-colors"
            >
              Bắt đầu mua sắm
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const statusInfo = getStatusInfo(order.status);
              const StatusIcon = statusInfo.icon;

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                >
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 mb-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Mã đơn hàng</p>
                      <p className="font-bold text-gray-800">#{order.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Ngày đặt hàng
                      </p>
                      <p className="font-medium text-gray-800">
                        {new Date(order.createdAt).toLocaleDateString("vi-VN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 mb-1">Tổng tiền</p>
                      <p className="font-black text-orange-500 text-lg">
                        {formatPrice(order.totalAmount + order.shippingFee)}
                      </p>
                    </div>
                  </div>

                  {/* Tracking Stepper */}
                  <div className="relative mb-8 px-4">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 rounded-full z-0"></div>

                    <div
                      className="absolute top-1/2 left-0 h-1 bg-orange-500 -translate-y-1/2 rounded-full z-0 transition-all duration-500"
                      style={{ width: `${(statusInfo.step - 1) * 33.33}%` }}
                    ></div>

                    <div className="relative z-10 flex justify-between">
                      {[
                        { step: 1, label: "Đã đặt hàng" },
                        { step: 2, label: "Đang xử lý" },
                        { step: 3, label: "Đang giao hàng" },
                        { step: 4, label: "Đã giao hàng" },
                      ].map((s) => (
                        <div
                          key={s.step}
                          className="flex flex-col items-center gap-2"
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors border-4 
                                                        ${
                                                          statusInfo.step >=
                                                          s.step
                                                            ? "bg-orange-500 border-orange-100 text-white"
                                                            : "bg-white border-gray-100 text-gray-400"
                                                        }`}
                          >
                            {statusInfo.step > s.step ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              s.step
                            )}
                          </div>
                          <span
                            className={`text-xs font-semibold hidden sm:block ${statusInfo.step >= s.step ? "text-gray-800" : "text-gray-400"}`}
                          >
                            {s.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                    <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <StatusIcon className={`w-5 h-5 ${statusInfo.color}`} />
                      Trạng thái:{" "}
                      <span className={statusInfo.color}>
                        {statusInfo.label}
                      </span>
                    </h3>
                    {order.items?.map((item: any, index: number) => (
                      <div
                        key={`${item.id}-${index}`}
                        className="flex gap-4 items-center bg-white p-3 rounded-lg border border-gray-100"
                      >
                        <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-800 text-sm line-clamp-1">
                            {item.name}
                          </h4>
                          <p className="text-xs text-gray-500 mt-0.5">
                            Màu: {item.color} • SL: {item.quantity}
                          </p>
                        </div>
                        <div className="font-bold text-gray-800 pl-4 whitespace-nowrap">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
