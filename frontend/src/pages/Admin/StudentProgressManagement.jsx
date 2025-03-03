import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const studentsData = [
  { id: 1, name: "Nguyễn Văn A", email: "a@gmail.com", progress: 80, lessons: 10, completed: 8 },
  { id: 2, name: "Trần Thị B", email: "b@gmail.com", progress: 40, lessons: 10, completed: 4 },
  { id: 3, name: "Lê Văn C", email: "c@gmail.com", progress: 20, lessons: 10, completed: 2 },
];

export default function StudentProgressAdmin() {
  const [selectedStudent, setSelectedStudent] = useState(null);

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
          <p className="text-2xl">{(studentsData.reduce((acc, s) => acc + s.progress, 0) / studentsData.length).toFixed(1)}%</p>
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
                  <th className="p-2">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {studentsData.map((student) => (
                  <tr key={student.id} className="border-b">
                    <td className="p-2">{student.name}</td>
                    <td className="p-2">{student.email}</td>
                    <td className="p-2">{student.progress}%</td>
                    <td className="p-2">
                      <button onClick={() => setSelectedStudent(student)}>
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
            <p><strong>Tên:</strong> {selectedStudent.name}</p>
            <p><strong>Email:</strong> {selectedStudent.email}</p>
            <p><strong>Tiến độ:</strong> {selectedStudent.progress}%</p>
            <h4 className="mt-4 font-bold">Bài học đã hoàn thành</h4>
            <ul>
              {Array.from({ length: selectedStudent.lessons }, (_, i) => (
                <li key={i} className={i < selectedStudent.completed ? "text-green-600" : "text-gray-400"}>
                  {i + 1}. Bài học {i + 1} {i < selectedStudent.completed ? "✅" : "⏳"}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Chọn một học viên để xem chi tiết</p>
        )}
      </div>
    </div>
  );
}
