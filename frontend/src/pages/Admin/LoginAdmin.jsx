import { useState } from "react";
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import { useMutation } from "@tanstack/react-query";
import UserService from "../../services/UserService";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slides/userSlides";
import ToastMessageComponent from "../../components/ToastMessageComponent/ToastMessageComponent";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

const LoginAdmin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, message: "", color: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoadingRedirect, setIsLoadingRedirect] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  // ✅ Hàm kiểm tra dữ liệu nhập vào (Validation)


  const validateField = (name, value) => {
    let error = "";
    if (!value.trim()) {
      error = `${name === "email" ? "Email" : "Mật khẩu"} không được để trống`;
    } else if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = "Email không hợp lệ";
    } else if (name === "password" && value.length < 5) {
      error = "Mật khẩu phải có ít nhất 5 ký tự";
    }
    return error;
  };

  // ✅ Xử lý khi người dùng nhập
  const handleOnChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: validateField(field, value) });
  };
 
  // ✅ Mutation xử lý đăng nhập
  const mutation = useMutation({
    mutationFn: UserService.loginUser,
    onSuccess: (data) => {
      if (data.status === "err") {
        setToast({ show: true, message: data.message, color: "red" });
      } else {
       dispatch(setUser(data.data))
       
        setToast({
          show: true,
          message: `Đăng nhập thành công, chào mừng ${data.data.name}. \n Vui lòng đợi chút trong khi chung tôi chuyển hướng cho bạn`,
          color: "green",
        });
        setIsToastVisible(true);

        setTimeout(() => {
            setIsToastVisible(false);
            setIsLoadingRedirect(true);
            setTimeout(() => {
                navigate("/admin");
              }, 1000);
          }, 2000);
       
      }
    },
    onError: (error) => {
      setToast({
        show: true,
        message: error.response?.data?.message || "Đã xảy ra lỗi!",
        color: "red",
      });
      setTimeout(() => setToast({ show: false, message: "", color: "" }), 3000);
    },
  });

  // ✅ Xử lý khi submit form
  const handleLogin = (e) => {
    e.preventDefault();
    let newErrors = {};

    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      mutation.mutate(formData);
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-100 to-white flex items-center justify-center p-4">
        {/* 🛑 Hiển thị thông báo lỗi */}
        {isToastVisible && toast.show && (
        <ToastMessageComponent
          message={toast.message}
          color={toast.color}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    {isLoadingRedirect && (<LoadingComponent/>)}
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
        <div>
          <h2 className="text-center text-3xl font-extrabold font-Dosis text-orange-500">
            HocPython
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Nhập thông tin để truy cập trang quản trị
          </p>
        </div>

        

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm space-y-4">
            {/* 🛑 Input Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <InputFormComponent
                value={formData.email}
                onChange={(value) => handleOnChange("email", value)}
                type="email"
                placeholder="Nhập email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* 🛑 Input Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <InputFormComponent
                value={formData.password}
                onChange={(value) => handleOnChange("password", value)}
                type="password"
                placeholder="Nhập mật khẩu"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
          </div>

          {/* 🛑 Remember me */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>

          {/* 🛑 Nút Đăng nhập */}
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
