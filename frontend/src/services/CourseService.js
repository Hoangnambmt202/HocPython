import axios from "axios";



const createCourse = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/course/create`,data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      })
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
const updateCourse = async (courseId, data) => {
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/course/update/${courseId}`,data , {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      })
    return res.data
}
const deleteCourse = async (courseId) => {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/course/delete/${courseId}`, {withCredentials: true})
    return res.data
}

export default {
    createCourse,
    getAllCourses,
    getCourses,
    updateCourse,
    deleteCourse,

}