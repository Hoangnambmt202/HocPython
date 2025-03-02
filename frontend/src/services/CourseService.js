import axios from "axios";



const createCourse = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/course/create`,data)
    return res.data
}

export default {
    createCourse
}