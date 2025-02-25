import axios from "axios";


const loginUser = async (data) => {
 const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/sign-in`,data);
// Log dữ liệu phản hồi từ server
 return res.data;
}

 const registerUser = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/sign-up`,data);
   // Log dữ liệu phản hồi từ server
    return res.data;
}
const getDetailUser = async (access_token) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/me`, {
        headers: {
            authorization: `Bearer ${access_token}`,
        },
    });
    
    
    return res;
}
const updateUser = async ({data, access_token}) => {
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/user/update`, data, {
        headers: { authorization: `Bearer ${access_token}` },
    });
   
    return res.data;
};


export default {
    loginUser,
    registerUser,
    getDetailUser,
    updateUser,
}