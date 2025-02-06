import { Link } from "react-router-dom";
import UserService from "../../services/UserService";
import { useMutation } from "@tanstack/react-query";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import InputFormComponent from "../InputFormComponent/InputFormComponent";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const RegisterFormComponent = ({ switchToLogin }) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(""); // Thêm trạng thái lưu thông báo
  const [messageType, setMessageType] = useState(""); // Lưu loại thông báo ('success' hoặc 'error')

  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnChangePhone = (value) => {
    setPhone(value);
  };
  const handleOnChangePassword = (value) => {
    setPassword(value);
  };
  const handleOnChangeConfirmPassword = (value) => {
    setConfirmPassword(value);
  };
  const mutation = useMutation({
    mutationFn: UserService.registerUser,
    onSuccess: (data) => {
      setMessage(data.message || "Đăng ký thành công!");
      setMessageType("success");
    },
    onError: (error) => {
      setMessage(error.response?.data?.message || "Đã xảy ra lỗi!");
      setMessageType("error"); 
    },
  });

  const handleSignUp = () => {
    if (!email || !phone || !password || !confirmPassword) {
      setMessage("Vui lòng nhập đầy đủ thông tin.");
      setMessageType("error");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Mật khẩu và xác nhận mật khẩu không khớp.");
      setMessageType("error");
      return;
    }

    mutation.mutate(
      { email, phone, password, confirmPassword },
      {
        onSuccess: (data) => {
          if (data.status === "err") {
            setMessage(data.message);
            setMessageType("error");
          } else {
            setMessage(data.message || "Đăng ký thành công!");
            setMessageType("success");
          }
        },
        onError: (error) => {
          setMessage(error.response?.data?.message || "Đã xảy ra lỗi!");
          setMessageType("error");
        },
      }
    );
  };
  return (
    <div className="flex flex-col w-full max-w-[80%] mx-auto">
      <h3 className="text-2xl font-bold mb-4">Đăng ký</h3>
      {mutation.isPending && <LoadingComponent />}
      <InputFormComponent
        placeholder="Email đăng ký"
        value={email}
        onChange={handleOnChangeEmail}
      />
      <InputFormComponent
        placeholder="Số điện thoại đăng ký"
        value={phone}
        onChange={handleOnChangePhone}
      />
      <InputFormComponent
        placeholder="Mật khẩu"
        value={password}
        onChange={handleOnChangePassword}
      />
      <p className="text-xs mt-2 text-left  "> Mật khẩu ít nhất 8 ký tự, phải bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt  </p>
      <InputFormComponent
        placeholder="Nhập lại mật khẩu"
        value={confirmPassword}
        onChange={handleOnChangeConfirmPassword}
      />

      <button
        onClick={handleSignUp}
        disabled={mutation.isLoading}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 mt-4 rounded-lg"
      >
        {mutation.isLoading ? "Đang đăng ký..." : "Đăng ký"}
      </button>
      {message && (
        <span
          className={`block mb-4 text-sm ${
            messageType === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </span>
      )}
      <p className="mt-4">
        Bạn đã có tài khoản?{" "}
        <Link onClick={switchToLogin} className="underline text-orange-600">
          Đăng nhập
        </Link>
      </p>
    </div>
  );
};

export default RegisterFormComponent;
