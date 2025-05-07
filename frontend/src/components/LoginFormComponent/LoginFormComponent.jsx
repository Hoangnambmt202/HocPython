
import {
  FaFacebook,
  FaGithub,
  FaGoogle,
  FaUser,
} from "react-icons/fa";
import { ChevronLeft } from "lucide-react";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import styles from "../ModalComponent/Modal.module.scss";
import UserService from "../../services/UserService";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import InputFormComponent from "../InputFormComponent/InputFormComponent";
import ToastMessageComponent from "../../components/ToastMessageComponent/ToastMessageComponent";
import routeConfig from "../../configs/routes";
// eslint-disable-next-line react/prop-types
const LoginFormComponent = ({ switchToRegister, setIsOpen, onLoginSuccess }) => {
  const MENU_ITEMS = [
    {
      id: 1,
      icon: FaUser,
      title: "Sử dụng email / số điện thoại",
      bgColor: "bg-gray-200 text-gray-600",
      children: {
        title: "Đăng nhập bằng email hoặc số điện thoại",
        inputs: [
          { id: 1, type: "text", placeholder: "Email hoặc số điện thoại", field: "email" },
          { id: 2, type: "password", placeholder: "Mật khẩu", field: "password" },
        ],
      },
    },
    { id: 2, icon: FaGoogle, title: "Đăng nhập với Google", bgColor: "bg-red-500 text-white" },
    { id: 3, icon: FaFacebook, title: "Đăng nhập với Facebook", bgColor: "bg-blue-500 text-white" },
    { id: 4, icon: FaGithub, title: "Đăng nhập với Github", bgColor: "bg-black text-white" },
  ];

  const [history, setHistory] = useState([]);
  const currentMenu = history[history.length - 1] || null;
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, message: "", color: "" });

  const handleMenuClick = (item) => {
    if (item.children) setHistory([...history, item.children]);
  };

  const handleBack = () => {
    setHistory(history.slice(0, history.length - 1));
  };

  // Validate inputs
  const validateField = (name, value) => {
    let error = "";
    if (!value.trim()) {
      error = `${name === "email" ? "Email hoặc số điện thoại" : "Mật khẩu"} không được để trống`;
    } else if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = "Email không hợp lệ. Vd: Example@gmail.com";
    } else if (name === "password" && value.length < 5) {
      error = "Mật khẩu phải có ít nhất 5 ký tự";
    }
    return error;
  };

  const handleOnChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: validateField(field, value) });
  };

  const mutation = useMutation({
    mutationFn: UserService.loginUser,
    onSuccess: (data) => {
      if (data.status === "err") {
        
        setTimeout(() => setToast({ show: true, message: data.message, color: "red" }), 3000);
      } else {
        onLoginSuccess(data.data);
    
        setTimeout(() => {
          setToast({ show: true, message: `Đăng nhập thành công, chào mừng ${data.data.name}`, color: "green" });
          setIsOpen(false);
          
        }, 2000);
      }
    },
    onError: (error) => {
      setToast({ show: true, message: error.response?.data?.message || "Đã xảy ra lỗi!", color: "red" });
      setTimeout(() => setToast({ show: false, message: "", color: "" }), 3000);
    },
    
  });

  const handleLogin = () => {
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
    <>
    
      {toast.show && (
        <ToastMessageComponent
          message={toast.message}
          color={toast.color}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

    <div className="w-[80%] mx-auto flex flex-col items-center">

      {currentMenu ? (
        <div>
          {mutation.isPending && <LoadingComponent />}
          <button onClick={handleBack} className="text-gray-500 flex absolute left-14 top-6 mb-2">
          
            <ChevronLeft />
            <span className="text-base">Quay lại</span>
          </button>

          <h3 className="text-lg font-semibold mb-4">{currentMenu.title}</h3>
          {currentMenu.inputs.map((input) => (
            <div key={input.id} className="mb-2 w-full">
              <InputFormComponent
                placeholder={input.placeholder}
                value={formData[input.field]}
                onChange={(value) => handleOnChange(input.field, value)}
                type={input.type}
              />
              {errors[input.field] && <p className="text-red-500 text-sm mt-1">{errors[input.field]}</p>}
            </div>
          ))}

          <button
            disabled={mutation.isPending}
            onClick={handleLogin}
            className="w-full bg-orange-500 text-white px-4 py-2 mt-4 rounded"
          >
            {mutation.isPending ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </div>
      ) : (
        <>
          <div className={styles["modal-header"]}>
            <h1 className={styles["modal-title"]}>Đăng nhập</h1>
            <p className="text-red-500 text-sm mt-4">
              Mỗi người nên sử dụng riêng một tài khoản. Tài khoản nhiều người sử dụng sẽ bị khóa
            </p>
          </div>

          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`w-full relative px-4 py-2 mt-2 text-sm flex justify-center items-center border rounded-full ${item.bgColor} hover:opacity-80 transition`}
              onClick={() => handleMenuClick(item)}
            >
              {item.icon && <item.icon className="mr-2" />}
              <span>{item.title}</span>
            </button>
          ))}
        </>
      )}

      <div className="mt-4 text-center">
        <p>
          Bạn chưa có tài khoản?{" "}
          <button onClick={switchToRegister} className="underline text-orange-600">
            Đăng ký
          </button>
        </p>
        <p className="mt-2">
          <Link to="/" className="underline text-orange-600">
            Quên mật khẩu?
          </Link>
        </p>
      </div>
    </div>
    </>
  );
};

export default LoginFormComponent;
