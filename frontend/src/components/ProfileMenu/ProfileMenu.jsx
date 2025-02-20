/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";

import BaseDropdown from "../BaseDropdown/BaseDropdown";
import { BookMarked, LogOut, Settings, User } from "lucide-react";

const ProfileMenu = ({ avatar, handleLogout }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="relative">
      <button className="relative" onClick={() => setIsProfileOpen(true)}>
        <img
          src={avatar}
          className="rounded-full w-[32px] h-[32px] border border-gray-400"
          alt="avatar"
        />
      </button>

      <BaseDropdown isOpen={isProfileOpen} setIsOpen={setIsProfileOpen}>
        <ul className="py-2">
          <li>
            <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <User className="mr-2"/>
              Trang cá nhân
            </Link>
          </li>
          <li>
            <Link to="/saved-posts" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <BookMarked className="mr-2"/>
              Bài viết đã lưu
            </Link>
          </li>
          <li>
            <Link to="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <Settings className="mr-2"/>
              Cài đặt
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} className="flex w-full text-left items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
              <LogOut className="mr-2" />
              Đăng xuất
            </button>
          </li>
        </ul>
      </BaseDropdown>
    </div>
  );
}
export default ProfileMenu