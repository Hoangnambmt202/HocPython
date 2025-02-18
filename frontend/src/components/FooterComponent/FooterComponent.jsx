
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";
const FooterComponent = () => {
  return (
    <footer className="py-12 bg-gray-100 border-t-2 border-gray-500 shadow-xl ">
      <div className="container grid gap-8 px-4 mx-auto text-center md:grid-cols-4">
        <div className="col-span-1">
          <h3 className="text-2xl font-bold">HocPython</h3>
          <p className="text-gray-500">Học lập trình online</p>
          <p className="text-gray-500">Email: </p>
          <p className="text-gray-500">Phone: </p>
          <p className="text-gray-500">Địa chỉ:</p>
        </div>
        <div className="col-span-1">
          <h3 className="text-2xl font-bold">Liên hệ</h3>
          <p className="text-gray-500">Giới thiệu </p>
          <p className="text-gray-500">Liên hệ</p>
          <p className="text-gray-500">Tuyển dụng</p>
          <p className="text-gray-500">Điều khoản</p>
          <p className="text-gray-500">Bảo mật</p>
        </div>
        <div className="col-span-1">
          <h3 className="text-2xl font-bold">Hỗ trợ</h3>
          <p className="text-gray-500">FAQ</p>
          <p className="text-gray-500">Hướng dẫn</p>
          <p className="text-gray-500">Liên hệ</p>
        </div>
        <div className="col-span-1">
          <h3 className="text-2xl font-bold">Công ty ....</h3>
          <p className="text-gray-500">Mã số thuế: </p>
          <p className="text-gray-500">Ngày thành lập: Sat Jan 25 2025 03:38:08 GMT+0700 (Indochina Time)</p>
          <p className="text-gray-500">Lĩnh vực hoạt động: </p>
        </div>
        
      
      </div>
      <div className="container flex justify-between py-4 px-4 mx-auto">
        <p className=""> &#169; 2018 - 2025 HocPython. Nền tảng học lập trình python hàng đầu Việt Nam </p>
        <div>

          <FontAwesomeIcon icon={faFacebookF} className="text-2xl text-blue-600 mx-2" />
          <FontAwesomeIcon icon={faInstagram} className="text-2xl text-red-600 mx-2" />
          <FontAwesomeIcon icon={faTiktok} className="text-2xl text-black mx-2" />
        </div>
      </div>
    </footer>
  );
};
    export default FooterComponent;