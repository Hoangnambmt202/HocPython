/* eslint-disable react/prop-types */

import { Menu, Home, Book, Users, Layout, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {
  const menuItems = [
    { icon: Home, label: "Trang chủ", href: "/admin" },
    { icon: Book, label: "Khóa học", href: "/admin/courses" },
    { icon: Users, label: "Học viên", href: "/admin/students" },
    { icon: Layout, label: "Bài giảng", href: "/admin/lessons" },
    { icon: Settings, label: "Cài đặt", href: "/admin/settings" },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-full transition-all duration-300 ${
        isMenuOpen ? "w-64" : "w-20"
      } bg-white border-r border-gray-200 shadow-xl`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b">
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
          <Link
            key={item.label}
            to={item.href}
            className="flex items-center p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <item.icon size={20} />
            {isMenuOpen && <span className="ml-3">{item.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
