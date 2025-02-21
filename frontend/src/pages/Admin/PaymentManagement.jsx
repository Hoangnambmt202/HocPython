import { useState, useEffect } from 'react';
import { FaSearch,  FaDownload } from 'react-icons/fa';

const PaymentManagement = () => {
    const [payments, setPayments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    // Mock data - replace with actual API call
    useEffect(() => {
        const mockPayments = [
            {
                id: 1,
                studentName: 'Nguyen Van A',
                course: 'Python Basics',
                amount: 999000,
                date: '2024-01-15',
                status: 'completed',
                method: 'Credit Card'
            },
            // Add more mock data as needed
        ];
        setPayments(mockPayments);
    }, []);

    return (
        <div className="min-h-screen bg-white p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Quản Lý Thanh Toán</h1>
                
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
                        <h3 className="text-gray-500 text-sm">Tổng Thu Nhập</h3>
                        <p className="text-2xl font-bold text-gray-800">45.000.000 ₫</p>
                    </div>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
                        <h3 className="text-gray-500 text-sm">Thanh Toán Hôm Nay</h3>
                        <p className="text-2xl font-bold text-green-600">1.500.000 ₫</p>
                    </div>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
                        <h3 className="text-gray-500 text-sm">Đang Chờ Xử Lý</h3>
                        <p className="text-2xl font-bold text-orange-500">5</p>
                    </div>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
                        <h3 className="text-gray-500 text-sm">Tổng Giao Dịch</h3>
                        <p className="text-2xl font-bold text-blue-600">150</p>
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Tìm kiếm giao dịch..."
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <FaSearch className="absolute left-3 top-3 text-gray-400" />
                        </div>
                        <select
                            className="px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="all">Tất cả trạng thái</option>
                            <option value="completed">Đã hoàn thành</option>
                            <option value="pending">Đang xử lý</option>
                            <option value="failed">Thất bại</option>
                        </select>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                            <FaDownload /> Xuất báo cáo
                        </button>
                    </div>
                </div>

                {/* Payment Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Học Viên</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khóa Học</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số Tiền</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng Thái</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao Tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {payments.map((payment) => (
                                <tr key={payment.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{payment.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.studentName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.course}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {payment.amount.toLocaleString('vi-VN')} ₫
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${payment.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                                payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                                'bg-red-100 text-red-800'}`}>
                                            {payment.status === 'completed' ? 'Hoàn thành' : 
                                             payment.status === 'pending' ? 'Đang xử lý' : 'Thất bại'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <button className="text-blue-600 hover:text-blue-800">Chi tiết</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between bg-white px-4 py-3 rounded-lg mt-4">
                    <div className="flex-1 flex justify-between sm:hidden">
                        <button className="px-4 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                            Trước
                        </button>
                        <button className="px-4 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                            Sau
                        </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">10</span> của{' '}
                                <span className="font-medium">97</span> kết quả
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    Trước
                                </button>
                                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    1
                                </button>
                                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    2
                                </button>
                                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    3
                                </button>
                                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    Sau
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentManagement;