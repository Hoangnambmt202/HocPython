import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Modal from "../ModalComponent/ModalComponent";
import LoginFormComponent from "../LoginFormComponent/LoginFormComponent";
import RegisterFormComponent from "../RegisterFormComponent/RegisterFormComponent";
import CoursesMenu from "../CoursesMenu/CoursesMenu";
import ProfileMenu from "../ProfileMenu/ProfileMenu"
import NotificationList from "../NotificationList/NotificationList";
import { Search, ShoppingBag } from "lucide-react";
import {useDispatch, useSelector} from 'react-redux';
import { logout,setUser } from "../../redux/slides/userSlides";
import UserService from "../../services/UserService";
import CartPage from "../../pages/CartPage/CartPage";
import { toggleCart } from "../../redux/slides/cartSlides";




const HeaderComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState("login");
  const user = useSelector((state) => state.user.user);



  const dispatch = useDispatch();

  
 
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await UserService.getDetailUser(); 
        if (res?.data) {
          dispatch(setUser(res?.data)); 
        }
      } catch (error) {
        console.error("Lỗi khi lấy user:", error);
        dispatch(logout());
      }
    };
    
    fetchUser();
   
  }, [dispatch]);

  const handleLoginSuccess = (userData) => {
      dispatch(setUser(userData)); 
      setIsOpen(false); // Đóng modal
    
  };
  
  const handleLogout = async () => {
    try {
      await UserService.logoutUser();
      dispatch(logout());
    } catch (error) {
      console.error("Lỗi khi logout:", error);
    }
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
          <div className="relative flex items-center gap-4 hover:cursor-pointer">
            
            <CoursesMenu/>
             <button onClick={() => dispatch(toggleCart())}><ShoppingBag width="1.25rem" height="1.25rem"/></button>
             <CartPage/>
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
