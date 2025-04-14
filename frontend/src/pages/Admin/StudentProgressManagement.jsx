import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import UserService from "../../services/UserService";
import ProgressService from "../../services/ProgressService";

export default function StudentProgressAdmin() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentsData, setStudentsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentProgress = async () => {
      try {
        setLoading(true);
        // Lấy danh sách học viên
        const role = "user";
        const studentsRes = await UserService.getUserByRole(role);
        const students = studentsRes.data;

        // Lấy tiến độ cho từng học viên
        const studentsWithProgress = await Promise.all(
          students.map(async (student) => {
            try {
              const progressRes = await ProgressService.getStudentProgress(student._id);
              const progressData = progressRes.data;

              return {
                id: student._id,
                name: student.name,
                email: student.email,
                progress: progressData.summary.averageProgress,
                lessons: progressData.summary.totalLessons,
                completed: progressData.summary.totalCompletedLessons,
                activeCourses: progressData.summary.activeCourses,
                totalCourses: progressData.summary.totalCourses,
                courseProgress: progressData.courses
              };
            } catch (error) {
              console.error(`Error processing student ${student._id}:`, error);
              return {
                id: student._id,
                name: student.name,
                email: student.email,
                progress: 0,
                lessons: 0,
                completed: 0,
                activeCourses: 0,
                totalCourses: 0,
                courseProgress: []
              };
            }
          })
        );

        setStudentsData(studentsWithProgress);
      } catch (error) {
        console.error("Error fetching student progress:", error);
        setStudentsData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentProgress();
  }, []);

  if (loading) {
    return <div className="p-6">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="p-6 grid grid-cols-3 gap-6">
      {/* Thống kê Tổng Quan */}
      <div className="col-span-3 grid grid-cols-3 gap-4 bg-white p-4 shadow rounded-lg">
        <div className="text-center">
          <h3 className="text-lg font-bold">Tổng Học Viên</h3>
          <p className="text-2xl">{studentsData.length}</p>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-bold">Hoàn thành trung bình</h3>
          <p className="text-2xl">{(studentsData.reduce((acc, s) => acc + s.progress, 0) / (studentsData.length || 1)).toFixed(1)}%</p>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-bold">Học viên chậm tiến độ</h3>
          <p className="text-2xl">{studentsData.filter((s) => s.progress < 30).length}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="col-span-3 bg-white p-4 shadow rounded-lg">
        <Tabs>
          <TabList>
            <Tab>Tiến độ học tập</Tab>
            <Tab>Danh sách học viên</Tab>
          </TabList>

          <TabPanel>
            <h3 className="text-lg font-bold mb-4">Tiến độ học viên</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={studentsData}>
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="progress" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </TabPanel>

          <TabPanel>
            <h3 className="text-lg font-bold mb-4">Danh sách học viên</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Tên</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2">Tiến độ</th>
                  <th className="p-2">Khóa học</th>
                  <th className="p-2">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {studentsData.map((student) => (
                  <tr key={student.id} className="border-b">
                    <td className="p-2">{student.name}</td>
                    <td className="p-2">{student.email}</td>
                    <td className="p-2">{student.progress}%</td>
                    <td className="p-2">{student.activeCourses}/{student.totalCourses}</td>
                    <td className="p-2">
                      <button 
                        onClick={() => setSelectedStudent(student)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Xem chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabPanel>
        </Tabs>
      </div>

      {/* Chi tiết học viên */}
      <div className="col-span-3 bg-white p-4 shadow rounded-lg">
        <h3 className="text-lg font-bold mb-4">Chi tiết học viên</h3>
        {selectedStudent ? (
          <div>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-600">Tên học viên</h4>
                <p className="text-lg">{selectedStudent.name}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-600">Email</h4>
                <p className="text-lg">{selectedStudent.email}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-600">Tiến độ trung bình</h4>
                <p className="text-lg">{selectedStudent.progress}%</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-600">Tổng bài học đã hoàn thành</h4>
                <p className="text-lg">{selectedStudent.completed}/{selectedStudent.lessons}</p>
              </div>
            </div>

            <h4 className="font-bold text-lg mt-6 mb-4">Chi tiết từng khóa học</h4>
            <div className="space-y-4">
              {selectedStudent.courseProgress.map((course, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-semibold">{course.courseTitle}</h5>
                    <span className="text-sm text-gray-600">
                      Cập nhật lần cuối: {course.lastAccessed ? new Date(course.lastAccessed).toLocaleDateString() : 'Chưa bắt đầu'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mb-2">
                    <span>{course.completedLessons}/{course.totalLessons} bài học</span>
                    <span className="text-blue-600">{course.progress}% hoàn thành</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>Chọn một học viên để xem chi tiết</p>
        )}
      </div>
    </div>
  );
}
