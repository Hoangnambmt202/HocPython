
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, BarChart, Bar, ResponsiveContainer } from 'recharts';
import { Users, BookOpen, Trophy, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from 'react';
import UserService from '../../services/UserService';
import CourseService from '../../services/CourseService';

const Dashboard = () => {
  // Mock data
  const revenueData = [
    { month: 'T1', revenue: 12000 },
    { month: 'T2', revenue: 19000 },
    { month: 'T3', revenue: 15000 },
    { month: 'T4', revenue: 25000 },
    { month: 'T5', revenue: 32000 },
    { month: 'T6', revenue: 28000 },
  ];

  const enrollmentData = [
    { month: 'T1', students: 45 },
    { month: 'T2', students: 52 },
    { month: 'T3', students: 49 },
    { month: 'T4', students: 63 },
    { month: 'T5', students: 58 },
    { month: 'T6', students: 71 },
  ];
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const statsCards = [
    {
      title: 'Tổng Học Viên',
      value: students.length,
      change: '+12%',
      isPositive: true,
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Khóa Học Hoạt Động',
      value: courses.length,
      change: '+3',
      isPositive: true,
      icon: BookOpen,
      color: 'bg-green-500'
    },
    {
      title: 'Tỷ Lệ Hoàn Thành',
      value: '78%',
      change: '-2%',
      isPositive: false,
      icon: Trophy,
      color: 'bg-purple-500'
    },
    {
      title: 'Doanh Thu Tháng',
      value: '45,000,000đ',
      change: '+15%',
      isPositive: true,
      icon: TrendingUp,
      color: 'bg-orange-500'
    }
  ];

  const recentCourses = [
    { name: 'Python Cơ Bản', students: 156, completion: 82, revenue: '12,000,000đ' },
    { name: 'Lập Trình Web với Django', students: 98, completion: 75, revenue: '8,500,000đ' },
    { name: 'Machine Learning Cơ Bản', students: 124, completion: 68, revenue: '15,000,000đ' },
    { name: 'Data Science với Python', students: 145, completion: 71, revenue: '13,200,000đ' },
  ];
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
         console.log(error);
        }
      };
      const fetchCourses = async () => {
        try {
          const response = await CourseService.getAllCourses();
          if (response?.data) {
            setCourses(response?.data);
          } else {
            setCourses([]);
          }
        }
        catch (error) {
          console.log(error);
        }
      }
      fetchCourses();
      fetchStudents();
    }, []);
  
  return (
    <>
    <Helmet>
  <title>Admin Dashboard</title>
</Helmet>
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat) => (
          <div key={stat.title} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                <div className="flex items-center mt-2">
                  {stat.isPositive ? (
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm ${stat.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`${stat.color} p-4 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Doanh Thu Theo Tháng</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#3B82F6" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Học Viên Đăng Ký Mới</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Courses Table */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6">
          <h3 className="text-lg font-semibold">Khóa Học Gần Đây</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên Khóa Học
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số Học Viên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tỷ Lệ Hoàn Thành
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doanh Thu
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentCourses.map((course) => (
                <tr key={course.name}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{course.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{course.students}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${course.completion}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 mt-1">{course.completion}%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                    {course.revenue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;