import { useState } from "react";
import { Edit, Trash, Plus, ChevronLeft, ChevronRight, Filter, ChevronDown, Search } from "lucide-react";
import AddForm from "../../components/AddFormComponent/AddForm";

const studentsData = [
  { id: 1, name: "Nguyen Van A", email: "a@gmail.com", date: "2024-01-10", status: "Active" },
  { id: 2, name: "Tran Van B", email: "b@gmail.com", date: "2024-01-12", status: "Inactive" },
  { id: 3, name: "Le Thi C", email: "c@gmail.com", date: "2024-01-15", status: "Active" },
  { id: 4, name: "Pham Van D", email: "d@gmail.com", date: "2024-01-18", status: "Inactive" },
  { id: 5, name: "Bui Thi E", email: "e@gmail.com", date: "2024-01-20", status: "Active" },
];

const ManageStudents = () => {
  const [students, setStudents] = useState(studentsData);
  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 3;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleDelete = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };
  const handleSubmit = () => {
    console.log('Thêm học viên:', { name, email, phone });
    // Gọi API hoặc xử lý dữ liệu ở đây
  };

  // const handleSearch = (e) => {
  //   setSearch(e.target.value);
  // };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.email.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  return (
    <div className="py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Danh Sách Học Viên</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Thêm Học Viên
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex justify-between items-center space-x-4">
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm khóa học..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
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
            <th className="border border-gray-300 p-2">Ngày đăng ký</th>
            <th className="border border-gray-300 p-2">Trạng thái</th>
            <th className="border border-gray-300 p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map(student => (
            <tr key={student.id} className="text-center">
              <td className="border border-gray-300 p-2">{student.name}</td>
              <td className="border border-gray-300 p-2">{student.email}</td>
              <td className="border border-gray-300 p-2">{student.date}</td>
              <td className="border border-gray-300 p-2">{student.status}</td>
              <td className="border border-gray-300 p-2">
                <button className="mr-2 p-1 bg-blue-500 text-white rounded"><Edit size={16} /></button>
                <button className="p-1 bg-red-500 text-white rounded" onClick={() => handleDelete(student.id)}><Trash size={16} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button 
          className={`px-4 py-2 border rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`} 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft /> Trước
        </button>
        <span>Trang {currentPage} / {totalPages}</span>
        <button 
          className={`px-4 py-2 border rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`} 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Sau <ChevronRight />
        </button>
      </div>
      {showAddModal && (
        <AddForm title="Thêm học viên mới" onClose={()=> {setShowAddModal(false)}} onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tên học viên</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
      </AddForm>
      )}
    </div>
  );
}
export default ManageStudents;