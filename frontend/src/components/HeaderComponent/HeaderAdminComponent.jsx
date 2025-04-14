import { useState, useEffect } from "react";
import { Search, ChevronDown, MessageSquare, ChevronUp } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "../../redux/slides/userSlides";
import UserService from "../../services/UserService";
import ToastMessageComponent from '../ToastMessageComponent/ToastMessageComponent'
import NotificationList from "../NotificationList/NotificationList";


const HeaderAdmin = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State để quản lý trạng thái dropdown
  
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toast, setToast] = useState({show: false, message: "", color: ""});

  // Hàm đóng/mở dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Hàm đóng dropdown khi click ra ngoài
  const handleClickOutside = (e) => {
    if (!e.target.closest(".dropdown-container")) {
      setIsDropdownOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await UserService.logoutUser();
      setToast({show: true, message: res.message, color : "green"})
      dispatch(logout());
      navigate("/admin/login");
      setIsDropdownOpen(false);
    }
    catch (err) {
      console.log(err)
    }
  };
  useEffect(() => {

    const fetchUser = async () => {
      try {
        const res = await UserService.getDetailUser();
        if (res?.data) {
          dispatch(setUser(res.data)); // Cập nhật Redux với user mới
        }
      } catch (error) {
        console.log(error);
        dispatch(logout()); // Xóa user khỏi Redux
        navigate("/admin/login"); // Điều hướng về trang đăng nhập
      }
     
    };
  
    fetchUser();
  
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dispatch, navigate]);
  

  return (
    <header className=" bg-white border-b sticky z-50 top-0 border-gray-200 shadow-lg">
      {
        toast.show && (
          <ToastMessageComponent
          message={toast.message}
          color={toast.color}
          onClose={() => setToast({ ...toast, show: false })}
          />
        )
      }
      <div className="flex items-center justify-between px-6 py-4">
        {/* Ô tìm kiếm */}
        <div className="flex items-center flex-1">
          <div className="relative max-w-md w-full">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={20}
            />
          </div>
        </div>

        {/* Thông báo & tài khoản */}
        <div className="flex items-center space-x-6">
          <NotificationList />
          <button>
            <MessageSquare size={20} />
          </button>

          {/* Phần tài khoản với dropdown */}
          <div className="relative dropdown-container">
            { user && (
              <>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-3 focus:outline-none"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="text-left">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  {
                    isDropdownOpen ? (<ChevronUp size={16} className="text-gray-400" />) : ( <ChevronDown size={16} className="text-gray-400" />)
                  }
                 
                </button>
              </>
            )
          }

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                <ul className="py-2">
                  <li>
                    <Link
                      to="/admin/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Thông tin tài khoản
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Cài đặt
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;
