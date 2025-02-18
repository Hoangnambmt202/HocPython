import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import UserService from "../../services/UserService";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import InputFormComponent from "../InputFormComponent/InputFormComponent";

// eslint-disable-next-line react/prop-types
const RegisterFormComponent = ({ switchToLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const validateField = (name, value) => {
    let error = "";
    if (!value.trim()) {
      error = "Trường này không được để trống";
    } else if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = "Email không hợp lệ";
    }  else if (
      name === "password" &&
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(value)
    ) {
      error = "Mật khẩu phải chứa chữ hoa, chữ thường, số và ký tự đặc biệt";
    }
    else if (name === "password" && value.length < 8) {
      error = "Mật khẩu phải có ít nhất 8 ký tự";
    } else if (name === "confirmPassword" && value !== formData.password) {
      error = "Mật khẩu không khớp";
    } else if (name === "phone" && value.length <10) {
      error = "Số điện thoại quá ngắn hoặc không đúng"
    }
    return error;
  };

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };


  const mutation = useMutation({
    mutationFn: UserService.registerUser,
    onSuccess: (data) => {
      setMessage(data.message);
      setMessageType("success");
      setTimeout(() => {
        switchToLogin()
      }, 2000);
    },
    onError: (error) => {
      setMessage(error.response?.data?.message || "Đã xảy ra lỗi!");
      setMessageType("error");
    },
  });

  const handleSignUp = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      newErrors[key] = validateField(key, formData[key]);
    });

    setErrors(newErrors);
    if (Object.values(newErrors).some((error) => error)) return;

    mutation.mutate(formData);
  };

  return (
    <div className="flex flex-col w-full max-w-[80%] mx-auto">
      <h3 className="text-2xl font-bold mb-4">Đăng ký</h3>
      {mutation.isPending && <LoadingComponent />}
      <InputFormComponent
        placeholder="Email đăng ký"
        value={formData.email}
        onChange={(value) => handleChange("email", value)}
      />
      {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

      <InputFormComponent
        placeholder="Số điện thoại đăng ký"
        value={formData.phone}
        onChange={(value) => handleChange("phone", value)}
      />
      {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}

      <InputFormComponent
        placeholder="Mật khẩu"
        type="password"
        value={formData.password}
        onChange={(value) => handleChange("password", value)}
      />
      {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}

      <InputFormComponent
        placeholder="Nhập lại mật khẩu"
        type="password"
        value={formData.confirmPassword}
        onChange={(value) => handleChange("confirmPassword", value)}
      />
      {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}

      <button
        onClick={handleSignUp}
        disabled={mutation.isLoading}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 mt-4 rounded-lg"
      >
        {mutation.isLoading ? "Đang đăng ký..." : "Đăng ký"}
      </button>
      {message && (
        <span className={`block mb-4 text-sm ${messageType === "success" ? "text-green-500" : "text-red-500"}`}>
          {message}
        </span>
      )}
      <p className="mt-4">
        Bạn đã có tài khoản? <button onClick={switchToLogin} className="underline text-orange-600">Đăng nhập</button>
      </p>
    </div>
  );
};

export default RegisterFormComponent;
