import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotificationService from "../../services/NotificationService";
import { setNotifications, markAsRead } from "../../redux/slides/notificationSlides";
import { Search } from "lucide-react";

const NotificationPage = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notification);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await NotificationService.getUserNotifications();
        dispatch(setNotifications(response.data));
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setIsLoading(false);
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

  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Thông báo của bạn</h1>
        </div>

        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm thông báo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-4">Đang tải...</div>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div
                  key={notification._id}
                  onClick={() => handleMarkAsRead(notification._id)}
                  className={`p-4 rounded-lg border ${
                    notification.isRead
                      ? "bg-white border-gray-200"
                      : "bg-orange-50 border-orange-200"
                  } hover:shadow-md transition-shadow cursor-pointer`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {notification.title}
                      </h3>
                      <p className="mt-1 text-gray-600">{notification.message}</p>
                      <p className="mt-2 text-sm text-gray-500">
                        {notification.createdAt}
                      </p>
                    </div>
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                Không có thông báo nào.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage; 