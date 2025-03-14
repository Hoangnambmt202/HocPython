import axios from "axios";



const createCategory = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/category/create`,data)
    return res.data
}
const getCategories = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/category/all`);
    return res.data;
};
export default {
    createCategory,
    getCategories
}