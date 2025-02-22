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

import {useDispatch, useSelector} from 'react-redux';

import { logout,setUser } from "../../redux/slides/userSlides";




const HeaderComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState("login");
  // const [user, setUser] = useState(null);
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  // const handleGetDetailUser = async (id, access_token) => { 
  //   const res = await UserService.getDetailUser(id, access_token);
  //   dispatch(updateUser({...res?.data,access_token: access_token}));
  // };
  const handleLoginSuccess = (userData) => {
    if (userData) {
      dispatch(setUser(userData.data)); // Cập nhật Redux ngay lập tức
      Cookies.set("user", JSON.stringify(userData.data), { expires: 7 });
      localStorage.setItem("access_token", userData.access_token);
      
      setIsOpen(false); // Đóng modal sau khi login
    }
  };
  
    
    
  

  const handleLogout = () => {
    Cookies.remove("user");
    localStorage.removeItem("access_token");
    dispatch(logout());
  
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
            <ProfileMenu avatar={user.avatar} handleLogout={handleLogout}/>

            
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
