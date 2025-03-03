import  { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPen, FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { FaInstagram } from "react-icons/fa6";
import { useSelector } from 'react-redux';
const AdminProfile = () => {
   
    const [isEditing, setIsEditing] = useState(false);
    const user = useSelector((state) => state.user.user);
    const [editedData, setEditedData] = useState(user);
    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
      
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="min-h-screen bg-white  py-8">
            <div className="w-full mx-auto">
                <div className="bg-white rounded-lg shadow-xl p-8">
                    {/* Header */}
                    <div className="flex md:flex-row items-center justify-between gap-8">
                        <div className="relative flex items-center md:items-start gap-4">
                            <img
                                src={editedData.avatar}
                                alt="Admin Avatar"
                                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                            />
                            <button className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600">
                                <FaPen size={14} />
                            </button>
                            <div className="text-center md:text-left">
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={editedData.name}
                                    onChange={handleChange}
                                    className="text-3xl font-bold text-gray-800 border-b-2 border-blue-500"
                                />
                            ) : (
                                <h1 className="text-3xl font-bold text-gray-800">{user.name || editedData.name}</h1>
                            )}
                            <p className="text-blue-500 font-semibold mt-1">{user.role || editedData.role}</p>
                            <p className="text-gray-500 mt-1">Member since { user.createdAt }</p>
                        </div>
                        </div>
                        
                        
                        <div className='flex items-center gap-8'>
                            <a href='' target='_blank' className='rounded-full border bg-gray-200 p-4'>
                                <FcGoogle size={30}/>
                            </a>
                            <a href=''  target='_blank' className='rounded-full border bg-gray-200 p-4'>
                                <FaFacebookF color='blue' size={30} />
                            </a>
                            <a href=''  target='_blank' className='rounded-full border bg-gray-200 p-4'>
                                <FaInstagram color='red' size={30} />
                            </a>
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="mt-6 border-t pt-6">
                        <h2 className="text-xl font-semibold mb-4">Thông tin cá nhân</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Existing Info Cards */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <FaEnvelope className="text-blue-500" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500">Email</p>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={editedData.email}
                                                onChange={handleChange}
                                                className="w-full text-gray-800 font-medium border-b border-blue-500"
                                            />
                                        ) : (
                                            <p className="text-gray-800 font-medium">{editedData.email}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <FaPhone className="text-blue-500" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500">Số điện thoại</p>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={editedData.phone}
                                                onChange={handleChange}
                                                className="w-full text-gray-800 font-medium border-b border-blue-500"
                                            />
                                        ) : (
                                            <p className="text-gray-800 font-medium">{editedData.phone}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <FaMapMarkerAlt className="text-blue-500" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500">Địa chỉ</p>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="address"
                                                value={editedData.address}
                                                onChange={handleChange}
                                                className="w-full text-gray-800 font-medium border-b border-blue-500"
                                            />
                                        ) : (
                                            <p className="text-gray-800 font-medium">{editedData.address}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <FaUser className="text-blue-500" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500">Chức vụ</p>
                                        <p className="text-gray-800 font-medium">{editedData.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        {isEditing ? (
                            <>
                                <button 
                                    onClick={handleSave}
                                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                                >
                                    Save Changes
                                </button>
                                <button 
                                    onClick={() => setIsEditing(false)}
                                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <button 
                                    onClick={handleEdit}
                                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    Edit Profile
                                </button>
                                <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                                    Change Password
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;