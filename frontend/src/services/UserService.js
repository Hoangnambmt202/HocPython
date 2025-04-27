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
const updateUser = async ({data}) => {
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/user/update`, data, {withCredentials: true});
   
    return res.data;
};
const deleteUser = async (userId) => {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/user/delete/${userId}`, {withCredentials: true});
    return res.data;
};


export default {
    loginUser,
    logoutUser,
    registerUser,
    getUserByRole,
    getAllUser,
    getDetailUser,
    updateUser,
    deleteUser
}