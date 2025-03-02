import  { useEffect, useState } from 'react';
import { CheckCircle, Calendar, ArrowRight, Download, Copy } from 'lucide-react';

const PaymentSuccess = () => {
  const [countdown, setCountdown] = useState(5);
  const [copied, setCopied] = useState(false);
  
  // Thông tin đơn hàng giả lập
  const orderInfo = {
    id: "PYT2502280001",
    date: "28/02/2025",
    amount: 1199000,
    paymentMethod: "MoMo",
    course: "Lập Trình Python: Từ Cơ Bản Đến Nâng Cao",
    accessCode: "PYT-ACCESS-28022025-091122"
  };
  
  // Đếm ngược để chuyển hướng người dùng
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
    // Xử lý chuyển hướng khi countdown = 0
    window.location.href = '/my-courses';
  }, [countdown]);
  
  // Xử lý copy mã truy cập
  const handleCopyAccessCode = () => {
    navigator.clipboard.writeText(orderInfo.accessCode)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => console.error('Không thể copy: ', err));
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-green-600 p-6 flex flex-col items-center justify-center text-white">
            <CheckCircle className="h-20 w-20 mb-4" />
            <h1 className="text-3xl font-bold text-center">Thanh Toán Thành Công!</h1>
            <p className="mt-2 text-center text-green-100">
              Cảm ơn bạn đã đăng ký khóa học của chúng tôi.
            </p>
          </div>
          
          <div className="p-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start">
              <div className="mr-3 pt-1">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-green-800">
                  Khóa học của bạn đã được kích hoạt thành công. Bạn có thể bắt đầu học ngay bây giờ hoặc vào bất kỳ lúc nào sau đó. Truy cập vào trang Khóa Học Của Tôi để bắt đầu học.
                </p>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Thông Tin Đơn Hàng</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Mã đơn hàng</p>
                <p className="mt-1 text-gray-800 font-medium">{orderInfo.id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Ngày thanh toán</p>
                <p className="mt-1 text-gray-800">{orderInfo.date}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Tổng thanh toán</p>
                <p className="mt-1 text-gray-800 font-medium">{orderInfo.amount.toLocaleString()}đ</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Phương thức thanh toán</p>
                <p className="mt-1 text-gray-800">{orderInfo.paymentMethod}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm font-medium text-gray-500">Khóa học</p>
                <p className="mt-1 text-gray-800">{orderInfo.course}</p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Mã truy cập khóa học</p>
                  <p className="mt-1 font-mono text-indigo-600 font-medium">{orderInfo.accessCode}</p>
                </div>
                <button 
                  onClick={handleCopyAccessCode} 
                  className="inline-flex items-center px-3 py-1.5 border border-indigo-300 text-xs font-medium rounded-md text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                      Đã sao chép
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 mr-1.5" />
                      Sao chép
                    </>
                  )}
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <button 
                onClick={() => window.location.href = '/dashboard'}
                className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Đi đến Khóa Học Của Tôi
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              
              <button 
                onClick={() => window.location.href = '/order/receipt'}
                className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Xem hóa đơn
                <Download className="ml-2 h-4 w-4" />
              </button>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Trang sẽ tự động chuyển sau <span className="font-medium text-indigo-600">{countdown}</span> giây
              </p>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Các bước tiếp theo</h3>
              <ul className="space-y-3">
                <li className="flex">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                  <p className="text-gray-600">Truy cập trang <span className="font-medium">Khóa Học Của Tôi</span> trong menu chính</p>
                </li>
                <li className="flex">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                  <p className="text-gray-600">Chọn khóa học <span className="font-medium">{orderInfo.course}</span></p>
                </li>
                <li className="flex">
                  <span className="bg-indigo-100 text-indigo-700 rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                  <p className="text-gray-600">Bắt đầu học với bài học đầu tiên và theo dõi tiến độ của bạn</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;