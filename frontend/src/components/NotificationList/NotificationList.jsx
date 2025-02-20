import { useState } from "react";

import BaseDropdown from "../BaseDropdown/BaseDropdown";
import { Bell } from "lucide-react";

const NotificationMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const notifications = [
    {
      id: 1,
      title: "Bài học mới đã được thêm",
      message: "Python cơ bản có bài học mới: 'List Comprehension'",
      time: "2 giờ trước",
      isRead: false,
      type: "course"
    },
    {
      id: 2,
      title: "Hoàn thành khóa học",
      message: "Chúc mừng bạn đã hoàn thành khóa học Data Science!",
      time: "1 ngày trước",
      isRead: true,
      type: "achievement"
    }
  ];
  return (
    <div className="relative ">
      <button className="relative" onClick={() => setIsOpen(true)}>
        <Bell width="1.25rem" height="1.25rem" className=" text-gray-700 hover:text-gray-900" />
      </button>

      <BaseDropdown isOpen={isOpen} setIsOpen={setIsOpen}>

      {
        notifications ? (
          <>
           <div className="w-80">
           <header className="px-5 py-4">
            <h3 className="font-semibold text-gray-900">Thông báo</h3>
          </header>
          {notifications
            .map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
                  notification.isRead ? 'bg-white' : 'bg-orange-50'
                }`}
              >
                <div className="flex items-start">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{notification.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                  </div>
                  {!notification.isRead && (
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                  )}
                </div>
              </div>
            ))}
        </div>
          </>
        ): (<><div className="p-4 text-sm text-gray-700">Bạn không có thông báo nào.</div></>)
      }
        
      </BaseDropdown>
    </div>
  );
}
export default NotificationMenu