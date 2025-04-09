/* eslint-disable react/prop-types */

import { useState } from "react";
import { Menu, Home, Book, Users, Layout, Settings, WalletMinimal, TrendingUp, ChevronDown, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const menuItems = [
    { icon: Home, label: "Trang chủ", href: "/admin" },
    { icon: Book, label: "Khóa học", href: "/admin/courses" },
    { icon: BookOpen, label: "Chương học", href: "/admin/chapters" },
    { icon: Layout, label: "Bài giảng", href: "/admin/lessons" },
    { icon: Book, label: "Danh mục", href: "/admin/categories" },
    {
      icon: Users,
      label: "Users",
    
      dropdown: [
        { label: "Danh sách học viên", href: "/admin/students" },
        { label: "Danh sách giảng viên", href: "/admin/lecturers" },
        { label: "Tiến độ học tập", href: "/admin/students/progress" },
        { label: "Chấm điểm bài tập", href: "/admin/students/grading" },
        { label: "Gửi thông báo", href: "/admin/students/notifications" },
      ],
    },
    
    {
      icon: WalletMinimal,
      label: "Thanh toán",

      dropdown: [
        { label: "Phương thức thanh toán", href: "/admin/payment/methods" },
        { label: "Lịch sử thanh toán", href: "/admin/payment/history" },
        { label: "Hoàn tiền & Khiếu nại", href: "/admin/payment/refunds" },
      ],
    },
    { icon: TrendingUp, label: "Thống kê", href: "/admin/statistic" },
    { icon: Settings, label: "Cài đặt", href: "/admin/settings" },
  ];

  return (
    <aside
      className={`fixed overflow-y-auto scrollbar-hide top-0 left-0 h-full transition-all duration-300 ${
        isMenuOpen ? "w-64" : "w-20"
      } bg-white border-r border-gray-200 shadow-xl`}
    >
      {/* Sidebar Header */}
      <div className="flex sticky top-0 z-1000 bg-white items-center justify-between p-4 border-b">
        <h1 className={`font-bold text-xl text-blue-600 ${!isMenuOpen && "hidden"}`}>
          Python Admin
        </h1>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Sidebar Menu */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <div key={item.label}>
            <button
              onClick={() => item.dropdown && toggleDropdown(item.label)}
              className="flex items-center w-full p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Link to={item.href} className="flex items-center w-full">
                <item.icon size={20} />
                {isMenuOpen && <span className="ml-3 flex-1 text-left">{item.label}</span>}
                {item.dropdown && isMenuOpen && <ChevronDown size={16} className={`transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />}
              </Link>
            </button>
            {item.dropdown && openDropdown === item.label && isMenuOpen && (
              <div className="ml-6 space-y-2 border-l border-gray-300 pl-4">
                {item.dropdown.map((subItem) => (
                  <Link
                    key={subItem.label}
                    to={subItem.href}
                    className="block p-2 text-gray-600 hover:text-blue-500 hover:underline"
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
