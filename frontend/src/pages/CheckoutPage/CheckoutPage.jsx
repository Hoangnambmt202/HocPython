import { useState } from "react";
import {  Lock, TicketPercent } from "lucide-react";
import { useSelector } from "react-redux";
import {Link} from "react-router-dom";
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.cart);

 
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };
  const temporaryTotal = () => {
    return cart.reduce((total, course) => total + course.price, 0);
  };
  const discountTotal = () => {return cart.reduce((total, course) => total + (course.discountPrice || 0), 0);} 
  const calculateTotal = () => {
    
    return temporaryTotal() - discountTotal();
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Giả lập gửi yêu cầu thanh toán
    setTimeout(() => {
      setLoading(false);
      // Redirect to success page (in a real app)
      // window.location.href = '/order/success';

      // For demo, we'll simulate a successful payment
      if (Math.random() > 0.3) {
        window.location.href = "/order/success";
      } else {
        window.location.href = "/order/failure";
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Xác Nhận Thanh Toán
          </h1>
          <p className="mt-2 text-gray-600">
            Vui lòng xác nhận thông tin và chọn phương thức thanh toán
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Thông Tin Khóa Học
            </h2>
            <div className="flex flex-col gap-4 ">
              {cart.map((course) => {
                return (
                  <>
                  <Link to={`/course/${course.slug}`}>
                    <div className="flex flex-col md:flex-row">
                      <div className="mb-4 md:mb-0 md:mr-6">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="rounded-md shadow-sm w-full md:w-40 h-auto object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg hover:underline font-medium text-indigo-600">
                          {course.title}
                        </h3>
                        <div className="mt-3 ">
                          <p className="text-sm text-gray-500">

                           {course.description}              
                          </p>
                        </div>
                        <div className="mt-2">
                          <b>Giá: {course.price.toLocaleString("vi-VN")} đ</b>
                        </div>
                      </div>
                    </div>
                  
                  </Link>
                  </>
                );
              })}

            </div>
          </div>

          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Thông Tin Cá Nhân
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {}
              <div>
                <p className="text-sm font-medium text-gray-500">Họ và tên</p>
                <p className="mt-1 text-gray-800">{user.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="mt-1 text-gray-800">{user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Số điện thoại
                </p>
                <p className="mt-1 text-gray-800">{user.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Địa chỉ</p>
                <p className="mt-1 text-gray-800">{user.address}</p>
              </div>
            </div>
          </div>
          <div className="p-6 border-b border-gray-200 flex ">
            <div className=" border border-r-transparent border-gray-500 p-2 overflow-hidden">
            <TicketPercent color="yellow" size={30} />
            </div>
            <InputFormComponent className="flex-1 border border-gray-500 outline-none border-x-transparent p-2" placeholder="Nhập mã giảm giá" />
            <button className="border-l-transparent border border-gray-500 p-2">Áp dụng</button>
          </div>
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Chọn Phương Thức Thanh Toán
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div
                className={`border rounded-lg p-4 cursor-pointer transition duration-200 ${
                  paymentMethod === "momo"
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-200 hover:border-indigo-300"
                }`}
                onClick={() => handlePaymentMethodChange("momo")}
              >
                <div className="flex items-center justify-center h-12 bg-pink-600 rounded-md">
                  <span className="text-white font-bold">MoMo</span>
                </div>
              </div>

              <div
                className={`border rounded-lg p-4 cursor-pointer transition duration-200 ${
                  paymentMethod === "vnpay"
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-200 hover:border-indigo-300"
                }`}
                onClick={() => handlePaymentMethodChange("vnpay")}
              >
                <div className="flex items-center justify-center h-12 bg-blue-600 rounded-md">
                  <span className="text-white font-bold">VNPAY</span>
                </div>
              </div>

              <div
                className={`border rounded-lg p-4 cursor-pointer transition duration-200 ${
                  paymentMethod === "paypal"
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-200 hover:border-indigo-300"
                }`}
                onClick={() => handlePaymentMethodChange("paypal")}
              >
                <div className="flex items-center justify-center h-12 bg-blue-700 rounded-md">
                  <span className="text-white font-bold">PayPal</span>
                </div>
              </div>

              <div
                className={`border rounded-lg p-4 cursor-pointer transition duration-200 ${
                  paymentMethod === "stripe"
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-200 hover:border-indigo-300"
                }`}
                onClick={() => handlePaymentMethodChange("stripe")}
              >
                <div className="flex items-center justify-center h-12 bg-purple-600 rounded-md">
                  <span className="text-white font-bold">Stripe</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Tổng Thanh Toán
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Giá khóa học</span>
                  <span className="text-gray-900">
                    {temporaryTotal().toLocaleString("vi-VN")}đ
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Giảm giá</span>
                  <span className="text-green-600">
                    -
                    {discountTotal().toLocaleString("vi-VN")}
                    đ
                  </span>
                </div>

                <div className="pt-4 mt-2 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      Tổng cộng
                    </span>
                    <span className="text-2xl font-bold text-indigo-600">
                      {calculateTotal().toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      Xác nhận thanh toán <Lock className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                <Lock className="h-4 w-4 mr-1" />
                <span>Thanh toán bảo mật với SSL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
