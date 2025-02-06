import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { faChevronCircleLeft, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {  useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import styles from "../../styles/Modal.module.scss";
import UserService from "../../services/UserService";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import InputFormComponent from "../InputFormComponent/InputFormComponent";

// eslint-disable-next-line react/prop-types
const LoginFormComponent = ({ switchToRegister ,setIsOpen, onLoginSuccess }) => {
 
  const MENU_ITEMS = [
    {
      id: 1,
      icon: faUser,
      title: "Sử dụng email / số điện thoại",
      bgColor: "bg-gray-200 text-gray-600",
      children: {
        title: "Đăng nhập bằng email hoặc số điện thoại",
        inputs: [
          { id: 1, type: "text", placeholder: "Email hoặc số điện thoại" },
          { id: 2, type: "text", placeholder: "Mật khẩu" },
        ],
      },
    },
    {
      id: 2,
      icon: faGoogle,
      title: "Đăng nhập với Google",
      bgColor: "bg-red-500 text-white",
    },
    {
      id: 3,
      icon: faFacebook,
      title: "Đăng nhập với Facebook",
      bgColor: "bg-blue-500 text-white",
    },
    {
      id: 4,
      icon: faGithub, 
      title: "Đăng nhập với Github",
      bgColor: "bg-black text-white",
    },
  ];

  const [history, setHistory] = useState([]);
  const curentMenu = history[history.length - 1] || null;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Thêm trạng thái lưu thông báo
  const [messageType, setMessageType] = useState(""); // Lưu loại thông báo ('success' hoặc 'error')

  const navigate = useNavigate();
  const handleMenuClick = (item) => {
    if (item.children) {
      setHistory([...history, item.children]);
    }
  };
  const handleOnChange = (field, value) => {
    if (field === "email") {
      setEmail(value);
    } else if (field === "password") {
      setPassword(value);
    }
  };
 
 

  const handleBack = () => {
    setHistory(history.slice(0, history.length - 1));
  };
  const mutation = useMutation({
    mutationFn: UserService.loginUser,
  
    onSuccess: (data) => {
      if (data.status === "err") {
        setMessage(data.message);
        setMessageType("error");
      } else {
        setMessage(data.message || "Đăng nhập thành công!");
        setMessageType("success");
        localStorage.setItem("user", JSON.stringify(data.user));
        onLoginSuccess(data.user);
        setIsOpen(false); // Đóng modal
      
      }
    },
    onError: (error) => {
      setMessage(error.response?.data?.message || "Đã xảy ra lỗi!");
      setMessageType("error");
      console.log(error);
    },
  });
 
  const handleLogin = () => {
    mutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          
          if (data.status === "err") {
            setMessage(data.message);
            setMessageType("error");
          } else {
            setMessage(data.message || "Đăng nhập thành công!");
            setMessageType("success");
            localStorage.setItem("user", JSON.stringify(data.user)); 
            onLoginSuccess(data.user);
            setIsOpen(false) ;
            navigate("/");
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
    <div className="w-[80%] mx-auto flex flex-col items-center">
      {curentMenu ? (
        // Hiển thị menu con nếu có
        <div>
          {mutation.isPending && <LoadingComponent />}
          <button
            onClick={handleBack}
            className="text-gray-500 absolute left-14 top-10 text-3xl mb-2"
          >
            <FontAwesomeIcon icon={faChevronCircleLeft} />
          </button>

          <h3 className="text-lg font-semibold mb-4">{curentMenu.title}</h3>
          {curentMenu.inputs &&
            curentMenu.inputs.map((input) => (
             
              <InputFormComponent
                key={input.id}
                placeholder={input.placeholder}
                value={input.id === 1 ? email : password}
                onChange={(value) => handleOnChange(input.id === 1 ? "email" : "password", value)}
              />
            ))}
          <div>
            <button
              disabled={mutation.isLoading}
              onClick={handleLogin}
              className="w-full bg-orange-500 text-white px-4 py-2 mt-4 rounded"
            >
              {mutation.isPending ? "Đang đăng nhập..." : "Đăng nhập"}
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
          </div>
        </div>
      ) : (
        // Hiển thị danh sách menu chính
        <>
          <div className={styles["modal-header"]}>
            <h1 className={styles["modal-title"]}>Đăng nhập</h1>
            <p className="text-red-500 text-sm mt-4">
              Mỗi người nên sử dụng riêng một tài khoản. Tài khoản nhiều người
              sử dụng sẽ bị khóa{" "}
            </p>
          </div>
          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`w-full relative px-4 py-2 mt-2 text-sm flex justify-center items-center border rounded-full ${item.bgColor} hover:opacity-80 transition`}
              onClick={() => handleMenuClick(item)}
            >
              <FontAwesomeIcon
                icon={item.icon}
                className="text-sm absolute left-4"
              />
              <span>{item.title}</span>
            </button>
          ))}
        </>
      )}

      {/* Footer */}
      <div className="mt-4 text-center">
        <p>
          Bạn chưa có tài khoản?{" "}
          <Link
            onClick={switchToRegister}
            className="underline text-orange-600"
          >
            Đăng ký
          </Link>
        </p>
        <p className="mt-2">
          <Link to="/" className="underline text-orange-600">
            Quên mật khẩu?
          </Link>
        </p>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500 max-w-[70%] mx-auto">
          Việc bạn tiếp tục sử dụng trang web này đồng nghĩa với việc bạn đồng ý
          với{" "}
          <Link to="/terms" className="underline">
            điều khoản sử dụng
          </Link>{" "}
          của chúng tôi.
        </p>
      </div>
    </div>
  );
};

export default LoginFormComponent;
