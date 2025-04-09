import  { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { SlPaypal } from "react-icons/sl";
const PaymentMethods = () => {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        icon: '',
        isActive: true,
    });
    const [editingId, setEditingId] = useState(null);

    // Mock data - replace with actual API calls
    useEffect(() => {
        setPaymentMethods([
            { id: 1, name: 'PayPal', description: 'Thanh toán quốc tế với PayPal', icon: <SlPaypal />, isActive: true },
            { id: 2, name: 'Thẻ nội địa', description: 'Thanh toán thẻ nội địa', icon: '💳', isActive: true },
        ]);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            // Update existing payment method
            setPaymentMethods(methods =>
                methods.map(method =>
                    method.id === editingId ? { ...formData, id: editingId } : method
                )
            );
           
        } else {
            // Add new payment method
            setPaymentMethods(methods => [
                ...methods,
                { ...formData, id: Date.now() }
            ]);
           
        }
        resetForm();
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this payment method?')) {
            setPaymentMethods(methods => methods.filter(method => method.id !== id));
           
        }
    };

    const handleEdit = (method) => {
        setFormData(method);
        setEditingId(method.id);
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setFormData({ name: '', description: '', icon: '', isActive: true });
        setEditingId(null);
        setIsModalOpen(false);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Payment Methods</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <FiPlus /> Thêm phương thức thanh toán
                </button>
            </div>

            {/* Payment Methods List */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {paymentMethods.map((method) => (
                    <div key={method.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="text-2xl mb-2">{method.icon}</span>
                                <h3 className="font-semibold text-lg">{method.name}</h3>
                                <p className="text-gray-600 text-sm mt-1">{method.description}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(method)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                                >
                                    <FiEdit2 />
                                </button>
                                <button
                                    onClick={() => handleDelete(method.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                                >
                                    <FiTrash2 />
                                </button>
                            </div>
                        </div>
                        <div className="mt-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${method.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                {method.isActive ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Form */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">
                            {editingId ? 'Edit Payment Method' : 'Add Payment Method'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Icon (emoji)</label>
                                    <input
                                        type="text"
                                        value={formData.icon}
                                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                        required
                                    />
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.isActive}
                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                        className="rounded border-gray-300"
                                    />
                                    <label className="ml-2 text-sm text-gray-700">Active</label>
                                </div>
                            </div>
                            <div className="mt-6 flex gap-3">
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                >
                                    {editingId ? 'Update' : 'Add'}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentMethods;