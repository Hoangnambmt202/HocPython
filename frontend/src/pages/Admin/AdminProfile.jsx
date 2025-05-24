import { useState } from "react";
import {
  
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebookF,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaInstagram } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async";
import Modal from "../../components/ModalComponent/ModalComponent";
import ToastMessageComponent from "../../components/ToastMessageComponent/ToastMessageComponent";
import UserService from "../../services/UserService";
import { setUser } from "../../redux/slides/userSlides";
import { Camera } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

const AdminProfile = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editedData, setEditedData] = useState({ ...user });
  const [toast, setToast] = useState({ show: false, color: "", message: "" });

  const handleEdit = () => {
    setModalOpen(true);
    setIsEditing(true);
    setEditedData({ ...user });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setIsEditing(false);
  };



  const handleSave = async () => {
    const res = await UserService.updateUser({
      name: editedData.name,
      email: editedData.email,
      phone: editedData.phone,
      address: editedData.address,
    });
    dispatch(setUser(res.data));
    setModalOpen(false);
    setToast({
      show: true,
      color: "green",
      message: res.message,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
const avatarMutation = useMutation({
    mutationFn: (file) => UserService.uploadAvatar(file),
    onSuccess: (data) => {
      setToast({
        show: true,
        message: "Cập nhật avatar thành công",
        color: "green",
        duration: 2000,
      });

      dispatch(setUser({ ...user, avatar: data.avatar }));
    },
    onError: (error) => {
      setToast({
        show: true,
        message: error.response?.data?.error || "Lỗi khi cập nhật avatar",
        color: "red",
        duration: 2000,
      });
    },
  });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Kiểm tra loại file
    if (!file.type.match("image.*")) {
      setToast({
        show: true,
        message: "Vui lòng chọn file ảnh",
        color: "red",
        duration: 2000,
      });
      return;
    }

    // Kiểm tra kích thước file (ví dụ: tối đa 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setToast({
        show: true,
        message: "Kích thước ảnh không được vượt quá 2MB",
        color: "red",
        duration: 2000,
      });
      return;
    }

    avatarMutation.mutate(file);
  };

  return (
    <>
      <Helmet>
        <title>Admin | Profile</title>
      </Helmet>

      <div className="min-h-screen bg-white py-8">
        <div className="w-full mx-auto">
          {toast.show && (
            <ToastMessageComponent
              show={toast.show}
              color={toast.color}
              message={toast.message}
              onClose={() => setToast({ ...toast, show: false })}
            />
          )}

          <Modal isOpen={modalOpen} title="Chỉnh sửa thông tin" onClose={handleCloseModal}>
            <div className="w-full p-4">
              <form className="space-y-4">
                <div className="mb-8 flex flex-col items-center">
                          <img
                            src={user?.avatar}
                            alt={`User Avatar ${user.name}`}
                            className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
                          />
                          <label
                            htmlFor="avatar-upload"
                            className="mt-4 rounded-full bg-blue-500 text-white p-2 hover:bg-blue-600 transition-colors cursor-pointer"
                          >
                            {avatarMutation.isPending ? (
                              <span className="text-sm">Đang tải lên...</span>
                            ) : (
                              <>
                                <Camera width="1.25rem" height="1.25rem" />
                                <input
                                  id="avatar-upload"
                                  type="file"
                                  accept="image/*"
                                  onChange={handleAvatarChange}
                                  className="hidden"
                                  disabled={avatarMutation.isPending}
                                />
                              </>
                            )}
                          </label>
                        </div>
                {["name", "email", "phone", "address"].map((field) => (
                  <div key={field} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field === "name"
                        ? "Họ và tên"
                        : field === "email"
                        ? "Email"
                        : field === "phone"
                        ? "Số điện thoại"
                        : field === "address"
                        ? "Địa chỉ"
                        : "Chức vụ"}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      value={editedData[field] || ""}
                      onChange={handleChange}
                      placeholder={`Nhập ${field}`}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </form>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSave}
                  
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                >
                  Lưu thay đổi
                </button>
              </div>
            </div>
          </Modal>

          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="flex md:flex-row items-center justify-between gap-8">
              <div className="relative flex items-center md:items-start gap-4">
                <img
                  src={user?.avatar}
                  alt="Admin Avatar"
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                />
                <div className="text-center md:text-left">
                  <h1 className="text-3xl font-bold text-gray-800">
                    {user?.name || "Chưa cập nhật tên"}
                  </h1>
                  <p className="text-blue-500 font-semibold mt-1">
                    {user?.role || "Admin"}
                  </p>
                  <p className="text-gray-500 mt-1">
                    Member since {new Date(user?.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <a href="#" className="rounded-full border bg-gray-200 p-4">
                  <FcGoogle size={30} />
                </a>
                <a href="#" className="rounded-full border bg-gray-200 p-4">
                  <FaFacebookF color="blue" size={30} />
                </a>
                <a href="#" className="rounded-full border bg-gray-200 p-4">
                  <FaInstagram color="red" size={30} />
                </a>
              </div>
            </div>

            <div className="mt-6 border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">Thông tin cá nhân</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <FaEnvelope className="text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-800 font-medium">{user?.email}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <FaPhone className="text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Số điện thoại</p>
                      <p className="text-gray-800 font-medium">{user?.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <FaMapMarkerAlt className="text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Địa chỉ</p>
                      <p className="text-gray-800 font-medium">{user?.address || "Chưa cập nhật"}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleEdit}
                  className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Chỉnh sửa thông tin
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
