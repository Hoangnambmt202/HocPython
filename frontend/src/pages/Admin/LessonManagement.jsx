import { useState } from "react";
import { Plus } from "lucide-react";
import AddForm from "../../components/AddFormComponent/AddForm";

const lesson = [
  { id: 1, title: 'Bài 1: Giới thiệu Python', duration: '10:00', status: 'Published' },
  { id: 2, title: 'Bài 2: Cú pháp cơ bản', duration: '15:00', status: 'Draft' },
  { id: 3, title: 'Bài 3: Cấu trúc dữ liệu', duration: '20:00', status: 'Published' },
];

const LessonManagement = () => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [showForm, setShowForm] = useState(false); // State để quản lý hiển thị form

  const handleSubmit = () => {
    console.log('Thêm bài giảng:', { title, duration, description });
    // Gọi API hoặc xử lý dữ liệu ở đây
    setShowForm(false); // Ẩn form sau khi submit
  };

  const handleAddButtonClick = () => {
    setShowForm(!showForm); // Đảo ngược trạng thái hiển thị form
  };

  return (
    <div className="space-y-6 py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Quản Lý Bài Giảng</h1>
        <button
          onClick={handleAddButtonClick}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Thêm Khóa Học
        </button>
      </div>

      {/* Hiển thị form khi showForm là true */}
      {showForm && (
        <AddForm title="Thêm bài giảng mới" onClose={()=> {setShowForm(false)}} onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tiêu đề bài giảng</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Thời lượng</label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mô tả</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </AddForm>
      )}

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Tiêu đề</th>
            <th className="py-2 px-4 border-b">Thời lượng</th>
            <th className="py-2 px-4 border-b">Trạng thái</th>
            <th className="py-2 px-4 border-b">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {lesson.map((lecture) => (
            <tr key={lecture.id}>
              <td className="py-2 px-4 border-b">{lecture.id}</td>
              <td className="py-2 px-4 border-b">{lecture.title}</td>
              <td className="py-2 px-4 border-b">{lecture.duration}</td>
              <td className="py-2 px-4 border-b">
                <span className={`px-2 py-1 text-sm rounded-full ${lecture.status === 'Published' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                  {lecture.status}
                </span>
              </td>
              <td className="py-2 px-4 border-b">
                <button className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2">Sửa</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded-md">Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LessonManagement;