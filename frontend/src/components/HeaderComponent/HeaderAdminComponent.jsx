import { useState, useEffect } from "react";
import { Search, Bell, ChevronDown, MessageSquare } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "../../redux/slides/userSlides";
import UserService from "../../services/UserService";
import Cookie from "js-cookie";
const HeaderAdmin = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State để quản lý trạng thái dropdown
  
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  // Thêm event listener để đóng dropdown khi click ra ngoài
  const handleLogout = () => {
    Cookie.remove("access_token");
    dispatch(logout());
    navigate("/admin/login");
    setIsDropdownOpen(false);
  };
  useEffect(() => {

    const fetchUser = async () => {
      try {
        const res = await UserService.getDetailUser();
        if (res?.data) {
          dispatch(setUser(res.data)); // Cập nhật Redux với user mới
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin user:", error);
        Cookie.remove("access_token"); // Xóa token nếu lỗi
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
    <header className=" bg-white border-b border-gray-200 shadow-lg">
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
          <button className="relative p-2 rounded-lg hover:bg-gray-100">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
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
                  <ChevronDown size={16} className="text-gray-400" />
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
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Cài đặt
                    </a>
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
