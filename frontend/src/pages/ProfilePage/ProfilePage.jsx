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
  import { Helmet } from "react-helmet-async";
  import { useMutation } from "@tanstack/react-query";
  import { useDispatch, useSelector } from "react-redux";
  import { Link } from "react-router-dom";

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

    const user = useSelector((state) => state.user.user);
    const enrolledCourses = useSelector(
      (state) => state.enrollment.enrolledCourses
    );
    const progress = useSelector((state) => state.progress.allCourseProgress);
    const [isEditing, setIsEditing] = useState(false);
    const [optionsState, setOptionsState] = useState("1");
    const [toast, setToast] = useState({ show: false, message: "", color: "" });
    const [modalOpen, setModalOpen] = useState(false);
    const [editedData, setEditedData] = useState({});
    const dispatch = useDispatch();

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
    const avatarMutation = useMutation({
      mutationFn: (file) => UserService.uploadAvatar(file), 
      onSuccess: (data) => {
        setToast({
          show: true,
          message: "Cập nhật avatar thành công",
          color: "green",
          duration: 2000,
        });
    
        dispatch(setUser({ ...user, 
          avatar: data.avatar } ));
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
      setModalOpen(false);
      setIsEditing(false);
    };

    useEffect(() => {
      // Remove loading effect since we're not using it
    }, [user]);

    if (mutation.isLoading) {
      return <LoadingComponent />;
    }

    if (!user) {
      return (
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-xl shadow-md">
            <div className="flex flex-col py-10 md:flex-row gap-8">
              <div className="md:w-1/4 container mx-auto px-4 mb-4 md:mb-0">
                <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
                  <img
                    src="/src/assets/imgs/default-avatar.jpg"
                    alt="Default Avatar"
                    className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
                  />
                  <div className="flex items-center justify-center mt-4">
                    <h3 className="text-xl font-semibold text-center mr-2">
                      Guest
                    </h3>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <SquarePen width="1rem" height="1rem" />
                    </button>
                  </div>
                  <div className="text-gray-600 flex justify-start items-center mt-4 mb-2">
                    <span className="mr-2 text-blue-500">
                      <Mail size={18} />
                    </span>
                    <span className="text-sm">Chưa cập nhật email</span>
                  </div>
                  <div className="text-gray-600 flex justify-start items-center mb-2">
                    <span className="mr-2 text-blue-500">
                      <Phone size={18} />
                    </span>
                    <span className="text-sm">Chưa cập nhật số điện thoại</span>
                  </div>
                  <div className="text-gray-600 flex justify-start items-center mb-2">
                    <span className="mr-2 text-blue-500">
                      <User size={18} />
                    </span>
                    <span className="text-sm">Chưa cập nhật role</span>
                  </div>
                  <div className="text-gray-600 flex justify-start items-center mb-2">
                    <span className="mr-2">
                      <Dot className="text-red-500" size={18} />
                    </span>
                    <span className="text-sm">Đã Mở</span>
                  </div>
                </div>
              </div>
              <div className="md:w-3/4 px-4 container mx-auto">
                <header className="flex justify-between items-center mb-8 border-b pb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 flex items-center text-blue-600">
                      <span className="mr-2">
                        <BookCheck />
                      </span>
                      Khóa học của tôi
                    </h3>
                    <p className="text-gray-500">
                      Bạn chưa đăng nhập để xem khóa học. Vui lòng đăng nhập!
                    </p>
                  </div>
                  <div>
                    <select className="w-fit border p-2 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="latest">Mới nhất</option>
                      <option value="popular">Phổ biến</option>
                      <option value="free">Miễn phí</option>
                    </select>
                  </div>
                </header>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div className="col-span-full bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                    <h2 className="text-red-500 font-bold">
                      Bạn chưa đăng nhập. Vui lòng đăng nhập để xem thông tin cá
                      nhân và khóa học.
                    </h2>
                  </div>
                </div>
                <h4 className="text-2xl flex font-bold items-center mt-8 mb-4 text-blue-600">
                  <span className="mr-2">
                    <BookMarked />
                  </span>
                  Saved Articles
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedArticles.map((article) => (
                    <div
                      key={article.id}
                      className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <h5 className="text-md font-semibold text-gray-800">
                        {article.title}
                      </h5>
                      <p className="text-gray-600 text-sm mt-2">
                        {article.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        <Helmet>
          <title>HocPython | Trang cá nhân</title>
        </Helmet>
        <div className="min-h-screen bg-gray-50 py-12">
          {toast.show && (
            <ToastMessageComponent
              message={toast.message}
              color={toast.color}
              onClose={() => setToast({ ...toast, show: false })}
            />
          )}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-xl shadow-md">
            <div className="flex flex-col py-10 md:flex-row gap-8">
              <div className="md:w-1/4 container mx-auto px-4 mb-4 md:mb-0">
                <Modal
                  isOpen={modalOpen}
                  title="Chỉnh sửa thông tin"
                  onClose={() => setModalOpen(false)}
                >
                  <div className="w-full p-4 scrollbar-hide">
                    <form className="">
                      {isEditing ? (
                        <>
                          <div className="mb-8 flex flex-col items-center">
                            <img
                              src={user.avatar}
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
                              className="mt-1 block w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                              className="mt-1 block w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                                className="mt-1 block w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                                placeholder={
                                  user?.birth || "Chưa cập nhật ngày sinh"
                                }
                                value={editedData?.birth}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                                className="mt-1 block w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                                className="mt-1 block w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                            <p className="mt-2 text-gray-800">
                              {editedData.name}
                            </p>
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor="birth"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Ngày sinh
                            </label>
                            <p className="mt-2 text-gray-800">
                              {editedData.birth}
                            </p>
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Email
                            </label>
                            <p className="mt-2 text-gray-800">
                              {editedData.email}
                            </p>
                          </div>
                          <div className="mb-4 grid grid-cols-2 gap-4">
                            <div>
                              <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Số điện thoại
                              </label>
                              <p className="mt-2 text-gray-800">
                                {editedData.phone}
                              </p>
                            </div>
                            <div>
                              <label
                                htmlFor="Ngày sinh"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Ngày sinh
                              </label>
                              <p className="mt-2 text-gray-800">
                                {editedData.birth}
                              </p>
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
                              <p className="mt-2 text-gray-800">
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
                                className="mt-1 block w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                name=""
                                id=""
                              >
                                <option>Chọn chuyên ngành</option>
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
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                      >
                        {mutation.isPending ? "Đang lưu..." : "Lưu"}
                      </button>
                    </div>
                  </div>
                </Modal>

                <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
                  <img
                    src={user.avatar}
                    alt={`User Avatar ${user.name}`}
                    className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
                  />
                  <div className="flex items-center justify-center mt-4">
                    <h3 className="text-xl font-semibold text-center mr-2">
                      {user?.name || "Guest"}
                    </h3>
                    <button
                      onClick={handleModalEdit}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <SquarePen width="1rem" height="1rem" />
                    </button>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="text-gray-600 flex items-center p-2 hover:bg-gray-100 rounded-md transition-colors">
                      <span className="mr-3 text-blue-500">
                        <Mail size={18} />
                      </span>
                      <span className="text-sm">
                        {user?.email || "Chưa cập nhật email"}
                      </span>
                    </div>

                    <div className="text-gray-600 flex items-center p-2 hover:bg-gray-100 rounded-md transition-colors">
                      <span className="mr-3 text-blue-500">
                        <Cake size={18} />
                      </span>
                      <span className="text-sm">
                        {user?.birth || "Chưa cập nhật ngày sinh"}
                      </span>
                    </div>

                    <div className="text-gray-600 flex items-center p-2 hover:bg-gray-100 rounded-md transition-colors">
                      <span className="mr-3 text-blue-500">
                        <Phone size={18} />
                      </span>
                      <span className="text-sm">
                        {user?.phone || "Chưa cập nhật số điện thoại"}
                      </span>
                    </div>

                    <div className="text-gray-600 flex items-center p-2 hover:bg-gray-100 rounded-md transition-colors">
                      <span className="mr-3 text-blue-500">
                        <University size={18} />
                      </span>
                      <span className="text-sm">
                        {user?.school || "Chưa cập nhật trường học"}
                      </span>
                    </div>

                    <div className="text-gray-600 flex items-center p-2 hover:bg-gray-100 rounded-md transition-colors">
                      <span className="mr-3 text-blue-500">
                        <GraduationCap size={18} />
                      </span>
                      <span className="text-sm">
                        {user?.major || "Chưa cập nhật chuyên ngành"}
                      </span>
                    </div>

                    <div className="text-gray-600 flex items-center p-2 hover:bg-gray-100 rounded-md transition-colors">
                      <span className="mr-3 text-blue-500">
                        <User size={18} />
                      </span>
                      <span className="text-sm">
                        {user?.role || "Chưa cập nhật role"}
                      </span>
                    </div>

                    <div className="text-gray-600 flex items-center p-2 hover:bg-gray-100 rounded-md transition-colors">
                      <span className="mr-3">
                        <Dot
                          className={
                            user?.isActive ? "text-green-500" : "text-red-500"
                          }
                          size={18}
                        />
                      </span>
                      <span className="text-sm">
                        {user?.isActive ? "Đang hoạt động" : "Đã khóa"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-3/4 px-4 container mx-auto">
                <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 border-b pb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 flex items-center text-blue-600">
                      <span className="mr-2">
                        <BookCheck />
                      </span>
                      Khóa học của tôi
                    </h3>
                    <p className="text-gray-500">
                      {enrolledCourses?.length > 0
                        ? `Bạn đã đăng ký ${enrolledCourses.length} khóa học`
                        : "Bạn chưa đăng ký khóa học nào"}
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <select className="w-full md:w-auto border p-2 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                      <option value="latest">Mới nhất</option>
                      <option value="popular">Phổ biến</option>
                      <option value="free">Miễn phí</option>
                    </select>
                  </div>
                </header>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 grid-cols-2  gap-4 mb-4">
                  {enrolledCourses && enrolledCourses.length > 0 ? (
                    enrolledCourses.map((enrollment) => {
                      const course = enrollment.courseId;
                      const {
                        progress: progressPercentage = 0,
                        completedLessons = 0,
                        totalLessons = 0
                      } = progress[course?._id] || {};
                      
                      return (
                        <div
                          key={course?._id}
                          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                        >
                          <img
                            src={course?.thumbnail}
                            alt={course?.title}
                            className="w-full h-40 object-cover"
                          />
                          <div className="p-4">
                            <h4 className="font-semibold text-base sm:text-base md:text-lg lg:text-lg mb-2 line-clamp-2">
                              {course?.title}
                            </h4>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                              {course?.description}
                            </p>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm text-gray-600">
                                <span>Tiến độ</span>
                              
                                <span>{progressPercentage}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${progressPercentage}%` }}
                                />
                              </div>
                              <div className="text-xs text-gray-500">
                                {completedLessons}/{totalLessons} bài học
                              </div>
                            </div>
                            <Link
                              to={`/course/${course?.slug}/learn`}
                              className="mt-4 block text-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                              
                              Tiếp tục học
                            </Link>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="col-span-full bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
                      <p className="text-blue-700">
                        Bạn chưa đăng ký khóa học nào. Hãy khám phá các khóa học
                        của chúng tôi!
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap items-center justify-center mb-6">
                  <Link
                    to="/courses"
                    className="mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Xem tất cả khóa học
                  </Link>
                </div>

                <h4 className="text-2xl flex font-bold items-center mt-10 mb-4 text-blue-600 border-b pb-2">
                  <span className="mr-2">
                    <BookMarked />
                  </span>
                  Saved Articles
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedArticles.map((article) => (
                    <div
                      key={article.id}
                      className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <h5 className="text-lg font-semibold text-gray-800 mb-2">
                        {article.title}
                      </h5>
                      <p className="text-gray-600">{article.description}</p>
                      <div className="mt-4 flex justify-end">
                        <button className="text-blue-600 text-sm hover:text-blue-800 transition-colors">
                          Đọc thêm →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  export default ProfilePage;
