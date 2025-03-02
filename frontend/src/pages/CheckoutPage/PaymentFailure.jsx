import React from 'react';
import { AlertCircle, ArrowLeft, HelpCircle, RefreshCw } from 'lucide-react';

const PaymentFailure = () => {
  // Thông tin lỗi giả lập
  const errorInfo = {
    orderId: "PYT2502280001",
    errorCode: "E1002",
    errorMessage: "Giao dịch thanh toán đã bị từ chối bởi ngân hàng phát hành thẻ.",
    course: "Lập Trình Python: Từ Cơ Bản Đến Nâng Cao",
    amount: 1199000,
    paymentMethod: "MoMo"
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-red-600 p-6 flex flex-col items-center justify-center text-white">
            <AlertCircle className="h-20 w-20 mb-4" />
            <h1 className="text-3xl font-bold text-center">Thanh Toán Thất Bại</h1>
            <p className="mt-2 text-center text-red-100">
              Đã xảy ra lỗi trong quá trình xử lý thanh toán của bạn.
            </p>
          </div>

          <div className="p-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Lỗi thanh toán: {errorInfo.errorCode}
                  </h3>
                  <p className="mt-2 text-sm text-red-700">
                    {errorInfo.errorMessage}
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">Chi Tiết Giao Dịch</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Mã đơn hàng</p>
                <p className="mt-1 text-gray-800 font-medium">{errorInfo.orderId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Phương thức thanh toán</p>
                <p className="mt-1 text-gray-800">{errorInfo.paymentMethod}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Tổng thanh toán</p>
                <p className="mt-1 text-gray-800 font-medium">{errorInfo.amount.toLocaleString()}đ</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm font-medium text-gray-500">Khóa học</p>
                <p className="mt-1 text-gray-800">{errorInfo.course}</p>
              </div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => window.location.href = '/order/checkout'}
                className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Thử Lại Thanh Toán
              </button>

              <button 
                onClick={() => window.location.href = '/payment'}
                className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Quay Lại Thông Tin Thanh Toán
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Các Vấn Đề Thường Gặp</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0 pt-0.5">
                      <HelpCircle className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-900">Thẻ của tôi bị từ chối</h4>
                      <p className="mt-1 text-sm text-gray-600">
                        Kiểm tra số dư tài khoản của bạn và đảm bảo thẻ được kích hoạt cho thanh toán trực tuyến.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0 pt-0.5">
                      <HelpCircle className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-900">Tôi đã bị trừ tiền nhưng giao dịch thất bại</h4>
                      <p className="mt-1 text-sm text-gray-600">
                        Đừng lo lắng, số tiền sẽ được hoàn lại trong vòng 5-7 ngày làm việc. Nếu không, vui lòng liên hệ với chúng tôi.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                Cần giúp đỡ? <a href="/support" className="font-medium text-indigo-600 hover:text-indigo-500">Liên hệ đội hỗ trợ khách hàng</a> hoặc gọi <span className="font-medium">1800-123-456</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;