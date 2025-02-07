import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie"; // Import thư viện Cookies

import Modal from "../ModalComponent/ModalComponent";
import LoginFormComponent from "../LoginFormComponent/LoginFormComponent";
import RegisterFormComponent from "../RegisterFormComponent/RegisterFormComponent";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState("login"); // "login" hoặc "register"
  const [user, setUser] = useState(null);

  
  const openModal = (type) => {
    setModalType(type);
    setIsOpen(true);
  };
  useEffect(() => {
    const storedUser = Cookies.get("user"); // Lấy user từ cookies
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Lỗi khi phân tích JSON:", error);
        Cookies.remove("user"); // Xóa nếu lỗi
      }
    }
  }, []);
  const handleLoginSuccess = (userData) => {
    if (userData) {
      setUser(userData.data);
      Cookies.set("user", JSON.stringify(userData.data), { expires: 7 }); 
    } else {
      console.error("User data is undefined");
    }
    setIsOpen(false);
  };
 
  

  const handleLogout = () => {
    Cookies.remove("user");  // Hoặc sessionStorage.removeItem("user");
    setUser(null);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container flex justify-between px-4 py-4 mx-auto lg:justify-between">
        <Link to="/">
          <div className="text-3xl font-Dosis font-bold text-orange-500">
            HocPython
          </div>
        </Link>

        {/* Search Bar */}
        <div className="flex items-center px-4 search rounded-full border border-gray-600 w-[420px]">
          <FontAwesomeIcon icon={faSearch} className="text-lg text-gray-500" />
          <input
            type="text"
            className="pl-6 pr-4 py-2 flex-grow text-sm focus:outline-none"
            placeholder="Tìm kiếm khóa học..."
          />
        </div>

        {/* User Actions */}
        {
          user ? (
            
            <div className="flex items-center">
              <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-semibold text-black hover:text-blue-500"
              >
                  Khóa học của tôi
              </button>
              
              <FontAwesomeIcon icon={faBell}/>
              <Link to="/profile" className="px-4 py-2 text-sm font-semibold text-black hover:text-blue-500">
                {
                  user.name
                  
                }
              </Link>
              
            </div>
          ) : (
            <>
            <ul className="flex items-center">
              <li>
                <button
                  onClick={() => openModal("register")}
                  className="px-4 py-2 text-sm font-semibold text-black hover:text-blue-500"
                >
                  Đăng ký
                </button>
              </li>
              <li>
                <button
                  onClick={() => openModal("login")}
                  className="px-4 py-2 text-sm font-semibold text-black hover:text-blue-500"
                >
                  Đăng nhập
                </button>
              </li>
            </ul>
             <Modal
             isOpen={isOpen}
             setIsOpen={setIsOpen}
             onClose={() => setIsOpen(false)}
             title={
               modalType === "login"
                 ? "Đăng nhập vào HocPython"
                 : "Đăng ký tài khoản"
             }
             
           >
             {modalType === "login" ? (
               <LoginFormComponent
                 switchToRegister={() => setModalType("register")}
                 setIsOpen = {setIsOpen}
                 onLoginSuccess={handleLoginSuccess}
                 
               />
             ) : (
               <RegisterFormComponent
                 switchToLogin={() => setModalType("login")}
               />
             )}
           </Modal>
           </>
          )
        }
      
      </div>
    </header>
  );
};

export default Header;
