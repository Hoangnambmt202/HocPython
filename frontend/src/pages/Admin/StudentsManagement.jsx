import { useEffect, useState } from "react";
import { 
  Edit, 
  Trash, 
  Plus, 
  Filter, 
  Search, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  GraduationCap,
  Eye,
  MoreVertical,
  UserCheck,
  UserX,
  Download,
  Users
} from "lucide-react";
import AddForm from "../../components/AddFormComponent/AddForm";
import UserService from "../../services/UserService";
import Modal from "../../components/ModalComponent/ModalComponent";
import ToastMessageComponent from "../../components/ToastMessageComponent/ToastMessageComponent";
import { Helmet } from "react-helmet-async";
import moment from "moment";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "", color: "" });
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid or table
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    birthday: "",
    school: "",
    role: "user"
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const role = "user";
        const response = await UserService.getUserByRole(role);
        if (response?.data) {
          setStudents(response?.data);
          setFilteredStudents(response?.data);
        } else {
          setStudents([]);
          setFilteredStudents([]);
        }
      } catch (error) {
        setToast({
          show: true,
          message: error.message || "Có lỗi xảy ra",
          color: "red",
        });
      }
    };

    fetchStudents();
  }, []);

  // Filter students based on search and status
  useEffect(() => {
    let filtered = students;

    // Search filter
    if (search) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.email.toLowerCase().includes(search.toLowerCase()) ||
        student.phone.includes(search) ||
        (student.school && student.school.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // Status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter(student => {
        if (filterStatus === "active") return student.isActive === true;
        if (filterStatus === "inactive") return student.isActive === false;
        return true;
      });
    }

    setFilteredStudents(filtered);
  }, [search, filterStatus, students]);

  const handleSubmit = async () => {
    try {
      // Add API call to create new student
      const response = await UserService.registerUser(formData);
      setToast({ show: true, message: "Thêm học viên thành công", color: "green" });
      
      // Refresh students list
      const role = "user";
      const getStudents = await UserService.getUserByRole(role);
      if (getStudents.data) {
        setStudents(getStudents.data);
        setFilteredStudents(getStudents.data);
      }
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        birthday: "",
        school: ""
      });
      setShowAddModal(false);
    } catch (error) {
      setToast({
        show: true,
        message: error.message || "Có lỗi xảy ra",
        color: "red",
      });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await UserService.deleteUser(userToDelete);
      setIsOpen(false);
      setToast({ show: true, message: response.message, color: "green" });
      const role = "user";
      const getStudents = await UserService.getUserByRole(role);
      if (getStudents.data) {
        setStudents(getStudents.data);
        setFilteredStudents(getStudents.data);
      }
    } catch (error) {
      console.error(error);
      setToast({
        show: true,
        message: "Lỗi khi xóa học viên",
        color: "red",
      });
    } finally {
      setIsOpen(false);
      setUserToDelete(null);
    }
  };

  const handleViewDetail = (student) => {
    setSelectedStudent(student);
    setShowDetailModal(true);
  };

  // Stats calculation
  const stats = {
    total: students.length,
    active: students.filter(s => s.isActive === true).length,
    inactive: students.filter(s => s.isActive === false).length,
    thisMonth: students.filter(s => 
      moment(s.createdAt).isSame(moment(), 'month')
    ).length
  };

  return (
    <>
      <Helmet>
        <title>Admin | Quản lý học viên</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto p-6">
          {toast.show && (
            <ToastMessageComponent
              message={toast.message}
              color={toast.color}
              onClose={() => setToast({ ...toast, show: false })}
            />
          )}

          {/* Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Quản lý Học viên
                </h1>
                <p className="text-gray-600">Quản lý thông tin và trạng thái học viên</p>
              </div>
              <div className="flex gap-3">
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg flex items-center transition duration-200">
                  <Download className="mr-2" size={18} />
                  Xuất Excel
                </button>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-lg flex items-center transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <Plus className="mr-2" size={18} />
                  Thêm học viên
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Tổng học viên</p>
                    <p className="text-2xl font-bold">{stats.total}</p>
                  </div>
                  <Users className="text-blue-200" size={24} />
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Đang hoạt động</p>
                    <p className="text-2xl font-bold">{stats.active}</p>
                  </div>
                  <UserCheck className="text-green-200" size={24} />
                </div>
              </div>
              <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100 text-sm">Đã khóa</p>
                    <p className="text-2xl font-bold">{stats.inactive}</p>
                  </div>
                  <UserX className="text-red-200" size={24} />
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Mới tháng này</p>
                    <p className="text-2xl font-bold">{stats.thisMonth}</p>
                  </div>
                  <Calendar className="text-purple-200" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Tìm kiếm học viên..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-4">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="active">Đang hoạt động</option>
                  <option value="inactive">Đã khóa</option>
                </select>

                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition duration-200 ${
                      viewMode === "grid" 
                        ? "bg-white text-blue-600 shadow-sm" 
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Card
                  </button>
                  <button
                    onClick={() => setViewMode("table")}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition duration-200 ${
                      viewMode === "table" 
                        ? "bg-white text-blue-600 shadow-sm" 
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Table
                  </button>
                </div>
              </div>
            </div>

            {/* Results count */}
            <div className="mt-4 text-sm text-gray-600">
              Hiển thị {filteredStudents.length} / {students.length} học viên
            </div>
          </div>

          {/* Students List */}
          {viewMode === "grid" ? (
            // Grid View
            <div className="space-y-6">
              {filteredStudents?.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="text-gray-400" size={32} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có học viên nào</h3>
                  <p className="text-gray-500 mb-6">
                    {search || filterStatus !== "all" 
                      ? "Không tìm thấy học viên phù hợp với bộ lọc"
                      : "Hãy thêm học viên đầu tiên để bắt đầu"
                    }
                  </p>
                  {(!search && filterStatus === "all") && (
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
                    >
                      Thêm học viên mới
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredStudents.map((student) => (
                    <div
                      key={student._id}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 transform hover:-translate-y-1 overflow-hidden"
                    >
                      {/* Header */}
                      <div className="p-6 pb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                              {student?.name?.charAt(0).toUpperCase()}
                            </div>
                            <div className="ml-3">
                              <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                              <div className="flex items-center mt-1">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  student.isActive === true
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}>
                                  {student.isActive === true ? "Hoạt động" : "Đã khóa"}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative">
                            <button className="p-1 hover:bg-gray-100 rounded-full transition duration-200">
                              <MoreVertical size={18} className="text-gray-400" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Student Info */}
                      <div className="px-6 pb-4 space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail size={16} className="mr-2 text-gray-400" />
                          <span className="truncate">{student.email}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone size={16} className="mr-2 text-gray-400" />
                          <span>{student.phone || "Chưa cập nhật"}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <GraduationCap size={16} className="mr-2 text-gray-400" />
                          <span className="truncate">{student.school || "Chưa cập nhật"}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar size={16} className="mr-2 text-gray-400" />
                          <span>{moment(student.createdAt).format('DD/MM/YYYY')}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewDetail(student)}
                            className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium py-2 px-3 rounded-lg transition duration-200 flex items-center justify-center text-sm"
                          >
                            <Eye size={16} className="mr-1" />
                            Xem
                          </button>
                          <button className="flex-1 bg-green-50 hover:bg-green-100 text-green-600 font-medium py-2 px-3 rounded-lg transition duration-200 flex items-center justify-center text-sm">
                            <Edit size={16} className="mr-1" />
                            Sửa
                          </button>
                          <button
                            onClick={() => {
                              setIsOpen(true);
                              setUserToDelete(student._id);
                            }}
                            className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 font-medium py-2 px-3 rounded-lg transition duration-200 flex items-center justify-center text-sm"
                          >
                            <Trash size={16} className="mr-1" />
                            Xóa
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            // Table View
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Học viên
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Liên hệ
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trường học
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ngày đăng ký
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trạng thái
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hành động
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStudents.map((student) => (
                      <tr key={student._id} className="hover:bg-gray-50 transition duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                              {student.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">{student.name}</div>
                              <div className="text-sm text-gray-500">{student.birth || "Chưa cập nhật"}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{student.email}</div>
                          <div className="text-sm text-gray-500">{student.phone || "Chưa cập nhật"}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.school || "Chưa cập nhật"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {moment(student.createdAt).format('DD/MM/YYYY')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            student.isActive === true
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}>
                            {student.isActive === true ? "Hoạt động" : "Đã khóa"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleViewDetail(student)}
                              className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded transition duration-200"
                              title="Xem chi tiết"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              className="text-green-600 hover:text-green-900 p-1 hover:bg-green-50 rounded transition duration-200"
                              title="Chỉnh sửa"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => {
                                setIsOpen(true);
                                setUserToDelete(student._id);
                              }}
                              className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded transition duration-200"
                              title="Xóa"
                            >
                              <Trash size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="Xác Nhận Xóa"
            onClose={() => setIsOpen(false)}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <Trash className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-lg">
                    Bạn có chắc chắn muốn xóa học viên này?
                  </h4>
                  <p className="text-gray-500 mt-1">
                    Hành động này không thể hoàn tác. Tất cả dữ liệu của học viên sẽ bị xóa vĩnh viễn.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                Xác nhận xóa
              </button>
            </div>
          </Modal>

          {/* Student Detail Modal */}
          {showDetailModal && selectedStudent && (
            <Modal
              isOpen={showDetailModal}
              setIsOpen={setShowDetailModal}
              title="Chi tiết học viên"
              onClose={() => setShowDetailModal(false)}
            >
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {selectedStudent.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900">{selectedStudent.name}</h3>
                    <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full mt-1 ${
                      selectedStudent.isActive === true
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {selectedStudent.isActive === true ? "Đang hoạt động" : "Đã khóa"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                      <div className="flex items-center text-gray-900">
                        <Mail size={16} className="mr-2 text-gray-400" />
                        {selectedStudent.email}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Số điện thoại</label>
                      <div className="flex items-center text-gray-900">
                        <Phone size={16} className="mr-2 text-gray-400" />
                        {selectedStudent.phone || "Chưa cập nhật"}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Ngày sinh</label>
                      <div className="flex items-center text-gray-900">
                        <Calendar size={16} className="mr-2 text-gray-400" />
                        {selectedStudent.birth || "Chưa cập nhật"}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Trường học</label>
                      <div className="flex items-center text-gray-900">
                        <GraduationCap size={16} className="mr-2 text-gray-400" />
                        {selectedStudent.school || "Chưa cập nhật"}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Địa chỉ</label>
                      <div className="flex items-center text-gray-900">
                        <MapPin size={16} className="mr-2 text-gray-400" />
                        {selectedStudent.address || "Chưa cập nhật"}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Ngày đăng ký</label>
                      <div className="text-gray-900">
                        {moment(selectedStudent.createdAt).format('DD/MM/YYYY HH:mm')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          )}

          {/* Add Student Modal/Form */}
          {showAddModal && (
            <AddForm
              title="Thêm học viên mới"
              onClose={() => {
                setShowAddModal(false);
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  address: "",
                  birthday: "",
                  school: ""
                });
              }}
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên học viên
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    placeholder="Nhập tên học viên"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    placeholder="Nhập email"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    placeholder="Nhập số điện thoại"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày sinh
                  </label>
                  <input
                    type="date"
                    value={formData.birthday}
                    onChange={(e) => setFormData({...formData, birthday: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trường học
                </label>
                <input
                  type="text"
                  value={formData.school}
                  onChange={(e) => setFormData({...formData, school: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="Nhập tên trường học"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Địa chỉ
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="Nhập địa chỉ"
                  rows="3"
                />
              </div>
            </AddForm>
          )}
        </div>
      </div>
    </>
  );
};

export default ManageStudents;