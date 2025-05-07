import axios from "axios";

const createLesson = async (chapterId, lessonData) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/lessons/${chapterId}/create`, lessonData ,{
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return res.data
}
const getAllLessons = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/lessons/all`, {withCredentials: true})
    return res.data
}
const getLessonByChapter = async (chapterId) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/lessons/${chapterId}`, {withCredentials: true})
    return res.data
}
const updateLesson =  async (id, data) => {
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/lessons/update/${id}`, data, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return res.data
}
const deleteLesson =  async (id) => {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/lessons/delete/${id}`, {withCredentials: true})
    return res.data
}
const runCode = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/lessons/run-code`,data, {withCredentials: true})
    return res.data
  };
   // Kiểm tra kết quả của một job
const checkCodeExecutionResult = async (jobId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/lessons/code-execution/${jobId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: error.message };
    }
  }

export default {
    createLesson,
    getAllLessons,
    getLessonByChapter,
    updateLesson,
    deleteLesson,
    runCode,
    checkCodeExecutionResult
}