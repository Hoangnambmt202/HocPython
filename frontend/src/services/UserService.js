import axios from "axios";


const loginUser = async (data) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/sign-in`,data, { withCredentials: true } )
       
        return res.data;
    } catch (error) {
        console.error(error.response?.data?.message || "Đã có lỗi xảy ra");
    }

}
const logoutUser = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/logout`, {}, { withCredentials: true });
        return res.data;
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error.response?.data?.message || error.message);
    }
  };

 const registerUser = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/sign-up`,data);
    return res.data;
}
const getUserByRole = async (role) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/getUserByRole?role=${role}`, { withCredentials: true })
    return res.data
}

const getAllUser = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/getAll`, { withCredentials: true })
    return res.data
}
const getDetailUser = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/me`, {withCredentials: true});
    return res.data;
}
const updateUser = async (data) => {
  const res = await axios.put(`${import.meta.env.VITE_API_URL}/user/update`, data, {
    withCredentials: true
  });
  return res.data;
};

const deleteUser = async (userId) => {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/user/delete/${userId}`, {withCredentials: true});
    return res.data;
};

const uploadAvatar = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await axios.post(`${import.meta.env.VITE_API_URL}/cloudinary/avatar`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
          },
     withCredentials: true
    });
    return response.data;
  }
  const searchUsers = async (query) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/search?q=${query}`, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error("Lỗi khi tìm kiếm người dùng:", error.response?.data?.message || error.message);
    }
  }

export default {
    loginUser,
    logoutUser,
    registerUser,
    getUserByRole,
    getAllUser,
    getDetailUser,
    updateUser,
    deleteUser,
    uploadAvatar,
    searchUsers,
}