import { useEffect, useState } from "react";
import {
  BookCheck,
  BookMarked,
  Cake,
  Camera,
  Dot,
  GraduationCap,
  Mail,
  Phone,
  SquarePen,
  University,
  User,
} from "lucide-react";
import {Helmet} from "react-helmet-async";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

import UserService from "../../services/UserService";
import Modal from "../../components/ModalComponent/ModalComponent";
import ToastMessageComponent from "../../components/ToastMessageComponent/ToastMessageComponent";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { setUser } from "../../redux/slides/userSlides";

const ProfilePage = () => {
  const savedArticles = [
    { id: 1, title: "Article 1", description: "Description of article 1" },
    { id: 2, title: "Article 2", description: "Description of article 2" },
    // Add more articles as needed
  ];

  const user = useSelector((state) => state.user.user); // Lấy user từ Redux
  const enrolledCourses = useSelector((state) => state.progress.enrolledCourses);
  console.log(enrolledCourses)
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(true);
  const [toast, setToast] = useState({ show: false, message: "", color: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [optionsState, setOptionsState] = useState("1");
  const [editedData, setEditedData] = useState({});
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  // Chạy lại khi Redux dispatch thay đổi
  const mutation = useMutation({
    mutationFn: UserService.updateUser,
    onSuccess: (data) => {
      setToast({
        show: true,
        message: data.message,
        color: "green",
        duration: 2000,
      });
      dispatch(setUser(data.data));
    },
    onError: (error) => {
      setToast(error.response?.data?.message || "Đã xảy ra lỗi!");

    },
  });
  const handleModalEdit = () => {
    setModalOpen(true);
    setIsEditing(true);
  };
  const handleChangeOption = (e) => {
    setOptionsState(e.target.value);
    setEditedData((prev) => ({
      ...prev,
      major: e.target.value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (!editedData.name) {
      setEditedData((prev) => ({ ...prev, name: "Chưa cập nhật tên" }));
    }
    if (!editedData.email) {
      setEditedData((prev) => ({ ...prev, email: "Chưa cập nhật email" }));
    }
    if (!editedData.phone) {
      setEditedData((prev) => ({
        ...prev,
        phone: "Chưa cập nhật số điện thoại",
      }));
    }

    const access_token = localStorage.getItem("access_token");
    mutation.mutate({
      data: {
        name: editedData?.name,
        email: editedData?.email,
        phone: editedData?.phone,
        birth: editedData?.birth,
        school: editedData?.school,
        major: editedData?.major,
      },
      access_token: access_token,
    });
    console.log(editedData);
    setModalOpen(false);
    setIsEditing(false);
  };
  useEffect(() => {
    setLoading(false);
  }, [user]); // Khi user thay đổi, component sẽ re-render

  if (mutation.isLoading) {
    return <LoadingComponent />;
  }
  if (!user) {
    return (
      <>
        <div className="container mx-auto p-4 bg-white">
          <div className="flex flex-col py-10 md:flex-row">
            <div className="md:w-1/4 container mx-auto px-4 mb-4 md:mb-0">
              <img
                src={user?.avatar || "/src/assets/imgs/default-avatar.jpg"}
                alt={`User Avatar ${user?.name || "Guess"}`}
                className="w-32 h-32 rounded-full object-fill mx-auto"
              />
              <div className="flex items-center justify-center">
                <h3 className="text-xl font-semibold text-center mr-2">
                  {user?.name || "Guest"}
                </h3>
                <button>
                  <SquarePen width="1rem" height="1rem" />
                </button>
              </div>
              <div className="text-gray-600 flex justify-start items-center mb-2">
                <span className="mr-2">
                  <Mail />
                </span>
                <span>{user?.email || "Chưa cập nhật email"}</span>
              </div>
              <div className="text-gray-600 flex justify-start items-center mb-2">
                <span className="mr-2">
                  <Phone />
                </span>
                <span>{user?.phone || "Chưa cập nhật số điện thoại"}</span>
              </div>
              <div className="text-gray-600 flex justify-start items-center mb-2">
                <span className="mr-2">
                  <User />
                </span>
                <span>{user?.role || "Chưa cập nhật role"}</span>
              </div>
              <div className="text-gray-600 flex justify-start items-center mb-2">
                <span className="mr-2">
                  <Dot
                    className={
                      active == undefined ? "text-red-500" : "text-green-500"
                    }
                  />
                </span>
                <span>{user?.isActive ? "Đang hoạt động" : "Đã Mở"}</span>
              </div>
            </div>
            <div className="md:w-3/4 px-4 container mx-auto">
              <header className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-2xl font-bold mb-2 flex items-center">
                    {" "}
                    <span className="mr-2">
                      <BookCheck />
                    </span>{" "}
                    Khóa học của tôi
                  </h3>
                  <p>Bạn chưa đăng nhập để xem khóa học. Vui lòng đăng nhập!</p>
                </div>
                <div>
                  <select className="w-fit border p-2 rounded-md">
                    <option value="latest">Mới nhất</option>
                    <option value="popular">Phổ biến</option>
                    <option value="free">Miễn phí</option>
                  </select>
                </div>
              </header>
              <div className="grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                <h2 className="text-red-500 font-bold">
                  Bạn chưa đăng nhập. Vui lòng đăng nhập để xem thông tin cá
                  nhân và khóa học.
                </h2>
              </div>
              <h4 className="text-2xl flex font-bold items-center mt-6 mb-3">
                {" "}
                <span className="mr-2">
                  <BookMarked />
                </span>
                Saved Articles
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedArticles.map((article) => (
                  <div
                    key={article.id}
                    className="bg-white p-4 rounded-lg shadow-md"
                  >
                    <h5 className="text-md font-semibold">{article.title}</h5>
                    <p className="text-gray-600">{article.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Helmet>
  <title>HocPython | Trang cá nhân</title>
</Helmet>
    <div className="container mx-auto p-4 bg-white">
      {toast.show && (
        <ToastMessageComponent
          message={toast.message}
          color={toast.color}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
      <div className="flex flex-col py-10 md:flex-row">
        <div className="md:w-1/4 container mx-auto px-4 mb-4 md:mb-0">
          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
            <div className="w-full p-4 max-h-[500px] overflow-y-auto overflow-scroll">
              <h2 className="text-2xl font-bold mb-4">Cập nhật hồ sơ</h2>
              <form className="">
                {isEditing ? (
                  <>
                    <div className="mb-8">
                      <img
                        src={user.avatar}
                        alt={`User Avatar ${user.name}`}
                        className="w-32 h-32 rounded-full object-fill mx-auto"
                      />
                    <button className="mt-2 rounded-full border border-black p-2">
                      <Camera width="1.25rem" height="1.25rem" />
                    </button>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Họ và tên
                      </label>
                      <input
                        type="name"
                        name="name"
                        value={editedData?.name}
                        placeholder={user?.name}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder={user?.email}
                        value={editedData?.email}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="mb-4 grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Số điện thoại
                        </label>
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          placeholder={user?.phone}
                          value={editedData?.phone}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                    "
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="Ngày sinh"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Ngày sinh
                        </label>
                        <input
                          type="date"
                          id="birth"
                          name="birth"
                          placeholder={user?.birth || "Chưa cập nhật ngày sinh"}
                          value={editedData?.birth}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                    "
                        />
                      </div>
                    </div>
                    <div className="mb-4 grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="school"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Trường học
                        </label>
                        <input
                          type="text"
                          id="school"
                          name="school"
                          placeholder={
                            user?.school || "Chưa cập nhật trường học"
                          }
                          value={editedData?.school}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                    "
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="major"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Chuyên ngành
                        </label>
                        <select
                          className=" w-full p-2 mt-1 rounded-lg"
                          name="major"
                          id="major"
                          value={optionsState}
                          onChange={handleChangeOption}
                        >
                          <option value="">Chọn chuyên ngành</option>
                          <option value="1">Chuyên ngành 1</option>
                          <option value="2">Chuyên ngành 2</option>
                          <option value="3">Chuyên ngành 3</option>
                        </select>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Họ và tên
                      </label>
                      <p className="mt-2">{editedData.name}</p>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="birth"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Ngày sinh
                      </label>
                      <p className="mt-2">{editedData.birth}</p>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <p className="mt-2">{editedData.email}</p>
                    </div>
                    <div className="mb-4 grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Số điện thoại
                        </label>
                        <p className="mt-2">{editedData.phone}</p>
                      </div>
                      <div>
                        <label
                          htmlFor="Ngày sinh"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Ngày sinh
                        </label>
                        <p className="mt-2">{editedData.birth}</p>
                      </div>
                    </div>
                    <div className="mb-4 grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="school"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Trường học
                        </label>
                        <p className="mt-2">
                          {editedData.school || "Chưa có thông tin"}
                        </p>
                      </div>
                      <div>
                        <label
                          htmlFor="Chuyên ngành"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Chuyên ngành
                        </label>
                        <select
                          className=" w-full p-2 mt-1 rounded-lg"
                          name=""
                          id=""
                        >
                          <option >Chọn chuyên ngành</option>
                          <option value="1">Chuyên ngành 1</option>
                          <option value="2">Chuyên ngành 2</option>
                          <option value="3">Chuyên ngành 3</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}
              </form>
              {mutation.isPending && <LoadingComponent />}
              <button onClick={handleSave}>
                {mutation.isPending ? "Đang lưu..." : "Lưu"}
              </button>
            </div>
          </Modal>
          <img
            src={user.avatar}
            alt={`User Avatar ${user.name}`}
            className="w-32 h-32 rounded-full object-fill mx-auto"
          />
          <div className="flex items-center justify-center mb-2">
            <h3 className="text-xl font-semibold text-center mr-2">
              {user?.name || "Guest"}
            </h3>
            <button onClick={handleModalEdit}>
              <SquarePen width="1rem" height="1rem" />
            </button>
          </div>
          <div className="text-gray-600 flex justify-start items-center mb-2">
            <span className="mr-2">
              <Mail />
            </span>
            <span>{user?.email || "Chưa cập nhật email"}</span>
          </div>
          <div className="text-gray-600 flex justify-start items-center mb-2">
            <span className="mr-2">
              <Cake />
            </span>
            <span>{user?.birth || "Chưa cập nhật ngày sinh"}</span>
          </div>
          <div className="text-gray-600 flex justify-start items-center mb-2">
            <span className="mr-2">
              <Phone />
            </span>
            <span>{user?.phone || "Chưa cập nhật số điện thoại"}</span>
          </div>
          <div className="text-gray-600 flex justify-start items-center mb-2">
            <span className="mr-2">
              <University />
            </span>
            <span>{user?.school || "Chưa cập nhật trường học"}</span>
          </div>
          <div className="text-gray-600 flex justify-start items-center mb-2">
            <span className="mr-2">
              <GraduationCap />
            </span>
            <span>{user?.major || "Chưa cập nhật chuyên ngành"}</span>
          </div>
          <div className="text-gray-600 flex justify-start items-center mb-2">
            <span className="mr-2">
              <User />
            </span>
            <span>{user?.role || "Chưa cập nhật role"}</span>
          </div>
          <div className="text-gray-600 flex justify-start items-center mb-2">
            <span className="mr-2">
              <Dot className={active ? "text-green-500" : "text-red-500"} />
            </span>
            <span>{user?.isActive ? "Đang hoạt động" : "Đã khóa"}</span>
          </div>
        </div>
        <div className="md:w-3/4 px-4 container mx-auto">
          <header className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-2 flex items-center">
                {" "}
                <span className="mr-2">
                  <BookCheck />
                </span>{" "}
                Khóa học của tôi
              </h3>
              <p>Bạn đã hoàn thành 3/8 khóa học.</p>
              <div className="flex justify-end">
              {
                // enrolledCourses?.map((course) => (
                //   <div key={course.id}>
                //     <span className="text-gray-500">
                //       {course.title}
                //     </span>
                //   </div>
                // ))

              }
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Xem tất cả
              </button>
              </div>
            </div>
            <div>
              <select className="w-fit border p-2 rounded-md">
                <option value="latest">Mới nhất</option>
                <option value="popular">Phổ biến</option>
                <option value="free">Miễn phí</option>
              </select>
            </div>
          </header>
          <div className="grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
           
          </div>
          <h4 className="text-2xl flex font-bold items-center mt-6 mb-3">
            {" "}
            <span className="mr-2">
              <BookMarked />
            </span>
            Saved Articles
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <h5 className="text-md font-semibold">{article.title}</h5>
                <p className="text-gray-600">{article.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProfilePage;