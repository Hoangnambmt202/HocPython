import { useState, useEffect } from "react";
import { Plus, Search, Trash2, Edit } from "lucide-react";
import NotificationService from "../../services/NotificationService";
import UserService from "../../services/UserService";
import ToastMessageComponent from "../../components/ToastMessageComponent/ToastMessageComponent";
import Modal from "../../components/ModalComponent/ModalComponent";

const AdminNotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", color: "" });
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "all", // all, individual, role
    recipientIds: [], // for individual users
    role: "user", // for role-based notifications
  });

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (formData.type === "individual") {
      fetchUsers();
    }
  }, [formData.type]);

  const fetchUsers = async () => {
    try {
      setIsLoadingUsers(true);
      const response = await UserService.getAllUser();
      if (response) {
        setUsers(response.data);
       
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      showToast("Lỗi khi tải danh sách người dùng", "red");
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await NotificationService.getAllNotifications();
      setNotifications(response?.data || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setToast({ show: true, message: "Lỗi khi tải thông báo", color: "red" });
      setNotifications([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      const submitData = {
        ...formData,
        recipientIds:
          formData.type === "individual" ? formData.recipientIds : [],
      };

      if (selectedNotification) {
        response = await NotificationService.updateNotification(
          selectedNotification._id,
          submitData
        );
      } else {
        response = await NotificationService.createNotification(submitData);
      }

      if (response.success) {
        showToast(
          selectedNotification
            ? "Cập nhật thông báo thành công"
            : "Tạo thông báo thành công",
          "green"
        );
        setIsModalOpen(false);
        fetchNotifications();
        resetForm();
      } else {
        showToast(response.message || "Có lỗi xảy ra", "red");
      }
    } catch (error) {
      console.error("Error:", error);
      showToast(error?.response?.data?.message || "Có lỗi xảy ra", "red");
    }
  };

  const handleDeleteNotification = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thông báo này?")) {
      try {
        await NotificationService.deleteNotification(id);
        setToast({
          show: true,
          message: "Xóa thông báo thành công",
          color: "green",
        });
        fetchNotifications();
      } catch (error) {
        console.error("Error deleting notification:", error);
        setToast({
          show: true,
          message: "Lỗi khi xóa thông báo",
          color: "red",
        });
      }
    }
  };
  const handleEditNotification = (notification) => {
    setSelectedNotification(notification);
    console.log(notification);
    setFormData({
      title: notification.title,
      message: notification.message,
      type: notification.type,
      recipientIds:
        notification.recipients
          ?.filter((r) => r && r.users && r.users._id)
          .map((r) => r.users._id) || [],

      role: notification.role || "user",
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      message: "",
      type: "all",
      recipientIds: [],
      role: "user",
    });
    setSelectedNotification(null);
  };

  const showToast = (message, color) => {
    setToast({ show: true, message, color });
  };

  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {toast.show && (
        <ToastMessageComponent
          message={toast.message}
          color={toast.color}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Quản lý thông báo</h1>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          Tạo thông báo
        </button>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <div className="relative flex-1">
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
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tiêu đề
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nội dung
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Loại
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thời gian
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredNotifications.map((notification) => (
                <tr key={notification._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {notification.title}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 line-clamp-2">
                      {notification.message}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {
                        notification.type === "all" ? "Tất cả người dùng" : notification.type === "role" ? "Theo vai trò" : "Người dùng cụ thể"
                      }
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {notification.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleEditNotification(notification)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteNotification(notification._id)
                        }
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        title={ 
          selectedNotification ? "Chỉnh sửa thông báo" : "Tạo thông báo mới"
        }
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
      >
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tiêu đề
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nội dung
            </label>
            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows={4}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Loại thông báo
            </label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  type: e.target.value,
                  recipientIds: [],
                  role: e.target.value === "role" ? "user" : undefined,
                })
              }
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="all">Tất cả người dùng</option>
              <option value="role">Theo vai trò</option>
              <option value="individual">Người dùng cụ thể</option>
            </select>
          </div>

          {formData.type === "role" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Vai trò
              </label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="user">Học viên</option>
                <option value="lecturer">Giảng viên</option>
              </select>
            </div>
          )}

          {formData.type === "individual" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Người nhận
              </label>
              {isLoadingUsers ? (
                <div className="text-center py-2">Đang tải...</div>
              ) : (
                <select
                  multiple
                  value={formData.recipientIds}
                  onChange={(e) => {
                    const selectedOptions = Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    );
                    setFormData({ ...formData, recipientIds: selectedOptions });
                  }}
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 min-h-[100px]"
                >
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </select>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Giữ Ctrl (Windows) hoặc Command (Mac) để chọn nhiều người nhận
              </p>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                resetForm();
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              {selectedNotification ? "Cập nhật" : "Tạo"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminNotificationPage;
