

import { Facebook, Instagram, Twitter } from "lucide-react";
const FooterComponent = () => {
  return (
    <footer className="py-12 bg-gray-100 border-t-2 border-gray-500 shadow-xl ">
      <div className="container grid gap-8 px-4 mx-auto xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-4 grid-cols-2 mb-8">
        <div className="">
          <h1 className="text-3xl font-Dosis text-orange-500  font-bold">HocPython</h1>
          <p className="text-gray-500">Học lập trình online</p>
          <p className="text-gray-500">Email: </p>
          <p className="text-gray-500">Phone: </p>
          <p className="text-gray-500">Địa chỉ:</p>
        </div>
        <div className="mt-3  ">
          <h3 className="text-xl font-bold">Liên hệ</h3>
          <p className="text-gray-500">Giới thiệu </p>
          <p className="text-gray-500">Liên hệ</p>
          <p className="text-gray-500">Tuyển dụng</p>
          <p className="text-gray-500">Điều khoản</p>
          <p className="text-gray-500">Bảo mật</p>
        </div>
        <div className="mt-3  ">
          <h3 className="text-xl font-bold">Hỗ trợ</h3>
          <p className="text-gray-500">FAQ</p>
          <p className="text-gray-500">Hướng dẫn</p>
          <p className="text-gray-500">Liên hệ</p>
        </div>
        <div className="mt-3  ">
          <h3 className="text-xl font-bold">Công ty ....</h3>
          <p className="text-gray-500">Mã số thuế: </p>
          <p className="text-gray-500">Ngày thành lập: Sat Jan 25 2025 03:38:08 GMT+0700 (Indochina Time)</p>
          <p className="text-gray-500">Lĩnh vực hoạt động: </p>
        </div>
        
      
      </div>
      <div className="container flex justify-between py-4 px-4 mx-auto">
        <p className=""> &#169; 2018 - 2025 HocPython. Nền tảng học lập trình python hàng đầu Việt Nam </p>
        <div className="flex items-center gap-2">

          <Facebook className="text-2xl text-blue-600 mx-2" />
          <Instagram className="text-2xl text-red-600 mx-2" />
          <Twitter className="text-2xl text-black mx-2" />
        </div>
      </div>
    </footer>
  );
};
    export default FooterComponent;