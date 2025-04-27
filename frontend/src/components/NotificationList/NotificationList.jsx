import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BaseDropdown from "../BaseDropdown/BaseDropdown";
import { Bell } from "lucide-react";
import NotificationService from "../../services/NotificationService";
import { setNotifications, markAsRead } from "../../redux/slides/notificationSlides";


const NotificationList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { notifications, unreadCount } = useSelector((state) => state.notification);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await NotificationService.getUserNotifications();
        dispatch(setNotifications(response.data));
       
        
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [dispatch]);

  const handleMarkAsRead = async (notificationId) => {
    try {
      await NotificationService.markAsRead(notificationId);
      dispatch(markAsRead(notificationId));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };


  return (
    <div className="relative w-8 h-8 flex items-center justify-center">
      <button className="relative" onClick={() => setIsOpen(true)}>
        <Bell width="1.25rem" height="1.25rem" className="text-gray-700 hover:text-gray-900" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      <BaseDropdown isOpen={isOpen} setIsOpen={setIsOpen}>
        {notifications && notifications.length > 0 ? (
          <div className="w-80">
            <header className="px-5 py-4 flex justify-between items-center">
              <h3 className="font-semibold text-gray-900">Thông báo</h3>
              <Link to="/notifications" className="text-sm text-blue-600 hover:text-blue-800">
                Xem tất cả
              </Link>
            </header>
            <div className="max-h-[400px] overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification._id}
                  onClick={() => handleMarkAsRead(notification._id)}
                  className={`p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
                    notification.isRead ? 'bg-white' : 'bg-orange-50'
                  }`}
                >
                  <div className="flex items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{notification.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-2">{notification.createdAt}</p>
                    </div>
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4 text-sm text-gray-700">Bạn không có thông báo nào.</div>
        )}
      </BaseDropdown>
    </div>
  );
};

export default NotificationList;