import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";

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
  const handleLoginSuccess = (userData) => {
    setUser(userData);  
    setIsOpen(false);
    console.log("User logged in:", userData); // 
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
              <Link to="/profile" className="px-4 py-2 text-sm font-semibold text-black hover:text-blue-500">
                {user.email}
              </Link>
              <button
                onClick={() => setUser(null)}
                className="px-4 py-2 text-sm font-semibold text-black hover:text-blue-500"
              >
                Đăng xuất
              </button>
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
