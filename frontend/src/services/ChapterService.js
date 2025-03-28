import axios from "axios";



const createChapter = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/chapters/create`,data , {withCredentials: true})
    return res.data
}
const getAllChapters = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/chapters/all`, {withCredentials: true})
    return res.data
}
const updateChapter =  async (id, title) => {
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/chapters/update/${id}`, title, {withCredentials: true})
    return res.data
}
const deleteChapter =  async (id) => {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/chapters/delete/${id}`, {withCredentials: true})
    return res.data
}
export default {
    createChapter,
    getAllChapters,
    updateChapter,
    deleteChapter,
}