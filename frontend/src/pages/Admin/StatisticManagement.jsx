import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  FiDownload,
  FiUsers,
  FiDollarSign,
  FiTrendingUp,
} from "react-icons/fi";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import UserService from "../../services/UserService";
import ToastMessageComponent from "../../components/ToastMessageComponent/ToastMessageComponent";

const colors = ["#4CAF50", "#FF9800", "#2196F3"];

const StatisticManagement = () => {
  const [students, setStudents] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "", color: "" });
  const [statistics, setStatistics] = useState({
    revenue: 0,
    students: 0,
    visits: 0,
    enrollments: 0,
  });
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const role = "user";
        const response = await UserService.getUserByRole(role);
        if (response?.data) {
          setStudents(response?.data);
        } else {
          setStudents([]);
        }
      } catch (error) {
        setToast({
          show: true,
          message: error,
          color: "red",
        });
      }
    };

    fetchStudents();
  }, []);

  const revenueData = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 19000 },
    { month: "Mar", revenue: 15000 },
    { month: "Apr", revenue: 25000 },
    { month: "May", revenue: 22000 },
    { month: "Jun", revenue: 30000 },
  ];

  const studentCountByRole = students.reduce((acc, student) => {
    acc[student.role] = (acc[student.role] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(studentCountByRole).map(([name, value]) => ({
    name,
    value,
  }));
  const exportToExcel = () => {
    const wsData = [
      ["Statistics Report"],
      ["Tổng doanh thu", statistics.revenue],
      ["Tổng học viên", statistics.students],
      ["Lượt truy cập Website", statistics.visits],
      ["Đăng ký khóa học", statistics.enrollments],
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Statistics");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(data, "statistics_report.xlsx");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {toast.show && (
        <ToastMessageComponent
          show={toast.show}
          message={toast.message}
          color={toast.color}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Thống Kê</h1>
        <button
          onClick={exportToExcel}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <FiDownload /> Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
          <FiDollarSign className="text-green-500 text-3xl" />
          <div>
            <p className="text-gray-500">Tổng doanh thu</p>
            <p className="text-2xl font-bold">${statistics.revenue}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
          <FiUsers className="text-blue-500 text-3xl" />
          <div>
            <p className="text-gray-500">Tổng học viên</p>
            <p className="text-2xl font-bold">{students.length}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
          <FiTrendingUp className="text-purple-500 text-3xl" />
          <div>
            <p className="text-gray-500">Lượt truy cập Website</p>
            <p className="text-2xl font-bold">{statistics.visits}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
          <FiTrendingUp className="text-orange-500 text-3xl" />
          <div>
            <p className="text-gray-500">Đăng ký khóa học</p>
            <p className="text-2xl font-bold">{statistics.enrollments}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Xu hướng doanh thu</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#4CAF50"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Số lượng học viên</h2>
          {console.log(students)}
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
export default StatisticManagement;
