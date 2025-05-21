import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import config from "../../configs/index";
import Modal from "../ModalComponent/ModalComponent";
import LoginFormComponent from "../LoginFormComponent/LoginFormComponent";
import RegisterFormComponent from "../RegisterFormComponent/RegisterFormComponent";
import CoursesMenu from "../CoursesMenu/CoursesMenu";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import NotificationList from "../NotificationList/NotificationList";
import { Search, ShoppingBag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "../../redux/slides/userSlides";
import UserService from "../../services/UserService";
import CartPage from "../../pages/CartPage/CartPage";
import { toggleCart } from "../../redux/slides/cartSlides";
import EnrollService from "../../services/EnrollService";
import { setEnrolledCourses } from "../../redux/slides/enrollSlice";
import SearchComponent from "../SearchComponent/SearchComponent";
import CourseService from "../../services/CourseService";

const HeaderComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState("login");
  const [showSearchMobile, setShowSearchMobile] = useState(false);

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
    const fetchEnrolled = async () => {
      if (!user) return;

      try {
        const response = await EnrollService.allCourseEnroll();
        const enrolledCourseIds = response.data.map((c) => c.courseId._id);
        dispatch(setEnrolledCourses(enrolledCourseIds));
      } catch (err) {
        console.error("Lỗi tải danh sách đã đăng ký:", err);
      }
    };

    fetchUser();
    fetchEnrolled();
  }, []);

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
      <div className="container mx-auto flex flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Logo */}
        <div className="flex justify-between items-center">
          <Link to={config.routes.home} className="flex items-center gap-2">
            <div className="text-2xl sm:text-3xl font-Dosis font-bold text-orange-500">
              HocPython
            </div>
          </Link>

          {/* Mobile */}
          {user ? (
            <>
              <div className="flex items-center justify-end gap-4 xl:hidden lg:hidden md:hidden">
                <button onClick={() => setShowSearchMobile((prev) => !prev)}>
                  <Search
                    className={`${showSearchMobile} ? "text-gray-700" : "text-gray-500"`}
                    width="1.25rem"
                    height="1.25rem"
                  />
                </button>

                <div className="hidden lg:block">
                  <button onClick={() => dispatch(toggleCart())}>
                    <ShoppingBag className="text-gray-700" />
                  </button>
                </div>
                <NotificationList />
                <ProfileMenu
                  avatar={user?.avatar}
                  handleLogout={handleLogout}
                />
                <CartPage />
              </div>
            </>
          ) : (
            <div className="flex items-center justify-end gap-2 xl:hidden lg:hidden md:hidden">
              <button
                onClick={() => {
                  setModalType("register");
                  setIsOpen(true);
                }}
                className="px-4 py-2 text-sm font-semibold text-black hover:text-blue-500"
              >
                Đăng ký
              </button>
              <button
                onClick={() => {
                  setModalType("login");
                  setIsOpen(true);
                }}
                className="px-4 py-2 text-sm font-semibold text-white bg-orange-500 rounded-full hover:bg-orange-600"
              >
                Đăng nhập
              </button>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="">
          <div className="hidden md:block">
            <SearchComponent
              placeholder="Tìm kiếm khóa học..."
              searchFunction={CourseService.searchCourses}
              resultKey="title"
              resultImageKey="thumbnail"
              resultLinkPrefix="/course/"
            />
          </div>
          {showSearchMobile && (
            <div className="block md:hidden mt-2">
              <SearchComponent
                placeholder="Tìm kiếm khóa học..."
                searchFunction={CourseService.searchCourses}
                resultKey="title"
                resultImageKey="thumbnail"
                resultLinkPrefix="/course/"
              />
            </div>
          )}
        </div>

        {/* User Actions */}
        {user ? (
          <div className="xl:flex lg:flex md:flex items-center justify-end gap-4 hidden">
            <CoursesMenu />
            <div className="hidden lg:block">
              <button onClick={() => dispatch(toggleCart())}>
                <ShoppingBag className="text-gray-700" />
              </button>
            </div>
            <NotificationList />
            <ProfileMenu avatar={user?.avatar} handleLogout={handleLogout} />
            <CartPage />
          </div>
        ) : (
          <div className="xl:flex md:flex lg:flex items-center justify-end gap-2 hidden">
            <button
              onClick={() => {
                setModalType("register");
                setIsOpen(true);
              }}
              className="px-4 py-2 text-sm font-semibold text-black hover:text-blue-500"
            >
              Đăng ký
            </button>
            <button
              onClick={() => {
                setModalType("login");
                setIsOpen(true);
              }}
              className="px-4 py-2 text-sm font-semibold text-white bg-orange-500 rounded-full hover:bg-orange-600"
            >
              Đăng nhập
            </button>
          </div>
        )}

        {/* Modal */}
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onClose={() => setIsOpen(false)}
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
      </div>
    </header>
  );
};

export default HeaderComponent;
