import { useState } from 'react';
import { FaMoneyBillWave, FaExclamationTriangle } from 'react-icons/fa';

const PaymentRefund = () => {
    const [activeTab, setActiveTab] = useState('refunds');
    
    // Mock data - replace with actual API calls
    const refundRequests = [
        { id: 1, student: "John Doe", course: "Python Basics", amount: 49.99, reason: "Khóa học không như mô tả", status: "pending" },
        { id: 2, student: "Jane Smith", course: "Advanced Python", amount: 99.99, reason: "Lỗi kỹ thuật", status: "resolved" },
    ];

    const complaints = [
        { id: 1, student: "Mike Johnson", course: "Python Web Dev", issue: "Chất lượng nội dung", status: "open" },
        { id: 2, student: "Sarah Williams", course: "Data Science with Python", issue: "Hỗ trợ kỹ thuật", status: "resolved" },
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Hoàn tiền & Khiếu nại</h1>
            
            {/* Tabs */}
            <div className="flex space-x-4 mb-6">
                <button 
                    onClick={() => setActiveTab('refunds')}
                    className={`flex items-center px-4 py-2 rounded-lg ${
                        activeTab === 'refunds' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                >
                    <FaMoneyBillWave className="mr-2" />
                    Yêu cầu hoàn tiền
                </button>
                <button 
                    onClick={() => setActiveTab('complaints')}
                    className={`flex items-center px-4 py-2 rounded-lg ${
                        activeTab === 'complaints' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                >
                    <FaExclamationTriangle className="mr-2" />
                    Khiếu nại
                </button>
            </div>

            {/* Content */}
            <div className="bg-white rounded-lg shadow-md p-6">
                {activeTab === 'refunds' ? (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Yêu cầu hoàn tiền</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Học Viên</th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khóa Học</th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng tiền hoàn trả</th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lý do</th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {refundRequests.map((request) => (
                                        <tr key={request.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">{request.student}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{request.course}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">${request.amount}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{request.reason}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 rounded-full text-xs ${
                                                    request.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {request.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button className="text-blue-600 hover:text-blue-800">Chi tiết</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Khiếu nại</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Học viên</th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khóa học</th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vấn đề</th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {complaints.map((complaint) => (
                                        <tr key={complaint.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">{complaint.student}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{complaint.course}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{complaint.issue}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 rounded-full text-xs ${
                                                    complaint.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {complaint.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {
                                                    complaints.map(complaint => {
                                                        if(complaint.status != "resolved") {
                                                            return ( <>
                                                                <button> Xử lý</button>
                                                                </>)
                                                        }
                                                        else  {
                                                            return (
                                                               <><p>khong Xử lý</p></>
                                                            )
                                                        }
                                                    })
                                                   
                                                }
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentRefund;