import { useState, useEffect } from "react";
import {
  Edit,
  Trash,
  Plus,
  Filter,
  ChevronDown,
  Search,
} from "lucide-react";
import AddForm from "../../components/AddFormComponent/AddForm";
import { useMutation } from "@tanstack/react-query";
import UserService from "../../services/UserService";
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import ToastMessageComponent from "../../components/ToastMessageComponent/ToastMessageComponent"; 
import { Helmet } from "react-helmet-async";
import moment from "moment";

const LecturersManagement = () => {
  const [lecturers, setLecturers] = useState([]);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", color: "" });

  // Form data với giá trị mặc định
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    birth: "",
    password: "",
    phone: "",
    address: "",
    avatar: "",
    role: "lecturer", // Đảm bảo role được set là lecturer
  });

  // Xác thực form
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";

    // Kiểm tra trường trống
    if (!value.trim() && name !== "avatar") {
      return "Trường này không được để trống";
    }

    // Xác thực dựa trên loại trường
    switch (name) {
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Email không hợp lệ";
        }
        break;
      case "phone":
        if (!/^\d{10,11}$/.test(value)) {
          error = "Số điện thoại phải có 10-11 số";
        }
        break;
      case "name":
        if (value.length < 2) {
          error = "Tên phải có ít nhất 2 ký tự";
        }
        break;
      default:
        break;
    }

    return error;
  };

  // Xử lý thay đổi giá trị trường form
  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  // Mutation để đăng ký người dùng mới
  const mutation = useMutation({
    mutationFn: UserService.registerUser,
    onSuccess: (data) => {
      if (data.status === "err") {
        setToast({ show: true, message: data.message, color: "red" });
      } else {
        setToast({
          show: true,
          message: `Đăng ký thành công`,
          color: "green",
        });
      }
      setShowAddModal(false);
      // Reset form data sau khi thêm thành công
      setFormData({
        name: "",
        email: "",
        birth: "",
        phone: "",
        address: "",
        avatar: "",
        role: "lecturer",
      });
      // Có thể cập nhật lại danh sách giảng viên ở đây
      setIsSubmitting(false);
    },
    onError: (error) => {
      setToast({
        show: true,
        message: error.response?.data?.message || "Đã xảy ra lỗi!",
        color: "red",
      });
      setTimeout(() => setToast({ show: false, message: "", color: "" }), 3000);
      setIsSubmitting(false);
    },
  });

  // Xử lý đăng ký
  const handleSignUp = () => {
    const newErrors = {};
    setErrors(newErrors);
    setIsSubmitting(true);
    mutation.mutate(formData);
  };

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };


  useEffect(() => {
   
    const fetchLecturers = async () => {
      try {
        const role = "lecturer";
        const response = await UserService.getUserByRole(role);
        
        if (response?.data) {
          setLecturers(response.data);
        }
      } catch (error) {
        setToast({
          show: true,
          message: error,
          color: "red"
        });
      }
    };

    fetchLecturers();
  }, []);

  // Xử lý xóa giảng viên
  const handleDelete = (id) => {
    setLecturers(lecturers.filter((lecturer) => lecturer.id !== id));
  };


  

  return (
    <>
    <Helmet>
  <title>Admin | Quản lý giảng viên</title>
</Helmet>
    <div className="py-8 space-y-6">
      {toast.show && (
        <ToastMessageComponent
          message={toast.message}
          color={toast.color}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Danh Sách Giảng Viên</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Thêm Giảng Viên
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex justify-between items-center space-x-4">
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm Giảng viên..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5 mr-2" />
            Bộ Lọc
            <ChevronDown className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Tên</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">SĐT</th>
            <th className="border border-gray-300 p-2">Ngày đăng ký</th>
            <th className="border border-gray-300 p-2">Trạng thái</th>
            <th className="border border-gray-300 p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {lecturers?.map((lecturer) => (
            <tr key={lecturer.id} className="text-center">
              <td className="border border-gray-300 p-2">{lecturer.name}</td>
              <td className="border border-gray-300 p-2">{lecturer.email}</td>
              <td className="border border-gray-300 p-2">{lecturer.phone}</td>
              <td className="border border-gray-300 p-2">{moment(lecturer.createdAt).format('DD/MM/YYYY')}</td>
              <td className="border border-gray-300 p-2">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    lecturer.isActive === true
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  { lecturer?.isActive === true
                      ? "Đang hoạt động"
                      : "Đã khóa"}
                </span>
              </td>
              <td className="border border-gray-300 p-2">
                <button className="mr-2 p-1 bg-blue-500 text-white rounded">
                  <Edit size={16} />
                </button>
                <button
                  className="p-1 bg-red-500 text-white rounded"
                  onClick={() => handleDelete(lecturer.id)}
                >
                  <Trash size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <div className="flex justify-between items-center mt-4">
        <button
          className={`px-4 py-2 border rounded flex items-center ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="mr-1" /> Trước
        </button>
        <span>
          Trang {currentPage} / {totalPages || 1}
        </span>
        <button
          className={`px-4 py-2 border rounded flex items-center ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages || 1))
          }
          disabled={currentPage === totalPages}
        >
          Sau <ChevronRight className="ml-1" />
        </button>
      </div> */}

      {showAddModal && (
        <AddForm
          title="Thêm giảng viên mới"
          onClose={() => setShowAddModal(false)}
          onSubmit={handleSignUp}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tên giảng viên <span className="text-red-500">*</span>
            </label>
            <InputFormComponent
              type="text"
              placeholder="Nhập tên giảng viên"
              value={formData.name}
              onChange={(value) => handleChange("name", value)}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          
            <div className="">
              <label className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <InputFormComponent
                type="email"
                placeholder="example@domain.com"
                value={formData.email}
                onChange={(value) => handleChange("email", value)}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            
        

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <InputFormComponent
                type="text"
                placeholder="Nhập số điện thoại"
                value={formData.phone}
                onChange={(value) => handleChange("phone", value)}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Ngày sinh
              </label>
              <InputFormComponent
                type="date"
                value={formData.birth}
                onChange={(value) => handleChange("birth", value)}
              />
              {errors.birth && (
                <p className="text-red-500 text-xs mt-1">{errors.birth}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Địa chỉ <span className="text-red-500">*</span>
            </label>
            <InputFormComponent
              type="text"
              placeholder="Nhập địa chỉ đầy đủ"
              value={formData.address}
              onChange={(value) => handleChange("address", value)}
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address}</p>
            )}
          </div>

          {/* Có thể thêm trường avatar ở đây nếu cần */}

          <p className="text-xs text-gray-500">
            Các trường đánh dấu <span className="text-red-500">*</span> là bắt
            buộc
          </p>
        </AddForm>
      )}
    </div>
    </>
  );
};

export default LecturersManagement;
