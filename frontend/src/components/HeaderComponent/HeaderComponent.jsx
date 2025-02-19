import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import Modal from "../ModalComponent/ModalComponent";
import LoginFormComponent from "../LoginFormComponent/LoginFormComponent";
import RegisterFormComponent from "../RegisterFormComponent/RegisterFormComponent";
import CoursesMenu from "../CoursesMenu/CoursesMenu";
import ProfileMenu from "../ProfileMenu/ProfileMenu"
import NotificationList from "../NotificationList/NotificationList";
import { Search } from "lucide-react";

const HeaderComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState("login");
  const [user, setUser] = useState(null);


  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Lỗi khi phân tích JSON:", error);
        Cookies.remove("user");
      }
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    if (userData) {
      setUser(userData.data);
      Cookies.set("user", JSON.stringify(userData.data), { expires: 7 });
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    Cookies.remove("user");
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

          <Search className="text-gray-500" width="1.25rem" height="1.25rem"/> 
          <input
            type="text"
            className="pl-6 pr-4 py-2 flex-grow text-sm focus:outline-none"
            placeholder="Tìm kiếm khóa học..."
          />
        </div>

        {/* User Actions */}
        {user ? (
          <div className="relative flex items-center gap-4">
           
            <CoursesMenu/>
            <NotificationList/>
            <ProfileMenu avatar={user?.avatar} handleLogout={handleLogout}/>

            
          </div>
        ) : (
          <>
            <ul className="flex items-center">
              <li>
                <button
                  onClick={() => setModalType("register") || setIsOpen(true)}
                  className="px-4 py-2 text-sm font-semibold text-black hover:text-blue-500"
                >
                  Đăng ký
                </button>
              </li>
              <li>
                <button
                  onClick={() => setModalType("login") || setIsOpen(true)}
                  className="px-4 py-2 text-sm font-semibold bg-orange-500 text-white rounded-full hover:bg-orange-600"
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
                  setIsOpen={setIsOpen}
                  onLoginSuccess={handleLoginSuccess}
                />
              ) : (
                <RegisterFormComponent
                  switchToLogin={() => setModalType("login")}
                />
              )}
            </Modal>
          </>
        )}
      </div>
    </header>
  );
};

export default HeaderComponent;
