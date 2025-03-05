import axios from "axios";



const createCourse = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/course/create`,data)
    return res.data
}
const getAllCourses = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/course/all`)
    return res.data
   
}
const getCourses = async (slug) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/course/${slug}`)
    return res.data
   
}
// Lấy tất cả khóa học

export default {
    createCourse,
    getAllCourses,
    getCourses,
}