import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";



 const LoginFormComponent = ({ switchToRegister }) => {
  return (
    <>
    <div className="flex min-w-[80%] mx-auto flex-col items-center">
                <button className="w-full relative hover:bg-gray-300 hover:text-black px-4 py-2 mt-2 text-sm text-gray-600 flex justify-center items-center bg-white border rounded-full">
                  <FontAwesomeIcon icon={faUser} className="text-sm absolute left-4 text-gray-500" />
                  <span>Sử dụng email / số điện thoại</span>
                </button>
                <button className="w-full relative hover:bg-gray-300 hover:text-black px-4 py-2 mt-2 text-sm text-gray-600 flex justify-center items-center bg-white border rounded-full">
                  <FontAwesomeIcon icon={faGoogle} className="text-sm absolute left-4 text-red-500" />
                  <span>Đăng nhập với Google</span>
                </button>
                <button className="w-full relative hover:bg-gray-300 hover:text-black px-4 py-2 mt-2 text-sm text-gray-600 flex justify-center items-center bg-white border rounded-full">
                  <FontAwesomeIcon icon={faFacebook} className="text-sm absolute left-4 text-blue-500" />
                  <span>Đăng nhập với Facebook</span>
                </button>
                <button className="w-full relative hover:bg-gray-300 hover:text-black px-4 py-2 mt-2 text-sm text-gray-600 flex justify-center items-center bg-white border rounded-full">
                  <FontAwesomeIcon icon={faGithub} className="text-sm absolute left-4 text-black" />
                  <span>Đăng nhập với Github</span>
                </button>
              </div>
              <div className="mt-4">
                <p>Bạn chưa có tài khoản? <Link onClick={switchToRegister} className="underline text-orange-600">Đăng ký</Link></p>
                <p className="mt-2"><Link to="/" className="underline text-orange-600">Quên mật khẩu?</Link></p>
              </div>
              <div>
                <p className=" text-sm text-gray-500 max-w-[70%] mx-auto mt-4">Việc bạn tiếp tục sử dụng trang web này đồng nghĩa với việc bạn đồng ý với <Link to="/terms" className="underline" >điều khoản sử dụng </Link> của chúng tôi</p>
              </div>
    </>
    
  )
}
export default LoginFormComponent;
